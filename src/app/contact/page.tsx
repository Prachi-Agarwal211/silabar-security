import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import MagneticButton from '@/components/animations/MagneticButton'

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Security Quote',
  description:
    'Contact Silbar Security Services for a free security consultation and quote. Call +91 93523 03333 or email info@silbarsecurity.in. Offices in Jaipur, Delhi, and Ahmedabad.',
  alternates: { canonical: 'https://www.silbarsecurity.in/contact' },
}

export default function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="contact-hero">
        <ScrollReveal className="contact-hero__inner">
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
              <div className="contact-card__icon"><Shield size={20} /></div>
              <div className="contact-card__label">WHATSAPP</div>
              <div className="contact-card__value">Instant Quote</div>
              <div className="contact-card__note">Available 24/7</div>
            </a>
          </ScrollReveal>

          {/* Lead form */}
          <ScrollReveal delay={0.4}>
            <form
            className="contact-form"
            id="quote-form"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <h2 className="contact-form__title">Get a Free Quote</h2>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label">Your Name *</label>
                <input id="name" name="name" type="text" required className="contact-form__input" placeholder="Full Name" />
              </div>
              <div className="contact-form__field">
                <label htmlFor="company" className="contact-form__label">Company / Organization *</label>
                <input id="company" name="company" type="text" required className="contact-form__input" placeholder="Company Name" />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="phone" className="contact-form__label">Phone Number *</label>
                <input id="phone" name="phone" type="tel" required className="contact-form__input" placeholder="+91 9XXXXXXXXX" />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">Email Address</label>
                <input id="email" name="email" type="email" className="contact-form__input" placeholder="email@company.com" />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="service" className="contact-form__label">Service Required *</label>
              <select id="service" name="service" required className="contact-form__select">
                <option value="">Select a Service</option>
                <option value="manned-guarding">Manned Guarding</option>
                <option value="industrial-security">Industrial Security</option>
                <option value="event-security">Event & VIP Security</option>
                <option value="bank-atm">Bank & ATM Security</option>
                <option value="surveillance">Electronic Surveillance / CCTV</option>
                <option value="facility-management">Facility Management</option>
                <option value="risk-assessment">Risk Assessment</option>
                <option value="manpower">Manpower Solutions</option>
                <option value="background-check">KYC / Background Checks</option>
                <option value="other">Other / Multiple Services</option>
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="city" className="contact-form__label">City / Location *</label>
              <input id="city" name="city" type="text" required className="contact-form__input" placeholder="City where security is needed" />
            </div>

            <div className="contact-form__field">
              <label htmlFor="message" className="contact-form__label">Describe Your Requirement</label>
              <textarea
                id="message"
                name="message"
                className="contact-form__textarea"
                rows={4}
                placeholder="Number of guards needed, type of facility, shift requirements..."
              />
            </div>

            <MagneticButton>
              <button type="submit" className="contact-form__submit">
                Request Free Quote
              </button>
            </MagneticButton>

            <p className="contact-form__note">
              <Shield size={12} /> No spam. Your information is confidential and used only to contact you about your security requirements.
            </p>
          </form>
          </ScrollReveal>

          {/* Office locations */}
          <ScrollReveal delay={0.6} className="contact-offices">
            <h2 className="contact-offices__title">Our Offices</h2>
            <div className="contact-offices__grid">
              {[
                { city: 'Jaipur (HQ)', address: 'Head Office Address, Jaipur, Rajasthan 302001' },
                { city: 'Delhi NCR', address: 'Office Address, New Delhi 110001' },
                { city: 'Ahmedabad', address: 'Office Address, Ahmedabad, Gujarat 380001' },
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
