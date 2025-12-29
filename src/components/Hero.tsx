'use client'

import Image from 'next/image'

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('inquiry-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative text-white min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
        alt="제주도 푸른 바다"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          여행의 시작,<br />
          <span className="text-yellow-300">투어닥터</span>와 함께
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90 drop-shadow">
          제주도 & 해외 여행상품권 전문 판매
        </p>
        <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto drop-shadow">
          합리적인 가격으로 특별한 여행을 선물하세요.<br />
          기업 복지, 경품, 선물용으로 최고의 선택!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            지금 바로 문의하기
          </button>
          <a
            href="tel:1600-7398"
            className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full text-lg transition-all border-2 border-white/50 backdrop-blur-sm"
          >
            1600-7398
          </a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-6 px-4">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">10+</div>
            <div className="text-sm text-white/80">년 경력</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-6 px-4">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">5,000+</div>
            <div className="text-sm text-white/80">고객사</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-6 px-4">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">100%</div>
            <div className="text-sm text-white/80">고객 만족</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
