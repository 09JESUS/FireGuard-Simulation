import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Activity, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"

export default function AboutPage() {
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
            <Link href="/policy" className="text-sm font-medium transition-colors hover:text-primary">
              Policy
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
              About/Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm">Start Simulation</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-12">
          <section className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About FireGuard Simulation</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering network security professionals with advanced firewall simulation tools.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Advanced Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Learn to configure robust firewall rules for maximum security.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize network traffic and threat detection in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Customizable Rules</h3>
                <p className="text-sm text-muted-foreground">
                  Create and test custom firewall rules in a safe environment.
                </p>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At FireGuard, our mission is to provide the most comprehensive and realistic firewall simulation
                  platform for network security professionals, students, and organizations.
                </p>
                <p>
                  We believe that hands-on experience is crucial for developing effective security skills. Our platform
                  allows users to experiment with firewall configurations, test security policies, and understand
                  network traffic patterns in a safe, controlled environment.
                </p>
                <p>
                  Founded in 2020 by a team of cybersecurity experts, FireGuard has grown to become a trusted resource
                  for security training and testing worldwide.
                </p>
              </div>

              <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@fireguard.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+27 76 285 2630</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>33 Goodyear Street, Vanderbiljpack CW 1900</span>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Have questions or feedback? Send us a message and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </section>
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

