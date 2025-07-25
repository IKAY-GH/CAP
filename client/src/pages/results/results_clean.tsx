import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "./results.css";

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

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger tous les jeux au démarrage
  useEffect(() => {
    fetchGames();
  }, []);

  // Appliquer les filtres quand les jeux sont chargés
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

    if (type_of) {
      filtered = filtered.filter((game) => game.type_of === type_of);
    }

    if (no_material) {
      filtered = filtered.filter((game) =>
        game.no_material.toLowerCase().includes(no_material.toLowerCase()),
      );
    }

    if (age_of_audience) {
      const ageRange = age_of_audience.split("-");
      if (ageRange.length === 2) {
        const minAge = Number.parseInt(ageRange[0]);
        const maxAge = Number.parseInt(ageRange[1]);
        filtered = filtered.filter(
          (game) =>
            game.age_of_audience >= minAge && game.age_of_audience <= maxAge,
        );
      } else if (age_of_audience.includes("+")) {
        const minAge = Number.parseInt(age_of_audience.replace("+", ""));
        filtered = filtered.filter((game) => game.age_of_audience >= minAge);
      }
    }

    if (number_of_players) {
      if (number_of_players.includes("-")) {
        const playerRange = number_of_players.split("-");
        const minPlayers = Number.parseInt(playerRange[0]);
        const maxPlayers = Number.parseInt(playerRange[1]);
        filtered = filtered.filter(
          (game) =>
            game.number_of_players >= minPlayers &&
            game.number_of_players <= maxPlayers,
        );
      } else if (number_of_players.includes("+")) {
        const minPlayers = Number.parseInt(number_of_players.replace("+", ""));
        filtered = filtered.filter(
          (game) => game.number_of_players >= minPlayers,
        );
      } else {
        const exactPlayers = Number.parseInt(number_of_players);
        filtered = filtered.filter(
          (game) => game.number_of_players === exactPlayers,
        );
      }
    }

    if (duration) {
      if (duration.includes("-")) {
        const durationRange = duration.split("-");
        const minDuration = Number.parseInt(durationRange[0]);
        const maxDuration = Number.parseInt(durationRange[1]);
        filtered = filtered.filter(
          (game) =>
            game.duration >= minDuration && game.duration <= maxDuration,
        );
      } else if (duration.includes("+")) {
        const minDuration = Number.parseInt(duration.replace("+", ""));
        filtered = filtered.filter((game) => game.duration >= minDuration);
      }
    }

    setFilteredGames(filtered);
  };

  const goBackToHome = () => {
    navigate("/");
  };

  const downloadGameSheet = async (gameId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/pdf/game-sheet/${gameId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }

      // Récupérer le contenu HTML
      const htmlContent = await response.text();

      // Créer un blob avec le contenu HTML
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);

      // Créer un lien de téléchargement
      const link = document.createElement("a");
      link.href = url;
      link.download = `fiche-activite-${gameId}.html`;
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement de la fiche d'activité");
    }
  };

  return (
    <main className="results-container">
      <button type="button" onClick={goBackToHome} className="back-button">
        ← Retour à l'accueil
      </button>

      <h1>Résultats de recherche</h1>

      {loading ? (
        <div className="loading">
          <p>Chargement des activités...</p>
        </div>
      ) : (
        <div className="activities-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="activity-card">
              <div className="activity-header">
                <h3>{game.title}</h3>
                <span className="activity-type">{game.type_of}</span>
              </div>

              <div className="activity-info">
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
                  <span>{game.place || "Non spécifié"}</span>
                </div>
              </div>

              <div className="activity-objectives">
                <h4>Objectifs :</h4>
                {game.main_objective_1 && <p>• {game.main_objective_1}</p>}
                {game.main_objective_2 && <p>• {game.main_objective_2}</p>}
                {game.main_objective_3 && <p>• {game.main_objective_3}</p>}
              </div>

              <div className="activity-materials">
                <h4>Matériel :</h4>
                <p>{game.no_material || "Non spécifié"}</p>
              </div>

              {game.rules && (
                <div className="activity-rules">
                  <h4>Règles :</h4>
                  <p>{game.rules}</p>
                </div>
              )}

              <div className="activity-actions">
                <button
                  className="btn-download"
                  onClick={() => downloadGameSheet(game.id)}
                  type="button"
                >
                  📥 Télécharger cette activité
                </button>
                <button
                  className="btn-todolist"
                  onClick={() => navigate(`/todolist/${game.id}`)}
                  type="button"
                >
                  📝 Créer une to-do list
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Results;
