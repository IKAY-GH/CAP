import type { RequestHandler } from "express";
import gamesRepository from "../game/gamesRepository";

// Import du type Task
type Task = {
  idtask: number;
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
  game_id?: number;
};

// Générer et télécharger la fiche d'un jeu en PDF
const downloadGameSheet: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const gameId = Number(req.params.gameId);
    const game = await gamesRepository.read(gameId);

    if (!game) {
      res.status(404).json({ error: "Jeu introuvable" });
      return;
    }

    // En attendant une vraie lib PDF, on génère du HTML simple
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Fiche Jeu - ${game.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #333; border-bottom: 2px solid #007bff; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .info-item { margin-bottom: 10px; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${game.title}</h1>
          <p><strong>Type:</strong> ${game.type_of} | <strong>Lieu:</strong> ${game.place}</p>
        </div>

        <div class="section">
          <h3>Informations générales</h3>
          <div class="info-grid">
            <div class="info-item"><span class="label">Âge:</span> ${game.age_of_audience} ans et +</div>
            <div class="info-item"><span class="label">Durée:</span> ${game.duration} minutes</div>
            <div class="info-item"><span class="label">Joueurs:</span> ${game.number_of_players} personnes</div>
            <div class="info-item"><span class="label">Moment:</span> ${game.moment_of_day || "Non spécifié"}</div>
          </div>
        </div>

        <div class="section">
          <h3>Objectifs</h3>
          ${game.main_objective_1 ? `<p>• ${game.main_objective_1}</p>` : ""}
          ${game.main_objective_2 ? `<p>• ${game.main_objective_2}</p>` : ""}
          ${game.main_objective_3 ? `<p>• ${game.main_objective_3}</p>` : ""}
        </div>

        <div class="section">
          <h3>Matériel nécessaire</h3>
          ${game.no_material ? `<p><strong>Sans matériel:</strong> ${game.no_material}</p>` : ""}
          ${game.art_material ? `<p><strong>Matériel artistique:</strong> ${game.art_material}</p>` : ""}
          ${game.sport_material ? `<p><strong>Matériel sportif:</strong> ${game.sport_material}</p>` : ""}
          ${game.other_material ? `<p><strong>Autre matériel:</strong> ${game.other_material}</p>` : ""}
        </div>

        ${
          game.rules
            ? `
        <div class="section">
          <h3>Règles du jeu</h3>
          <p>${game.rules}</p>
        </div>
        `
            : ""
        }

        ${
          game.variant
            ? `
        <div class="section">
          <h3>Variantes</h3>
          <p>${game.variant}</p>
        </div>
        `
            : ""
        }
      </body>
      </html>
    `;

    // Définir les headers pour le téléchargement
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="fiche-jeu-${game.title.replace(/[^a-zA-Z0-9]/g, "-")}.html"`,
    );

    res.send(htmlContent);
  } catch (err) {
    next(err);
  }
};

// Générer et télécharger une ToDoList en HTML
const downloadToDoList: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { gameId, tasks } = req.body;

    const game = await gamesRepository.read(gameId);
    if (!game) {
      res.status(404).json({ error: "Jeu introuvable" });
      return;
    }

    // Organiser les tâches par moment
    const tasksByMoment = {
      avant: tasks.filter((task: Task) => task.moment === "avant"),
      pendant: tasks.filter((task: Task) => task.moment === "pendant"),
      aprés: tasks.filter((task: Task) => task.moment === "aprés"),
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>ToDoList - ${game.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px; }
          .moment-section { margin-bottom: 30px; }
          .moment-title { color: #007bff; font-size: 1.2em; margin-bottom: 10px; }
          .task { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
          .task-title { font-weight: bold; margin-bottom: 5px; }
          .task-description { color: #666; }
          .checkbox { width: 15px; height: 15px; margin-right: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ToDoList pour "${game.title}"</h1>
          <p>Organisez votre activité étape par étape</p>
        </div>

        <div class="moment-section">
          <h2 class="moment-title">🟡 AVANT l'activité</h2>
          ${tasksByMoment.avant
            .map(
              (task: Task) => `
            <div class="task">
              <div class="task-title">
                <input type="checkbox" class="checkbox"> ${task.title}
              </div>
              ${task.description ? `<div class="task-description">${task.description}</div>` : ""}
            </div>
          `,
            )
            .join("")}
          ${tasksByMoment.avant.length === 0 ? "<p><em>Aucune tâche définie</em></p>" : ""}
        </div>

        <div class="moment-section">
          <h2 class="moment-title">🟢 PENDANT l'activité</h2>
          ${tasksByMoment.pendant
            .map(
              (task: Task) => `
            <div class="task">
              <div class="task-title">
                <input type="checkbox" class="checkbox"> ${task.title}
              </div>
              ${task.description ? `<div class="task-description">${task.description}</div>` : ""}
            </div>
          `,
            )
            .join("")}
          ${tasksByMoment.pendant.length === 0 ? "<p><em>Aucune tâche définie</em></p>" : ""}
        </div>

        <div class="moment-section">
          <h2 class="moment-title">🔴 APRÈS l'activité</h2>
          ${tasksByMoment.aprés
            .map(
              (task: Task) => `
            <div class="task">
              <div class="task-title">
                <input type="checkbox" class="checkbox"> ${task.title}
              </div>
              ${task.description ? `<div class="task-description">${task.description}</div>` : ""}
            </div>
          `,
            )
            .join("")}
          ${tasksByMoment.aprés.length === 0 ? "<p><em>Aucune tâche définie</em></p>" : ""}
        </div>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="todolist-${game.title.replace(/[^a-zA-Z0-9]/g, "-")}.html"`,
    );

    res.send(htmlContent);
  } catch (err) {
    next(err);
  }
};

export default { downloadGameSheet, downloadToDoList };
