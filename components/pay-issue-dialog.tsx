'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { POLICY } from "@/utils/types"
import axios from "axios"
import { INSUREPAL_API, PAYSTACK_PUBLIC_KEY } from "@/config"
import { usePaystackPayment } from 'react-paystack';
import useClientUser from "@/hooks/useClientUser"
import useClientToken from "@/hooks/useClientToken"
import useAxios from "@/hooks/useAxios"
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useAppContext } from "@/contexts/app-context"

interface PayIssueDialogProps {
  policy: POLICY
  open: boolean,
  onClose: () => void,
}

type ProcessingState = 'idle' | 'validating' | 'processing-payment' | 'issuing' | 'complete' | 'error'

export default function PayIssueDialog({ policy, onClose, open }: PayIssueDialogProps) {

  const user = useClientUser();
  const token = useClientToken();
  const request = useAxios(token);
  const { getPolicies } = useAppContext();

  const [processingState, setProcessingState] = useState<ProcessingState>('idle')
  const [errorMessage, setErrorMessage] = useState('');
  const [existingPolicy, setExistingPolicy] = useState<any>(null);

  const initializePayment = usePaystackPayment({ 
    publicKey: PAYSTACK_PUBLIC_KEY || '',
    currency: 'KES',
  });

  const issuePolicyHandler = async () => {
    await axios.post(`${INSUREPAL_API}/auth/issue`, { policy: policy.policy._id });
    setProcessingState('complete')
    setTimeout(() => {
      getPolicies();
      onClose()
      setProcessingState('idle')
    }, 2000)
  }

  const validatePaymentHandler = async (ref: any) => {
    try {
      const response = await request({ method: 'post', path: '/policy/validate-payment', pathData: { reference: ref.reference, policyId: policy._id } });
      setProcessingState('issuing');
      await issuePolicyHandler();
    } catch (error: any) {
      setProcessingState('error');
      const errMes = error?.response?.data?.content || error?.response?.data?.message || error?.message || error || 'An error occurred while processing payment';
      setErrorMessage(errMes)
    }
  }


  const validateDoubleInsurance = async () => {
    const response = await axios.post(`${INSUREPAL_API}/auth/validate-double-insurance`, { policy: policy.policy._id });
    if (response.data.error) {
      setExistingPolicy(response.data.data);
      throw new Error(response.data.message || 'Double insurance validation failed')
    };
    setProcessingState('processing-payment')
    initializePayment({
      config: {
        email: user?.email || policy.policy.email,
        // phone: policy.policy.phone,
        amount: policy.price * 100,
      },
      onSuccess: validatePaymentHandler,
      onClose: () => {
        setProcessingState('error');
        setErrorMessage('Payment was not completed. Please try again.');
      }
    })
  }

  const handleConfirm = async () => {
    try {
      setProcessingState('validating')
      await validateDoubleInsurance();
    } catch (error: any) {
      setProcessingState('error');
      const errMes = error?.response?.data?.content || error?.response?.data?.message || error?.message || error || 'An error occurred while processing payment';
      setErrorMessage(errMes)
    }
  }

  const handleCancel = () => {
    if (processingState === 'idle' || processingState === 'error') {
      onClose()
      setProcessingState('idle')
      setErrorMessage('')
    }
  }

  useEffect(() => {
    if (processingState !== 'error') {
      setExistingPolicy(null);
    }
  }, [processingState])

  const getProcessingContent = () => {
    switch (processingState) {
      case 'validating':
        return (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Validating Policy</p>
              <p className="text-sm text-blue-700">Checking policy eligibility for payment and issuance...</p>
            </div>
          </div>
        )
      case 'processing-payment':
        return (
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">Processing Payment</p>
              <p className="text-sm text-orange-700">Securely processing your payment of KES {policy.price.toLocaleString()}...</p>
            </div>
          </div>
        )
      case 'issuing':
        return (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-green-600" />
            <div>
              <p className="font-medium text-green-900">Issuing Policy</p>
              <p className="text-sm text-green-700">Finalizing policy documents and activation...</p>
            </div>
          </div>
        )
      case 'complete':
        return (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Payment Successful!</p>
              <p className="text-sm text-green-700">Your policy has been paid and issued successfully.</p>
            </div>
          </div>
        )
      case 'error':
        return (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-medium text-red-900">Payment Failed</p>
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
              <div>
                <p className="text-center font-medium mb-2 underline">Existing Policy</p>
                <p className="text-sm">End Date: <span className="font-bold">{existingPolicy?.CoverEndDate}</span></p>
                <p className="text-sm">Insurance Certificate Number: <span className="font-bold">{existingPolicy?.InsuranceCertificateNo}</span></p>
                <p className="text-sm">Company: <span className="font-bold">{existingPolicy?.MemberCompanyName}</span></p>
                <p className="text-sm">Registration Number: <span className="font-bold">{existingPolicy?.RegistrationNumber}</span></p>
                <p className="text-sm">Chasis Number: <span className="font-bold">{existingPolicy?.ChassisNumber}</span></p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const isProcessing = ['validating', 'processing-payment', 'issuing'].includes(processingState);


  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle className="flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Pay & Issue Policy
      </DialogTitle>
      <DialogContent className="sm:max-w-md">
        <p>
          Complete payment and issue policy #{policy.policy.policyNumber}
        </p>

        <div className="space-y-4">
          {processingState === 'idle' && (
            <>
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-medium">Policy Details</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-medium">{policy.policy.regNo} - {policy.policy.make} {policy.policy.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance Class:</span>
                    <span className="font-medium">{policy.policy.insuranceClass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premium:</span>
                    <span className="font-medium">KES {policy.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coverage Period:</span>
                    <span className="font-medium">
                      {new Date(policy.policy.startDate).toLocaleDateString()} - {new Date(policy.policy.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Confirm Payment & Issuance</p>
                    <p className="text-blue-700 mt-1">
                      This action will process payment and immediately issue the policy. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {getProcessingContent()}
        </div>

        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          {processingState === 'idle' && (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay KES {policy.price.toLocaleString()} & Issue
              </Button>
            </>
          )}
          
          {processingState === 'error' && (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setProcessingState('idle')
                  setErrorMessage('')
                }}
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
            </>
          )}

          {isProcessing && (
            <Button disabled className="w-full">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </Button>
          )}

          {processingState === 'complete' && (
            <Button disabled className="w-full bg-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete!
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}