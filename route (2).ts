import { NextResponse } from "next/server"
import Database from "better-sqlite3"

// Initialize SQLite database
const db = new Database("eldercare.db")

export async function GET() {
  try {
    const safeZones = db.prepare("SELECT * FROM safe_zones").all()
    return NextResponse.json({ safeZones })
  } catch (error) {
    console.error("Error fetching safe zones:", error)
    return NextResponse.json({ error: "Failed to fetch safe zones" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, address, radius } = data

    const stmt = db.prepare(`
      INSERT INTO safe_zones (name, address, radius)
      VALUES (?, ?, ?)
    `)

    const result = stmt.run(name, address, radius)

    return NextResponse.json({
      success: true,
      message: "Safe zone created successfully",
      id: result.lastInsertRowid,
    })
  } catch (error) {
    console.error("Error creating safe zone:", error)
    return NextResponse.json({ error: "Failed to create safe zone" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, name, address, radius } = data

    const stmt = db.prepare(`
      UPDATE safe_zones
      SET name = ?, address = ?, radius = ?
      WHERE id = ?
    `)

    stmt.run(name, address, radius, id)

    return NextResponse.json({
      success: true,
      message: "Safe zone updated successfully",
    })
  } catch (error) {
    console.error("Error updating safe zone:", error)
    return NextResponse.json({ error: "Failed to update safe zone" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Safe zone ID is required" }, { status: 400 })
    }

    const stmt = db.prepare("DELETE FROM safe_zones WHERE id = ?")
    stmt.run(id)

    return NextResponse.json({
      success: true,
      message: "Safe zone deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting safe zone:", error)
    return NextResponse.json({ error: "Failed to delete safe zone" }, { status: 500 })
  }
}

