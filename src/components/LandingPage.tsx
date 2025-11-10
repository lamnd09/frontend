import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="logo">
            <h1>LOTTE Finance</h1>
          </div>
          <nav className="nav-menu">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h2 className="hero-title">
                Your Trusted Financial Partner
              </h2>
              <p className="hero-subtitle">
                Experience personalized financial services with our intelligent chatbot assistant. 
                Get instant answers to your questions about loans, credit cards, and investment options.
              </p>
              <button className="cta-button" onClick={onStartChat}>
                Start Chat Assistant
              </button>
            </div>
            <div className="hero-image">
              <div className="chat-preview">
                <div className="chat-bubble bot">
                  <span>Hello! How can I help you with your financial needs today?</span>
                </div>
                <div className="chat-bubble user">
                  <span>I'm interested in personal loans</span>
                </div>
                <div className="chat-bubble bot">
                  <span>Great! I'd be happy to help you explore our loan options...</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">💳</div>
                <h3>Credit Cards</h3>
                <p>Exclusive benefits and rewards with Lotte group services</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🏠</div>
                <h3>Home Loans</h3>
                <p>Competitive rates and flexible terms for your dream home</p>
              </div>
              <div className="service-card">
                <div className="service-icon">💼</div>
                <h3>Business Loans</h3>
                <p>Fuel your business growth with our tailored financing solutions</p>
              </div>
              <div className="service-card">
                <div className="service-icon">💰</div>
                <h3>Personal Loans</h3>
                <p>Quick and easy personal loans for your immediate needs</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose Our Chat Assistant?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <h3>24/7 Availability</h3>
                <p>Get instant responses to your financial questions anytime, anywhere</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your financial information is protected with bank-level security</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Instant Responses</h3>
                <p>No waiting time - get immediate answers to your queries</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 Lotte Finance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;