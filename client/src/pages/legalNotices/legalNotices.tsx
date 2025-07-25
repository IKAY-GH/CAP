import "./legalNotices.css";

export default function LegalNotices() {
  return (
    <main className="legal-container">
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>CAP</strong> est édité par CAYUELA Annick développeuse
          web junior.
        </p>
        <p>
          Email :{" "}
          <a href="mailto:contact@streetarthunter.com">contact@cap.com</a>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          <strong>Indéfini</strong>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur le site (textes, images, cartes,
          vidéos, etc.) sont protégés par le droit d’auteur. Sauf mention
          contraire, ils sont la propriété exclusive de CAYUELA Annick.
        </p>
      </section>

      <section>
        <h2>Crédits</h2>
        <p>Les activités de ce site sont libres d'exploitation.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Ce site n’utilise pas de cookies à des fins publicitaires. Des cookies
          techniques peuvent être utilisés pour améliorer l’expérience
          utilisateur.
        </p>
      </section>
    </main>
  );
}
