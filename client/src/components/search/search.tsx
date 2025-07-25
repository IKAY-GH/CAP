import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import "./search.css";

interface Game {
  id: number;
  title: string;
  age_of_audience: number;
  duration: number;
  number_of_players: number;
  type_of: string;
  place: string;
  rules: string;
  main_objective_1?: string;
  main_objective_2?: string;
  main_objective_3?: string;
}

function Search() {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams();
        for (const [key, value] of searchParams.entries()) {
          if (value) {
            queryParams.append(key, value);
          }
        }

        const response = await fetch(
          `/api/game/search?${queryParams.toString()}`,
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="search-container">
        <div className="loading">Chargement des résultats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-container">
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="search-container">
      <h1>Résultats de recherche</h1>

      {games.length === 0 ? (
        <div className="no-results">
          <p>Aucun jeu trouvé avec ces critères.</p>
          <a href="/" className="back-link">
            Retour à l'accueil
          </a>
        </div>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <h3 className="game-title">{game.title}</h3>

              <div className="game-info">
                <div className="info-item">
                  <strong>Âge:</strong> {game.age_of_audience}+ ans
                </div>
                <div className="info-item">
                  <strong>Durée:</strong> {game.duration} min
                </div>
                <div className="info-item">
                  <strong>Joueurs:</strong> {game.number_of_players}
                </div>
                <div className="info-item">
                  <strong>Type:</strong> {game.type_of}
                </div>
                <div className="info-item">
                  <strong>Lieu:</strong> {game.place}
                </div>
              </div>

              {(game.main_objective_1 ||
                game.main_objective_2 ||
                game.main_objective_3) && (
                <div className="game-objectives">
                  <strong>Objectifs:</strong>
                  <ul>
                    {game.main_objective_1 && <li>{game.main_objective_1}</li>}
                    {game.main_objective_2 && <li>{game.main_objective_2}</li>}
                    {game.main_objective_3 && <li>{game.main_objective_3}</li>}
                  </ul>
                </div>
              )}

              {game.rules && (
                <div className="game-rules">
                  <strong>Règles:</strong>
                  <p>{game.rules.substring(0, 150)}...</p>
                </div>
              )}

              <div className="game-actions">
                <button type="button" className="btn-details">
                  Voir détails
                </button>
                <button type="button" className="btn-download">
                  Télécharger PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
