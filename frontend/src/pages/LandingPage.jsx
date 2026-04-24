export default function LandingPage({ goToEvents }) {
  return (
    <div className="landing">
      <div className="overlay">
        <p className="eyebrow">✦ Your Event Universe</p>
        <h1 className="title">EVENT<br />SPHERE</h1>
        <p className="subtitle">
          Discover, explore and register for extraordinary events — all in one place.
        </p>
        <button className="cta-btn" onClick={goToEvents}>
          Explore Events
        </button>
      </div>
    </div>
  );
}