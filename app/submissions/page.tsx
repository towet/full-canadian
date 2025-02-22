"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

  useEffect(() => {
    fetchSubmissions()
  }, [])

  async function fetchSubmissions() {
    try {
      // First, let's check if the table exists
      const { data: tables, error: tableError } = await supabase
        .from('form_submissions')
        .select('*')
        .limit(1)

      if (tableError) {
        console.error('Table error:', tableError)
        setError(`Table error: ${tableError.message}`)
        setLoading(false)
        return
      }

      console.log('Table check response:', tables)

      // Now fetch all submissions
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Fetch error:', error)
        setError(`Fetch error: ${error.message}`)
        setLoading(false)
        return
      }

      console.log('Fetched submissions:', data)
      setSubmissions(data || [])
    } catch (error) {
      console.error('Unexpected error:', error)
      setError(`Unexpected error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Form Submissions</h1>
      
      {submissions.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No submissions found. Submit a form to see the data here.
        </div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission) => {
            let messageData;
            try {
              messageData = JSON.parse(submission.message)
            } catch (e) {
              console.error('Error parsing message:', e)
              messageData = { error: 'Could not parse message data' }
            }
            
            const submissionDate = new Date(submission.created_at).toLocaleDateString()
            
            return (
              <div key={submission.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{submission.name}</h2>
                    <p className="text-gray-600">{submission.email}</p>
                    <p className="text-gray-600">{submission.phone}</p>
                  </div>
                  <span className="text-sm text-gray-500">{submissionDate}</span>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Additional Information:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p><span className="font-medium">Nationality:</span> {messageData.nationality}</p>
                    <p><span className="font-medium">Education:</span> {messageData.educationLevel}</p>
                    <p><span className="font-medium">Employment:</span> {messageData.employmentStatus}</p>
                    <p><span className="font-medium">Position:</span> {messageData.position}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
