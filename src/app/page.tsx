import Header from '@/components/Header'
import NoticeBanner from '@/components/NoticeBanner'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import JejuSection from '@/components/JejuSection'
import OverseasSection from '@/components/OverseasSection'
import HowToUse from '@/components/HowToUse'
import InquiryForm from '@/components/InquiryForm'
import Footer from '@/components/Footer'
import KakaoButton from '@/components/KakaoButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <NoticeBanner />
      <Hero />
      <Services />
      <JejuSection />
      <OverseasSection />
      <HowToUse />
      <InquiryForm />
      <Footer />
      <KakaoButton />
    </main>
  )
}
