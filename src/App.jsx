import PillNav from './components/PillNav'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import ContainerScroll from './components/ContainerScroll'
import About from './components/About'
import Services from './components/Services'
import InteractiveBentoGallery from './components/InteractiveBentoGallery'
import Differentials from './components/Differentials'
import TeamSection from './components/TeamSection'
import BookingSection from './components/BookingSection'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import TestimonialCarousel from './components/TestimonialCarousel'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <>
      <ScrollProgress />
      <PillNav />
      <main>
        <Hero />
        <StatsBar />
        <ContainerScroll />
        <About />
        <Services />
        <InteractiveBentoGallery />
        <Differentials />
        <TeamSection />
        <BookingSection />
        <CTASection />
        <Contact />
        <FAQ />
        <TestimonialCarousel />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default App
