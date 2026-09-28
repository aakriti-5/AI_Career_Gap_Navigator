import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">CareerGap AI</div>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <p className="badge">AI-Powered Career Intelligence</p>

          <h1>
            Discover Your
            <span> Career Gap</span>
          </h1>

          <p className="hero-description">
            Understand your current skills, discover what you're missing for
            your dream career, and get a personalized learning roadmap.
          </p>

          <Link to="/profile" className="primary-button">
            Analyze My Career Gap →
          </Link>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <span>Career Analysis</span>
            <span>AI</span>
          </div>

          <div className="readiness">
            <div>
              <p>Career Readiness</p>
              <h2>68%</h2>
            </div>

            <div className="progress-circle">68%</div>
          </div>

          <div className="skill-preview">
            <div className="skill-row">
              <span>Python</span>
              <span className="matched">✓ Match</span>
            </div>

            <div className="skill-row">
              <span>Machine Learning</span>
              <span className="matched">✓ Match</span>
            </div>

            <div className="skill-row">
              <span>Deep Learning</span>
              <span className="warning">Needs Work</span>
            </div>

            <div className="skill-row">
              <span>NLP</span>
              <span className="missing">Missing</span>
            </div>
          </div>
        </div>
      </main>

      <section id="how-it-works" className="info-section">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step-card">
            <span>01</span>
            <h3>Build Your Profile</h3>
            <p>Enter your education, skills, experience and projects.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Choose Your Career</h3>
            <p>Select the role you want to prepare for.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Get Your Roadmap</h3>
            <p>Discover skill gaps and receive personalized recommendations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
