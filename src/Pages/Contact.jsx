import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// 3D Tilt Card Component
function Tilt3DCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Custom Themed Dropdown
function CustomSelect({ id, value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find((opt) => opt.value === value)

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-left focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer hover:border-gray-700 flex items-center justify-between gap-2"
      >
        <span className={selected ? 'text-white' : 'text-gray-500'}>{selected ? selected.label : placeholder}</span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-gray-900 border border-gray-800 rounded-lg shadow-2xl shadow-black/50 overflow-hidden max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                opt.value === value ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const location = useLocation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (location.hash === '#contact-form') {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
    setMousePosition({ x, y })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.subject) {
      alert('Please select a subject.')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const locations = [
    { name: 'Muweilah', area: 'Sharjah', phone: '056 996 6925', whatsapp: '971569966925', address: 'AL MUHARIB KARATE CENTRE - MUWEILAH BRANCH, Muweilah, National Paints - Sharjah - United Arab Emirates' },
    { name: 'Rolla', area: 'Sharjah', phone: '056 996 6927', whatsapp: '971569966927', address: 'Rolla, Sharjah - United Arab Emirates' },
    { name: 'Ajman', area: 'Ajman', phone: '056 996 6924', whatsapp: '971569966924', address: 'AL MUHARIB KARATE CENTRE - AJMAN HAMDAN CENTRE BRANCH, E11 - Al Nuaimia 1 - Ajman - United Arab Emirates' },
  ]

  const [selectedLocation, setSelectedLocation] = useState(locations[0].name)
  const activeLocation = locations.find((loc) => loc.name === selectedLocation) || locations[0]

  return (
    <div className="w-full overflow-x-hidden" onMouseMove={handleMouseMove}>
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <section className="relative bg-black pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-600/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400/25 rounded-full animate-float-fast"></div>
        </div>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* 3D Decorative Elements */}
        <div
          className="absolute top-20 right-20 w-20 h-20 border-2 border-red-600/20 rounded-full hidden lg:block"
          style={{ transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-16 h-16 bg-red-600/10 rounded-lg rotate-45 hidden lg:block"
          style={{ transform: `rotate(45deg) translateX(${mousePosition.x * -0.3}px) translateY(${mousePosition.y * -0.3}px)` }}
        ></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className={`inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full mb-6 tracking-widest uppercase transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Contact Us
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight transform transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Get In <span className="text-red-500 animate-glow">Touch</span>
          </h1>
          <p className={`text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-[1.8] transform transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Have questions about our programs? Ready to start your martial arts journey? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Our Locations - 3D Cards */}
      <section className="py-16 sm:py-20 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-3">Our Branches</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
              3 Locations Across UAE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {locations.map((location, index) => (
              <Tilt3DCard key={index}>
                <div
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-red-600 transition-all duration-500 h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-300"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ transform: 'translateZ(20px)' }}>{location.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{location.area}</p>
                  <div className="flex items-center justify-center gap-4" style={{ transform: 'translateZ(30px)' }}>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors group-hover:scale-105 transform duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {location.phone}
                    </a>
                    <a
                      href={`https://wa.me/${location.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20Karate%20classes%20at%20${location.name}.%20Please%20share%20more%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Tilt3DCard>
              <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-red-600 transition-all duration-500">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 group-hover:bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <svg className="w-7 h-7 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm sm:text-base">muharibkarateuae@gmail.com</p>
              </div>
            </Tilt3DCard>

            <Tilt3DCard>
              <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-red-600 transition-all duration-500">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 group-hover:bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <svg className="w-7 h-7 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Working Hours</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-1">Monday - Sunday</p>
                <p className="text-gray-400 text-sm sm:text-base">9:30AM - 12:30PM <span className="text-gray-600">&amp;</span> 4PM - 10PM</p>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section id="contact-form" className="py-20 md:py-28 bg-black overflow-hidden scroll-mt-24">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Send Message</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                Drop Us a Line
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="group">
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 hover:border-gray-700"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 hover:border-gray-700"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 hover:border-gray-700"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">Subject *</label>
                    <CustomSelect
                      id="subject"
                      value={formData.subject}
                      onChange={(value) => setFormData({ ...formData, subject: value })}
                      placeholder="Select a subject"
                      options={[
                        { value: 'enrollment', label: 'Program Enrollment' },
                        { value: 'trial', label: 'Free Trial Class' },
                        { value: 'pricing', label: 'Pricing Information' },
                        { value: 'schedule', label: 'Class Schedule' },
                        { value: 'other', label: 'Other Inquiry' },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none hover:border-gray-700"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-10 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Find Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                Visit Our Dojo
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-8">
                Come experience our world-class training facility in person.
              </p>

              {/* Location Selector */}
              <div className="mb-5">
                <label htmlFor="mapLocation" className="block text-white text-sm font-medium mb-2">Select Branch</label>
                <CustomSelect
                  id="mapLocation"
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Select a branch"
                  options={locations.map((location) => ({ value: location.name, label: `${location.name} - ${location.area}` }))}
                />
              </div>

              {/* Live Map */}
              <Tilt3DCard>
                <div className="h-[280px] sm:h-[320px] rounded-2xl mb-8 border border-gray-800 overflow-hidden relative">
                  <iframe
                    key={activeLocation.name}
                    title={`Map - ${activeLocation.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(activeLocation.address)}&output=embed`}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Tilt3DCard>
              <p className="text-gray-400 text-sm -mt-6 mb-8">{activeLocation.address}</p>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { key: 'facebook', href: 'https://www.facebook.com/AlMuharibKarateUAEIKAKyokushinRyu/' },
                    { key: 'instagram', href: 'https://www.instagram.com/muharibkarate_uae_kyokushinryu/' },
                    { key: 'whatsapp', href: 'https://wa.me/971569966925?text=Hi%2C%20I%20am%20interested%20in%20Karate%20classes.%20Please%20share%20more%20details.' },
                  ].map(({ key: social, href }, index) => (
                    <a
                      key={social}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {social === 'facebook' && (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {social === 'instagram' && (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                      {social === 'whatsapp' && (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - 3D Cards */}
      <section className="py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              Common Questions
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              Quick answers to questions you might have
            </p>
          </div>

          <div className="space-y-4">
            {[
              { question: "Do I need any prior experience to join?", answer: "No prior experience is required! We welcome students of all skill levels, from complete beginners to advanced practitioners." },
              { question: "What should I wear to my first class?", answer: "For your first class, comfortable athletic clothing is fine. Once enrolled, you'll receive a traditional karate gi (uniform)." },
              { question: "How long does it take to earn a black belt?", answer: "The journey to black belt typically takes 4-6 years of dedicated training, depending on individual progress and commitment." },
              { question: "Do you offer trial classes?", answer: "Yes! We offer a free trial class so you can experience our training firsthand before committing to a membership." }
            ].map((faq, index) => (
              <Tilt3DCard key={index}>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-600/50 transition-all duration-500">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors" style={{ transform: 'translateZ(20px)' }}>{faq.question}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">{faq.answer}</p>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute top-10 right-10 w-16 h-16 border border-red-600/20 rounded-full hidden lg:block"
          style={{ transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)` }}
        ></div>

        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to Begin?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">
            Take the first step on your martial arts journey. Book your free trial class today!
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
