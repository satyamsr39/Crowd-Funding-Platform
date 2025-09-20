import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const isTestMode = 'test' // set in .env files
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-center overflow-y-0 mb-0"
      style={{ backgroundImage: "url('https://i.imghippo.com/files/RgM7485lz.png')" }}>
      
      {/* Site-wide Test Mode banner */}
      {isTestMode && showBanner && (
        <div className="absolute top-0 inset-x-0 z-20">
          <div className="mx-auto max-w-5xl">
            <div className="m-3 rounded-md border border-amber-400 bg-amber-50/95 text-amber-900 shadow-sm">
              <div className="flex items-start gap-3 p-3">
                <svg className="h-5 w-5 mt-0.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>
                <p className="text-sm">
                  Razorpay Test Mode enabled — transactions are simulated; real payments are disabled.{" "}
                  <Link to="/payments-test-mode" className="underline underline-offset-2 hover:text-amber-700">
                    Learn more
                  </Link>
                </p>
                <button
                  onClick={() => setShowBanner(false)}
                  className="ml-auto rounded p-1.5 text-amber-700 hover:bg-amber-100"
                  aria-label="Dismiss test mode notice"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 text-gray-100"></div>

      {/* Hero */}
      <div className="relative max-w-3xl px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-100 drop-shadow-sm">
          Charity Platform
        </h1>

        <p className="mt-4 text-gray-100 text-lg md:text-xl drop-shadow-sm">
          Find verified NGOs and individuals and donate quickly and safely.
        </p>

        {/* Recruiter/test note */}
        {isTestMode && (
          <p className="mt-3 text-sm text-gray-200/90">
            Recruiter note: This demo uses Razorpay Test Mode. No real charges; use test UPI only(test@upi).
          </p>
        )}

        <div className="mt-8">
          <Link
            to="/ngos"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            aria-label={isTestMode ? "Explore NGOs and proceed to test payments" : "Explore NGOs"}
            data-payment-mode={isTestMode ? "test" : "live"}
            title={isTestMode ? "Payments are simulated with Razorpay test keys" : "Live payments enabled"}
          >
            {isTestMode ? "Explore NGOs (Test Payments)" : "Explore NGOs"}
          </Link>
        </div>
      </div>
    </div>
  )
}
