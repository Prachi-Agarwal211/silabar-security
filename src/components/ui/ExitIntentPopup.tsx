'use client'

import { useState, useEffect } from 'react'
import { X, Phone, MessageSquare } from 'lucide-react'
import { CONTACT } from '@/lib/config'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Desktop exit intent only (mouse leave top). Skip touch devices.
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed && !sessionStorage.getItem('exit-popup-seen')) {
        setShow(true)
        sessionStorage.setItem('exit-popup-seen', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [dismissed])

  if (!show || dismissed) return null

  return (
    <div className="exit-popup-overlay exit-popup-overlay--visible" onClick={() => setDismissed(true)} role="dialog" aria-modal="true" aria-labelledby="exit-popup-title">
      <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="exit-popup__close" onClick={() => setDismissed(true)} aria-label="Close">
          <X size={20} />
        </button>
        <div className="exit-popup__content">
          <h3 id="exit-popup-title" className="exit-popup__title">Wait! Get a Free Security Assessment</h3>
          <p className="exit-popup__desc">
            Before you go — our security experts can evaluate your facility risk for free. No obligations.
          </p>
          <div className="exit-popup__ctas">
            <a href={`tel:${CONTACT.phoneRaw}`} className="exit-popup__btn exit-popup__btn--primary">
              <Phone size={16} /> Call Now
            </a>
            <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="exit-popup__btn exit-popup__btn--secondary">
              <MessageSquare size={16} /> WhatsApp
            </a>
          </div>
          <p className="exit-popup__trust">
            ISO 9001:2015 Certified · 7,000+ Professionals · 200+ Cities
          </p>
        </div>
      </div>
    </div>
  )
}
