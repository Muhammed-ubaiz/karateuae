import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// Import images
import aboutImage from '../assets/IMG-20260709-WA0021.jpg'
import kidsProgramImage from '../assets/IMG-20260705-WA0053.jpg'
import teensProgramImage from '../assets/IMG-20260705-WA0059.jpg'
import heroSlide1 from '../assets/IMG-20260705-WA0055.jpg'
import heroSlide2 from '../assets/IMG-20260705-WA0056.jpg'
import heroSlide3 from '../assets/IMG-20260705-WA0057.jpg'
import heroSlide4 from '../assets/IMG-20260705-WA0059.jpg'

const heroSlideshowImages = [heroSlide1, heroSlide2, heroSlide3, heroSlide4]

// Animated Counter Component
function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime = null
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

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
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`)
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

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlideshowImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
    setMousePosition({ x, y })
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-black flex items-center pt-16 sm:pt-20 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-600/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400/25 rounded-full animate-float-fast"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-red-500/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-red-600/20 rounded-full animate-float-medium"></div>
        </div>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <span
                className={`inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full mb-8 tracking-widest uppercase transform transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                }`}
              >
                Martial Arts Academy
              </span>

              {/* Title */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white uppercase tracking-tight mb-8 leading-[1.1] transform transition-all duration-1000 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Welcome to <br />
                <span className="text-red-600 inline-block animate-glow">Al Muharib Karate</span>
              </h1>

              {/* Description */}
              <p
                className={`text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light transform transition-all duration-1000 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Master the Art of Karate with Expert Training from World-Class Instructors
              </p>
            </div>

            {/* Right - 3D Images */}
            <div
              className={`relative order-1 lg:order-2 flex items-center justify-center transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Main 3D Card */}
              <Tilt3DCard className="relative z-20">
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[450px]">
                  {/* Main Image */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    {heroSlideshowImages.map((slide, index) => (
                      <img
                        key={slide}
                        src={slide}
                        alt="Karate Champion"
                        className={`absolute inset-0 w-full h-full object-cover object-[center_20%] transition-opacity duration-1000 ${
                          index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {heroSlideshowImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          aria-label={`Show slide ${index + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'w-6 bg-red-600' : 'w-1.5 bg-white/50'
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>

                  {/* Floating Card 1 - Top Right */}
                  <div
                    className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 bg-red-600 rounded-2xl shadow-xl flex items-center justify-center animate-float-slow"
                    style={{
                      transform: `translateZ(80px) translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="text-center text-white">
                      <span className="text-2xl sm:text-3xl font-bold block">7+</span>
                      <span className="text-xs sm:text-sm opacity-90">Years</span>
                    </div>
                  </div>

                  {/* Floating Card 2 - Bottom Left */}
                  <div
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-28 h-20 sm:w-32 sm:h-24 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex items-center justify-center animate-float-medium"
                    style={{
                      transform: `translateZ(60px) translateX(${mousePosition.x * -0.3}px) translateY(${mousePosition.y * -0.3}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="text-center">
                      <span className="text-xl sm:text-2xl font-bold text-white block">400+</span>
                      <span className="text-xs sm:text-sm text-gray-400">Students</span>
                    </div>
                  </div>

                  {/* Floating Card 3 - Middle Right */}
                  <div
                    className="absolute top-1/2 -right-8 sm:-right-12 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-900 to-gray-800 border border-red-600/30 rounded-full shadow-xl flex items-center justify-center animate-float-fast"
                    style={{
                      transform: `translateZ(70px) translateY(-50%) translateX(${mousePosition.x * 0.4}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>

                  {/* Decorative Ring */}
                  <div
                    className="absolute -inset-4 border-2 border-red-600/20 rounded-[2rem] animate-pulse-slow"
                    style={{ transform: 'translateZ(-10px)' }}
                  ></div>

                  {/* Background Blur Card */}
                  <div
                    className="absolute inset-0 bg-red-600/10 rounded-3xl blur-xl"
                    style={{ transform: 'translateZ(-30px) scale(1.1)' }}
                  ></div>
                </div>
              </Tilt3DCard>

              {/* Decorative Elements */}
              <div
                className="absolute top-10 left-0 w-16 h-16 border-2 border-red-600/30 rounded-full animate-spin-slow"
                style={{ animationDuration: '15s' }}
              ></div>
              <div
                className="absolute bottom-10 right-0 w-12 h-12 bg-red-600/20 rounded-lg rotate-45 animate-float-slow"
              ></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Side Decorative Lines */}
        <div className={`absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
        </div>
        <div className={`absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 sm:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            <div className="py-2">
              <h3 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                <CountUp end={7} duration={2000} suffix="+" />
              </h3>
              <p className="text-gray-200 text-sm sm:text-base font-medium tracking-wide">Years Experience</p>
            </div>
            <div className="py-2">
              <h3 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                <CountUp end={400} duration={2500} suffix="+" />
              </h3>
              <p className="text-gray-200 text-sm sm:text-base font-medium tracking-wide">Students Trained</p>
            </div>
            <div className="py-2">
              <h3 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                <CountUp end={10} duration={1800} suffix="+" />
              </h3>
              <p className="text-gray-200 text-sm sm:text-base font-medium tracking-wide">Expert Instructors</p>
            </div>
            <div className="py-2">
              <h3 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                <CountUp end={20} duration={2200} suffix="+" />
              </h3>
              <p className="text-gray-200 text-sm sm:text-base font-medium tracking-wide">Championships Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800">
                <img
                  src={aboutImage}
                  alt="Karate Training"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-red-600 rounded-2xl -z-10"></div>
            </div>
            {/* Right - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">About Us</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                Building Champions <br className="hidden sm:block" />Since 2019
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-5 max-w-lg mx-auto lg:mx-0">
                Karate UAE is a premier martial arts academy dedicated to teaching traditional karate techniques. Our experienced instructors guide students of all ages and skill levels on their martial arts journey.
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-[1.8] mb-8 max-w-lg mx-auto lg:mx-0">
                We focus on discipline, respect, and personal growth while developing physical fitness and self-defense skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Our Programs
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              Choose the perfect program to start your martial arts journey
            </p>
          </div>
          {/* 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Group Training */}
            <Link to="/gallery" className="group relative rounded-2xl overflow-hidden aspect-square shadow-xl">
              <img
                src={teensProgramImage}
                alt="Group Training"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Group Training</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-[1.8] mb-4">
                  Train alongside fellow students in an energetic class environment that builds discipline and teamwork.
                </p>
                <span className="inline-flex items-center text-red-500 font-semibold group-hover:text-red-400 transition-colors text-sm sm:text-base">
                  Learn More
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            {/* Private Training */}
            <Link to="/gallery" className="group relative rounded-2xl overflow-hidden aspect-square shadow-xl">
              <img
                src={kidsProgramImage}
                alt="Private Training"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Private Training</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-[1.8] mb-4">
                  Get focused, one-on-one coaching tailored to your pace, goals, and skill level.
                </p>
                <span className="inline-flex items-center text-red-500 font-semibold group-hover:text-red-400 transition-colors text-sm sm:text-base">
                  Learn More
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-red-500 font-semibold text-sm tracking-widest uppercase mb-4">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              The Karate UAE Advantage
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.8]">
              Experience world-class training in a supportive environment
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-600 transition-all duration-300 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">Certified Instructors</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8] max-w-[220px]">Trained and certified black belt instructors with years of experience</p>
            </div>
            <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-600 transition-all duration-300 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">Flexible Schedule</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8] max-w-[220px]">Multiple class times to fit your busy lifestyle</p>
            </div>
            <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-600 transition-all duration-300 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">All Skill Levels</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8] max-w-[220px]">Programs for beginners to advanced practitioners</p>
            </div>
            <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-600 transition-all duration-300 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">Modern Facility</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-[1.8] max-w-[220px]">State-of-the-art training facility with all equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">
            Join Karate UAE today and discover the transformative power of martial arts. Your first class is free!
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

export default Home