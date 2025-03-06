import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideHeart, LucideMapPin, LucideBell, LucideUsers } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideHeart className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">ElderCare</h1>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
                      Register
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold">Caring for your loved ones, even from afar</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              A smart Elderly Care System designed to monitor health routines and ensure the safety of elderly
              individuals.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <LucideBell className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Health Track Reminders</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Sends customizable reminders for medication, doctor appointments, and hydration. Alerts caregivers
                    if reminders are missed.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <LucideMapPin className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Safety Track (Geo-Fencing)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Tracks the real-time location of elderly individuals. Notifies family members via SMS if the elderly
                    person moves outside a safe zone.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <LucideUsers className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Family Connection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Keep the entire family informed with real-time updates and alerts. Multiple caregivers can monitor
                    and receive notifications.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Technologies Used</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {["Python", "Flask", "Twilio API", "Geopy", "SQLite"].map((tech) => (
                <Card key={tech} className="flex items-center justify-center p-6 text-center">
                  <p className="font-medium">{tech}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <LucideHeart className="h-6 w-6" />
              <span className="text-xl font-bold">ElderCare</span>
            </div>
            <p>&copy; {new Date().getFullYear()} ElderCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

