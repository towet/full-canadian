"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Mail, Search, Filter, MoreVertical, RefreshCw, CheckCircle, X, Calendar, Phone, Globe, BookOpen, Briefcase } from 'lucide-react'

interface Submission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" })
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  async function fetchSubmissions() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        toast({
          title: "Error fetching submissions",
          description: error.message,
          duration: 3000,
        })
        return
      }

      setSubmissions(data || [])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Unexpected error",
        description: "Failed to fetch submissions",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSubmission) return

    toast({
      title: "Email Sent!",
      description: `Email sent to ${selectedSubmission.email}`,
      duration: 3000,
    })
    setIsEmailDialogOpen(false)
    setEmailContent({ subject: "", body: "" })
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedStatus === "all") return matchesSearch
    return matchesSearch
  })

  const renderEmailDialog = () => (
    <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Send Email Response</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Sending email to {selectedSubmission?.email}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Subject"
              value={emailContent.subject}
              onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
          <div>
            <Textarea
              placeholder="Email body"
              value={emailContent.body}
              onChange={(e) => setEmailContent(prev => ({ ...prev, body: e.target.value }))}
              className="w-full h-32 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEmailDialogOpen(false)}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Send Email
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Form Submissions
          </h1>
          <p className="text-gray-600">Manage and respond to form submissions</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search submissions..."
              className="pl-10 w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={fetchSubmissions}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <Card className="border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <div className="text-gray-400 mb-4">
                <Mail size={48} className="animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No submissions found</h3>
              <p className="text-gray-500">There are no submissions matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredSubmissions.map((submission) => {
              const messageData = JSON.parse(submission.message)
              const submissionDate = new Date(submission.created_at).toLocaleDateString()
              
              return (
                <Card 
                  key={submission.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{submission.name}</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={16} className="text-blue-500" />
                            <a href={`mailto:${submission.email}`} className="hover:text-blue-600 transition-colors">
                              {submission.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone size={16} className="text-green-500" />
                            <span>{submission.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} className="text-purple-500" />
                            <span>{submissionDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSubmission(submission)
                          setIsEmailDialogOpen(true)
                        }}
                        className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-0"
                      >
                        <Mail size={16} className="mr-2" />
                        Reply
                      </Button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-blue-500" />
                        Application Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <Globe size={20} className="text-blue-500" />
                          <div>
                            <span className="text-sm text-gray-500">Nationality</span>
                            <p className="font-medium text-gray-900">{messageData.nationality}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <BookOpen size={20} className="text-green-500" />
                          <div>
                            <span className="text-sm text-gray-500">Education</span>
                            <p className="font-medium text-gray-900">{messageData.educationLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <Briefcase size={20} className="text-purple-500" />
                          <div>
                            <span className="text-sm text-gray-500">Employment</span>
                            <p className="font-medium text-gray-900">{messageData.employmentStatus}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <CheckCircle size={20} className="text-indigo-500" />
                          <div>
                            <span className="text-sm text-gray-500">Position</span>
                            <p className="font-medium text-gray-900">{messageData.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
      {renderEmailDialog()}
    </div>
  )
}
