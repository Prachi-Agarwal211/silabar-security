import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'


export const metadata: Metadata = {
  title: 'Contact Us — Call or WhatsApp Silbar Security',
  description:
    'Contact Silbar Security Services for a free security consultation and quote. Call +91 93523 03333 or email info@silbarsecurity.in. Offices in Jaipur, Delhi, and Ahmedabad.',
  alternates: { canonical: 'https://www.silbarsecurity.in/contact' },
}

export default function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="contact-hero">
        <ScrollReveal className="contact-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Contact</span>
          </nav>
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1 className="contact-title">
            <SplitTextReveal text="REQUEST A" />
            <br />
            <span className="contact-title--outline">
              <SplitTextReveal text="FREE QUOTE" delay={0.2} />
            </span>
          </h1>
          <p className="contact-subtitle">
            Tell us about your facility. Our security consultants will
            respond within 2 business hours.
          </p>
        </ScrollReveal>
      </section>

      <section className="contact-body">
        <div className="contact-body__inner">

          {/* Contact cards */}
          <ScrollReveal delay={0.2} className="contact-cards">
            <a href="tel:+919352303333" className="contact-card">
              <div className="contact-card__icon"><Phone size={20} /></div>
              <div className="contact-card__label">CALL US DIRECTLY</div>
              <div className="contact-card__value">+91 93523 03333</div>
              <div className="contact-card__note">Mon–Sat, 9AM–7PM IST</div>
            </a>
            <a href="tel:+911412223334" className="contact-card">
              <div className="contact-card__icon"><Phone size={20} /></div>
              <div className="contact-card__label">LANDLINE</div>
              <div className="contact-card__value">+91-141 222 3334</div>
              <div className="contact-card__note">Jaipur Head Office</div>
            </a>
            <a href="mailto:info@silbarsecurity.in" className="contact-card">
              <div className="contact-card__icon"><Mail size={20} /></div>
              <div className="contact-card__label">EMAIL US</div>
              <div className="contact-card__value">info@silbarsecurity.in</div>
              <div className="contact-card__note">Response within 4 hours</div>
            </a>
            <a
              href="https://wa.me/919352303333"
              className="contact-card contact-card--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card__icon"><MessageCircle size={20} /></div>
              <div className="contact-card__label">WHATSAPP</div>
              <div className="contact-card__value">Instant Quote</div>
              <div className="contact-card__note">Available 24/7</div>
            </a>
          </ScrollReveal>

          {/* Lead form */}
          <ScrollReveal delay={0.4}>
            <div className="contact-form-alternative">
              <h2 className="contact-form__title">Ready for a Quote?</h2>
              <p className="contact-form__desc">
                We provide instant quotes over WhatsApp or phone. No waiting for forms.
              </p>
              <div className="contact-form__ctas">
                <a 
                  href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card--whatsapp-btn"
                >
                  <MessageCircle size={20} /> Get Instant Quote via WhatsApp
                </a>
                <a 
                  href="tel:+919352303333"
                  className="contact-card--call-btn"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Office locations */}
          <ScrollReveal delay={0.6} className="contact-offices">
            <h2 className="contact-offices__title">Our Offices</h2>
            <div className="contact-offices__grid">
              {[
                { city: 'Jaipur (HQ)', address: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001' },
                { city: 'Delhi NCR', address: 'Corporate Office, New Delhi — 110001' },
                { city: 'Ahmedabad', address: 'Ahmedabad, Gujarat — 380001' },
              ].map(({ city, address }) => (
                <div key={city} className="contact-office">
                  <div className="contact-office__city">
                    <MapPin size={14} className="contact-office__icon" />
                    {city}
                  </div>
                  <p className="contact-office__address">{address}</p>
                  <div className="contact-office__hours">
                    <Clock size={12} /> Mon–Sat: 9:00 AM – 7:00 PM
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>
    </main>
  )
}
