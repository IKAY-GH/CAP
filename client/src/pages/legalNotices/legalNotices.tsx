import "./legalNotices.css";

export default function LegalNotices() {
  return (
    <main className="legal-container">
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>Street Art Hunter</strong> est édité par une équipe
          indépendante de passionné·es d’art urbain.
        </p>
        <p>
          Email :{" "}
          <a href="mailto:contact@streetarthunter.com">
            contact@streetarthunter.com
          </a>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          <strong>On ne sait pas encore</strong>
          <br />
          rue des dev en formations tarte au citron
          <br />
          Site web :{" "}
          <a
            href="https://www.infomaniak.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            infomaniak.com
          </a>
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
        <p>
          Certaines œuvres photographiées ou cartographiées sur ce site restent
          la propriété de leurs auteur·es respectif·ves. En cas de demande de
          retrait, merci de me contacter.
        </p>
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
