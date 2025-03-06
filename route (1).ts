import { NextResponse } from "next/server"
import Database from "better-sqlite3"

// Initialize SQLite database
const db = new Database("eldercare.db")

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS elderly (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    phone TEXT,
    address TEXT,
    emergency_contact TEXT
  );

  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    elderly_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    frequency TEXT NOT NULL,
    status TEXT DEFAULT 'upcoming',
    last_taken TEXT,
    FOREIGN KEY (elderly_id) REFERENCES elderly (id)
  );

  CREATE TABLE IF NOT EXISTS safe_zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    radius INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS location_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    elderly_id INTEGER NOT NULL,
    location TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (elderly_id) REFERENCES elderly (id)
  );
`)

// Insert sample data if tables are empty
const elderlyCount = db.prepare("SELECT COUNT(*) as count FROM elderly").get() as { count: number }
if (elderlyCount.count === 0) {
  db.prepare("INSERT INTO elderly (name, age, phone, address, emergency_contact) VALUES (?, ?, ?, ?, ?)").run(
    "Martha Johnson",
    78,
    "+1234567890",
    "123 Main St, Anytown, USA",
    "+1987654321",
  )
  db.prepare("INSERT INTO elderly (name, age, phone, address, emergency_contact) VALUES (?, ?, ?, ?, ?)").run(
    "Robert Smith",
    82,
    "+1234567891",
    "456 Oak St, Anytown, USA",
    "+1987654322",
  )
}

// Initialize Twilio client for SMS notifications
// const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function GET() {
  try {
    const reminders = db.prepare("SELECT * FROM reminders").all()
    return NextResponse.json({ reminders })
  } catch (error) {
    console.error("Error fetching reminders:", error)
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { elderly_id, type, title, time, frequency } = data

    const stmt = db.prepare(`
      INSERT INTO reminders (elderly_id, type, title, time, frequency, status, last_taken)
      VALUES (?, ?, ?, ?, ?, 'upcoming', NULL)
    `)

    const result = stmt.run(elderly_id, type, title, time, frequency)

    return NextResponse.json({
      success: true,
      message: "Reminder created successfully",
      id: result.lastInsertRowid,
    })
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, status, last_taken } = data

    const stmt = db.prepare(`
      UPDATE reminders
      SET status = ?, last_taken = ?
      WHERE id = ?
    `)

    stmt.run(status, last_taken, id)

    // If reminder is missed, send SMS notification
    if (status === "missed") {
      const reminder = db.prepare("SELECT * FROM reminders WHERE id = ?").get(id) as any
      const elderly = db.prepare("SELECT * FROM elderly WHERE id = ?").get(reminder.elderly_id) as any

      // In a real app, this would send an SMS via Twilio
      // await twilioClient.messages.create({
      //   body: `ALERT: ${elderly.name} missed their ${reminder.title} reminder at ${reminder.time}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: elderly.emergency_contact
      // });

      console.log(`SMS notification would be sent to ${elderly.emergency_contact}`)
    }

    return NextResponse.json({
      success: true,
      message: "Reminder updated successfully",
    })
  } catch (error) {
    console.error("Error updating reminder:", error)
    return NextResponse.json({ error: "Failed to update reminder" }, { status: 500 })
  }
}

