"use client"

import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Reset the close state when modal opens
      setCanClose(false)
      // Allow closing after 5 seconds
      const timer = setTimeout(() => {
        setCanClose(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        // Only allow closing after 5 seconds
        if (canClose) {
          onClose()
        }
      }}
    >
      <DialogContent 
        className="sm:max-w-[425px] text-center p-6"
        onPointerDownOutside={(e) => {
          // Prevent closing by clicking outside
          if (!canClose) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold text-green-600">Application Submitted!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
          </motion.div>
          <div className="space-y-4">
            <p className="text-xl font-medium text-gray-800">
              Thank you for submitting your application!
            </p>
            <p className="text-gray-600 text-lg">
              Your application is now being vetted by our team. We will contact you via email regarding the next steps.
            </p>
          </div>
          <Button 
            onClick={onClose}
            className="mt-8 bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-2"
            disabled={!canClose}
          >
            {canClose ? 'Close' : 'Please wait...'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
