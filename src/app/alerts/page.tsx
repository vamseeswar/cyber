
'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/use-socket'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'

interface Alert {
  id: string
  timestamp: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  message: string
  sourceIp: string
  sessionId: string
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    severity: 'High',
    message: 'Suspicious file transfer detected',
    sourceIp: '192.168.1.101',
    sessionId: 'session-xyz-123',
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    severity: 'Medium',
    message: 'Unusual clipboard activity',
    sourceIp: '10.0.0.5',
    sessionId: 'session-abc-456',
  },
]

export default function AlertsPage() {
  const { isConnected, socket } = useSocket()
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  useEffect(() => {
    if (isConnected) {
      socket.on('new-alert', (newAlert: Alert) => {
        setAlerts((prevAlerts) => [newAlert, ...prevAlerts])
      })
    }

    return () => {
      socket.off('new-alert')
    }
  }, [isConnected, socket])

  const getSeverityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>
      case 'High':
        return <Badge variant="destructive" className="bg-red-500">High</Badge>
      case 'Medium':
        return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>
      case 'Low':
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge>Info</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Alerts</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="hidden md:table-cell">Source IP</TableHead>
              <TableHead className="hidden md:table-cell">Session ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert, index) => (
              <motion.tr
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b"
              >
                <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                <TableCell>{alert.message}</TableCell>
                <TableCell className="hidden md:table-cell">{alert.sourceIp}</TableCell>
                <TableCell className="hidden md:table-cell">{alert.sessionId}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
