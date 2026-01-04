import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(inquiry: { name: string; phone: string; message: string; created_at?: string }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('Discord webhook URL이 설정되지 않았습니다.')
    return
  }

  const embed = {
    title: '📬 새로운 문의가 접수되었습니다!',
    color: 0x5865F2, // Discord 블루
    fields: [
      {
        name: '👤 이름',
        value: inquiry.name,
        inline: true
      },
      {
        name: '📞 연락처',
        value: inquiry.phone,
        inline: true
      },
      {
        name: '💬 문의 내용',
        value: inquiry.message,
        inline: false
      }
    ],
    timestamp: inquiry.created_at || new Date().toISOString(),
    footer: {
      text: '투어닥터 문의 알림'
    }
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    })
  } catch (error) {
    console.error('Discord 알림 전송 실패:', error)
  }
}

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

    // Discord로 알림 전송 (비동기, 실패해도 문의 접수는 성공 처리)
    sendDiscordNotification(inquiry)

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: '삭제할 문의 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: '문의 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
