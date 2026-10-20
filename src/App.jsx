import './App.css'
import Accordion from './Accordion'

function App() {
  return (
    <div className="page">

      {/* ── floating blobs ── */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      {/* ── header ── */}
      <header className="site-header">
        <div className="badge">
          <span className="badge-dot" />
          React + Vite
        </div>
      </header>

      {/* ── hero ── */}
      <main className="hero">
        <div className="hero-label">FAQ Component</div>

        <h1 className="hero-title">
          Got <span className="gradient-text">Questions?</span>
          <br />We Got Answers.
        </h1>

        <p className="hero-sub">
          An interactive accordion built with React — click any question
          to reveal a detailed answer with smooth animations.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">7</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">∞</span>
            <span className="stat-label">Curiosity</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Animated</span>
          </div>
        </div>
      </main>

      {/* ── accordion ── */}
      <section className="accordion-section">
        <Accordion />
      </section>

      {/* ── footer ── */}
      <footer className="site-footer">
        <p>Built with <span className="gradient-text">React</span> &amp; <span className="gradient-text">Vite</span></p>
      </footer>

    </div>
  )
}

export default App
