import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, MapPin, Menu, Pause, Phone, Play, ShieldCheck, X } from 'lucide-react';
import logo from '@/assets/yashna-logo-transparent.png';
import { contactNumbers, products, whatsappLink, type Product } from '@/data/products';

const featuredSlides = [
  {
    product: products[0],
    caption: 'A clear view, with a little more peace of mind.',
  },
  {
    product: products[2],
    caption: 'A neat, measured fit for open balconies.',
  },
  {
    product: products[7],
    caption: 'Room to practice. Space to play with confidence.',
  },
];

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Margao+Railway+Station%2C+Goa%2C+India';

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useReveal();
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesPaused, setSlidesPaused] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slidesPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % featuredSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slidesPaused]);

  useEffect(() => {
    if (!selected) return;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previousFocus.current?.focus();
    };
  }, [selected]);

  const openProduct = (product: Product) => {
    setSlidesPaused(true);
    setSelected(product);
  };
  const closeMenu = () => setMenuOpen(false);
  const jumpToProducts = () => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site grain">
      <div className="site-watermark" aria-hidden="true"><img src={logo} alt="" /></div>
      <div className="topline"><span>Made for the comfort of home</span><span className="topline-right">Margao · Goa · Home safety, thoughtfully fitted</span></div>
      <header className="header">
        <div className="shell header-inner">
          <a className="brand" href="#home" aria-label="Yashna Nets home">
            <img src={logo} alt="" />
            <span className="brand-word">YASHNA <small>SAFETY NETS &amp; INVISIBLE GRILLS</small></span>
          </a>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a href="#solutions" onClick={closeMenu}>Our solutions</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>
            <a href="#questions" onClick={closeMenu}>FAQs</a>
            <a className="nav-call" href={`tel:${contactNumbers[0].tel}`}><Phone size={15} /> Call us</a>
          </nav>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="overline"><span className="overline-line" /> A little more peace at home</div>
              <h1 className="serif">The view stays.<br /><em>The worry goes.</em></h1>
              <p className="hero-intro">Thoughtfully fitted safety nets and invisible grills, made to protect the people and moments you love—without closing your home in.</p>
              <div className="hero-actions">
                <button className="button button-dark" onClick={jumpToProducts}>Explore solutions <ArrowRight size={17} /></button>
                <a className="text-link" href={whatsappLink('Hello Yashna Nets, I would like to know about home safety solutions.')}>Talk to our team <ArrowRight size={15} /></a>
              </div>
              <div className="hero-proof"><span className="proof-icon"><ShieldCheck size={20} /></span><span><strong>Measured for your home.</strong><br />Fitted with care, right down to the details.</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                  {featuredSlides.map((slide, index) => (
                    <img
                      key={slide.product.slug}
                      className={activeSlide === index ? 'hero-slide-image is-active' : 'hero-slide-image'}
                      src={slide.product.image}
                      alt={activeSlide === index ? slide.product.imageAlt : ''}
                      aria-hidden={activeSlide !== index}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ))}
                  <div className="hero-slide-tools">
                    <div className="hero-slide-dots" role="group" aria-label="Choose a featured solution">
                      {featuredSlides.map((slide, index) => (
                        <button
                          key={slide.product.slug}
                          type="button"
                          className={activeSlide === index ? 'hero-slide-dot is-active' : 'hero-slide-dot'}
                          aria-label={`Show ${slide.product.title} slide`}
                          aria-pressed={activeSlide === index}
                          data-testid={`button-hero-slide-${slide.product.slug}`}
                          onClick={() => setActiveSlide(index)}
                        />
                      ))}
                    </div>
                    <button
                      className="hero-slide-toggle"
                      type="button"
                      aria-label={slidesPaused ? 'Play featured slides' : 'Pause featured slides'}
                      title={slidesPaused ? 'Play featured slides' : 'Pause featured slides'}
                      data-testid="button-hero-slide-toggle"
                      onClick={() => setSlidesPaused((paused) => !paused)}
                    >
                      {slidesPaused ? <Play size={14} /> : <Pause size={14} />}
                    </button>
                  </div>
                  <div className="photo-caption">
                    <span>{featuredSlides[activeSlide].product.title}</span>
                    <span>{featuredSlides[activeSlide].caption}</span>
                    <button
                      className="hero-slide-more"
                      type="button"
                      aria-label={`More information about ${featuredSlides[activeSlide].product.title}`}
                      data-testid="button-hero-slide-more"
                      onClick={() => openProduct(featuredSlides[activeSlide].product)}
                    >
                      More info <ArrowRight size={14} />
                    </button>
                  </div>
              </div>
              <div className="hero-seal"><span>PROTECT<br />WHAT<br />MATTERS</span><span className="seal-star">✳</span></div>
              <div className="hero-note">A safe home<br /><i>still feels like home.</i></div>
            </div>
          </div>
          <div className="hero-bottom shell"><span>YASHNA NETS — HOME SAFETY, WITH HEART</span><a href="#solutions">Scroll to discover <ArrowDown size={14} /></a></div>
        </section>

        <section className="intro-section" id="approach">
          <div className="shell intro-grid">
            <p className="section-kicker reveal">SAFETY SHOULD FEEL LIKE HOME</p>
            <div className="intro-text reveal">
              <h2 className="serif">Carefully considered.<br /><em>Quietly reassuring.</em></h2>
              <p>Every home is different. We listen first, measure carefully, then recommend a solution that fits your space—so protection feels considered, not imposed.</p>
              <div className="intro-signoff"><span className="sign-line" /> The Yashna way</div>
            </div>
            <div className="intro-aside reveal"><div className="aside-number">01—03</div><p>From the first conversation to the final fit, we keep it straightforward, personal and tidy.</p></div>
          </div>
        </section>

        <section className="solutions-section" id="solutions">
          <div className="shell">
            <div className="section-heading reveal">
              <div><p className="section-kicker">PROTECTION, MADE PERSONAL</p><h2 className="serif">Find your kind<br /><em>of peace.</em></h2></div>
              <p className="heading-note">Explore our safety solutions.<br />Choose one to see how it could work<br />beautifully in your space.</p>
            </div>
            <div className="product-list">
              {products.map((product, index) => (
                <article className={`product-row reveal ${index % 2 ? 'row-reverse' : ''}`} key={product.slug}>
                  <button className="product-image" onClick={() => openProduct(product)} aria-label={`View details for ${product.title}`}>
                    <img src={product.image} alt={product.imageAlt} loading={index > 1 ? 'lazy' : 'eager'} />
                    <span className="image-index">{String(index + 1).padStart(2, '0')} / 10</span>
                    <span className="image-open"><ArrowRight size={19} /></span>
                  </button>
                  <div className="product-copy">
                    <p className="product-eyebrow"><span />{product.eyebrow}</p>
                    <h3 className="serif">{product.title}</h3>
                    <p className="product-summary">{product.summary}</p>
                    <p className="product-desc">{product.description}</p>
                    <button className="product-link" onClick={() => openProduct(product)}>Explore this solution <ArrowRight size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="promise-section">
          <div className="shell promise-inner">
            <div className="promise-top reveal"><p className="section-kicker">A GOOD FIT IS MORE THAN MEASUREMENTS</p><span>02 — OUR PROMISE</span></div>
            <h2 className="serif reveal">The details matter.<br /><em>So does how you feel.</em></h2>
            <div className="promise-points">
              <div className="promise-point reveal"><span className="point-num">01</span><h3>Thoughtful guidance</h3><p>We’ll help you understand the options and choose what makes sense for your home.</p></div>
              <div className="promise-point reveal"><span className="point-num">02</span><h3>Made to measure</h3><p>Your installation is planned around your actual space, not a one-size-fits-all template.</p></div>
              <div className="promise-point reveal"><span className="point-num">03</span><h3>Careful finishing</h3><p>Neat, attentive fitting that respects the look and feel of your home.</p></div>
            </div>
            <a className="promise-cta" href={whatsappLink('Hello Yashna Nets, I would like to arrange a home safety consultation.')}>Start with a conversation <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="steps-section">
          <div className="shell steps-layout">
            <div className="steps-title reveal"><p className="section-kicker">SIMPLE FROM THE START</p><h2 className="serif">A clear path<br /><em>to feeling safer.</em></h2><p>No pressure, no guesswork. Just a helpful conversation and a solution that suits your home.</p></div>
            <div className="steps-list">
              <div className="step reveal"><span>01</span><div><h3>Tell us what you need</h3><p>Share the space you’d like to protect and what matters most to you.</p></div><ArrowRight size={17} /></div>
              <div className="step reveal"><span>02</span><div><h3>We’ll find the right fit</h3><p>We’ll talk through suitable options and plan a careful measurement.</p></div><ArrowRight size={17} /></div>
              <div className="step reveal"><span>03</span><div><h3>Enjoy a little more ease</h3><p>Our team fits your chosen solution with care and attention to detail.</p></div><Check size={18} /></div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="questions">
          <div className="shell faq-layout">
            <div className="faq-heading reveal"><p className="section-kicker">GOOD QUESTIONS, HONEST ANSWERS</p><h2 className="serif">Before we<br /><em>get started.</em></h2><p>Something else on your mind? We’re happy to help.</p><a href={whatsappLink('Hello Yashna Nets, I have a question about your safety solutions.')}>Ask us directly <ArrowRight size={15} /></a></div>
            <div className="faq-list">
              <details className="faq-item reveal"><summary>Will a safety net block my view or airflow?<span>+</span></summary><p>Our netting is chosen and fitted to keep your space open and ventilated. Invisible grills use fine steel cables for a particularly unobstructed view.</p></details>
              <details className="faq-item reveal"><summary>How do I know which solution is right for me?<span>+</span></summary><p>Tell us about the area and who you want to protect. We’ll explain the options clearly and help you choose what suits your home.</p></details>
              <details className="faq-item reveal"><summary>Can you fit a solution to an unusual space?<span>+</span></summary><p>Yes. Each installation is planned around the dimensions and layout of your space, including balconies, windows, staircases and terraces.</p></details>
              <details className="faq-item reveal"><summary>How can I get a quote or arrange a visit?<span>+</span></summary><p>Call or message us on WhatsApp. We’ll learn a little about your needs and explain the next steps.</p></details>
            </div>
          </div>
        </section>

        <section className="contact-band">
          <div className="shell contact-inner">
            <div className="contact-mark">Y<span>✳</span></div>
            <div className="contact-copy"><p className="section-kicker">YOUR HOME, YOUR PEACE OF MIND</p><h2 className="serif">Let’s make room<br /><em>for feeling at ease.</em></h2></div>
            <div className="contact-actions"><a className="button button-cream" href={whatsappLink('Hello Yashna Nets, I would like to discuss a safety solution for my home.')}>Message on WhatsApp <ArrowRight size={17} /></a><a href={`tel:${contactNumbers[0].tel}`} className="contact-number"><Phone size={15} /> {contactNumbers[0].display}</a></div>
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="shell footer-main">
          <div className="footer-brand"><img src={logo} alt="" /><div><strong className="serif">Yashna Nets</strong><span>Safety nets &amp; invisible grills</span></div><p>Thoughtful protection for the spaces you call home.</p><a className="footer-address" href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open Margao Railway Station, Goa, India in Maps" data-testid="link-footer-location"><MapPin size={16} /><span>Margao Railway Station,<br />Goa, India</span><ArrowRight size={14} /></a></div>
          <div className="footer-nav"><h3>Explore</h3><a href="#solutions">Our solutions</a><a href="#approach">Our approach</a><a href="#questions">FAQs</a></div>
          <div className="footer-nav"><h3>Reach us</h3>{contactNumbers.map((number) => <a key={number.tel} href={`tel:${number.tel}`}>{number.display}</a>)}<a href={whatsappLink('Hello Yashna Nets, I would like to get in touch.')}>WhatsApp our team <ArrowRight size={13} /></a></div>
          <div className="footer-note"><span>MADE WITH CARE, FOR HOME</span><img src={logo} alt="" /></div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Yashna Nets</span><span>Safety that lets home feel like home.</span><a href="#home">Back to top ↑</a></div>
      </footer>

      {selected && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <div className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1} ref={dialogRef}>
          <button className="dialog-close" aria-label="Close product details" onClick={() => setSelected(null)}><X size={21} /></button>
          <div className="dialog-image"><img src={selected.image} alt={selected.imageAlt} /><span>{selected.eyebrow}</span></div>
          <div className="dialog-content"><p className="section-kicker">A YASHNA SOLUTION</p><h2 className="serif" id="dialog-title">{selected.title}</h2><p className="dialog-summary">{selected.summary}</p><p className="dialog-description">{selected.description}</p><ul>{selected.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><div className="dialog-actions"><a className="button button-dark" href={whatsappLink(`Hello Yashna Nets, I'm interested in ${selected.title}. Please tell me more.`)}>Ask about this solution <ArrowRight size={16} /></a><a className="dialog-call" href={`tel:${contactNumbers[0].tel}`}><Phone size={15} /> Or call {contactNumbers[0].display}</a></div></div>
        </div>
      </div>}
      <aside className="quick-contact-rail" aria-label="Quick contact">
        <a
          className="quick-contact-link quick-contact-call"
          href={`tel:${contactNumbers[0].tel}`}
          aria-label={`Call Yashna Nets at ${contactNumbers[0].display}`}
          title={`Call ${contactNumbers[0].display}`}
          data-testid="link-quick-call"
        >
          <Phone size={21} aria-hidden="true" />
          <span>Call us</span>
        </a>
        <a
          className="quick-contact-link quick-contact-whatsapp"
          href={whatsappLink('Hello Yashna Nets, I would like to know about home safety solutions.')}
          target="_blank"
          rel="noreferrer"
          aria-label="Message Yashna Nets on WhatsApp"
          title="Message us on WhatsApp"
          data-testid="link-quick-whatsapp"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16.04 3C9.4 3 4 8.38 4 15.01c0 2.12.56 4.19 1.62 6.01L4 29l8.17-1.6a12.02 12.02 0 0 0 3.87.64C22.68 28.04 28 22.64 28 16.01 28 9.38 22.7 3 16.04 3Zm0 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.85.95.99-4.72-.24-.38a9.9 9.9 0 0 1-1.52-5.25C5 9.9 9.98 5 16.04 5 22.1 5 27 10 27 16.01 27 22.02 22.1 25 16.04 25Zm5.5-7.4c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9 9 0 0 1-1.67-2.08c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </aside>
    </div>
  );
}

export default App;
