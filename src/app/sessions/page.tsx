
'use client'

import { motion } from 'framer-motion';
import { useSessions, getSignedUrl, Session } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Download } from "lucide-react"

export default function SessionsPage() {
  const { data: sessions, isLoading, error } = useSessions()

  const handleDownload = async (url: string | undefined) => {
    if (!url) return;
    try {
      const signedUrl = await getSignedUrl(url);
      window.open(signedUrl, '_blank');
    } catch (error) {
      console.error('Failed to get signed URL', error);
      // Handle error appropriately in the UI
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>VNC Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading sessions...</p>}
        {error && <p className="text-red-500">Failed to load sessions.</p>}
        {sessions && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session: Session, index: number) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b"
                >
                  <TableCell>
                    <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.user}</TableCell>
                  <TableCell>{session.sourceIp}</TableCell>
                  <TableCell>{new Date(session.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(session.endTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload(session.recordingUrl)} disabled={!session.recordingUrl}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Recording
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(session.pcapUrl)} disabled={!session.pcapUrl}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PCAP
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
