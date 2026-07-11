import React, { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Karate UAE
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-300">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-300">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-300">
              Programs
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-300">
              Contact
            </a>
            <button className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors duration-300 py-2">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors duration-300 py-2">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors duration-300 py-2">
                Programs
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors duration-300 py-2">
                Contact
              </a>
              <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 mt-2">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
