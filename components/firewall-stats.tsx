"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FirewallStats() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Firewall Statistics</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Time Range:</span>
          <Select defaultValue="24h">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.45 GB</div>
                <p className="text-xs text-muted-foreground">+12.5% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Packets Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3M</div>
                <p className="text-xs text-muted-foreground">+5.2% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Bandwidth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15.2 Mbps</div>
                <p className="text-xs text-muted-foreground">-2.1% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Peak Bandwidth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.7 Mbps</div>
                <p className="text-xs text-muted-foreground">+8.3% from last period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic by Protocol</CardTitle>
                <CardDescription>Distribution of network traffic by protocol</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Protocol Distribution Chart]</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Traffic Over Time</CardTitle>
                <CardDescription>Network traffic volume over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Traffic Timeline Chart]</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+23.5% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Blocked Attacks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">138</div>
                <p className="text-xs text-muted-foreground">97.2% success rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Highest Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Critical</div>
                <p className="text-xs text-muted-foreground">3 critical threats detected</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">203.0.113.42</div>
                <p className="text-xs text-muted-foreground">27 attack attempts</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Threat Types</CardTitle>
                <CardDescription>Distribution of detected threats by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Threat Types Chart]</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Origins</CardTitle>
                <CardDescription>Geographic distribution of attack sources</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Threat Map]</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.4%</div>
                <p className="text-xs text-muted-foreground">-3.2% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 GB</div>
                <p className="text-xs text-muted-foreground">+0.3 GB from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.8 ms</div>
                <p className="text-xs text-muted-foreground">-0.3 ms from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.98%</div>
                <p className="text-xs text-muted-foreground">7d 3h 42m without restart</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>CPU and memory utilization over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Resource Usage Chart]</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Packet Processing</CardTitle>
                <CardDescription>Packet processing rate and latency</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Processing Performance Chart]</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

