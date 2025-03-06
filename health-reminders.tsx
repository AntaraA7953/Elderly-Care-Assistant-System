"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LucidePill, LucideDroplet, LucideCalendarClock, LucideCheck, LucideX, LucidePlus } from "lucide-react"

export default function HealthReminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      elderlyId: 1,
      elderlyName: "Martha Johnson",
      type: "medication",
      title: "Blood Pressure Medication",
      time: "08:00",
      frequency: "daily",
      status: "completed",
      lastTaken: "Today, 8:05 AM",
    },
    {
      id: 2,
      elderlyId: 1,
      elderlyName: "Martha Johnson",
      type: "hydration",
      title: "Drink Water",
      time: "10:00",
      frequency: "daily",
      status: "completed",
      lastTaken: "Today, 10:15 AM",
    },
    {
      id: 3,
      elderlyId: 1,
      elderlyName: "Martha Johnson",
      type: "medication",
      title: "Heart Medication",
      time: "13:00",
      frequency: "daily",
      status: "upcoming",
      lastTaken: "Yesterday, 1:00 PM",
    },
    {
      id: 4,
      elderlyId: 2,
      elderlyName: "Robert Smith",
      type: "medication",
      title: "Diabetes Medication",
      time: "09:00",
      frequency: "daily",
      status: "missed",
      lastTaken: "Yesterday, 9:05 AM",
    },
    {
      id: 5,
      elderlyId: 2,
      elderlyName: "Robert Smith",
      type: "appointment",
      title: "Doctor Appointment",
      time: "14:00",
      frequency: "once",
      status: "upcoming",
      lastTaken: "N/A",
    },
  ])

  const [newReminder, setNewReminder] = useState({
    elderlyId: "",
    type: "",
    title: "",
    time: "",
    frequency: "daily",
  })

  const handleAddReminder = () => {
    const reminder = {
      id: reminders.length + 1,
      elderlyId: Number.parseInt(newReminder.elderlyId),
      elderlyName: newReminder.elderlyId === "1" ? "Martha Johnson" : "Robert Smith",
      type: newReminder.type,
      title: newReminder.title,
      time: newReminder.time,
      frequency: newReminder.frequency,
      status: "upcoming",
      lastTaken: "N/A",
    }

    setReminders([...reminders, reminder])
    setNewReminder({
      elderlyId: "",
      type: "",
      title: "",
      time: "",
      frequency: "daily",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <LucidePill className="h-5 w-5" />
      case "hydration":
        return <LucideDroplet className="h-5 w-5" />
      case "appointment":
        return <LucideCalendarClock className="h-5 w-5" />
      default:
        return <LucidePill className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Completed
          </Badge>
        )
      case "missed":
        return <Badge variant="destructive">Missed</Badge>
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health Reminders</h2>
        <Button
          variant="outline"
          onClick={() => document.getElementById("add-reminder-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          <LucidePlus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Reminders</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="hydration">Hydration</TabsTrigger>
          <TabsTrigger value="appointment">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 pt-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(reminder.type)}
                  <CardTitle>{reminder.title}</CardTitle>
                </div>
                <div className="ml-auto flex items-center gap-2">{getStatusBadge(reminder.status)}</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">For</p>
                    <p className="font-medium">{reminder.elderlyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{reminder.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="font-medium capitalize">{reminder.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Taken</p>
                    <p className="font-medium">{reminder.lastTaken}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {reminder.status === "upcoming" && (
                  <>
                    <Button size="sm" variant="outline" className="gap-1">
                      <LucideCheck className="h-4 w-4" /> Mark as Taken
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 text-destructive">
                      <LucideX className="h-4 w-4" /> Mark as Missed
                    </Button>
                  </>
                )}
                {reminder.status === "missed" && (
                  <Button size="sm" variant="outline" className="gap-1">
                    <LucideCheck className="h-4 w-4" /> Mark as Taken
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medication" className="space-y-4 pt-4">
          {reminders
            .filter((r) => r.type === "medication")
            .map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(reminder.type)}
                    <CardTitle>{reminder.title}</CardTitle>
                  </div>
                  <div className="ml-auto flex items-center gap-2">{getStatusBadge(reminder.status)}</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">For</p>
                      <p className="font-medium">{reminder.elderlyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{reminder.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Frequency</p>
                      <p className="font-medium capitalize">{reminder.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Taken</p>
                      <p className="font-medium">{reminder.lastTaken}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {reminder.status === "upcoming" && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1">
                        <LucideCheck className="h-4 w-4" /> Mark as Taken
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive">
                        <LucideX className="h-4 w-4" /> Mark as Missed
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="hydration" className="space-y-4 pt-4">
          {reminders
            .filter((r) => r.type === "hydration")
            .map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(reminder.type)}
                    <CardTitle>{reminder.title}</CardTitle>
                  </div>
                  <div className="ml-auto flex items-center gap-2">{getStatusBadge(reminder.status)}</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">For</p>
                      <p className="font-medium">{reminder.elderlyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{reminder.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="appointment" className="space-y-4 pt-4">
          {reminders
            .filter((r) => r.type === "appointment")
            .map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(reminder.type)}
                    <CardTitle>{reminder.title}</CardTitle>
                  </div>
                  <div className="ml-auto flex items-center gap-2">{getStatusBadge(reminder.status)}</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">For</p>
                      <p className="font-medium">{reminder.elderlyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{reminder.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <Card id="add-reminder-form" className="mt-8">
        <CardHeader>
          <CardTitle>Add New Reminder</CardTitle>
          <CardDescription>Create a new health reminder for an elderly person</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="elderly">Elderly Person</Label>
              <Select
                value={newReminder.elderlyId}
                onValueChange={(value) => setNewReminder({ ...newReminder, elderlyId: value })}
              >
                <SelectTrigger id="elderly">
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Martha Johnson</SelectItem>
                  <SelectItem value="2">Robert Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Reminder Type</Label>
              <Select
                value={newReminder.type}
                onValueChange={(value) => setNewReminder({ ...newReminder, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="hydration">Hydration</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Blood Pressure Medication"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={newReminder.frequency}
                onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="once">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAddReminder}
            disabled={!newReminder.elderlyId || !newReminder.type || !newReminder.title || !newReminder.time}
          >
            Add Reminder
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

