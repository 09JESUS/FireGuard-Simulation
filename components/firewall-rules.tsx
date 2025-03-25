"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, Edit } from "lucide-react"

type Rule = {
  id: number
  name: string
  source: string
  destination: string
  port: string
  protocol: string
  action: "allow" | "deny"
  enabled: boolean
}

export default function FirewallRules() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: "Allow HTTP",
      source: "Any",
      destination: "192.168.1.10",
      port: "80",
      protocol: "TCP",
      action: "allow",
      enabled: true,
    },
    {
      id: 2,
      name: "Block Telnet",
      source: "Any",
      destination: "Any",
      port: "23",
      protocol: "TCP",
      action: "deny",
      enabled: true,
    },
    {
      id: 3,
      name: "Allow SSH",
      source: "192.168.1.0/24",
      destination: "192.168.1.5",
      port: "22",
      protocol: "TCP",
      action: "allow",
      enabled: true,
    },
    {
      id: 4,
      name: "Block FTP",
      source: "Any",
      destination: "Any",
      port: "21",
      protocol: "TCP",
      action: "deny",
      enabled: false,
    },
  ])

  const [newRule, setNewRule] = useState<Omit<Rule, "id" | "enabled">>({
    name: "",
    source: "",
    destination: "",
    port: "",
    protocol: "TCP",
    action: "allow",
  })

  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const handleAddRule = () => {
    const rule: Rule = {
      ...newRule,
      id: Math.max(0, ...rules.map((r) => r.id)) + 1,
      enabled: true,
    }
    setRules([...rules, rule])
    setNewRule({
      name: "",
      source: "",
      destination: "",
      port: "",
      protocol: "TCP",
      action: "allow",
    })
  }

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleToggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleEditRule = (rule: Rule) => {
    setEditMode(true)
    setEditId(rule.id)
    setNewRule({
      name: rule.name,
      source: rule.source,
      destination: rule.destination,
      port: rule.port,
      protocol: rule.protocol,
      action: rule.action,
    })
  }

  const handleSaveEdit = () => {
    if (editId === null) return

    setRules(rules.map((rule) => (rule.id === editId ? { ...rule, ...newRule } : rule)))

    setEditMode(false)
    setEditId(null)
    setNewRule({
      name: "",
      source: "",
      destination: "",
      port: "",
      protocol: "TCP",
      action: "allow",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Firewall Rules</h2>
        <Button variant="outline" size="sm">
          Export Rules
        </Button>
      </div>

      <div className="grid gap-4 p-4 border rounded-lg bg-card">
        <h3 className="text-lg font-medium">{editMode ? "Edit Rule" : "Add New Rule"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="rule-name" className="text-sm font-medium">
              Rule Name
            </label>
            <Input
              id="rule-name"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="e.g., Allow HTTP Traffic"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rule-action" className="text-sm font-medium">
              Action
            </label>
            <Select
              value={newRule.action}
              onValueChange={(value) => setNewRule({ ...newRule, action: value as "allow" | "deny" })}
            >
              <SelectTrigger id="rule-action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allow">Allow</SelectItem>
                <SelectItem value="deny">Deny</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="rule-source" className="text-sm font-medium">
              Source IP/Range
            </label>
            <Input
              id="rule-source"
              value={newRule.source}
              onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
              placeholder="e.g., 192.168.1.0/24 or Any"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rule-destination" className="text-sm font-medium">
              Destination IP/Range
            </label>
            <Input
              id="rule-destination"
              value={newRule.destination}
              onChange={(e) => setNewRule({ ...newRule, destination: e.target.value })}
              placeholder="e.g., 192.168.1.10 or Any"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rule-port" className="text-sm font-medium">
              Port
            </label>
            <Input
              id="rule-port"
              value={newRule.port}
              onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
              placeholder="e.g., 80, 443, or Any"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rule-protocol" className="text-sm font-medium">
              Protocol
            </label>
            <Select value={newRule.protocol} onValueChange={(value) => setNewRule({ ...newRule, protocol: value })}>
              <SelectTrigger id="rule-protocol">
                <SelectValue placeholder="Select protocol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TCP">TCP</SelectItem>
                <SelectItem value="UDP">UDP</SelectItem>
                <SelectItem value="ICMP">ICMP</SelectItem>
                <SelectItem value="Any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {editMode ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false)
                  setEditId(null)
                  setNewRule({
                    name: "",
                    source: "",
                    destination: "",
                    port: "",
                    protocol: "TCP",
                    action: "allow",
                  })
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleAddRule}>
              <Plus className="mr-2 h-4 w-4" /> Add Rule
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${rule.enabled ? "bg-green-500" : "bg-gray-300"}`}
                      onClick={() => handleToggleRule(rule.id)}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.source}</TableCell>
                <TableCell>{rule.destination}</TableCell>
                <TableCell>{rule.port}</TableCell>
                <TableCell>{rule.protocol}</TableCell>
                <TableCell>
                  <Badge variant={rule.action === "allow" ? "default" : "destructive"}>
                    {rule.action === "allow" ? "Allow" : "Deny"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRule(rule)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

