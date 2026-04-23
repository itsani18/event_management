export default function Landing({ goToEvents }) {
  return (
    <div className="landing">
      <div className="overlay">
        <h1 className="title">EVENT MANAGEMENT</h1>

        <p className="subtitle">
          Discover, explore and register for amazing events 🚀
        </p>

        <button className="cta-btn" onClick={goToEvents}>
          Explore Events →
        </button>
      </div>
    </div>
  );
}