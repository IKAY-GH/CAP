import { Link } from "react-router";
import "./about.css";

export default function About() {
  return (
    <main className="about-container">
      <h1>À propos de CAP!</h1>

      <section className="site-identity">
        <h2>Qu'est-ce que CAP?</h2>
        <p>
          <strong>CAP!</strong> est une plateforme innovante dédiée aux
          activités pour enfants et adolescents. Ma mission est de faciliter la
          recherche et l'organisation d'activités ludiques, éducatives et
          créatives pour les animateurs, éducateurs, parents et tous ceux qui
          travaillent avec les jeunes publics.
        </p>

        <div className="features">
          <div className="feature-item">
            <h3>🎯 Recherche simplifiée</h3>
            <p>
              Trouvez rapidement des activités selon l'âge, le nombre de
              participants, la durée et le matériel disponible.
            </p>
          </div>

          <div className="feature-item">
            <h3>📋 Organisation facilitée</h3>
            <p>
              Créez des to-do lists personnalisées pour planifier vos séances
              d'animation.
            </p>
          </div>

          <div className="feature-item">
            <h3>📥 Fiches téléchargeables</h3>
            <p>
              Téléchargez les fiches d'activités au format PDF pour les utiliser
              hors ligne.
            </p>
          </div>
        </div>

        <div className="mission">
          <h3>Ma vision</h3>
          <p>
            "Je crois que chaque enfant mérite des activités enrichissantes et
            adaptées à ses besoins. CAP! rassemble une collection d'activités
            variées pour favoriser l'épanouissement, la créativité et
            l'apprentissage dans un environnement ludique et bienveillant."
          </p>
          <p>CAYUELA Annick</p>
        </div>
      </section>

      <section className="creator-section">
        <h2>Qui suis-je ?</h2>
        <p>
          Junior en développement web, j'ai effectué 15 belles années dans le
          domaine de l'animation avant de me reconvertir. Dans mon parcours au
          sein des centres de loisirs, je n'ai cessé de réfléchir aux outils les
          plus pratiques pour être le plus efficace possible lors des temps de
          préparation très cours dont nous disposons. CAP! est pensé par une
          animatrice qui a à coeur de vous rendre vous aussi la tâche encore
          plus facile.
        </p>

        <Link to="/creator" className="creator-link">
          <span>👩‍💻</span>
          <div>
            <strong>Découvrir la créatrice</strong>
            <p>En savoir plus sur son parcours</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
