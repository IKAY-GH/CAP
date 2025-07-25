import AbstractSeeder from "./AbstractSeeder";

class GameSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "game", truncate: true });
  }

  // The run method - Populate the 'game' table with fake data
  run() {
    const games = [
      {
        title: "Chasse au trésor",
        main_objective_1: "Trouver tous les indices cachés",
        main_objective_2: "Résoudre les énigmes",
        main_objective_3: "Découvrir le trésor final",
        age_of_audience: 8,
        duration: 60,
        number_of_players: 6,
        type_of: "Aventure",
        moment_of_day: "Après-midi",
        place: "Extérieur",
        no_material: "Aucun matériel spécial requis",
        art_material: "Cartes, crayons de couleur",
        sport_material: "Aucun",
        other_material: "Indices imprimés, petits objets",
        rules:
          "Les participants suivent les indices pour trouver le trésor en équipe.",
        variant: "Version intérieure possible avec adaptation des indices",
        refName: "game_1",
      },
      {
        title: "Olympiades sportives",
        main_objective_1: "Participer à tous les ateliers",
        main_objective_2: "Faire de son mieux en équipe",
        main_objective_3: "S'amuser et faire du sport",
        age_of_audience: 10,
        duration: 120,
        number_of_players: 20,
        type_of: "Sport",
        moment_of_day: "Matin",
        place: "Terrain de sport",
        no_material: "Tenue de sport recommandée",
        art_material: "Aucun",
        sport_material: "Ballons, cônes, cordes, sifflet",
        other_material: "Chronomètre, tableau de scores",
        rules: "Plusieurs ateliers sportifs en rotation, points par équipe.",
        variant: "Version adaptée pour différents âges",
        refName: "game_2",
      },
      {
        title: "Atelier créatif",
        main_objective_1: "Créer une œuvre originale",
        main_objective_2: "Apprendre de nouvelles techniques",
        main_objective_3: "Exprimer sa créativité",
        age_of_audience: 6,
        duration: 90,
        number_of_players: 12,
        type_of: "Artistique",
        moment_of_day: "Après-midi",
        place: "Salle d'activités",
        no_material: "Tablier ou vieux vêtements",
        art_material: "Peinture, pinceaux, papier, ciseaux, colle",
        sport_material: "Aucun",
        other_material: "Chiffons, gobelets d'eau, supports",
        rules:
          "Création libre ou sur thème, partage des créations en fin d'atelier.",
        variant: "Différents thèmes selon les saisons",
        refName: "game_3",
      },
    ];

    // Insert each game into the database
    for (const game of games) {
      this.insert(game);
    }
  }
}

// Export the GameSeeder class
export default GameSeeder;
