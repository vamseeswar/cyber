
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

const rules = [
  {
    id: 'rule-1',
    name: 'Block .zip file transfers',
    action: 'prevent',
    enabled: true,
    description: 'Prevents any file with a .zip extension from being transferred.',
  },
  {
    id: 'rule-2',
    name: 'Alert on large clipboard paste',
    action: 'detect',
    enabled: true,
    description: 'Triggers an alert if clipboard content over 1MB is pasted.',
  },
  {
    id: 'rule-3',
    name: 'Disable clipboard for guest users',
    action: 'prevent',
    enabled: false,
    description: 'Disables clipboard access entirely for users in the guest group.',
  },
]

export default function RulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Detection & Prevention Rules</CardTitle>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                    {rule.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>
                  <Badge variant={rule.action === 'prevent' ? 'destructive' : 'outline'}>
                    {rule.action}
                  </Badge>
                </TableCell>
                <TableCell>{rule.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
