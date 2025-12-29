'use client'

export default function OverseasSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById('inquiry-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const destinations = [
    { emoji: '🇱🇦', name: '라오스' },
    { emoji: '🇻🇳', name: '베트남' },
    { emoji: '🇹🇭', name: '태국' },
    { emoji: '🇨🇳', name: '중국' },
  ]

  return (
    <section id="overseas" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                >
                  <div className="text-4xl mb-2">{dest.emoji}</div>
                  <div className="text-sm font-medium">{dest.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-300 font-semibold rounded-full text-sm mb-4">
              GLOBAL TRAVEL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              해외 여행상품권
            </h2>
            <p className="text-lg text-blue-100 mb-4">
              이제 해외여행은 항공료만으로 가실 수 있습니다.
            </p>
            <p className="text-xl font-semibold text-white mb-4">
              숙박, 관광, 식사 제공 패키지 여행권
            </p>
            <p className="text-sm text-blue-200 mb-6">
              ※ 불포함 사항: 항공, 가이드, 기사 팁 별도, 개인경비, 각종 매너 팁, 필수 선택관광, 쇼핑 등
            </p>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-8">
              <div className="text-2xl font-bold text-yellow-300 mb-1">1장당 20,000원</div>
              <div className="text-blue-100">(최소 수량 별도 문의)</div>
            </div>
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              해외 상품권 문의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
