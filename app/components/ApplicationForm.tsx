"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visaType: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, visaType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("https://formspree.io/f/xannlvlw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert("Thank you for your submission!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          visaType: "",
          message: "",
        })
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Start Your Canadian Journey Today</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Visa Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work Visa</SelectItem>
                <SelectItem value="study">Student Visa</SelectItem>
                <SelectItem value="family">Family Sponsorship</SelectItem>
                <SelectItem value="express">Express Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Textarea
              name="message"
              placeholder="Additional Information"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Submit Application
          </Button>
        </form>
      </div>
    </section>
  )
}
