import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// Import images
import galleryImg1 from '../assets/IMG-20260705-WA0053.jpg'
import galleryImg2 from '../assets/IMG-20260705-WA0054.jpg'
import galleryImg3 from '../assets/IMG-20260705-WA0055.jpg'
import galleryImg4 from '../assets/IMG-20260705-WA0056.jpg'
import galleryImg5 from '../assets/IMG-20260705-WA0057.jpg'
import galleryImg6 from '../assets/IMG-20260705-WA0058.jpg'
import galleryImg7 from '../assets/IMG-20260705-WA0059.jpg'
import galleryImg8 from '../assets/IMG-20260705-WA0060.jpg'
import galleryImg9 from '../assets/IMG-20260705-WA0074.jpg'
import galleryImg10 from '../assets/IMG-20260705-WA0075.jpg'
import galleryImg11 from '../assets/IMG-20260705-WA0077.jpg'
import galleryImg12 from '../assets/IMG-20260708-WA0285.jpg'
import galleryImg13 from '../assets/IMG-20260708-WA0291.jpg'
import galleryImg14 from '../assets/IMG-20260709-WA0012.jpg'
import galleryImg15 from '../assets/IMG-20260709-WA0013.jpg'
import galleryImg16 from '../assets/IMG-20260709-WA0036.jpg'
import galleryImg17 from '../assets/IMG-20260709-WA0014.jpg'
import galleryImg18 from '../assets/IMG-20260709-WA0015.jpg'
import galleryImg19 from '../assets/IMG-20260709-WA0016.jpg'
import galleryImg20 from '../assets/IMG-20260709-WA0017.jpg'
import galleryImg21 from '../assets/IMG-20260709-WA0018.jpg'
import galleryImg22 from '../assets/IMG-20260709-WA0019.jpg'
import galleryImg23 from '../assets/IMG-20260709-WA0020.jpg'
import galleryImg24 from '../assets/IMG-20260709-WA0022.jpg'
import galleryImg25 from '../assets/IMG-20260709-WA0023.jpg'
import galleryImg26 from '../assets/IMG-20260709-WA0024.jpg'
import galleryImg27 from '../assets/IMG-20260709-WA0026.jpg'
import galleryImg28 from '../assets/IMG-20260709-WA0027.jpg'
import galleryImg29 from '../assets/IMG-20260709-WA0028.jpg'
import galleryImg30 from '../assets/IMG-20260709-WA0029.jpg'
import galleryImg31 from '../assets/IMG-20260709-WA0030.jpg'
import galleryImg32 from '../assets/IMG-20260709-WA0031.jpg'
import galleryImg33 from '../assets/IMG-20260709-WA0032.jpg'
import galleryImg34 from '../assets/IMG-20260709-WA0033.jpg'
import galleryImg35 from '../assets/IMG-20260709-WA0034.jpg'
import galleryImg36 from '../assets/IMG-20260709-WA0035.jpg'
import galleryImg37 from '../assets/IMG-20260709-WA0037.jpg'
import galleryImg38 from '../assets/WhatsApp Image 2026-07-11 at 11.27.13 AM (2).jpeg'

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

// Gallery data
const galleryImages = [
  { id: 1, title: 'Partner Kick Drill', description: 'Practicing high kicks and blocks together in pairs', image: galleryImg1 },
  { id: 2, title: 'Focused Punch Stance', description: 'Sharp form and concentration during class', image: galleryImg2 },
  { id: 3, title: 'Proud Beginner', description: 'Celebrating the start of a martial arts journey', image: galleryImg3 },
  { id: 4, title: 'Kihon Fighting Stance', description: 'Building strong basics through disciplined practice', image: galleryImg4 },
  { id: 5, title: 'Tournament Stance', description: 'Representing the UAE with focus and pride', image: galleryImg5 },
  { id: 6, title: 'Kata Focus', description: 'Perfecting traditional forms with precision', image: galleryImg6 },
  { id: 7, title: 'Championship Focus', description: 'Sharp concentration in front of the crowd', image: galleryImg7 },
  { id: 8, title: 'Front Kick Practice', description: 'Conditioning and technique training in the dojo', image: galleryImg8 },
  { id: 9, title: 'Confident Smile', description: 'The pride that comes with every belt earned', image: galleryImg9 },
  { id: 10, title: 'Belt Tying Moment', description: 'A proud milestone in a young student\'s journey', image: galleryImg10 },
  { id: 11, title: 'Ready for Class', description: 'Gearing up for another session of training', image: galleryImg11 },
  { id: 12, title: 'Standing at Attention', description: 'Discipline and focus before training begins', image: galleryImg12 },
  { id: 13, title: 'Our Karate Family', description: 'Students and instructors together at Al Muharib Karate Centre', image: galleryImg13 },
  { id: 14, title: 'Warm-Up Drill', description: 'Building strength and discipline as a class', image: galleryImg14 },
  { id: 15, title: 'Flexibility & Focus', description: 'Demonstrating strength, balance, and technique', image: galleryImg15 },
  { id: 16, title: 'Rising Block Technique', description: 'Practicing precise defensive technique', image: galleryImg16 },
  { id: 17, title: 'Sharp Guard', description: 'Focused stance during class drills', image: galleryImg17 },
  { id: 18, title: 'Palm Block Stance', description: 'Demonstrating a strong open-hand technique', image: galleryImg18 },
  { id: 19, title: 'Twin High Kick', description: 'Kicking in unison during partner drills', image: galleryImg19 },
  { id: 20, title: 'Steady Focus', description: 'A calm, composed stance before the next move', image: galleryImg20 },
  { id: 21, title: 'Forward Stance', description: 'Building a strong base with proper form', image: galleryImg21 },
  { id: 22, title: 'Tire Conditioning Drill', description: 'Group strength and stance training with tires', image: galleryImg22 },
  { id: 23, title: 'Flexibility Bridge', description: 'Building flexibility through backbend stretches', image: galleryImg23 },
  { id: 24, title: 'Tournament Ready', description: 'Standing tall on the competition floor', image: galleryImg24 },
  { id: 25, title: 'Open Palm Strike', description: 'Precision and poise during technique practice', image: galleryImg25 },
  { id: 26, title: 'Gearing Up', description: 'Ready for sparring practice with protective gear', image: galleryImg26 },
  { id: 27, title: 'Class in Session', description: 'Instructor guiding the next generation of students', image: galleryImg27 },
  { id: 28, title: 'Together in Discipline', description: 'Training side by side as one team', image: galleryImg28 },
  { id: 29, title: 'Push-Up Conditioning', description: 'Building strength and endurance as a class', image: galleryImg29 },
  { id: 30, title: 'High Five', description: 'Celebrating a fellow student\'s progress', image: galleryImg30 },
  { id: 31, title: 'Solid Stance', description: 'Practicing balance and power in fighting stance', image: galleryImg31 },
  { id: 32, title: 'Pad Kick Drill', description: 'Sharpening kicking technique with focus mitts', image: galleryImg32 },
  { id: 33, title: 'Tournament Sparring', description: 'Competitive kumite in front of a cheering crowd', image: galleryImg33 },
  { id: 34, title: 'Group Pad Training', description: 'Building striking power together in class', image: galleryImg34 },
  { id: 35, title: 'Kicking in Sync', description: 'Precision teamwork during kicking drills', image: galleryImg35 },
  { id: 36, title: 'Certificate Presentation', description: 'Sensei Manoj Thomas honoring a student\'s achievement', image: galleryImg36 },
  { id: 37, title: 'Playful Flexibility', description: 'Young students showing off their stretching skills', image: galleryImg37 },
  { id: 38, title: 'Championship Kumite', description: 'Intense sparring action at a national tournament', image: galleryImg38 },
]

// 3D Image Card Component
function ImageCard3D({ item, onClick, index }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`mb-4 sm:mb-5 break-inside-avoid transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Tilt3DCard>
        <div
          onClick={() => onClick(item)}
          className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="block w-full h-auto group-hover:scale-110 transition-transform duration-700"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: 'translateZ(30px)' }}>
              <h3 className="text-white font-bold text-lg mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
              <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.description}</p>
            </div>
          </div>

          {/* 3D Zoom Icon */}
          <div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Tilt3DCard>
    </div>
  )
}

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const location = useLocation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
    setMousePosition({ x, y })
  }

  // Scroll to section based on hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

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
        </div>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* 3D Decorative Elements */}
        <div
          className="absolute top-20 right-20 w-24 h-24 border-2 border-red-600/20 rounded-2xl hidden lg:block animate-spin-slow"
          style={{ animationDuration: '20s' }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-16 h-16 bg-red-600/10 rounded-full hidden lg:block animate-float-medium"
        ></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className={`inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full mb-6 tracking-widest uppercase transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Gallery
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight transform transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our <span className="text-red-500 animate-glow">Moments</span>
          </h1>
          <p className={`text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-[1.8] transform transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Capturing the spirit of karate through training, competitions, and achievements across all age groups.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-28 bg-gray-950 scroll-mt-20 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5">
            {galleryImages.map((item, index) => (
              <ImageCard3D key={item.id} item={item} onClick={setSelectedImage} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Be Part of Our Story
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">
            Join Karate UAE and create your own memorable moments in martial arts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/contact#contact-form" className="w-full sm:w-auto border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-10 py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 tracking-wide text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-red-600 hover:bg-red-700 hover:rotate-90 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Tilt3DCard>
            <div
              className="max-w-5xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
                  style={{ transform: 'translateZ(30px)' }}
                />
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-400 text-base sm:text-lg">{selectedImage.description}</p>
              </div>
            </div>
          </Tilt3DCard>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Gallery
