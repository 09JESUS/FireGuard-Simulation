"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Info,
  Play,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type TrafficLog = {
  id: number
  timestamp: Date
  source: string
  destination: string
  port: number
  protocol: string
  action: "allowed" | "blocked"
  bytes: number
  application?: string
  activity?: string
  threat?: string
}

type DeviceConfig = {
  deviceType: "laptop" | "desktop" | "mobile"
  operatingSystem: "windows" | "macos" | "linux" | "ios" | "android"
  browser: "chrome" | "firefox" | "safari" | "edge" | "other"
  ipAddress: string
  activityLevel: number // 1-10
}

export default function TrafficMonitor() {
  const [logs, setLogs] = useState<TrafficLog[]>([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfig>({
    deviceType: "laptop",
    operatingSystem: "windows",
    browser: "chrome",
    ipAddress: "192.168.1.100",
    activityLevel: 5,
  })

  // Common websites and services
  const commonDestinations = {
    Google: {
      domains: ["google.com", "googleapis.com", "gstatic.com"],
      ips: ["142.250.190.78", "172.217.22.14", "216.58.210.46"],
      ports: [443, 80],
      protocols: ["HTTPS", "HTTP"],
    },
    YouTube: {
      domains: ["youtube.com", "ytimg.com", "yt3.ggpht.com"],
      ips: ["208.65.153.238", "208.117.236.69", "74.125.24.91"],
      ports: [443],
      protocols: ["HTTPS"],
    },
    "Social Media": {
      domains: ["facebook.com", "instagram.com", "twitter.com", "tiktok.com"],
      ips: ["157.240.22.35", "3.123.23.159", "104.244.42.193", "92.223.96.5"],
      ports: [443],
      protocols: ["HTTPS"],
    },
    Email: {
      domains: ["gmail.com", "outlook.com", "yahoo.com"],
      ips: ["142.250.4.17", "40.101.91.6", "74.6.143.25"],
      ports: [993, 587, 465, 143],
      protocols: ["IMAPS", "SMTP", "SMTPS", "IMAP"],
    },
    Streaming: {
      domains: ["netflix.com", "spotify.com", "twitch.tv", "hulu.com"],
      ips: ["54.236.123.17", "35.186.224.25", "151.101.66.167", "184.50.87.112"],
      ports: [443],
      protocols: ["HTTPS"],
    },
    "Cloud Services": {
      domains: ["dropbox.com", "onedrive.com", "icloud.com", "drive.google.com"],
      ips: ["162.125.6.1", "13.107.42.13", "17.57.144.19", "142.250.4.101"],
      ports: [443],
      protocols: ["HTTPS"],
    },
    "Operating System": {
      domains: ["microsoft.com", "apple.com", "ubuntu.com", "windows.com"],
      ips: ["40.112.72.205", "17.253.144.10", "185.125.190.17", "40.113.200.201"],
      ports: [443, 80],
      protocols: ["HTTPS", "HTTP"],
    },
  }

  // Background services based on OS
  const backgroundServices = {
    windows: [
      { name: "Windows Update", port: 443, protocol: "HTTPS" },
      { name: "Microsoft Defender", port: 443, protocol: "HTTPS" },
      { name: "OneDrive Sync", port: 443, protocol: "HTTPS" },
      { name: "Windows Telemetry", port: 443, protocol: "HTTPS" },
    ],
    macos: [
      { name: "macOS Update", port: 443, protocol: "HTTPS" },
      { name: "iCloud Sync", port: 443, protocol: "HTTPS" },
      { name: "Spotlight Indexing", port: 443, protocol: "HTTPS" },
      { name: "Apple Analytics", port: 443, protocol: "HTTPS" },
    ],
    linux: [
      { name: "APT Update", port: 80, protocol: "HTTP" },
      { name: "System Sync", port: 443, protocol: "HTTPS" },
      { name: "Package Manager", port: 80, protocol: "HTTP" },
    ],
  }

  // Browser activities
  const browserActivities = {
    chrome: [
      { name: "Chrome Update", port: 443, protocol: "HTTPS" },
      { name: "Chrome Sync", port: 443, protocol: "HTTPS" },
      { name: "Chrome Extensions", port: 443, protocol: "HTTPS" },
    ],
    firefox: [
      { name: "Firefox Update", port: 443, protocol: "HTTPS" },
      { name: "Firefox Sync", port: 443, protocol: "HTTPS" },
      { name: "Firefox Add-ons", port: 443, protocol: "HTTPS" },
    ],
    safari: [
      { name: "Safari Update", port: 443, protocol: "HTTPS" },
      { name: "iCloud Bookmarks", port: 443, protocol: "HTTPS" },
    ],
    edge: [
      { name: "Edge Update", port: 443, protocol: "HTTPS" },
      { name: "Edge Sync", port: 443, protocol: "HTTPS" },
      { name: "Edge Extensions", port: 443, protocol: "HTTPS" },
    ],
  }

  // Common threats
  const commonThreats = [
    { name: "Suspicious Login Attempt", port: 22, protocol: "SSH" },
    { name: "Port Scan", port: 0, protocol: "TCP" },
    { name: "Malware Communication", port: 8080, protocol: "HTTP" },
    { name: "Phishing Site", port: 443, protocol: "HTTPS" },
    { name: "Unauthorized DNS Query", port: 53, protocol: "DNS" },
    { name: "Suspicious File Download", port: 443, protocol: "HTTPS" },
  ]

  // Simulate realistic traffic logs based on device configuration
  useEffect(() => {
    if (!isSimulating) return

    const generateRealisticLog = () => {
      // Determine if this is a background service, browser activity, or regular web traffic
      const activityType = Math.random() * 10
      let newLog: TrafficLog

      if (activityType < 3) {
        // Background OS service (30% chance)
        const osType = deviceConfig.operatingSystem as keyof typeof backgroundServices
        const services = backgroundServices[osType] || backgroundServices.windows
        const service = services[Math.floor(Math.random() * services.length)]

        newLog = {
          id: Date.now(),
          timestamp: new Date(),
          source: deviceConfig.ipAddress,
          destination:
            commonDestinations["Operating System"].ips[
              Math.floor(Math.random() * commonDestinations["Operating System"].ips.length)
            ],
          port: service.port,
          protocol: service.protocol,
          action: "allowed",
          bytes: Math.floor(Math.random() * 5000),
          application: "System",
          activity: service.name,
        }
      } else if (activityType < 5) {
        // Browser background activity (20% chance)
        const browserType = deviceConfig.browser as keyof typeof browserActivities
        const activities = browserActivities[browserType] || browserActivities.chrome
        const activity = activities[Math.floor(Math.random() * activities.length)]

        newLog = {
          id: Date.now(),
          timestamp: new Date(),
          source: deviceConfig.ipAddress,
          destination: "34.107.221.82", // Generic browser update server
          port: activity.port,
          protocol: activity.protocol,
          action: "allowed",
          bytes: Math.floor(Math.random() * 10000),
          application: deviceConfig.browser.charAt(0).toUpperCase() + deviceConfig.browser.slice(1),
          activity: activity.name,
        }
      } else {
        // Regular web browsing (50% chance)
        const categories = Object.keys(commonDestinations)
        const category = categories[Math.floor(Math.random() * categories.length)]
        const destination = commonDestinations[category as keyof typeof commonDestinations]

        // Determine if this should be a threat (5% chance)
        const isThreat = Math.random() > 0.95

        if (isThreat) {
          const threat = commonThreats[Math.floor(Math.random() * commonThreats.length)]
          newLog = {
            id: Date.now(),
            timestamp: new Date(),
            source: Math.random() > 0.5 ? deviceConfig.ipAddress : "45.33.97." + Math.floor(Math.random() * 255),
            destination: Math.random() > 0.5 ? deviceConfig.ipAddress : "103.235.46." + Math.floor(Math.random() * 255),
            port: threat.port,
            protocol: threat.protocol,
            action: Math.random() > 0.2 ? "blocked" : "allowed", // 80% blocked
            bytes: Math.floor(Math.random() * 15000),
            application: deviceConfig.browser.charAt(0).toUpperCase() + deviceConfig.browser.slice(1),
            threat: threat.name,
          }
        } else {
          newLog = {
            id: Date.now(),
            timestamp: new Date(),
            source: deviceConfig.ipAddress,
            destination: destination.ips[Math.floor(Math.random() * destination.ips.length)],
            port: destination.ports[Math.floor(Math.random() * destination.ports.length)],
            protocol: destination.protocols[Math.floor(Math.random() * destination.protocols.length)],
            action: "allowed",
            bytes: Math.floor(Math.random() * 20000),
            application: deviceConfig.browser.charAt(0).toUpperCase() + deviceConfig.browser.slice(1),
            activity: `Browsing ${category}`,
          }
        }
      }

      return newLog
    }

    // Generate logs at a rate based on activity level (1-10)
    // Higher activity level = more frequent logs
    const interval = setInterval(
      () => {
        // Generate 1-3 logs at once based on activity level
        const logsToGenerate = Math.max(1, Math.floor(deviceConfig.activityLevel / 3))

        const newLogs = Array.from({ length: logsToGenerate }, generateRealisticLog)
        setLogs((prev) => [...newLogs, ...prev].slice(0, 100)) // Keep only the last 100 logs
      },
      Math.max(500, 2000 - deviceConfig.activityLevel * 150),
    ) // Adjust frequency based on activity level

    return () => clearInterval(interval)
  }, [isSimulating, deviceConfig])

  const startSimulation = () => {
    // Clear logs when starting the simulation
    setLogs([])
    setIsSimulating(true)
    // If configuration panel is open, close it
    if (showConfig) {
      setShowConfig(false)
    }
  }

  const toggleSimulation = () => {
    if (!isSimulating) {
      startSimulation()
    } else {
      setIsSimulating(false)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  const updateDeviceConfig = (key: keyof DeviceConfig, value: any) => {
    setDeviceConfig((prev) => ({ ...prev, [key]: value }))
  }

  const blockedLogs = logs.filter((log) => log.action === "blocked")
  const allowedLogs = logs.filter((log) => log.action === "allowed")
  const threatLogs = logs.filter((log) => log.threat)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Traffic Monitor</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowConfig(!showConfig)}>
            {showConfig ? "Hide Configuration" : "Configure Simulation"}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleSimulation}>
            {isSimulating ? "Pause Simulation" : "Resume Simulation"}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            Clear Logs
          </Button>
        </div>
      </div>

      {showConfig && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Simulation Configuration</CardTitle>
            <CardDescription>Customize the simulation to match your device</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="device-type">Device Type</Label>
                  <Select
                    value={deviceConfig.deviceType}
                    onValueChange={(value) => updateDeviceConfig("deviceType", value)}
                  >
                    <SelectTrigger id="device-type">
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="mobile">Mobile Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operating-system">Operating System</Label>
                  <Select
                    value={deviceConfig.operatingSystem}
                    onValueChange={(value) => updateDeviceConfig("operatingSystem", value)}
                  >
                    <SelectTrigger id="operating-system">
                      <SelectValue placeholder="Select operating system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="windows">Windows</SelectItem>
                      <SelectItem value="macos">macOS</SelectItem>
                      <SelectItem value="linux">Linux</SelectItem>
                      <SelectItem value="ios">iOS</SelectItem>
                      <SelectItem value="android">Android</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="browser">Primary Browser</Label>
                  <Select value={deviceConfig.browser} onValueChange={(value) => updateDeviceConfig("browser", value)}>
                    <SelectTrigger id="browser">
                      <SelectValue placeholder="Select browser" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome">Google Chrome</SelectItem>
                      <SelectItem value="firefox">Mozilla Firefox</SelectItem>
                      <SelectItem value="safari">Safari</SelectItem>
                      <SelectItem value="edge">Microsoft Edge</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-address">Your IP Address</Label>
                  <Input
                    id="ip-address"
                    value={deviceConfig.ipAddress}
                    onChange={(e) => updateDeviceConfig("ipAddress", e.target.value)}
                    placeholder="192.168.1.100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="activity-level">Activity Level</Label>
                <span className="text-sm text-muted-foreground">{deviceConfig.activityLevel}/10</span>
              </div>
              <Slider
                id="activity-level"
                min={1}
                max={10}
                step={1}
                value={[deviceConfig.activityLevel]}
                onValueChange={(value) => updateDeviceConfig("activityLevel", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <Button className="w-full" onClick={startSimulation}>
              <Play className="mr-2 h-4 w-4" /> Start Simulation with These Settings
            </Button>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Simulation Information</AlertTitle>
        <AlertDescription>
          This firewall is simulating network traffic for a {deviceConfig.deviceType} running{" "}
          {deviceConfig.operatingSystem.charAt(0).toUpperCase() + deviceConfig.operatingSystem.slice(1)} with{" "}
          {deviceConfig.browser.charAt(0).toUpperCase() + deviceConfig.browser.slice(1)} browser. The simulation
          includes system background processes, browser activities, and web browsing patterns typical for this
          configuration.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">packets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Allowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{allowedLogs.length}</div>
            <p className="text-xs text-muted-foreground">packets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedLogs.length}</div>
            <p className="text-xs text-muted-foreground">packets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{threatLogs.length}</div>
            <p className="text-xs text-muted-foreground">detected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>All Traffic ({logs.length})</span>
          </TabsTrigger>
          <TabsTrigger value="allowed" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Allowed ({allowedLogs.length})</span>
          </TabsTrigger>
          <TabsTrigger value="blocked" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Blocked ({blockedLogs.length})</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Threats ({threatLogs.length})</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 border rounded-lg">
          <TabsContent value="all" className="m-0">
            <TrafficTable logs={logs} />
          </TabsContent>
          <TabsContent value="allowed" className="m-0">
            <TrafficTable logs={allowedLogs} />
          </TabsContent>
          <TabsContent value="blocked" className="m-0">
            <TrafficTable logs={blockedLogs} />
          </TabsContent>
          <TabsContent value="threats" className="m-0">
            <TrafficTable logs={threatLogs} />
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
          <span>{isSimulating ? "Monitoring traffic in real-time..." : "Monitoring paused"}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ArrowDownToLine className="h-4 w-4 text-green-600" />
            <span>Inbound</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUpFromLine className="h-4 w-4 text-blue-600" />
            <span>Outbound</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrafficTable({ logs }: { logs: TrafficLog[] }) {
  if (logs.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No traffic logs to display</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Timestamp</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Port</TableHead>
          <TableHead>Protocol</TableHead>
          <TableHead>Application</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Threat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-mono text-xs">{log.timestamp.toLocaleTimeString()}</TableCell>
            <TableCell>{log.source}</TableCell>
            <TableCell>{log.destination}</TableCell>
            <TableCell>{log.port}</TableCell>
            <TableCell>{log.protocol}</TableCell>
            <TableCell>{log.application || "-"}</TableCell>
            <TableCell>{log.activity || "-"}</TableCell>
            <TableCell>{log.bytes} B</TableCell>
            <TableCell>
              <Badge variant={log.action === "allowed" ? "outline" : "destructive"}>{log.action}</Badge>
            </TableCell>
            <TableCell>
              {log.threat ? (
                <Badge variant="warning" className="bg-amber-500">
                  {log.threat}
                </Badge>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

