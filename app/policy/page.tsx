import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FireGuard Simulation</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/policy" className="text-sm font-medium text-primary">
              Policy
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About/Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm">Start Simulation</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Policy Information</h1>
            <p className="text-muted-foreground">Learn about our policies, terms of service, and privacy guidelines.</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>Last updated: March 25, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Welcome to FireGuard Simulation. By accessing or using our service, you agree to be bound by these
                  Terms of Service.
                </p>
                <h3 className="text-lg font-medium">1. Use of Service</h3>
                <p>
                  FireGuard Simulation provides a virtual environment for testing and learning about network security
                  and firewall configurations. Users are prohibited from using the service for any illegal activities or
                  attempting to compromise actual network systems.
                </p>
                <h3 className="text-lg font-medium">2. User Accounts</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account.
                </p>
                <h3 className="text-lg font-medium">3. Intellectual Property</h3>
                <p>
                  All content, features, and functionality of the FireGuard Simulation service are owned by us and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  laws.
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Read Full Terms of Service
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>Last updated: March 25, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information.
                </p>
                <h3 className="text-lg font-medium">1. Information Collection</h3>
                <p>
                  We collect information you provide directly to us when registering for an account, using our service,
                  or communicating with us. This may include your name, email address, and usage data.
                </p>
                <h3 className="text-lg font-medium">2. Use of Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, to develop new
                  features, and to protect our users and ourselves.
                </p>
                <h3 className="text-lg font-medium">3. Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect the security of your
                  personal information.
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Read Full Privacy Policy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acceptable Use Policy</CardTitle>
                <CardDescription>Last updated: March 25, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This Acceptable Use Policy outlines the permitted and prohibited uses of the FireGuard Simulation
                  service.
                </p>
                <h3 className="text-lg font-medium">1. Prohibited Activities</h3>
                <p>
                  Users may not use the service to engage in any illegal activities, attempt to gain unauthorized access
                  to any networks or systems, or conduct penetration testing against actual production environments.
                </p>
                <h3 className="text-lg font-medium">2. Educational Use</h3>
                <p>
                  The service is intended for educational and training purposes only. Users should only apply learned
                  techniques in environments where they have explicit permission to do so.
                </p>
                <h3 className="text-lg font-medium">3. Compliance</h3>
                <p>Users must comply with all applicable laws and regulations when using the service.</p>
                <Button variant="outline" className="w-full mt-4">
                  Read Full Acceptable Use Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">FireGuard</h3>
              <p className="text-sm text-muted-foreground">
                Advanced firewall simulation for network security training and testing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">support@fireguard.com</li>
                <li className="text-muted-foreground">+27 76 285 2630</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 FireGuard Simulation. All rights reserved.</p>
            <p className="mt-1">Designed and developed by Forget Nukeri</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

