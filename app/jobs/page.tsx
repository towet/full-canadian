import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canada Job Categories 2025 | Visa Sponsorship Jobs & Work Permits',
  description: 'Browse top job categories in Canada with visa sponsorship. Find nanny jobs, driver jobs, cleaner jobs, and more. Easy application process for work permits and express entry.',
  keywords: ['nanny jobs canada', 'driver jobs canada', 'cleaner jobs canada', 'entry level jobs canada', 'skilled worker jobs canada'],
  openGraph: {
    title: 'Canada Job Categories 2025 | Visa Sponsorship Jobs & Work Permits',
    description: 'Browse top job categories in Canada with visa sponsorship. Find nanny jobs, driver jobs, cleaner jobs, and more.',
    type: 'website',
    url: 'https://globaldigitalexperts.info/jobs',
  }
}

const jobCategories = [
  {
    title: 'Nanny Jobs in Canada',
    description: 'Find nanny and caregiver positions with visa sponsorship. Competitive salary and benefits.',
    salary: '$30,000 - $45,000/year',
    requirements: ['Basic English', 'Childcare experience', 'Clean background'],
    url: '/jobs/nanny-jobs-canada'
  },
  {
    title: 'Driver Jobs in Canada',
    description: 'Delivery, taxi, and commercial driving opportunities with work permit sponsorship.',
    salary: '$35,000 - $65,000/year',
    requirements: ['Valid driver\'s license', 'Clean driving record', 'English proficiency'],
    url: '/jobs/driver-jobs-canada'
  },
  {
    title: 'Cleaner Jobs in Canada',
    description: 'Housekeeping and commercial cleaning positions with visa support.',
    salary: '$28,000 - $40,000/year',
    requirements: ['No experience needed', 'Training provided', 'Work permit assistance'],
    url: '/jobs/cleaner-jobs-canada'
  },
  {
    title: 'Entry Level Jobs in Canada',
    description: 'Start your career in Canada with entry-level positions across various industries.',
    salary: '$30,000 - $45,000/year',
    requirements: ['No experience required', 'Training available', 'Visa sponsorship'],
    url: '/jobs/entry-level-jobs-canada'
  },
  {
    title: 'Skilled Worker Jobs in Canada',
    description: 'Opportunities for skilled professionals through Express Entry system.',
    salary: '$45,000 - $90,000/year',
    requirements: ['Relevant qualifications', 'Work experience', 'Express Entry eligible'],
    url: '/jobs/skilled-worker-jobs-canada'
  }
]

export default function JobCategories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Jobs in Canada with Visa Sponsorship</h1>
      
      {/* Quick Links */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Immigration Links</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/visa/work-permit" className="text-blue-600 hover:underline">
            Work Permit Guide
          </Link>
          <Link href="/visa/express-entry" className="text-blue-600 hover:underline">
            Express Entry Program
          </Link>
          <Link href="/visa/student-visa" className="text-blue-600 hover:underline">
            Student Visa Information
          </Link>
        </div>
      </div>

      {/* Job Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {jobCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="mb-4">
              <span className="text-green-600 font-semibold">Salary Range:</span>
              <span className="ml-2">{category.salary}</span>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Requirements:</h3>
              <ul className="list-disc pl-5">
                {category.requirements.map((req) => (
                  <li key={req} className="text-gray-600">{req}</li>
                ))}
              </ul>
            </div>
            <Link 
              href={category.url}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Jobs
            </Link>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-12 prose max-w-none">
        <h2>Work in Canada with Visa Sponsorship</h2>
        <p>
          Looking for job opportunities in Canada? Our comprehensive job board features positions with visa sponsorship
          across various industries. Whether you're seeking nanny jobs, driver positions, cleaning work, or skilled
          professional roles, we connect you with Canadian employers offering work permits and immigration support.
        </p>

        <h3>Why Choose Canada for Your Career?</h3>
        <ul>
          <li>Competitive salaries and benefits</li>
          <li>High quality of life and healthcare</li>
          <li>Multicultural work environment</li>
          <li>Path to permanent residence</li>
          <li>Family sponsorship opportunities</li>
        </ul>

        <h3>Immigration Pathways</h3>
        <p>
          Canada offers multiple immigration pathways for foreign workers. The Express Entry system fast-tracks
          skilled workers, while specific work permits cater to various job categories. Student visas provide
          a pathway to work through post-graduation work permits.
        </p>
      </div>
    </div>
  )
}
