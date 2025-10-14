
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  targetIp: z.string().ip({ message: "Invalid IP address." }),
  exfiltrationType: z.enum(["clipboard", "file-transfer", "keystroke"]),
})

export function CreateExperimentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      targetIp: "",
      exfiltrationType: "file-transfer",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting experiment:", values)
    // Here you would typically call an API to start the experiment
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Experiment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Financial Data Leak" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive name for your simulation.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetIp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target IP</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 192.168.1.100" {...field} />
                  </FormControl>
                  <FormDescription>The IP address of the VNC target.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more form fields for description, exfiltrationType etc. */}
            <Button type="submit">Start Experiment</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
