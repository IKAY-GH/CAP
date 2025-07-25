import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "./search.css";

type Game = {
  id: number;
  title: string;
  main_objective_1: string;
  main_objective_2: string;
  main_objective_3: string;
  age_of_audience: number;
  duration: number;
  number_of_players: number;
  type_of: string;
  moment_of_day: string;
  place: string;
  no_material: string;
  art_material: string;
  sport_material: string;
  other_material: string;
  rules: string;
  variant: string;
};

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger tous les jeux au démarrage
  useEffect(() => {
    fetchGames();
  }, []);

  // Appliquer les filtres quand les jeux sont chargés ou que les paramètres changent
  useEffect(() => {
    if (games.length > 0) {
      applyFilters();
    }
  }, [games]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3310/api/game");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Erreur lors du chargement des jeux:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const type_of = searchParams.get("type_of");
    const no_material = searchParams.get("no_material");
    const age_of_audience = searchParams.get("age_of_audience");
    const number_of_players = searchParams.get("number_of_players");
    const duration = searchParams.get("duration");

    let filtered = [...games];

    // Filtre par type
    if (type_of) {
      filtered = filtered.filter((game) =>
        game.type_of.toLowerCase().includes(type_of.toLowerCase()),
      );
    }

    // Filtre par matériel
    if (no_material) {
      if (no_material === "aucun") {
        filtered = filtered.filter(
          (game) =>
            game.no_material.toLowerCase().includes("aucun") ||
            game.no_material.toLowerCase().includes("sans"),
        );
      }
    }

    // Filtre par âge
    if (age_of_audience) {
      const [minAge, maxAge] = age_of_audience.split("-").map(Number);
      if (maxAge) {
        filtered = filtered.filter(
          (game) =>
            game.age_of_audience >= minAge && game.age_of_audience <= maxAge,
        );
      } else if (age_of_audience === "18+") {
        filtered = filtered.filter((game) => game.age_of_audience >= 18);
      }
    }

    // Filtre par nombre de joueurs
    if (number_of_players) {
      if (number_of_players === "1") {
        filtered = filtered.filter((game) => game.number_of_players >= 1);
      } else if (number_of_players.includes("-")) {
        const [min, max] = number_of_players.split("-").map(Number);
        filtered = filtered.filter(
          (game) =>
            game.number_of_players >= min && game.number_of_players <= max,
        );
      } else if (number_of_players === "10+") {
        filtered = filtered.filter((game) => game.number_of_players >= 10);
      }
    }

    // Filtre par durée
    if (duration) {
      if (duration.includes("-")) {
        const [min, max] = duration.split("-").map(Number);
        filtered = filtered.filter(
          (game) => game.duration >= min && game.duration <= max,
        );
      } else if (duration === "60+") {
        filtered = filtered.filter((game) => game.duration >= 60);
      }
    }

    setFilteredGames(filtered);
  };

  const goBackToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="search-container">
        <div className="loading">Chargement des activités...</div>
      </div>
    );
  }

  return (
    <main className="search-container">
      <div className="search-header">
        <h1>Résultats de recherche</h1>
        <button className="btn-back" onClick={goBackToHome} type="button">
          ← Nouvelle recherche
        </button>
      </div>

      <div className="results-info">
        <p>{filteredGames.length} activité(s) trouvée(s)</p>
      </div>

      {filteredGames.length === 0 ? (
        <div className="no-results">
          <h2>Aucune activité trouvée</h2>
          <p>Essayez de modifier vos critères de recherche.</p>
          <button className="btn-retry" onClick={goBackToHome} type="button">
            Essayer une nouvelle recherche
          </button>
        </div>
      ) : (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-header">
                <h3>{game.title}</h3>
                <span className="game-type">{game.type_of}</span>
              </div>

              <div className="game-info">
                <div className="info-row">
                  <span className="info-label">👥</span>
                  <span>{game.number_of_players} joueur(s)</span>
                </div>
                <div className="info-row">
                  <span className="info-label">⏱️</span>
                  <span>{game.duration} min</span>
                </div>
                <div className="info-row">
                  <span className="info-label">🎂</span>
                  <span>{game.age_of_audience} ans</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📍</span>
                  <span>{game.place}</span>
                </div>
              </div>

              <div className="game-objectives">
                <h4>Objectifs :</h4>
                <p>• {game.main_objective_1}</p>
                {game.main_objective_2 && <p>• {game.main_objective_2}</p>}
                {game.main_objective_3 && <p>• {game.main_objective_3}</p>}
              </div>

              <div className="game-materials">
                <h4>Matériel :</h4>
                <p>{game.no_material || "Non spécifié"}</p>
              </div>

              {game.rules && (
                <div className="game-rules">
                  <h4>Règles :</h4>
                  <p>{game.rules}</p>
                </div>
              )}

              <div className="game-actions">
                <button className="btn-details" type="button">
                  Voir plus de détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Search;
