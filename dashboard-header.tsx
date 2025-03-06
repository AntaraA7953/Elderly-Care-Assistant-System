import Link from "next/link"
import { LucideHeart } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LucideHeart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ElderCare</span>
        </Link>
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-sm font-medium hover:text-primary">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="text-sm font-medium hover:text-primary">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-sm font-medium hover:text-primary">
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

