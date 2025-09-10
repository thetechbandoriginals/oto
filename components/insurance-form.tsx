"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

const carMakes = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Saab",
  "Seat",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
]

const bodyTypes = ["Sedan", "Hatchback", "SUV", "Pickup", "Other"]
const insuranceClasses = ["Private Car (Comprehensive)", "Third Party Only", "Commercial Vehicle"]

interface FormData {
  // Step 1: Personal Details
  fullName: string
  phoneNumber: string
  email: string
  idNumber: string
  kraPin: string
  address: string

  // Step 2: Vehicle Details
  registrationNumber: string
  make: string
  model: string
  chassisNumber: string
  engineNumber: string
  yearOfManufacture: string
  bodyType: string

  // Step 3: Insurance Details
  insuranceClass: string
  startDate: string
  endDate: string
  additionalDetails: string
}

export function InsuranceForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    idNumber: "",
    kraPin: "",
    address: "",
    registrationNumber: "",
    make: "",
    model: "",
    chassisNumber: "",
    engineNumber: "",
    yearOfManufacture: "",
    bodyType: "",
    insuranceClass: "",
    startDate: "",
    endDate: "",
    additionalDetails: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const router = useRouter()

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phoneNumber.match(/^0[17]\d{8}$/))
      newErrors.phoneNumber = "Invalid phone number format (e.g., 0712345678)"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.idNumber.match(/^\d{8}$/)) newErrors.idNumber = "ID number must be 8 digits"
    if (!formData.kraPin.match(/^P0\d{9}[A-Z]$/)) newErrors.kraPin = "Invalid KRA PIN format (e.g., P012345678A)"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required"
    if (!formData.make) newErrors.make = "Vehicle make is required"
    if (!formData.chassisNumber.trim()) newErrors.chassisNumber = "Chassis number is required"
    if (
      !formData.yearOfManufacture ||
      Number.parseInt(formData.yearOfManufacture) < 1980 ||
      Number.parseInt(formData.yearOfManufacture) > 2025
    ) {
      newErrors.yearOfManufacture = "Year must be between 1980 and 2025"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.insuranceClass) newErrors.insuranceClass = "Insurance class is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) isValid = validateStep1()
    else if (currentStep === 2) isValid = validateStep2()
    else if (currentStep === 3) isValid = validateStep3()

    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        // Submit form
        alert("Submitted! Redirecting to payment...")
        router.push("/dashboard")
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-set end date when start date changes
      if (field === "startDate" && value) {
        const startDate = new Date(value)
        const endDate = new Date(startDate)
        endDate.setFullYear(endDate.getFullYear() + 1)
        updated.endDate = endDate.toISOString().split("T")[0]
      }

      return updated
    })

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const progress = (currentStep / 3) * 100

  return (
    <Card className="w-full mx-auto bg-white border-2 border-primary/20">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <CardTitle className="text-xl font-bold text-foreground">Step 1: Your Details</CardTitle>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="0712345678"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                  />
                  {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className={errors.idNumber ? "border-destructive" : ""}
                    placeholder="8 digits"
                  />
                  {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kraPin">KRA PIN *</Label>
                  <Input
                    id="kraPin"
                    value={formData.kraPin}
                    onChange={(e) => updateFormData("kraPin", e.target.value)}
                    className={errors.kraPin ? "border-destructive" : ""}
                    placeholder="P012345678A"
                  />
                  {errors.kraPin && <p className="text-sm text-destructive">{errors.kraPin}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Next: Vehicle Details
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <CardTitle className="text-xl font-bold text-foreground">Step 2: Register Your Vehicle</CardTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number (e.g., KAA 123A) *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => updateFormData("registrationNumber", e.target.value)}
                  className={errors.registrationNumber ? "border-destructive" : ""}
                />
                {errors.registrationNumber && <p className="text-sm text-destructive">{errors.registrationNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select value={formData.make} onValueChange={(value) => updateFormData("make", value)}>
                  <SelectTrigger className={errors.make ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.make && <p className="text-sm text-destructive">{errors.make}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model (e.g., Corolla)</Label>
                <Input id="model" value={formData.model} onChange={(e) => updateFormData("model", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chassisNumber">Chassis Number *</Label>
                <Input
                  id="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={(e) => updateFormData("chassisNumber", e.target.value)}
                  className={errors.chassisNumber ? "border-destructive" : ""}
                />
                {errors.chassisNumber && <p className="text-sm text-destructive">{errors.chassisNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineNumber">Engine Number</Label>
                <Input
                  id="engineNumber"
                  value={formData.engineNumber}
                  onChange={(e) => updateFormData("engineNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearOfManufacture">Year of Manufacture *</Label>
                <Input
                  id="yearOfManufacture"
                  type="number"
                  min="1980"
                  max="2025"
                  value={formData.yearOfManufacture}
                  onChange={(e) => updateFormData("yearOfManufacture", e.target.value)}
                  className={errors.yearOfManufacture ? "border-destructive" : ""}
                />
                {errors.yearOfManufacture && <p className="text-sm text-destructive">{errors.yearOfManufacture}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select value={formData.bodyType} onValueChange={(value) => updateFormData("bodyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Next: Insurance
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <CardTitle className="text-xl font-bold text-foreground">Step 3: Choose Insurance Cover</CardTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceClass">Insurance Class *</Label>
                <Select
                  value={formData.insuranceClass}
                  onValueChange={(value) => updateFormData("insuranceClass", value)}
                >
                  <SelectTrigger className={errors.insuranceClass ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select insurance class" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.insuranceClass && <p className="text-sm text-destructive">{errors.insuranceClass}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData("startDate", e.target.value)}
                  className={errors.startDate ? "border-destructive" : ""}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData("endDate", e.target.value)}
                  className={errors.endDate ? "border-destructive" : ""}
                />
                {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="additionalDetails">Additional Details</Label>
                <Textarea
                  id="additionalDetails"
                  rows={3}
                  value={formData.additionalDetails}
                  onChange={(e) => updateFormData("additionalDetails", e.target.value)}
                  placeholder="Sum insured, tonnage, or other details..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Purchase & Get Policy
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
