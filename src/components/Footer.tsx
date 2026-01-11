import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/ChatGPT_Image_2026년_1월_11일_오후_10_03_11_가로-removebg-preview.png"
              alt="투어닥터"
              width={180}
              height={60}
              className="h-14 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4">
              제주도 & 해외 여행상품권 전문 판매<br />
              합리적인 가격으로 특별한 여행을 선물하세요.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:1600-7398" className="hover:text-white transition-colors">
                  1600-7398
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.653 1.725 4.986 4.348 6.342-.188.707-.683 2.561-.783 2.957-.124.492.181.485.381.353.157-.103 2.502-1.697 3.514-2.388.505.073 1.024.111 1.54.111 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
                </svg>
                <a
                  href="http://pf.kakao.com/_AnEEj/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  카카오톡 상담
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">회사 정보</h4>
            <p className="text-gray-400 text-sm">
              상호: 제이코리아, 대표: 이주영, 사업자등록번호: 278-30-01540, 주소: 인천광역시 계양구 오조산로57번길 15, 7층 7106호
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 투어닥터. All rights reserved.</p>
          <p className="mt-1">제이코리아</p>
        </div>
      </div>
    </footer>
  )
}
