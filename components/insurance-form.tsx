"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Upload, X } from "lucide-react"
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
const insuranceCompanies = [
  "Jubilee Insurance",
  "CIC Insurance",
  "APA Insurance",
  "Britam Insurance",
  "UAP Insurance",
  "ICEA LION",
  "Madison Insurance",
  "Kenindia Assurance",
  "Heritage Insurance",
  "Takaful Insurance",
]

const insuranceTypes = ["Comprehensive (Comp)", "Time On Risk (TOR)", "Third Party Only (TPO)"]

const insuranceClasses = [
  "MOTOR PRIVATE",
  "MOTOR COMMERCIAL",
  "MOTOR CYCLE (PRIVATE)",
  "MOTOR CYCLE (COMMERCIAL)",
  "MOTOR CYCLE (BODABODA)",
  "MOTOR TRACTORS",
  "MOTOR (P.S.V) CHAUFFEUR DRIVEN",
  "MOTOR (P.S.V) TAXI",
  "MOTOR COMMERCIAL (INSTITUTION)",
  "MOTOR ASSET INSURANCE",
  "MOTOR PSV MATATU",
  "MOTOR PSV BUSES",
]

const oneDay = 1000 * 60 * 60 * 24

const getWeekDate = (startDate: string) => {
  const date = new Date(startDate)
  return new Date(date.getTime() + 7 * oneDay - oneDay)
}

const getTwoWeeksDate = (startDate: string) => {
  const date = new Date(startDate)
  return new Date(date.getTime() + 14 * oneDay - oneDay)
}

const getMonthDate = (startDate: string) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getTime() - oneDay)
  return new Date(newDate.setMonth(newDate.getMonth() + 1))
}

const getSixMonthDate = (startDate: string) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getTime() - oneDay)
  return new Date(newDate.setMonth(newDate.getMonth() + 6))
}

const getYearDate = (startDate: string) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getTime() - oneDay)
  return new Date(newDate.setFullYear(newDate.getFullYear() + 1))
}

const getElevenMonths = (startDate: string) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getTime() - oneDay)
  return new Date(newDate.setMonth(newDate.getMonth() + 11))
}

const getTenMonths = (startDate: string) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getTime() - oneDay)
  return new Date(newDate.setMonth(newDate.getMonth() + 10))
}

const getFrequencyOptions = (insuranceType: string, insuranceClass: string) => {
  if (insuranceType === "Time On Risk (TOR)") {
    return ["Monthly", "After Two Weeks"]
  }

  if (insuranceType === "Comprehensive (Comp)") {
    if (insuranceClass === "MOTOR CYCLE (BODABODA)") {
      return ["Monthly", "Annually", "After Six Months"]
    }
    return ["Monthly", "Annually", "After Two Weeks", "After Six Months"]
  }

  if (insuranceType === "Third Party Only (TPO)") {
    if (insuranceClass === "MOTOR CYCLE (BODABODA)") {
      return ["Monthly", "Annually", "After Six Months"]
    }
    if (insuranceClass === "MOTOR PSV MATATU") {
      return ["Weekly", "After Two Weeks", "Monthly"]
    }
    if (insuranceClass === "MOTOR PSV BUSES") {
      return ["Monthly"]
    }
    return ["Monthly", "Annually", "After Two Weeks", "After Six Months"]
  }

  return ["Monthly", "After Two Weeks", "After Six Months", "Annually"]
}

const getAvailableClasses = (insuranceType: string) => {
  if (insuranceType === "Time On Risk (TOR)") {
    return insuranceClasses.slice(0, 2) // First 2 classes only
  }

  if (insuranceType === "Comprehensive (Comp)") {
    return insuranceClasses.slice(0, 10) // First 10 classes
  }

  if (insuranceType === "Third Party Only (TPO)") {
    return insuranceClasses // All 12 classes
  }

  return []
}

const mockClients = [
  {
    id: 1,
    name: "John Doe",
    phone: "0712345678",
    email: "john@example.com",
    idNumber: "12345678",
    kraPin: "P051234567M",
    address: "Nairobi, Kenya",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "0723456789",
    email: "jane@example.com",
    idNumber: "23456789",
    kraPin: "P062345678N",
    address: "Mombasa, Kenya",
  },
  {
    id: 3,
    name: "Peter Kamau",
    phone: "0734567890",
    email: "peter@example.com",
    idNumber: "34567890",
    kraPin: "P073456789O",
    address: "Kisumu, Kenya",
  },
]

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
  tonnage: string
  seatCapacity: string

  // Step 3: Insurance Details
  insuranceCompany: string
  insuranceType: string
  insuranceClass: string
  frequency: string
  insuredValue: string
  numberOfSeats: string
  startDate: string
  endDate: string
  additionalDetails: string
  price: string
  documents: File[]
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
    tonnage: "",
    seatCapacity: "",
    insuranceCompany: "",
    insuranceType: "",
    insuranceClass: "",
    frequency: "",
    insuredValue: "",
    numberOfSeats: "",
    startDate: "",
    endDate: "",
    additionalDetails: "",
    price: "",
    documents: [],
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [availableClasses, setAvailableClasses] = useState<string[]>([])
  const [frequencyOptions, setFrequencyOptions] = useState<string[]>([])
  const [showSeatsField, setShowSeatsField] = useState(false)
  const [showInsuredValueField, setShowInsuredValueField] = useState(false)
  const [clientSuggestions, setClientSuggestions] = useState<typeof mockClients>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)
  const [priceCalculated, setPriceCalculated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (formData.insuranceType) {
      const classes = getAvailableClasses(formData.insuranceType)
      setAvailableClasses(classes)

      if (!classes.includes(formData.insuranceClass)) {
        updateFormData("insuranceClass", "")
        updateFormData("frequency", "")
      }
    }
  }, [formData.insuranceType])

  useEffect(() => {
    if (formData.insuranceType && formData.insuranceClass) {
      const options = getFrequencyOptions(formData.insuranceType, formData.insuranceClass)
      setFrequencyOptions(options)

      if (!options.includes(formData.frequency)) {
        updateFormData("frequency", "")
      }

      const needsSeats =
        formData.insuranceClass.includes("PSV") ||
        formData.insuranceClass.includes("MATATU") ||
        formData.insuranceClass.includes("BUSES")
      setShowSeatsField(needsSeats)
    }
  }, [formData.insuranceType, formData.insuranceClass])

  useEffect(() => {
    if (formData.startDate && formData.frequency) {
      let custEndDate = formData.endDate
      const setFrequency = formData.frequency

      if (setFrequency === "Weekly") {
        custEndDate = getWeekDate(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "After Two Weeks") {
        custEndDate = getTwoWeeksDate(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "Annually") {
        custEndDate = getYearDate(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "Monthly") {
        custEndDate = getMonthDate(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "restAfterFirst") {
        custEndDate = getElevenMonths(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "restAfterSecond") {
        custEndDate = getTenMonths(formData.startDate).toISOString().split("T")[0]
      } else if (setFrequency === "After Six Months") {
        custEndDate = getSixMonthDate(formData.startDate).toISOString().split("T")[0]
      }

      setFormData((prev) => ({ ...prev, endDate: custEndDate }))
    }
  }, [formData.frequency, formData.startDate])

  useEffect(() => {
    const showValue = formData.insuranceType.toLowerCase().includes("comprehensive")
    setShowInsuredValueField(showValue)

    if (!showValue) {
      updateFormData("insuredValue", "")
    }
  }, [formData.insuranceType])

  const handleClientSearch = (searchTerm: string) => {
    updateFormData("fullName", searchTerm)

    if (searchTerm.length > 2) {
      const filtered = mockClients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone.includes(searchTerm) ||
          client.idNumber.includes(searchTerm),
      )
      setClientSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectClient = (client: (typeof mockClients)[0]) => {
    updateFormData("fullName", client.name)
    updateFormData("phoneNumber", client.phone)
    updateFormData("email", client.email)
    updateFormData("idNumber", client.idNumber)
    updateFormData("kraPin", client.kraPin)
    updateFormData("address", client.address)
    setShowSuggestions(false)
  }

  const calculatePrice = async () => {
    if (
      !formData.insuranceClass ||
      (!formData.insuredValue && showInsuredValueField) ||
      (showSeatsField && !formData.numberOfSeats)
    ) {
      return
    }

    setIsCalculatingPrice(true)

    // Mock API call for price calculation
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      // Mock price calculation logic
      let basePrice = 15000
      if (formData.insuranceType.includes("Comprehensive")) basePrice *= 2.5
      if (formData.insuranceClass.includes("COMMERCIAL")) basePrice *= 1.5
      if (formData.insuranceClass.includes("PSV")) basePrice *= 2
      if (formData.insuredValue) basePrice += Number(formData.insuredValue) * 0.02
      if (formData.numberOfSeats) basePrice += Number(formData.numberOfSeats) * 500

      updateFormData("price", Math.round(basePrice).toString())
      setPriceCalculated(true)
    } catch (error) {
      console.error("Price calculation failed:", error)
    } finally {
      setIsCalculatingPrice(false)
    }
  }

  useEffect(() => {
    if (
      formData.insuranceClass &&
      (formData.insuredValue || !showInsuredValueField) &&
      (formData.numberOfSeats || !showSeatsField)
    ) {
      calculatePrice()
    } else {
      setPriceCalculated(false)
      updateFormData("price", "")
    }
  }, [formData.insuranceClass, formData.insuredValue, formData.numberOfSeats])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, documents: [...prev.documents, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phoneNumber.match(/^0[17]\d{8}$/))
      newErrors.phoneNumber = "Invalid phone number format (e.g., 0712345678)"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.idNumber.match(/^\d{8}$/)) newErrors.idNumber = "ID number must be 8 digits"
    if (!formData.kraPin.match(/^P\d{9}[A-Z]$/)) newErrors.kraPin = "Invalid KRA PIN format (e.g., P051234567M)"
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

    if (!formData.insuranceCompany) newErrors.insuranceCompany = "Insurance company is required"
    if (!formData.insuranceType) newErrors.insuranceType = "Insurance type is required"
    if (!formData.insuranceClass) newErrors.insuranceClass = "Insurance class is required"
    if (!formData.frequency) newErrors.frequency = "Payment frequency is required"
    if (showInsuredValueField && (!formData.insuredValue || Number(formData.insuredValue) <= 0))
      newErrors.insuredValue = "Valid insured value is required"
    if (
      showSeatsField &&
      (!formData.numberOfSeats || Number(formData.numberOfSeats) < 7 || Number(formData.numberOfSeats) > 65)
    ) {
      newErrors.numberOfSeats = "Number of seats must be between 7 and 65"
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"
    if (!priceCalculated || !formData.price) newErrors.price = "Price calculation is required"

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
      return updated
    })

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
                <div className="space-y-2 relative">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleClientSearch(e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                    placeholder="Search existing clients..."
                  />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {clientSuggestions.map((client) => (
                        <div
                          key={client.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => selectClient(client)}
                        >
                          <div className="font-medium">{client.name}</div>
                          <div className="text-gray-500">
                            {client.phone} • {client.idNumber}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                    placeholder="P051234567M"
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

              <div className="space-y-2">
                <Label htmlFor="tonnage">Tonnage (Optional)</Label>
                <Input
                  id="tonnage"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.5"
                  value={formData.tonnage}
                  onChange={(e) => updateFormData("tonnage", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seatCapacity">Seat Capacity (Optional)</Label>
                <Input
                  id="seatCapacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 5"
                  value={formData.seatCapacity}
                  onChange={(e) => updateFormData("seatCapacity", e.target.value)}
                />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceCompany">Insurance Company *</Label>
                <Select
                  value={formData.insuranceCompany}
                  onValueChange={(value) => updateFormData("insuranceCompany", value)}
                >
                  <SelectTrigger className={errors.insuranceCompany ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select insurance company" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceCompanies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.insuranceCompany && <p className="text-sm text-destructive">{errors.insuranceCompany}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceType">Insurance Type *</Label>
                <Select
                  value={formData.insuranceType}
                  onValueChange={(value) => updateFormData("insuranceType", value)}
                >
                  <SelectTrigger className={errors.insuranceType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select insurance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.insuranceType && <p className="text-sm text-destructive">{errors.insuranceType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceClass">Insurance Class *</Label>
                <Select
                  value={formData.insuranceClass}
                  onValueChange={(value) => updateFormData("insuranceClass", value)}
                  disabled={!formData.insuranceType}
                >
                  <SelectTrigger className={errors.insuranceClass ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select insurance class" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.insuranceClass && <p className="text-sm text-destructive">{errors.insuranceClass}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Payment Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => updateFormData("frequency", value)}
                  disabled={!formData.insuranceClass}
                >
                  <SelectTrigger className={errors.frequency ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.frequency && <p className="text-sm text-destructive">{errors.frequency}</p>}
              </div>

              {showInsuredValueField && (
                <div className="space-y-2">
                  <Label htmlFor="insuredValue">Insured Value (KES) *</Label>
                  <Input
                    id="insuredValue"
                    type="number"
                    min="1"
                    placeholder="e.g., 1500000"
                    value={formData.insuredValue}
                    onChange={(e) => updateFormData("insuredValue", e.target.value)}
                    className={errors.insuredValue ? "border-destructive" : ""}
                  />
                  {errors.insuredValue && <p className="text-sm text-destructive">{errors.insuredValue}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="numberOfSeats">Number of Seats *</Label>
                <Input
                  id="numberOfSeats"
                  type="number"
                  min="7"
                  max="65"
                  placeholder="e.g., 14"
                  value={formData.numberOfSeats}
                  onChange={(e) => updateFormData("numberOfSeats", e.target.value)}
                  className={errors.numberOfSeats ? "border-destructive" : ""}
                />
                {errors.numberOfSeats && <p className="text-sm text-destructive">{errors.numberOfSeats}</p>}
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

              <div className="space-y-2">
                <Label htmlFor="price">Calculated Price (KES)</Label>
                <div className="relative">
                  <Input
                    id="price"
                    value={formData.price ? `KES ${Number(formData.price).toLocaleString()}` : ""}
                    disabled
                    className="bg-muted"
                  />
                  {isCalculatingPrice && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
                  )}
                </div>
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="documents">Upload Documents (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="documents"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="documents" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB each</span>
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1" disabled={isCalculatingPrice || !priceCalculated}>
                {isCalculatingPrice ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Purchase & Get Policy"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
