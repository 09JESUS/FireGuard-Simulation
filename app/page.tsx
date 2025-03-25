import Link from "next/link"
import { Shield, Activity, List, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FirewallRules from "@/components/firewall-rules"
import TrafficMonitor from "@/components/traffic-monitor"
import FirewallStats from "@/components/firewall-stats"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FireGuard Simulation</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/policy" className="text-sm font-medium transition-colors hover:text-primary">
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
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Firewall Simulation Dashboard</h1>
          <p className="text-muted-foreground">Monitor and configure your virtual firewall settings in real-time.</p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">24</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Blocked Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">142</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Traffic (MB/s)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">5.2</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Security Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">High</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="monitor" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monitor" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Traffic Monitor</span>
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Firewall Rules</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Statistics</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="monitor" className="mt-6">
              <TrafficMonitor />
            </TabsContent>
            <TabsContent value="rules" className="mt-6">
              <FirewallRules />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Firewall Settings</CardTitle>
                  <CardDescription>Configure your firewall protection levels and behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <h3 className="text-lg font-medium">Protection Level</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          Basic
                        </Button>
                        <Button variant="outline" size="sm">
                          Standard
                        </Button>
                        <Button variant="default" size="sm">
                          Advanced
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          Minimal
                        </Button>
                        <Button variant="default" size="sm">
                          Important
                        </Button>
                        <Button variant="outline" size="sm">
                          All
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats" className="mt-6">
              <FirewallStats />
            </TabsContent>
          </Tabs>
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

