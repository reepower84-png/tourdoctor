'use client'

export default function JejuSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById('inquiry-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    '항공',
    '숙박2박',
    '렌터카 48시간 또는 버스 패키지 투어 중 선택',
    "제주도 여행 불가 시 '천연 다이어몬드 목걸이' 회원가로 교환 가능",
  ]

  return (
    <section id="jeju" className="min-h-screen py-20 bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm mb-4">
              BEST SELLER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              제주도 여행상품권
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              아름다운 제주도에서 특별한 추억을 만들어 보세요.<br />
              제주여행 2박3일 제공
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              제주도 상품권 문의하기
            </button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🏝️</div>
                <h3 className="text-2xl font-bold mb-2">제주도 여행상품권</h3>
                <p className="text-blue-100 mb-6">제주의 모든 것을 담다</p>
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-2xl font-bold mb-2">1장당 3,900원</div>
                  <div className="text-blue-100">(최소수량 100장)</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg">
              대량구매 할인!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
