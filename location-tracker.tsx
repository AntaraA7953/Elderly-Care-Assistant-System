"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideMapPin, LucideHome, LucideAlertCircle, LucideCheck, LucidePlus } from "lucide-react"

export default function LocationTracker() {
  const [safeZones, setSafeZones] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Anytown, USA",
      radius: 500, // meters
    },
    {
      id: 2,
      name: "Grocery Store",
      address: "456 Market Ave, Anytown, USA",
      radius: 300, // meters
    },
    {
      id: 3,
      name: "Community Center",
      address: "789 Community Blvd, Anytown, USA",
      radius: 400, // meters
    },
  ])

  const [locationHistory, setLocationHistory] = useState([
    {
      id: 1,
      elderlyId: 1,
      elderlyName: "Martha Johnson",
      location: "Home",
      timestamp: "2023-06-10T08:30:00",
      status: "safe",
    },
    {
      id: 2,
      elderlyId: 1,
      elderlyName: "Martha Johnson",
      location: "Grocery Store",
      timestamp: "2023-06-10T10:15:00",
      status: "safe",
    },
    {
      id: 3,
      elderlyId: 2,
      elderlyName: "Robert Smith",
      location: "Home",
      timestamp: "2023-06-10T09:00:00",
      status: "safe",
    },
    {
      id: 4,
      elderlyId: 2,
      elderlyName: "Robert Smith",
      location: "Unknown Location",
      timestamp: "2023-06-10T11:45:00",
      status: "alert",
    },
    {
      id: 5,
      elderlyId: 2,
      elderlyName: "Robert Smith",
      location: "Grocery Store",
      timestamp: "2023-06-10T12:30:00",
      status: "safe",
    },
  ])

  const [newSafeZone, setNewSafeZone] = useState({
    name: "",
    address: "",
    radius: 300,
  })

  const handleAddSafeZone = () => {
    const safeZone = {
      id: safeZones.length + 1,
      name: newSafeZone.name,
      address: newSafeZone.address,
      radius: newSafeZone.radius,
    }

    setSafeZones([...safeZones, safeZone])
    setNewSafeZone({
      name: "",
      address: "",
      radius: 300,
    })
  }

  // Format timestamp to readable date/time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Location Tracking</h2>
      </div>

      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="history">Location History</TabsTrigger>
          <TabsTrigger value="zones">Safe Zones</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Locations</CardTitle>
              <CardDescription>Real-time location of elderly individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-md bg-gray-100 p-2">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Map view would be displayed here with real-time locations</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Martha Johnson" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Martha Johnson</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <LucideHome className="h-4 w-4" />
                        <span>Home</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <LucideCheck className="mr-1 h-4 w-4" /> In Safe Zone
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Robert Smith" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Robert Smith</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <LucideMapPin className="h-4 w-4" />
                        <span>Grocery Store</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <LucideCheck className="mr-1 h-4 w-4" /> In Safe Zone
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Location History</CardTitle>
              <CardDescription>Recent location changes for elderly individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={entry.elderlyName} />
                        <AvatarFallback>{entry.elderlyName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{entry.elderlyName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <LucideMapPin className="h-4 w-4" />
                          <span>{entry.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatTimestamp(entry.timestamp)}</p>
                      </div>
                    </div>
                    {entry.status === "safe" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <LucideCheck className="mr-1 h-4 w-4" /> Safe
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <LucideAlertCircle className="mr-1 h-4 w-4" /> Alert
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Safe Zones</h3>
            <Button
              variant="outline"
              onClick={() => document.getElementById("add-zone-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <LucidePlus className="mr-2 h-4 w-4" /> Add Safe Zone
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {safeZones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LucideMapPin className="h-5 w-5 text-primary" />
                    <CardTitle>{zone.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="mb-2">{zone.address}</p>
                  <p className="text-sm text-muted-foreground">Safe Radius</p>
                  <p>{zone.radius} meters</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card id="add-zone-form" className="mt-8">
            <CardHeader>
              <CardTitle>Add New Safe Zone</CardTitle>
              <CardDescription>Create a new safe zone for location tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zone-name">Zone Name</Label>
                  <Input
                    id="zone-name"
                    placeholder="e.g., Home, Doctor's Office"
                    value={newSafeZone.name}
                    onChange={(e) => setNewSafeZone({ ...newSafeZone, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone-address">Address</Label>
                  <Input
                    id="zone-address"
                    placeholder="Full address"
                    value={newSafeZone.address}
                    onChange={(e) => setNewSafeZone({ ...newSafeZone, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone-radius">Safe Radius (meters)</Label>
                  <Input
                    id="zone-radius"
                    type="number"
                    min="100"
                    max="1000"
                    value={newSafeZone.radius}
                    onChange={(e) => setNewSafeZone({ ...newSafeZone, radius: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddSafeZone} disabled={!newSafeZone.name || !newSafeZone.address}>
                Add Safe Zone
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

