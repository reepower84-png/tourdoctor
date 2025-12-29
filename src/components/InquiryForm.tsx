'use client'

import { useState } from 'react'

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                placeholder="이름을 입력해 주세요"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                구매문의 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900"
                placeholder="원하시는 상품권 종류, 수량, 용도 등을 자유롭게 작성해 주세요."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:cursor-not-allowed"
            >
              {isSubmitting ? '문의 접수 중...' : '문의 접수하기'}
            </button>
          </form>

          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center">
              문의가 성공적으로 접수되었습니다. 빠른 시간 내에 연락드리겠습니다!
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-center">
              문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.
            </div>
          )}
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
            <a
              href="http://pf.kakao.com/_AnEEj/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-full transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.653 1.725 4.986 4.348 6.342-.188.707-.683 2.561-.783 2.957-.124.492.181.485.381.353.157-.103 2.502-1.697 3.514-2.388.505.073 1.024.111 1.54.111 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
              </svg>
              카카오톡 상담
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
