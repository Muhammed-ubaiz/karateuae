import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// Import images
import senseiImage from '../assets/karate_black_red_premium.jpg'
import ourStoryImage from '../assets/IMG-20260709-WA0025.jpg'
import founderImage from '../assets/founder-peter-chong.png'
import stevenFooImage from '../assets/steven-foo.png'
import phillipMoustacheImage from '../assets/phillip-moustache.png'
import jackieChongImage from '../assets/jackie-chong.png'

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
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
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

function About() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
    setMousePosition({ x, y })
  }

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
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-red-500/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-red-600/20 rounded-full animate-float-medium"></div>
        </div>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* 3D Decorative Elements */}
        <div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-red-600/20 rounded-full hidden lg:block"
          style={{ transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-red-600/10 rounded-2xl rotate-45 hidden lg:block"
          style={{ transform: `rotate(45deg) translateX(${mousePosition.x * -0.3}px) translateY(${mousePosition.y * -0.3}px)` }}
        ></div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className={`inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full mb-6 tracking-widest uppercase transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            About Us
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight transform transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Journey in <br className="hidden sm:block" />
            <span className="text-red-500 animate-glow">Martial Arts</span>
          </h1>
          <p className={`text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-[1.8] transform transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Dedicated to excellence in karate training since 2009, shaping champions and building character.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - 3D Image */}
            <div className="relative" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="relative">
                  <div
                    className="aspect-square max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border border-red-900/30"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img
                      src={ourStoryImage}
                      alt="Al Muharib Karate Centre"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </Tilt3DCard>
            </div>
            {/* Right - Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                The Strongest Karate in the UAE
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-5 max-w-lg mx-auto lg:mx-0">
                Welcome to Al Muharib Karate Centre, a premier destination for authentic full-contact karate in the UAE. Established in 2019 by Sensei Manoj Thomas (4th Dan Black Belt), our mission is to develop and promote the discipline, strength, and ultimate truth of Kyokushin Karate across the region.
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-8 max-w-lg mx-auto lg:mx-0">
                We are an official branch of the International Karate Alliance KyokushinRyu (IKAK), which operates under the global leadership of Ryuso Peter Chong (9th Dan Black Belt, Founder of IKAK) and Kancho Jackie Chong (President of IKAK).
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">Why Choose Al Muharib Karate Centre?</h3>
              <ul className="space-y-3 text-gray-400 text-base sm:text-lg leading-[1.8] max-w-lg mx-auto lg:mx-0 text-left">
                <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Expert Supervision:</strong> Our students are trained by well-experienced and qualified instructors under the direct guidance of UAE Branch Chief and Middle East Regional Director, Sensei Manoj Thomas.</span></li>
                <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Global Exposure:</strong> Senior Kyokushin masters from different countries frequently visit our centers to conduct specialized seminars and training camps for both students and instructors.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <Tilt3DCard>
              <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10 hover:border-red-600 transition-all duration-500 h-full" style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight" style={{ transform: 'translateZ(20px)' }}>Our Mission</h3>
                <p className="text-gray-400 text-base leading-[1.8]">
                  To provide world-class karate training that develops physical fitness, mental discipline, and strong character in every student, regardless of age or skill level.
                </p>
              </div>
            </Tilt3DCard>
            {/* Vision */}
            <Tilt3DCard>
              <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10 hover:border-red-600 transition-all duration-500 h-full" style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight" style={{ transform: 'translateZ(20px)' }}>Our Vision</h3>
                <p className="text-gray-400 text-base leading-[1.8]">
                  To become the leading martial arts academy in the Middle East, recognized for producing champions both on and off the mat, and inspiring a lifelong love for karate.
                </p>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Core Principles</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              Our Values
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              The principles that guide everything we do at Karate UAE
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: 'Discipline', desc: 'Building self-control and dedication' },
              { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Respect', desc: 'Honoring traditions and others' },
              { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', title: 'Excellence', desc: 'Striving for the highest standards' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Integrity', desc: 'Acting with honesty always' },
            ].map((value, index) => (
              <Tilt3DCard key={index}>
                <div className="group text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-all duration-500">
                  <div
                    className="w-16 h-16 bg-gray-800 group-hover:bg-red-600 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <svg className="w-8 h-8 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-[1.8]">{value.desc}</p>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Find Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              Our Branches
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              Train with us at any of our three convenient locations across the UAE
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Muweilah', area: 'Sharjah', phone: '056 996 6925', address: 'AL MUHARIB KARATE CENTRE - MUWEILAH BRANCH, Muweilah, National Paints - Sharjah - United Arab Emirates' },
              { name: 'Rolla', area: 'Sharjah', phone: '056 996 6927', address: 'Rolla, Sharjah - United Arab Emirates' },
              { name: 'Ajman', area: 'Ajman', phone: '056 996 6924', address: 'AL MUHARIB KARATE CENTRE - AJMAN HAMDAN CENTRE BRANCH, E11 - Al Nuaimia 1 - Ajman - United Arab Emirates' },
            ].map((branch, index) => (
              <Tilt3DCard key={index}>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-red-600 transition-all duration-500 h-full" style={{ transformStyle: 'preserve-3d' }}>
                  <div
                    className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight" style={{ transform: 'translateZ(20px)' }}>{branch.name}</h3>
                  <p className="text-red-500 font-semibold text-sm mb-4">{branch.area}</p>
                  <p className="text-gray-400 text-sm leading-[1.8] mb-4">{branch.address}</p>
                  <p className="text-gray-300 text-sm font-semibold">{branch.phone}</p>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Meet The Team</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              Our Instructors
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            {/* Left - Photo */}
            <div className="relative mx-auto lg:mx-0 max-w-sm w-full" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-500">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                    <img
                      src={senseiImage}
                      alt="Sensei Manoj Thomas - Head Instructor"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">SENSEI MANOJ THOMAS</h3>
                    <p className="text-red-500 font-semibold text-sm">Head Instructor</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>

            {/* Right - Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-2">Head Instructor</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">SENSEI MANOJ THOMAS</h3>
                <p className="text-gray-400 text-sm font-semibold mb-4">4th Dan Black Belt – UAE Country Director &amp; Middle East Regional Director of IKAK</p>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                  Sensei Manoj Thomas is a highly accomplished and dedicated martial artist with over decades of experience in full-contact karate and traditional combat arts. Currently serving as the UAE Branch Chief, Country Director, and Middle East Regional Director of the International Karate Alliance KyokushinRyu (IKAK), he has been instrumental in expanding the footprint of Kyokushin Karate across the United Arab Emirates.
                </p>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Martial Arts Journey &amp; Expertise</h4>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  Sensei Manoj began his martial arts career at the young age of 12. His deep passion for combat sports led him to master multiple disciplines, including:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Kyokushin Karate (4th Dan Black Belt)</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Kalaripayattu (Traditional Martial Arts of Kerala)</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Kickboxing &amp; Kung Fu</span></li>
                </ul>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                  Throughout his competitive career, he has won numerous accolades, including multiple Inter-Dojo Championships, as well as awards for Best Fighter, Best Kata Performer, and Best Student.
                </p>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Global Experience &amp; Leadership</h4>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  In 2006, Sensei Manoj relocated to the UAE, where he continued to train alongside top senior Kyokushin masters from various countries. His unwavering commitment to evolving his skills and staying updated with modern forms and techniques has made him a respected leader and mentor to both instructors and students alike.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  He is an IKAK Certified Referee who has officiated at major national and international tournaments, including:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8]">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>1st KyokushinRyu World Tournament (Philippines, 2023)</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>1st World Junior Championship (Tianjin, China, 2025)</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>2nd KyokushinRyu World Tournament (Astana, Kazakhstan, 2026) – where he was honored with the prestigious Best Referee Award</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Founder of Al Muharib Karate Centre</h4>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                  Driven by a vision to develop the Kyokushin style in the UAE, Sensei Manoj founded the Al Muharib Karate Centre in 2019. Under his direct supervision and leadership, the academy has rapidly grown into three premier branches across Muweilah (Sharjah), Rolla (Sharjah), and Al Nuaimeya (Ajman), delivering world-class martial arts training through qualified and highly experienced instructors.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center mb-14 sm:mb-16">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Global Network</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
              International Karate Alliance
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              Karate UAE proudly trains under the International Karate Alliance, KyokushinRyu (IKA)
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            {/* Left - Photo */}
            <div className="relative mx-auto lg:mx-0 max-w-sm w-full" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-500">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                    <img
                      src={founderImage}
                      alt="Ryuso Peter Chong - Founder"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">RYUSO PETER CHONG (流祖)</h3>
                    <p className="text-red-500 font-semibold text-sm">Founder</p>
                    <p className="text-gray-400 text-sm mt-2">9th Dan – Ryuso of the International Karate Alliance, KyokushinRyu</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>

            {/* Right - Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Early Life &amp; Martial Arts Journey</h3>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8]">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Born in Singapore, 1941</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Began martial arts training under his father in 1955, at age 14</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Practiced Judo and other local martial arts before Kyokushin</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>In 1965, traveled by ship to Japan to train full-time at the Honbu Dojo, Ikebukuro, Tokyo under Sosai Masutatsu Oyama. He trained alongside many of Kyokushin's future luminaries.</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Building Kyokushin in Asia</h3>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8]">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>1969: Established his first Dojo in Singapore</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>For decades, promoted Kyokushin across Asia and the Middle East, teaching hundreds of instructors and students</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Served as International Committee Chairman for Asia &amp; the Middle East (IKO1) until his resignation in 2018</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Later founded the International Karate Alliance KyokushinRyu (IKAK), where he now serves as Kancho and Ryuso</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Career &amp; Service</h3>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8]">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Worked in the Singapore Police Force, rising to Assistant Superintendent of Police</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Served as a Self-Defense Instructor for the Police Force throughout his career</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span>Brought Kyokushin's philosophy and discipline into policing and public service</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jackie Chong Section */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            {/* Left - Photo */}
            <div className="relative mx-auto lg:mx-0 max-w-sm w-full" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-500">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                    <img
                      src={jackieChongImage}
                      alt="Kancho Jackie Chong - Chairman"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">KANCHO JACKIE CHONG</h3>
                    <p className="text-red-500 font-semibold text-sm">Chairman</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>

            {/* Right - Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-2">Chairman</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">KANCHO JACKIE CHONG (會長)</h3>
                <p className="text-gray-400 text-sm font-semibold mb-4">Director of the International Karate Alliance, KyokushinRyu (2nd Generation)</p>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Early Life &amp; Martial Arts Journey</h4>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  Born in Singapore, Kancho Jackie Chong began his Kyokushin training in late 1974. From the start, he was drawn to the discipline, intensity, and spirit of Sosai Mas Oyama's karate. What began as a teenage pursuit soon became a lifelong calling.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  In 1988, he deepened his training through the rigorous Uchideshi program in Ikebukuro, Tokyo, where he lived and trained under the direct guidance of Sosai Mas Oyama himself. This period of immersion tested not only his body but also his spirit, teaching him lessons in humility, perseverance, and loyalty that would shape the rest of his journey.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                  Returning to Singapore after this experience, he assumed the role of chief instructor of the Singapore Honbu Dojo, succeeding Sensei James Chong. At a relatively young age, he carried the responsibility of leading and nurturing the next generation of Kyokushin practitioners.
                </p>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">Contributions to Kyokushin</h4>
                <p className="text-gray-400 text-sm sm:text-base leading-[1.8] mb-4">
                  For more than three decades, Kancho Jackie Chong has been an indispensable pillar of Kyokushin in Singapore and Asia:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base leading-[1.8]">
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Leadership in SOKK:</strong> He served for over 30 years on the committee of the Singapore Oyama Karate-Do Kyokushinkai (SOKK), contributing to the growth and direction of Kyokushin in the country.</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Personal Assistant to Ryuso Peter Chong:</strong> Since 1994, following the death of Sosai Mas Oyama, he has stood alongside Ryuso Peter Chong, assisting him in organizational matters and ensuring continuity during a pivotal era.</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Tournaments and Seminars:</strong> He has co-organized and assisted in major regional and international tournaments, strengthening bonds across dojos and countries, while promoting high standards of competition and sportsmanship.</span></li>
                  <li className="flex gap-2"><span className="text-red-500 mt-1">•</span><span><strong className="text-white font-semibold">Mentorship and Instruction:</strong> Over the years, he has personally trained hundreds of instructors and students, emphasizing not only technique but also the true spirit of Kyokushin. His influence extends well beyond Singapore, leaving an imprint across Asia.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steven Foo Section */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            {/* Left - Bio */}
            <div className="lg:col-span-2 order-2 lg:order-1 space-y-5">
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-2">International Council Member</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">SHIHAN STEVEN FOO (師範) – Philippines</h3>
              <p className="text-gray-400 text-sm font-semibold mb-4">6th Dan Black Belt – Global Partnership Director, International Karate Alliance, KyokushinRyu (IKAK)</p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Shihan Steven Foo is one of the pioneering figures who helped establish Kyokushin Karate in the Philippines. A senior disciple of Ryuso Peter Chong, he has devoted his life to spreading the values of strength, humility, and perseverance that lie at the heart of Kyokushin.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Born in Singapore, Steven began his martial arts journey at age 18 with Shitoryu Karate. While this gave him a strong foundation, his true calling came in 1982, when he joined the Orchard Tower Dojo in Singapore under Shihan Peter Chong. He trained alongside instructors such as Sensei James Chong, Sensei Nai Ping, and Senpai Jackie Chong, immersing himself in the famously demanding training of Kyokushin—long kihon, disciplined kata, and brutal sparring sessions that tested not only the body but also the spirit.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Before settling in the Philippines, Steven lived and trained in Australia, studying as a visiting casual student under Shihan Eddie Emin and Shihan John Taylor. This international exposure enriched his martial perspective and strengthened his vision of how Kyokushin could grow across cultures and communities.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                In August 1996, Shihan Foo made a defining move when he established his first Kyokushin dojo in San Juan, Philippines. The beginnings were humble, with small classes and limited resources, but his perseverance and sincerity laid the foundation for growth. From that single dojo, Kyokushin expanded steadily across the Philippines. Today, more than 30 dojos trace their roots back to his early efforts, with many of his original students now instructors themselves.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Outside the dojo, Shihan Foo worked in both Singapore and Australia before making the Philippines his home for over three decades. He served as a Southeast Asia Advisor during Shihan Peter Chong's tenure with the IKO, and later played an instrumental role in the founding of the International Karate Alliance KyokushinRyu (IKA). Today, as Global Partnership Director, he strengthens IKA's international presence and forges bonds across the global Kyokushin community.
              </p>
            </div>

            {/* Right - Photo */}
            <div className="relative mx-auto lg:mx-0 max-w-sm w-full order-1 lg:order-2" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-500">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                    <img
                      src={stevenFooImage}
                      alt="Shihan Steven Foo - International Council Member"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">SHIHAN STEVEN FOO</h3>
                    <p className="text-red-500 font-semibold text-sm">International Council Member</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* Phillip Moustache Section */}
      <section className="py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            {/* Left - Photo */}
            <div className="relative mx-auto lg:mx-0 max-w-sm w-full" style={{ perspective: '1000px' }}>
              <Tilt3DCard>
                <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-500">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                    <img
                      src={phillipMoustacheImage}
                      alt="Shihan Phillip Moustache - International Council Member"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">SHIHAN PHILLIP MOUSTACHE</h3>
                    <p className="text-red-500 font-semibold text-sm">International Council Member</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>

            {/* Right - Bio */}
            <div className="lg:col-span-2 space-y-5">
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-2">International Council Member</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">SHIHAN PHILLIP MOUSTACHE (師範) – Seychelles</h3>
              <p className="text-gray-400 text-sm font-semibold mb-4">7th Dan Kyokushin Master – Africa Director, Technical Director and Council Member of the International Karate Alliance, KyokushinRyu</p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Shihan Phillip Moustache began his martial arts journey in August 1975, eventually discovering Kyokushin Karate in 1985, where he found the path that would shape his life. Just two years later, his dedication was recognized by Sosai Mas Oyama, who appointed him as Branch Chief of Seychelles in 1987.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                That same year, Shihan Phillip represented his nation on the global stage at the 4th World Open Tournament in Japan, returning again for the 5th World Tournament in 1991. His technical pursuit of Kyokushin led him to the Yugawara Dojo in 1994, where he underwent rigorous training in Japan. Known for his fighting spirit, he completed the legendary 50-Man Kumite in April 1996, a true test of Kyokushin endurance and perseverance.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                Beyond competition, Shihan Phillip's leadership grew steadily. In 1991, he was appointed responsible for Kyokushin in the Indian Ocean region and as Assistant to the Africa Kyokushin Chairman, carrying Sosai's vision beyond his homeland. Over the years, he was celebrated locally, being voted Best Karateka of Seychelles three times (1985, 1991, 1994), and later honored with the Medal of Honour by the President of Seychelles for promoting Karate both locally and internationally.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8]">
                His legacy is also defined by the champions he raised. At the 2024 IKA World Championships in Tianjin, China, two of his students emerged as World Champions, earning him the titles of Best Karate Coach of 2024 from the Seychelles Karate Federation and Best Coach in Seychelles 2024 by the National Awards Committee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute top-10 left-10 w-20 h-20 border border-red-600/20 rounded-full hidden lg:block"
          style={{ transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-16 h-16 bg-red-600/10 rounded-lg rotate-45 hidden lg:block"
          style={{ transform: `rotate(45deg) translateX(${mousePosition.x * -0.3}px) translateY(${mousePosition.y * -0.3}px)` }}
        ></div>

        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Join Our Family
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">
            Start your martial arts journey with us today. Your first class is free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/contact#contact-form" className="w-full sm:w-auto border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-10 py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 tracking-wide text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About
