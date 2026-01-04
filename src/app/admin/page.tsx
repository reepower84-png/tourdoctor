'use client'

import { useState, useEffect } from 'react'

interface Inquiry {
  id: number
  name: string
  phone: string
  message: string
  status: string
  created_at: string
}

const STATUS_OPTIONS = ['대기중', '연락완료', '상담완료'] as const
const STATUS_COLORS: Record<string, string> = {
  '대기중': 'bg-yellow-100 text-yellow-800',
  '연락완료': 'bg-blue-100 text-blue-800',
  '상담완료': 'bg-green-100 text-green-800',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [fetchError, setFetchError] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('전체')

  const filteredInquiries = statusFilter === '전체'
    ? inquiries
    : inquiries.filter(inquiry => (inquiry.status || '대기중') === statusFilter)

  const getStatusCount = (status: string) => {
    if (status === '전체') return inquiries.length
    return inquiries.filter(inquiry => (inquiry.status || '대기중') === status).length
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError('')

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        fetchInquiries()
      } else {
        const data = await response.json()
        setAuthError(data.error || '인증에 실패했습니다.')
      }
    } catch {
      setAuthError('인증 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiry')
      if (response.ok) {
        const data = await response.json()
        setInquiries(data)
      } else {
        setFetchError('문의 목록을 불러오는 데 실패했습니다.')
      }
    } catch {
      setFetchError('문의 목록을 불러오는 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries()
    }
  }, [isAuthenticated])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingStatusId(id)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (response.ok) {
        setInquiries(inquiries.map(inquiry =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        ))
      } else {
        const data = await response.json()
        alert(data.error || '상태 변경에 실패했습니다.')
      }
    } catch {
      alert('상태 변경 중 오류가 발생했습니다.')
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/inquiry?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setInquiries(inquiries.filter(inquiry => inquiry.id !== id))
      } else {
        const data = await response.json()
        alert(data.error || '삭제에 실패했습니다.')
      }
    } catch {
      alert('삭제 중 오류가 발생했습니다.')
    } finally {
      setDeletingId(null)
      setDeleteConfirmId(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">투어닥터 관리자 페이지</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                placeholder="관리자 비밀번호를 입력하세요"
                required
              />
            </div>
            {authError && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                {authError}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">투어닥터 관리자</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                문의 목록 ({filteredInquiries.length}건)
              </h2>
              <button
                onClick={fetchInquiries}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                새로고침
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['전체', ...STATUS_OPTIONS].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? status === '전체'
                        ? 'bg-gray-800 text-white'
                        : status === '대기중'
                        ? 'bg-yellow-500 text-white'
                        : status === '연락완료'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status} ({getStatusCount(status)})
                </button>
              ))}
            </div>
          </div>

          {fetchError && (
            <div className="p-4 bg-red-50 text-red-700 text-center">
              {fetchError}
            </div>
          )}

          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {statusFilter === '전체' ? '아직 접수된 문의가 없습니다.' : `'${statusFilter}' 상태의 문의가 없습니다.`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      문의 내용
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접수일시
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry, index) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {filteredInquiries.length - index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                        <div className="truncate" title={inquiry.message}>
                          {inquiry.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <select
                          value={inquiry.status || '대기중'}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          disabled={updatingStatusId === inquiry.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 ${STATUS_COLORS[inquiry.status || '대기중'] || STATUS_COLORS['대기중']}`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {deleteConfirmId === inquiry.id ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDelete(inquiry.id)}
                              disabled={deletingId === inquiry.id}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs rounded transition-colors"
                            >
                              {deletingId === inquiry.id ? '삭제중...' : '확인'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              disabled={deletingId === inquiry.id}
                              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 text-xs rounded transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(inquiry.id)}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs rounded transition-colors"
                          >
                            삭제
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
