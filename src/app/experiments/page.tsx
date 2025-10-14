
'use client'

import { motion } from 'framer-motion';
import { CreateExperimentForm } from "@/features/experiments/create-experiment-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const activeExperiments = [
  {
    id: 'exp-1',
    name: 'Financial Data Leak',
    status: 'running',
    startTime: new Date().toISOString(),
    target: '192.168.1.100',
  },
  {
    id: 'exp-2',
    name: 'Keystroke Capture Test',
    status: 'stopped',
    startTime: new Date(Date.now() - 86400000).toISOString(),
    target: '192.168.1.150',
  },
]

export default function ExperimentsPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <CreateExperimentForm />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Active & Past Experiments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeExperiments.map((exp, index) => (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border-b"
                  >
                    <TableCell>
                      <Badge variant={exp.status === 'running' ? 'default' : 'secondary'}>
                        {exp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{exp.name}</TableCell>
                    <TableCell>{exp.target}</TableCell>
                    <TableCell>{new Date(exp.startTime).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        {exp.status === 'running' ? 'Stop' : 'Details'}
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
