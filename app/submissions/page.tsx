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
  position: string
  replied: boolean
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

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

  const handleEmailClick = async (submission: Submission) => {
    const position = submission.position || "Canadian Immigration Services";
    const subject = `Re: Application Received - ${position}`;
    const body = `Dear ${submission.name},

Thank you for your application regarding ${position} at Global Visa Experts Canada.

We have received your application and our team will process it carefully. We will connect you to available opportunities once you are successfully selected.

We will keep in touch regarding the next steps in the process.

Best regards,
Global Visa Experts Canada Team
globalvisaexpertscanada@gmail.com`;

    // Open Gmail compose window
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${submission.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');

    // Update the replied status in the database
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ replied: true })
        .eq('id', submission.id);

      if (error) {
        toast({
          title: "Error updating reply status",
          description: error.message,
          duration: 3000,
        });
        return;
      }

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === submission.id ? { ...sub, replied: true } : sub
        )
      );

      toast({
        title: "Status Updated",
        description: "Reply status has been updated",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update reply status",
        duration: 3000,
      });
    }
  };

  // Sort submissions with unreplied first, then by date
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (a.replied === b.replied) {
      // If both have same reply status, sort by date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    // Put unreplied first
    return a.replied ? 1 : -1;
  });

  const filteredSubmissions = sortedSubmissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedStatus === "all") return matchesSearch
    return matchesSearch
  })

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
                        onClick={() => handleEmailClick(submission)}
                        className={`${
                          submission.replied 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        } transition-colors duration-200`}
                      >
                        {submission.replied ? 'Replied' : 'Reply'}
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
    </div>
  )
}
