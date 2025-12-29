import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해 주세요.' },
        { status: 400 }
      )
    }

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert([{ name, phone, message }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 접수 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, inquiry },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: inquiries, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 목록을 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: '문의 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
