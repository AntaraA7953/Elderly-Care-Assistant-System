import { NextResponse } from "next/server"
import Database from "better-sqlite3"

// Initialize SQLite database
const db = new Database("eldercare.db")

// Initialize Twilio client for SMS notifications
// const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function GET() {
  try {
    const locationHistory = db.prepare("SELECT * FROM location_history ORDER BY timestamp DESC LIMIT 50").all()
    return NextResponse.json({ locationHistory })
  } catch (error) {
    console.error("Error fetching location history:", error)
    return NextResponse.json({ error: "Failed to fetch location history" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { elderly_id, latitude, longitude } = data

    // Get elderly person's info
    const elderly = db.prepare("SELECT * FROM elderly WHERE id = ?").get(elderly_id) as any

    if (!elderly) {
      return NextResponse.json({ error: "Elderly person not found" }, { status: 404 })
    }

    // Check if location is within any safe zone
    const safeZones = db.prepare("SELECT * FROM safe_zones").all() as any[]

    // In a real app, we would use geospatial calculations to determine if the location
    // is within any of the safe zones based on the radius
    // For this example, we'll simulate with random status
    const isInSafeZone = Math.random() > 0.2 // 80% chance of being in a safe zone

    const location = isInSafeZone ? safeZones[Math.floor(Math.random() * safeZones.length)].name : "Unknown Location"

    const status = isInSafeZone ? "safe" : "alert"

    // Insert location history
    const stmt = db.prepare(`
      INSERT INTO location_history (elderly_id, location, timestamp, status)
      VALUES (?, ?, datetime('now'), ?)
    `)

    const result = stmt.run(elderly_id, location, status)

    // If not in safe zone, send SMS alert
    if (!isInSafeZone) {
      // In a real app, this would send an SMS via Twilio
      // await twilioClient.messages.create({
      //   body: `ALERT: ${elderly.name} has left all safe zones. Current location: ${latitude}, ${longitude}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: elderly.emergency_contact
      // });

      console.log(`SMS alert would be sent to ${elderly.emergency_contact}`)
    }

    return NextResponse.json({
      success: true,
      message: "Location updated successfully",
      id: result.lastInsertRowid,
      status,
      location,
    })
  } catch (error) {
    console.error("Error updating location:", error)
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 })
  }
}

