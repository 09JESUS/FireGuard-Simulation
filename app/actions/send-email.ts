"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `FireGuard Contact: ${validatedData.subject}`,
      text: `
        Name: ${validatedData.firstName} ${validatedData.lastName}
        Email: ${validatedData.email}
        
        Message:
        ${validatedData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <h3>Message:</h3>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      }
    }

    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    }
  }
}

