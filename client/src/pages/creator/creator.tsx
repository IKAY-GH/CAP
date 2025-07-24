import "./creator.css";

export default function Creator() {
  return (
    <main className="creator-page">
      <h2>Notre Équipe</h2>
      <div className="dev-cardS">
        <div className="dev-card">
          <h3>Ridouane Zarzour</h3>
          <p>Développeur Full Stack</p>
          <a
            href="https://www.linkedin.com/in/ridouane-z-0452a2361"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="dev-card">
          <h3>Annick Cayuela </h3>
          <p>Développeur Full Stack</p>
          <a
            href="https://www.linkedin.com/in/annick-cayuela-ikay"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </main>
  );
}
