export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Silbar Security</div>
          <p className="footer-tagline">
            Professional Security Wasn't Available...<br />So We Fixed It.®
          </p>
        </div>

        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            <li><a href="#services" className="footer-link">Guarding Services</a></li>
            <li><a href="#services" className="footer-link">Event Security</a></li>
            <li><a href="#services" className="footer-link">Electronic Surveillance</a></li>
            <li><a href="#services" className="footer-link">Risk Assessment</a></li>
            <li><a href="#services" className="footer-link">Facility Management</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
            <li><a href="#industries" className="footer-link">Industries</a></li>
            <li><a href="#quote" className="footer-link">Get Quote</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="tel:+919352303333" className="footer-link">+91 93523 03333</a></li>
            <li><a href="tel:+911412223334" className="footer-link">+91-141222 3334</a></li>
            <li><a href="mailto:info@silbarsecurity.in" className="footer-link">info@silbarsecurity.in</a></li>
            <li><span className="footer-link">Jaipur | Delhi | Ahmedabad | PAN India</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Silbar Security Services Pvt. Ltd. All rights reserved.
        </span>
        <span className="footer-copyright">
          ISO 9001:2015 &amp; PSARA-2005 Certified
        </span>
      </div>
    </footer>
  )
}