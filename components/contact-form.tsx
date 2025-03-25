"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
    errors?: { path: string; message: string }[]
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await sendEmail(data)
      setSubmitResult(result)

      if (result.success) {
        reset() // Clear form on success
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {submitResult && (
        <Alert variant={submitResult.success ? "default" : "destructive"}>
          {submitResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{submitResult.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{submitResult.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              First name
            </label>
            <Input
              id="first-name"
              placeholder="Enter your first name"
              {...register("firstName")}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Last name
            </label>
            <Input
              id="last-name"
              placeholder="Enter your last name"
              {...register("lastName")}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <Input
            id="subject"
            placeholder="How can we help you?"
            {...register("subject")}
            aria-invalid={errors.subject ? "true" : "false"}
          />
          {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Enter your message"
            rows={4}
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

