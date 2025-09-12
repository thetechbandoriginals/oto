import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { POLICY } from '@/utils/types'
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, RotateCcw, CreditCard } from "lucide-react"
import dynamic from "next/dynamic"

const PayIssueDialog = dynamic(() => import('@/components/pay-issue-dialog'), { ssr: false });

interface SINGLE_DASHBOARD_POLICY_PROPS {
    policy: POLICY
}

const SingleDashboardPolicy = ({ policy }: SINGLE_DASHBOARD_POLICY_PROPS) => {

    const [payOpen, setPayOpen] = useState(false);

  return (
    <Card key={policy._id} className="border-2 border-primary/20">
        <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Policy #{policy.policy.policyNumber}</CardTitle>
            <Badge variant={policy.policy.paid ? "default" : "destructive"} className="flex items-center gap-1">
            {policy.policy.paid ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {policy.policy.paid ? "Paid" : "Unpaid"}
            </Badge>
        </div>
        </CardHeader>

        <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
            <p className="text-muted-foreground">Vehicle</p>
            <p className="font-medium text-foreground">
                {policy.policy.regNo} - {policy.policy.make} {policy.policy.model}
            </p>
            </div>

            <div>
            <p className="text-muted-foreground">Insurance Class</p>
            <p className="font-medium text-foreground">{policy.policy.insuranceClass.name}</p>
            </div>

            <div>
            <p className="text-muted-foreground">Coverage Period</p>
            <p className="font-medium text-foreground">
                {new Date(policy.policy.startDate).toLocaleDateString()} -{" "}
                {new Date(policy.policy.endDate).toLocaleDateString()}
            </p>
            </div>

            <div>
            <p className="text-muted-foreground">Premium</p>
            <p className="font-medium text-foreground">KES {policy.price.toLocaleString()}</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
            {!policy.policy.paid && (
            <PayIssueDialog 
                policy={policy}
                onClose={() => setPayOpen(false)}
                open={payOpen}
            >
            </PayIssueDialog>
            )}

            <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                disabled={policy.policy.paid}
                onClick={() => setPayOpen(true)}
            >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay & Issue
            </Button>

            {/* <Button size="sm" asChild>
            <Link href={policy.document} target="_blank">
                <Download className="w-4 h-4 mr-2" />
                Download Policy
            </Link>
            </Button> */}

            <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Details
            </Button>

            <Button size="sm" variant="outline" disabled>
            <RotateCcw className="w-4 h-4 mr-2" />
            Renew Policy
            </Button>
        </div>
        </CardContent>
    </Card>
  )
}

export default SingleDashboardPolicy
