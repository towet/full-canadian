"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, BookOpen, Briefcase, CheckCircle } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import SuccessModal from './SuccessModal'
import { supabase } from '@/lib/supabase'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle?: string
  currentStep: number
  onStepChange: (step: number) => void
}

const educationLevels = [
  "Certificate",
  "Diploma",
  "Degree",
  "Masters",
  "Other",
  "Form Four"
]

const employmentStatuses = [
  "Employed",
  "Unemployed"
]

export default function ApplicationModal({ 
  isOpen, 
  onClose, 
  jobTitle,
  currentStep,
  onStepChange
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    educationLevel: "",
    employmentStatus: "",
    position: jobTitle || ""
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      onStepChange(2)
      return
    }

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phoneNumber,
            message: JSON.stringify({
              nationality: formData.nationality,
              educationLevel: formData.educationLevel,
              employmentStatus: formData.employmentStatus,
              position: formData.position
            })
          }
        ])

      if (error) throw error

      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          nationality: "",
          educationLevel: "",
          employmentStatus: "",
          position: jobTitle || ""
        })
        onClose()
        onStepChange(1)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        duration: 5000,
      })
    }
  }

  const prevStep = () => onStepChange(1)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Level of Education</Label>
                <Select onValueChange={handleSelectChange("educationLevel")} value={formData.educationLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <Select onValueChange={handleSelectChange("employmentStatus")} value={formData.employmentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position Applying For</Label>
                <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for {jobTitle}</DialogTitle>
            <DialogDescription>
              Fill out the form below to start your application process.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center space-x-4 mb-6">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <User size={24} />
                <span className="text-xs mt-1">Personal</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <BookOpen size={24} />
                <span className="text-xs mt-1">Education</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              <Button 
                type="submit" 
                className={`ml-auto ${currentStep === 2 ? 'bg-red-600 hover:bg-red-700' : ''} text-white`}
              >
                {currentStep === 1 ? 'Next' : 'Finish Application'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </>
  )
}
