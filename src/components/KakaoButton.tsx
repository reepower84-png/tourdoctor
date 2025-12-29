'use client'

import { useState, useEffect } from 'react'

export default function KakaoButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <a
        href="tel:1600-7398"
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110"
        title="전화 상담"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
      <a
        href="http://pf.kakao.com/_AnEEj/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full shadow-lg transition-all hover:scale-110"
        title="카카오톡 상담"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.653 1.725 4.986 4.348 6.342-.188.707-.683 2.561-.783 2.957-.124.492.181.485.381.353.157-.103 2.502-1.697 3.514-2.388.505.073 1.024.111 1.54.111 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
        </svg>
      </a>
    </div>
  )
}
