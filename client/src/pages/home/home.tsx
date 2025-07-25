import { useState } from "react";
import { useNavigate } from "react-router";
import "./home.css";

import materialIcon from "../../assets/icons/contour-de-cube-de-des.png";
import playersIcon from "../../assets/icons/gens.png";
// Import des icônes
import typeIcon from "../../assets/icons/impression-3d.png";
import durationIcon from "../../assets/icons/time-and-date.png";
import ageIcon from "../../assets/icons/tranche-dage (1).png";

interface SearchFilters {
  type_of: string;
  no_material: string;
  age_of_audience: string;
  number_of_players: string;
  duration: string;
}

function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    type_of: "",
    no_material: "",
    age_of_audience: "",
    number_of_players: "",
    duration: "",
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    // Créer les paramètres d'URL pour les filtres non vides
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value.trim()) {
        searchParams.append(key, value);
      }
    }

    // Rediriger vers la page de résultats avec les paramètres
    navigate(`/results?${searchParams.toString()}`);
  };

  return (
    <main className="accueil-container">
      <h1>
        CAP<span className="exclamation-mark">!</span>
      </h1>

      <h2 className="subtitle">Activités, Animations et Jeux</h2>

      <div className="search-container">
        <h3 className="search-title">Je recherche...</h3>

        <div className="filters-container">
          <div className="filter-item">
            <img src={typeIcon} alt="Type d'activité" className="filter-icon" />
            <select
              value={filters.type_of}
              onChange={(e) => handleFilterChange("type_of", e.target.value)}
              className="filter-select"
            >
              <option value="">Type d'activité</option>
              <option value="jeu">Jeu</option>
              <option value="sport">Sport</option>
              <option value="créatif">Créatif</option>
              <option value="éducatif">Éducatif</option>
            </select>
          </div>

          <div className="filter-item">
            <img src={materialIcon} alt="Matériel" className="filter-icon" />
            <select
              value={filters.no_material}
              onChange={(e) =>
                handleFilterChange("no_material", e.target.value)
              }
              className="filter-select"
            >
              <option value="">Matériel</option>
              <option value="aucun">Aucun matériel</option>
              <option value="basique">Matériel basique</option>
              <option value="spécialisé">Matériel spécialisé</option>
            </select>
          </div>

          <div className="filter-item">
            <img src={ageIcon} alt="Tranche d'âge" className="filter-icon" />
            <select
              value={filters.age_of_audience}
              onChange={(e) =>
                handleFilterChange("age_of_audience", e.target.value)
              }
              className="filter-select"
            >
              <option value="">Tranche d'âge</option>
              <option value="3-6">3-6 ans</option>
              <option value="7-12">7-12 ans</option>
              <option value="13-17">13-17 ans</option>
              <option value="18+">18+ ans</option>
            </select>
          </div>

          <div className="filter-item">
            <img src={playersIcon} alt="Nombre" className="filter-icon" />
            <select
              value={filters.number_of_players}
              onChange={(e) =>
                handleFilterChange("number_of_players", e.target.value)
              }
              className="filter-select"
            >
              <option value="">Nombre</option>
              <option value="1">1 joueur</option>
              <option value="2-4">2-4 joueurs</option>
              <option value="5-10">5-10 joueurs</option>
              <option value="10+">10+ joueurs</option>
            </select>
          </div>

          <div className="filter-item">
            <img
              src={durationIcon}
              alt="Temps de jeu"
              className="filter-icon"
            />
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="filter-select"
            >
              <option value="">Temps de jeu</option>
              <option value="0-15">0-15 min</option>
              <option value="15-30">15-30 min</option>
              <option value="30-60">30-60 min</option>
              <option value="60+">60+ min</option>
            </select>
          </div>
        </div>

        <button className="btn-search" onClick={handleSearch} type="button">
          Rechercher
        </button>
      </div>
    </main>
  );
}

export default Home;
