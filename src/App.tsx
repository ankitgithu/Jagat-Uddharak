import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { DailyLive } from './components/DailyLive';
import { SpiritualKnowledge } from './components/SpiritualKnowledge';
import { HolyScriptures } from './components/HolyScriptures';
import { SocialReforms } from './components/SocialReforms';
import { AnnapurnaMuhim } from './components/AnnapurnaMuhim';
import { BooksSection } from './components/BooksSection';
import { VideoSection } from './components/VideoSection';
import { GallerySection } from './components/GallerySection';
import { AboutSantRampalJi } from './components/AboutSantRampalJi';
import { OfficialWebsiteSection } from './components/OfficialWebsiteSection';
import { LatestUpdates } from './components/LatestUpdates';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { Footer } from './components/Footer';
import { AnimatedSection } from './components/AnimatedSection';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const sections = [
      'hero',
      'introduction',
      'daily-live',
      'spiritual-knowledge',
      'holy-scriptures',
      'social-reforms',
      'annapurna-muhim',
      'books',
      'featured-media',
      'videos',
      'gallery',
      'about-guruji',
      'updates',
      'faq',
      'contact',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2124]">
      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Sticky Modern Navbar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Cinematic YouTube Video Carousel at the Top) */}
        <Hero
          onExploreClick={() => scrollToSection('introduction')}
          onVideoClick={() => scrollToSection('videos')}
        />

        {/* 2. Introduction Section (ज्ञान से सेवा तक) */}
        <AnimatedSection>
          <Introduction onLearnMore={() => scrollToSection('about-guruji')} />
        </AnimatedSection>

        {/* 3. Daily Live Section (प्रतिदिन शाम 7:30 बजे LIVE) */}
        <AnimatedSection>
          <DailyLive />
        </AnimatedSection>

        {/* 4. Spiritual Knowledge Section (आध्यात्मिक ज्ञान) */}
        <AnimatedSection>
          <SpiritualKnowledge />
        </AnimatedSection>

        {/* 5. Holy Scriptures Section (पवित्र ग्रंथ) */}
        <AnimatedSection>
          <HolyScriptures />
        </AnimatedSection>

        {/* 6. Social Reforms Section (समाज सुधार) */}
        <AnimatedSection>
          <SocialReforms />
        </AnimatedSection>

        {/* 7. Annapurna Muhim Section (अन्नपूर्णा मुहिम) */}
        <AnimatedSection>
          <AnnapurnaMuhim />
        </AnimatedSection>

        {/* 8. Books Digital Library Section (पुस्तकें) */}
        <AnimatedSection>
          <BooksSection />
        </AnimatedSection>

        {/* 9. Video Library Section (वीडियो - Factful Debates, Annapurna Muhim, SA True Story) */}
        <AnimatedSection>
          <VideoSection />
        </AnimatedSection>

        {/* 10. Photo Gallery Section (फोटो गैलरी / नवीनतम चित्र) */}
        <AnimatedSection>
          <GallerySection />
        </AnimatedSection>

        {/* 11. About Sant Rampal Ji Maharaj (संत रामपाल जी महाराज के बारे में) */}
        <AnimatedSection>
          <AboutSantRampalJi />
        </AnimatedSection>

        {/* 12. Single Authorized Official Website Portal Section */}
        <AnimatedSection>
          <OfficialWebsiteSection />
        </AnimatedSection>

        {/* 13. Latest Updates Section (नवीनतम अपडेट) */}
        <AnimatedSection>
          <LatestUpdates />
        </AnimatedSection>

        {/* 14. FAQ Section (अक्सर पूछे जाने वाले प्रश्न) */}
        <AnimatedSection>
          <FAQSection />
        </AnimatedSection>

        {/* 15. Contact & Ashram Section (संपर्क करें) */}
        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>

        {/* 16. Social Media Connect Section (हमसे जुड़ें) */}
        <AnimatedSection>
          <SocialMediaSection />
        </AnimatedSection>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
