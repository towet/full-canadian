"use client"

import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ApplicationModal from '../../components/ApplicationModal'

export const metadata: Metadata = {
  title: 'Entry-Level Jobs in Canada 2025 | Training Provided',
  description: 'Find the best entry-level jobs in Canada. Positions in housekeeping, hospitality, and more. Training provided. Visa sponsorship available.',
  keywords: 'entry level jobs Canada, housekeeping jobs Canada, hotel jobs Canada, jobs in Canada',
  openGraph: {
    title: 'Entry-Level Jobs in Canada for Kenyans 2025 | No Experience Required',
    description: 'Start your Canadian career with these entry-level positions. Training and visa sponsorship provided.',
    type: 'article',
    publishedTime: '2025-01-26T00:00:00.000Z',
    authors: ['Global Digital Experts'],
    tags: ['Entry Level Jobs', 'No Experience', 'Canada Immigration', 'Visa Sponsorship']
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Entry-Level Jobs in Canada for Kenyans 2025",
  "datePublished": "2025-01-26T00:00:00.000Z",
  "dateModified": "2025-01-26T00:00:00.000Z",
  "author": {
    "@type": "Organization",
    "name": "Global Digital Experts"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Global Digital Experts",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png"
    }
  }
}

export default function EntryLevelJobs() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(1)

  const handleModalClose = () => {
    setSelectedJob(null)
    setFormStep(1)
  }

  const handleModalOpen = () => {
    setSelectedJob("Entry Level Jobs")
    setFormStep(1)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">Entry Level</span>
          <time className="text-gray-500">January 26, 2025</time>
          <span className="text-gray-500">8 min read</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Entry-Level Jobs in Canada for Kenyans 2025</h1>
        <p className="text-xl text-gray-600">
          Start your Canadian journey with these entry-level positions. No experience required, 
          full training provided, and visa sponsorship included.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li><a href="#housekeeping" className="text-blue-600 hover:underline">Housekeeping Opportunities</a></li>
          <li><a href="#hospitality" className="text-blue-600 hover:underline">Hotel & Restaurant Jobs</a></li>
          <li><a href="#requirements" className="text-blue-600 hover:underline">Basic Requirements</a></li>
          <li><a href="#training" className="text-blue-600 hover:underline">Training Programs</a></li>
          <li><a href="#benefits" className="text-blue-600 hover:underline">Benefits & Support</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <article className="prose lg:prose-xl">
        <section id="housekeeping">
          <h2>Housekeeping Opportunities</h2>
          
          <div className="not-prose">
            {/* Housekeeper */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">1. Housekeeper</h3>
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">$2,600 - $2,960 CAD/month</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Perfect starting position with flexible hours and comprehensive training. Work in hotels, resorts, or private residences.
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>No experience required</li>
                  <li>Full training provided</li>
                  <li>Accommodation assistance</li>
                  <li>Health benefits included</li>
                </ul>
              </div>
            </div>

            {/* Light Duty Cleaner */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">2. Light Duty Cleaner</h3>
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">Up to $3,120 CAD/month</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Start your career in the cleaning industry with flexible schedules and supportive team environment.
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Flexible working hours</li>
                  <li>Entry-level position</li>
                  <li>Career advancement opportunities</li>
                  <li>Regular working schedule</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="hospitality">
          <h2>Hotel & Restaurant Jobs</h2>
          
          <div className="not-prose">
            {/* Hotel Front Desk */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">3. Hotel Front Desk Clerk</h3>
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">$2,840 - $3,773 CAD/month</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Start your hospitality career at the front desk. Perfect for those with good communication skills.
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Customer service training provided</li>
                  <li>Professional work environment</li>
                  <li>Career growth opportunities</li>
                  <li>Hotel perks and benefits</li>
                </ul>
              </div>
            </div>

            {/* Kitchen Helper */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">4. Kitchen Helper</h3>
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">$2,600 - $2,960 CAD/month</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Begin your culinary journey as a kitchen helper. Learn from experienced chefs while earning.
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>On-the-job training</li>
                  <li>Meal benefits included</li>
                  <li>Path to chef positions</li>
                  <li>Team environment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="requirements">
          <h2>Basic Requirements</h2>
          <p>
            These entry-level positions have minimal requirements:
          </p>
          <ul>
            <li>Basic English communication skills</li>
            <li>Physical fitness for active roles</li>
            <li>Positive attitude and willingness to learn</li>
            <li>Clean criminal record</li>
            <li>Ability to work in a team</li>
            <li>Reliable and punctual</li>
          </ul>
        </section>

        <section id="training">
          <h2>Training Programs</h2>
          <p>
            All positions include comprehensive training:
          </p>
          <ul>
            <li>Initial orientation program</li>
            <li>Safety and workplace procedures</li>
            <li>Customer service skills</li>
            <li>Equipment operation (where applicable)</li>
            <li>Canadian workplace culture</li>
            <li>Language support if needed</li>
          </ul>
        </section>

        <section id="benefits">
          <h2>Benefits & Support</h2>
          <p>
            Entry-level positions come with various benefits:
          </p>
          <ul>
            <li>Competitive starting salary</li>
            <li>Health insurance coverage</li>
            <li>Paid vacation time</li>
            <li>Career advancement opportunities</li>
            <li>Accommodation assistance</li>
            <li>Work permit sponsorship</li>
          </ul>
        </section>

        {/* Success Story */}
        <div className="my-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Success Story: From Kenya to Canada</h3>
          <p className="mb-4">
            "I started as a housekeeper in Toronto with no prior experience. The company provided all necessary training 
            and supported my immigration process. Within two years, I was promoted to supervisor. The opportunities for 
            growth are real!" - Sarah from Nairobi
          </p>
        </div>

        {/* Call to Action */}
        <div className="my-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Start Your Canadian Journey Today</h3>
          <p className="mb-4">
            Our team specializes in helping candidates secure entry-level positions in Canada. 
            Get personalized guidance throughout your application process.
          </p>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
            onClick={handleModalOpen}
          >
            Apply Now
          </Button>
        </div>
      </article>
      {selectedJob && (
        <ApplicationModal
          isOpen={!!selectedJob}
          onClose={handleModalClose}
          jobTitle={selectedJob}
          step={formStep}
          setStep={setFormStep}
        />
      )}
      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Do I need work experience?</h3>
            <p className="text-gray-600">No, these positions are specifically designed for individuals with no prior experience. Full training is provided.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">What about the language requirement?</h3>
            <p className="text-gray-600">Basic English communication skills are sufficient for most positions. Language support is available.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">How long is the training period?</h3>
            <p className="text-gray-600">Training typically lasts 2-4 weeks, depending on the position. You'll be paid during training.</p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/blog/highest-paying-jobs-canada-kenyans-2025" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold mb-2">Highest Paying Jobs in Canada for Kenyans</h4>
            <p className="text-gray-600">Discover opportunities with top salaries...</p>
          </Link>
          <Link href="/blog/living-in-canada-guide" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold mb-2">Living in Canada: Essential Guide for Kenyans</h4>
            <p className="text-gray-600">Everything you need to know about life in Canada...</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
