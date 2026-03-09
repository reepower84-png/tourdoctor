'use client'

export default function InquiryForm() {
  return (
    <section id="inquiry-form" className="min-h-screen py-20 bg-white flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            문의하기
          </h2>
          <p className="text-lg text-gray-600">
            궁금한 점이 있으시면 언제든 문의해 주세요.<br />
            빠른 시간 내에 답변 드리겠습니다.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <a
            href="http://pf.kakao.com/_AnEEj/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-xl text-lg transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.653 1.725 4.986 4.348 6.342-.188.707-.683 2.561-.783 2.957-.124.492.181.485.381.353.157-.103 2.502-1.697 3.514-2.388.505.073 1.024.111 1.54.111 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
            </svg>
            카카오톡 문의하기
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">또는 직접 연락해 주세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1600-7398"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1600-7398
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
