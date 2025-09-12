'use client'

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Car, FileText } from "lucide-react"
import Link from "next/link"
import useClientUser from "@/hooks/useClientUser"
import { useAppContext } from "@/contexts/app-context"
import { useEffect } from "react"
import SingleDashboardPolicy from "@/components/single-dashboard-policy"

const vehicles = [
  {
    regNo: "KAA 123A",
    make: "Toyota",
    model: "Corolla",
    yearOfManufacture: 2020,
    chasisNo: "JTDB1234567890123",
  },
]

export default function DashboardPage() {

  const user = useClientUser();
  const { policies, getPolicies } = useAppContext();

  useEffect(() => {
    getPolicies();
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your OTO Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Hello, {user?.name}! Manage your vehicles and policies here.
            </p>
          </div>

          {/* Overview Summary */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{vehicles.length}</p>
                    <p className="text-muted-foreground">Vehicles</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{policies.length}</p>
                    <p className="text-muted-foreground">Active Policies</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Policies Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Insurance Policies</h2>
                <Link href="/#hero">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Policy
                  </Button>
                </Link>
              </div>

              {policies.length > 0 ? (
                <div className="space-y-4">
                  {policies.map((policy) => (
                    <SingleDashboardPolicy key={policy._id} policy={policy} />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-muted">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground mb-4">No policies yet. Register a vehicle to get started!</p>
                    <Link href="/#hero">
                      <Button>Get Your First Policy</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Vehicles Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Vehicles</h2>
                <Link href="/#hero">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vehicle
                  </Button>
                </Link>
              </div>

              {vehicles.length > 0 ? (
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.regNo} className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Car className="w-5 h-5 text-primary" />
                          {vehicle.regNo}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Make & Model</p>
                            <p className="font-medium text-foreground">
                              {vehicle.make} {vehicle.model}
                            </p>
                          </div>

                          <div>
                            <p className="text-muted-foreground">Year</p>
                            <p className="font-medium text-foreground">{vehicle.yearOfManufacture}</p>
                          </div>

                          <div className="sm:col-span-2">
                            <p className="text-muted-foreground">Chassis Number</p>
                            <p className="font-medium text-foreground font-mono text-xs">{vehicle.chasisNo}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-muted">
                  <CardContent className="p-8 text-center">
                    <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground mb-4">No vehicles registered yet.</p>
                    <Link href="/#hero">
                      <Button variant="outline">Register Your First Vehicle</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* User Details Card (for reference) */}
          <Card className="mt-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{user?.name}</p>
                </div>
                {/* <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{userData.phone}</p>
                </div> */}
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
                {/* <div>
                  <p className="text-muted-foreground">ID Number</p>
                  <p className="font-medium text-foreground">{userData.idNumber}</p>
                </div> */}
                {/* <div>
                  <p className="text-muted-foreground">KRA PIN</p>
                  <p className="font-medium text-foreground">{userData.kraPin}</p>
                </div> */}
                {/* <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{userData.address}</p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
