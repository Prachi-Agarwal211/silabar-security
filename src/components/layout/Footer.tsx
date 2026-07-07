export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Silbar Security</div>
          <p className="footer-tagline">
            Professional security services. Veteran-led, tech-enabled, Pan-India.
            Zero compromise.
          </p>
        </div>

        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            <li><a href="#services" className="footer-link">Armed Response</a></li>
            <li><a href="#services" className="footer-link">VIP Protection</a></li>
            <li><a href="#services" className="footer-link">Event Security</a></li>
            <li><a href="#services" className="footer-link">Corporate Guarding</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#about" className="footer-link">Careers</a></li>
            <li><a href="#about" className="footer-link">Blog</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="tel:+919876543210" className="footer-link">+91 98765 43210</a></li>
            <li><a href="mailto:info@silbar.in" className="footer-link">info@silbar.in</a></li>
            <li><span className="footer-link">Delhi | Mumbai | Bangalore</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Silbar Security. All rights reserved.
        </span>
        <span className="footer-copyright">
          Designed with zero compromise.
        </span>
      </div>
    </footer>
  )
}
