import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Leaf, Factory, Droplets, X, MessageCircle, MapPin, Phone } from 'lucide-react';
import './App.css';

const products = [
  {
    id: 1,
    title: "Premium Facial Tissues",
    description: "Ultra-soft luxury tissues enriched with aloe vera in a premium gold-accented box.",
    specs: ["3-Ply Thickness", "Aloe Vera Infused", "100 Pulls per Box", "Hypoallergenic"],
    image: "/assets/box.png",
    align: "left"
  },
  {
    id: 2,
    title: "Luxury Kitchen Wipes",
    description: "Heavy-duty, highly absorbent antibacterial wipes in a sleek matte container.",
    specs: ["Antibacterial Formula", "Grease Fighting", "Biodegradable", "Citrus Scented"],
    image: "/assets/wipes.png",
    align: "right"
  },
  {
    id: 3,
    title: "Noblesse Bath Tissue",
    description: "Plush, cotton-blend luxury toilet rolls designed for ultimate comfort.",
    specs: ["4-Ply Cloud Softness", "Quick Dissolve", "FSC Certified Pulp", "Embossed Pattern"],
    image: "/assets/rolls.png",
    align: "left"
  },
  {
    id: 4,
    title: "Eco-Luxe Dinner Napkins",
    description: "Elegant, cloth-like biodegradable paper napkins for premium dining.",
    specs: ["Linen-Feel Texture", "Highly Absorbent", "Custom Monogramming", "Eco-Friendly"],
    image: "/assets/napkins.png",
    align: "right"
  },
  {
    id: 5,
    title: "Raw Material Parent Rolls",
    description: "High-grade virgin pulp jumbo rolls for premium manufacturing.",
    specs: ["100% Virgin Pulp", "Custom Widths", "High Tensile Strength", "Consistent Caliper"],
    image: "/assets/raw.png",
    align: "left"
  },
  {
    id: 6,
    title: "Advanced Machinery",
    description: "State-of-the-art automatic rewinding and slitting machinery for large-scale production.",
    specs: ["Fully Automatic", "High-Speed Production", "Touchscreen Interface", "Energy Efficient"],
    image: "/assets/machine.png",
    align: "right"
  }
];

const detailedProductsData: Record<string, { name: string, desc: string, image: string, style?: React.CSSProperties }[]> = {
  "Facial Tissues": [
    { name: "Hotel Plain Tissue Paper", desc: "Premium unscented tissue paper designed specifically for luxury hotel rooms and hospitality.", image: "/assets/box.png", style: { filter: 'brightness(1.1) contrast(1.1)' } },
    { name: "Petals Ultra Soft Premium", desc: "Our signature ultra-soft facial tissue enriched with soothing aloe vera.", image: "/assets/box.png", style: { filter: 'hue-rotate(30deg) sepia(0.2)' } },
    { name: "Square Printed Tissue Soft", desc: "Elegant square-cut tissues featuring custom subtle brand printing.", image: "/assets/napkins.png", style: { filter: 'brightness(1.2)' } },
    { name: "Printed Tissue Paper Napkin", desc: "High-grade printed napkins suitable for high-end dining and events.", image: "/assets/napkins.png", style: { filter: 'hue-rotate(15deg) contrast(1.2)' } },
    { name: "White Tissue Paper Napkin", desc: "Classic, highly absorbent white tissue napkins for everyday premium use.", image: "/assets/napkins.png", style: { filter: 'grayscale(0.8) brightness(1.3)' } },
    { name: "Hospital Paper Bed Roll", desc: "Sanitary, high-strength disposable paper bed rolls for medical use.", image: "/assets/raw.png", style: { filter: 'hue-rotate(180deg) brightness(1.2)' } }
  ],
  "Advanced Machinery": [
    { name: "Tissue Paper Making Machine", desc: "State-of-the-art automated machinery for high-speed tissue paper manufacturing.", image: "/assets/machine.png", style: { filter: 'contrast(1.1)' } },
    { name: "N Fold Tissue Paper Machine", desc: "Specialized equipment for precise N-fold tissue and napkin production.", image: "/assets/machine.png", style: { filter: 'hue-rotate(-20deg) brightness(0.9)' } },
    { name: "Tissue Paper Packing Machine", desc: "Automated wrapping and sealing systems for finished tissue products.", image: "/assets/machine.png", style: { filter: 'sepia(0.3) contrast(1.2)' } },
    { name: "Toilet Paper Machine", desc: "Heavy-duty machinery for toilet paper rewinding and core cutting.", image: "/assets/machine.png", style: { filter: 'hue-rotate(45deg) saturate(1.5)' } }
  ],
  "Parent Rolls": [
    { name: "Tissue Jumbo Rolls", desc: "Massive parent rolls of premium virgin pulp ready for converting.", image: "/assets/raw.png", style: { filter: 'contrast(1.2)' } },
    { name: "Core Tissue Jumbo Reels", desc: "High-density core reels designed for efficient transportation and manufacturing.", image: "/assets/raw.png", style: { filter: 'brightness(0.8) sepia(0.5)' } },
    { name: "Jumbo Roll Raw Material", desc: "Unprocessed, high-grade virgin pulp material for tissue manufacturing.", image: "/assets/raw.png", style: { filter: 'hue-rotate(90deg) saturate(0.5)' } }
  ],
  "Bath Tissue": [
    { name: "Toilet Paper Roll", desc: "Soft, 3-ply toilet paper rolls designed for premium bathroom experiences.", image: "/assets/rolls.png", style: { filter: 'brightness(1.1)' } },
    { name: "White Toilet Paper Roll", desc: "Classic white, highly flushable and biodegradable toilet rolls.", image: "/assets/rolls.png", style: { filter: 'grayscale(0.5) contrast(1.1)' } },
    { name: "Premium Bath Tissue", desc: "Our highest grade bath tissue with quilted embossing for extra softness.", image: "/assets/rolls.png", style: { filter: 'hue-rotate(20deg) saturate(1.2)' } }
  ],
  "Dinner Napkins": [
    { name: "Paper Tissue Napkin", desc: "Standard high-quality tissue napkins for general restaurant use.", image: "/assets/napkins.png", style: { filter: 'brightness(0.9)' } },
    { name: "Hard Tissue Paper Napkin", desc: "Durable, cloth-like napkins designed to handle messy meals.", image: "/assets/napkins.png", style: { filter: 'hue-rotate(-30deg) saturate(1.5)' } }
  ],
  "Kitchen Wipes": [
    { name: "Heavy Duty Kitchen Wipes", desc: "Thick, absorbent wipes designed to tackle tough kitchen grease.", image: "/assets/wipes.png", style: { filter: 'contrast(1.3)' } },
    { name: "Antibacterial Kitchen Rolls", desc: "Wipes infused with safe, food-grade antibacterial cleaning agents.", image: "/assets/wipes.png", style: { filter: 'hue-rotate(60deg) brightness(1.2)' } }
  ]
};

const heroSlides = [
  { image: "/assets/box.png", title: "Facial Tissues", subtitle: "Ultra-soft luxury tissues enriched with aloe vera" },
  { image: "/assets/wipes.png", title: "Kitchen Wipes", subtitle: "Heavy-duty, highly absorbent antibacterial wipes" },
  { image: "/assets/rolls.png", title: "Bath Tissue", subtitle: "Plush, cotton-blend luxury toilet rolls" },
  { image: "/assets/napkins.png", title: "Dinner Napkins", subtitle: "Elegant, cloth-like biodegradable paper napkins" },
  { image: "/assets/raw.png", title: "Parent Rolls", subtitle: "High-grade virgin pulp jumbo rolls" },
  { image: "/assets/machine.png", title: "Advanced Machinery", subtitle: "State-of-the-art automatic rewinding machinery" }
];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePage, setActivePage] = useState<'home' | 'details'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeCert, setActiveCert] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Slideshow interval
  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  // Certificates auto-cycle
  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setActiveCert((prev) => (prev + 1) % 5); // 5 certificates
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  const certificateImages = [
    "/assets/certifications.png", 
    "/assets/certifications.png", // User will replace these with real images
    "/assets/certifications.png",
    "/assets/certifications.png",
    "/assets/certifications.png"
  ];

  const certNames = [
    "GST Certificate",
    "ISO 9001:2015 Certification",
    "ISO 14001:2015 Certification",
    "Quality Control Certificates",
    "Shop Act Registration"
  ];

  return (
    <div className="app-container">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          >
            <motion.div 
              className="splash-logo"
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="splash-icon">
                <img src="/assets/logo-hq.png" alt="Darshanam Industries" className="splash-hq-logo" />
              </div>
              <motion.div 
                className="splash-text-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <h1 className="splash-title">DARSHANAM</h1>
                <p className="splash-subtitle">INDUSTRIES</p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="splash-glow"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => {setActivePage('home'); window.scrollTo(0,0);}}>
          <div className="nav-hq-logo-crop"></div>
          <span className="logo-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            DARSHANAM <br/> <small style={{ color: 'var(--accent-gold)', letterSpacing: '4px' }}>INDUSTRIES</small>
          </span>
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); setIsMobileMenuOpen(false); window.scrollTo(0,0); }}>Home</a>
          {activePage === 'home' && <button className="nav-profile-btn" onClick={() => { setShowProfileModal(true); setIsMobileMenuOpen(false); }}>Company Profile</button>}
          <a href="https://maps.app.goo.gl/cYBkNMkwkhX7GUne8" target="_blank" rel="noopener noreferrer" className="nav-map-link" onClick={() => setIsMobileMenuOpen(false)}>
            <MapPin size={18} /> Location
          </a>
          {activePage === 'home' && <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Products</a>}
          {activePage === 'home' && <a href="#certifications" onClick={() => setIsMobileMenuOpen(false)}>Certifications</a>}
          <a href="#contact" className="contact-btn" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
        </div>
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <div className="hamburger"><span></span><span></span><span></span></div>}
        </button>
      </nav>

      {/* Company Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div 
            className="product-details-modal"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
          >
            <div className="modal-content profile-modal-content">
              <button className="close-modal-btn" onClick={() => setShowProfileModal(false)}>
                <X size={32} />
              </button>
              
              <motion.div 
                className="modal-inner"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2>Company Profile</h2>
                <div className="gold-line-center"></div>
                
                <div className="info-grid modal-info-grid">
                  <div className="info-box">
                    <h3>Basic Information</h3>
                    <ul>
                      <li><span>Nature of Business:</span> Manufacturer</li>
                      <li><span>Additional Business:</span> Recipient of Goods or Services</li>
                      <li><span>Company CEO:</span> RAHUL KHAJEKAR</li>
                      <li><span>Employees:</span> 11 to 25 People</li>
                      <li><span>Legal Status:</span> Partnership</li>
                      <li><span>Annual Turnover:</span> 40 L - 1.5 Cr</li>
                    </ul>
                  </div>
                  <div className="info-box">
                    <h3>Statutory Profile</h3>
                    <ul>
                      <li><span>Banker:</span> ICICI</li>
                      <li><span>GST No:</span> 27**********1Z5</li>
                      <li><span>GST Reg Date:</span> Oct'21</li>
                      <li><span>UDYAM No:</span> UDYAM-MH-26-****998</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PAGE RENDERING LOGIC --- */}
      {activePage === 'details' && selectedCategory ? (
        <section className="category-details-page">
          <div className="category-page-header">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {selectedCategory} Collection
            </motion.h1>
            <div className="gold-line-center"></div>
            <button className="back-btn" onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}>
              <ChevronDown style={{ transform: 'rotate(90deg)' }} /> Back to Home
            </button>
          </div>
          
          <div className="detailed-products-grid">
            {detailedProductsData[selectedCategory]?.map((item, idx) => (
              <motion.div 
                key={idx}
                className="detail-product-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="detail-img-wrapper">
                  <img src={item.image} alt={item.name} style={item.style} />
                </div>
                <div className="detail-content">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <button 
                    className="detail-inquire-btn"
                    onClick={() => {
                      const message = `Hello Darshanam Industries! I am interested in inquiring about your ${item.name}.`;
                      window.open(`https://wa.me/919139138170?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* 3D Creative Glass Showcase Hero */}
      <section id="home" className="hero-section hero-3d-wrapper">
        <div className="hero-deep-bg">
          {/* Animated Gold Particles */}
          {[...Array(20)].map((_, i) => (
             <div key={i} className="gold-particle" style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDuration: `${3 + Math.random() * 5}s`,
               animationDelay: `${Math.random() * 2}s`
             }}></div>
          ))}
        </div>

        {/* Massive Background Text - Acts as a dynamic backdrop */}
        <div className="hero-bg-text-container">
           <AnimatePresence mode="wait">
             <motion.h1 
                key={currentSlide}
                className="hero-bg-text"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 0.15, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
             >
               {heroSlides[currentSlide].title.split(' ')[0].toUpperCase()}
             </motion.h1>
           </AnimatePresence>
        </div>

        {/* The 3D Floating Glass Product */}
        <div className="hero-3d-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="glass-product-card"
              initial={{ opacity: 0, rotateY: -90, z: -500, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, z: -500, scale: 0.8 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={heroSlides[currentSlide].image} alt="Product" className="glass-product-img" />
              <div className="glass-reflection"></div>
              <div className="glass-glow"></div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
             <motion.div 
               key={currentSlide}
               className="glass-product-info"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -30 }}
               transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
             >
               <div className="glass-slide-num">0{currentSlide + 1} &mdash; 06</div>
               <h2>{heroSlides[currentSlide].title}</h2>
               <p>{heroSlides[currentSlide].subtitle}</p>
               <button 
                 className="glass-explore-btn"
                 onClick={() => {
                   setSelectedCategory(heroSlides[currentSlide].title);
                   setActivePage('details');
                   window.scrollTo(0, 0);
                 }}
               >
                 Explore Details <ChevronDown size={16} />
               </button>
             </motion.div>
          </AnimatePresence>
        </div>

        {/* WhatsApp branding replaced progress circle */}
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <div className="cert-header">
          <h2>Our Certifications & Quality</h2>
          <div className="gold-line"></div>
        </div>
        <div className="cert-container">
          <motion.div 
            className="cert-list"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {certNames.map((name, idx) => (
              <div 
                key={idx} 
                className={`cert-item ${activeCert === idx ? 'active-cert' : ''}`}
                onClick={() => setActiveCert(idx)}
              >
                <span className="cert-icon">✦</span> {name}
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="cert-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeCert}
                src={certificateImages[activeCert]} 
                alt={certNames[activeCert]} 
                className="cert-img" 
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Product Showcase */}
      <section id="products" className="showcase-section">
        <div className="section-header">
          <h2>Our Signature Collection</h2>
          <div className="gold-line"></div>
        </div>

        <div className="products-container">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className={`product-row ${product.align}`}
              initial={{ opacity: 0, rotateX: 10, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-150px", amount: 0.2 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-hq-image" />
                <div className="image-glow"></div>
              </div>
              <div className="product-info">
                <div className="product-number">0{index + 1}</div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="product-specs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <Sparkles size={14} className="spec-icon" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => {
                    let cat = product.title.replace('Premium ', '').replace(' Luxury', '').trim();
                    if(cat === 'Bath Tissue' || cat === 'Facial Tissues') {} // Keep as is
                    else if(product.title.includes('Wipes')) cat = 'Kitchen Wipes';
                    else if(product.title.includes('Napkins')) cat = 'Dinner Napkins';
                    setSelectedCategory(cat);
                    setActivePage('details');
                    window.scrollTo(0, 0);
                  }}
                >
                  View Complete Range <ChevronDown size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <Leaf className="feature-icon" />
          <h4>Eco-Friendly</h4>
          <p>Sustainably sourced virgin pulp and biodegradable packaging.</p>
        </div>
        <div className="feature">
          <Sparkles className="feature-icon" />
          <h4>Ultra Premium</h4>
          <p>Unmatched softness, strength, and aesthetic appeal.</p>
        </div>
        <div className="feature">
          <Factory className="feature-icon" />
          <h4>State-of-the-Art</h4>
          <p>Manufactured using advanced precision machinery.</p>
        </div>
        <div className="feature">
          <Droplets className="feature-icon" />
          <h4>High Absorbency</h4>
          <p>Engineered for maximum moisture retention and strength.</p>
        </div>
      </section>
      </>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919139138170" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-wa-btn"
      >
        <MessageCircle size={28} />
      </a>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src="/assets/logo-hq.png" alt="Footer Logo" className="footer-hq-logo" />
            </div>
            <p>Elevating everyday essentials into luxurious experiences.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); window.scrollTo(0,0); }}>Home</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('home'); setTimeout(() => window.location.hash='#products', 100); }}>Products</a>
            <a href="#certifications" onClick={(e) => { e.preventDefault(); setActivePage('home'); setTimeout(() => window.location.hash='#certifications', 100); }}>Certifications</a>
          </div>
          <div className="footer-contact">
            <h4>Contact Details</h4>
            <a href="https://maps.app.goo.gl/cYBkNMkwkhX7GUne8" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>Fq8V+Rjq, Division, 79/3, Shubhra Heights Rd,<br/>Shivane, Pune, Maharashtra 411023</span>
              </p>
            </a>
            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <Phone size={18} style={{ color: 'var(--accent-gold)' }} />
              <span>+91 91391 38170</span>
            </p>
            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <MessageCircle size={18} style={{ color: '#25D366' }} />
              <a href="https://wa.me/919139138170" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp Us</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Darshanam Industries. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
