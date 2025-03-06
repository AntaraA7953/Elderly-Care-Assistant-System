"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LucideBell,
  LucideMapPin,
  LucideCalendar,
  LucideLogOut,
  LucideSettings,
  LucideUser,
  LucideHome,
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import HealthReminders from "@/components/health-reminders"
import LocationTracker from "@/components/location-tracker"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [elderlyProfiles, setElderlyProfiles] = useState([
    {
      id: 1,
      name: "Martha Johnson",
      age: 78,
      status: "safe",
      lastCheckin: "10 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
      missedReminders: 0,
      location: "Home",
    },
    {
      id: 2,
      name: "Robert Smith",
      age: 82,
      status: "attention",
      lastCheckin: "3 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      missedReminders: 2,
      location: "Grocery Store",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setElderlyProfiles((profiles) =>
        profiles.map((profile) => {
          // Randomly update last check-in time
          const times = ["Just now", "5 minutes ago", "10 minutes ago", "30 minutes ago", "1 hour ago"]
          const randomTime = times[Math.floor(Math.random() * times.length)]

          // Randomly update status
          const randomStatus = Math.random() > 0.8 ? "attention" : "safe"

          return {
            ...profile,
            lastCheckin: randomTime,
            status: profile.id === 2 ? randomStatus : profile.status,
          }
        }),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="container mx-auto flex-1 p-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/settings">
              <Button variant="outline" size="icon">
                <LucideSettings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="icon">
                <LucideLogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Reminders</TabsTrigger>
            <TabsTrigger value="location">Location Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Elderly</CardTitle>
                  <LucideUser className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{elderlyProfiles.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reminders Today</CardTitle>
                  <LucideBell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Missed Reminders</CardTitle>
                  <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Safe Zones</CardTitle>
                  <LucideMapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
            </div>

            <h2 className="mt-6 text-xl font-semibold">Elderly Profiles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {elderlyProfiles.map((profile) => (
                <Card key={profile.id} className={profile.status === "attention" ? "border-red-400" : ""}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Avatar>
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{profile.name}</CardTitle>
                      <CardDescription>Age: {profile.age}</CardDescription>
                    </div>
                    <Badge className="ml-auto" variant={profile.status === "safe" ? "outline" : "destructive"}>
                      {profile.status === "safe" ? "Safe" : "Needs Attention"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Check-in</p>
                        <p className="font-medium">{profile.lastCheckin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Location</p>
                        <div className="flex items-center gap-1">
                          <LucideHome className="h-4 w-4" />
                          <p className="font-medium">{profile.location}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Missed Reminders</p>
                        <p className={`font-medium ${profile.missedReminders > 0 ? "text-red-500" : ""}`}>
                          {profile.missedReminders}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("health")}>
                        View Reminders
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("location")}>
                        View Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health">
            <HealthReminders />
          </TabsContent>

          <TabsContent value="location">
            <LocationTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

