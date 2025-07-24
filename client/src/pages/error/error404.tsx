import { Link } from "react-router";

export default function Error404() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Oups ! Cette page est introuvable.</p>
      <Link to="/" className="error-button">
        ⬅️ Retour à l'accueil
      </Link>
    </div>
  );
}
