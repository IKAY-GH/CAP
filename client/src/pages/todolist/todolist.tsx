import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./todolist.css";

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

type Task = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
};

function ToDoList() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      fetchGameAndTasks();
    }
  }, [gameId]);

  const fetchGameAndTasks = async () => {
    try {
      setLoading(true);

      const gameResponse = await fetch(
        `http://localhost:3310/api/game/${gameId}`,
      );
      if (gameResponse.ok) {
        const gameData = await gameResponse.json();
        setGame(gameData);
      }

      const tasksResponse = await fetch(
        `http://localhost:3310/api/task/game/${gameId}`,
      );
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      } else {
        setTasks([
          {
            id: 1,
            title: "Préparer le matériel",
            description: "",
            is_done: false,
            moment: "avant",
          },
          {
            id: 2,
            title: "Vérifier l'espace de jeu",
            description: "",
            is_done: false,
            moment: "avant",
          },
          {
            id: 3,
            title: "Accueillir les participants",
            description: "",
            is_done: false,
            moment: "avant",
          },
          {
            id: 4,
            title: "Expliquer les règles",
            description: "",
            is_done: false,
            moment: "pendant",
          },
          {
            id: 5,
            title: "Animer l'activité",
            description: "",
            is_done: false,
            moment: "pendant",
          },
          {
            id: 6,
            title: "Encourager la participation",
            description: "",
            is_done: false,
            moment: "pendant",
          },
          {
            id: 7,
            title: "Ranger le matériel",
            description: "",
            is_done: false,
            moment: "aprés",
          },
          {
            id: 8,
            title: "Faire le bilan avec les participants",
            description: "",
            is_done: false,
            moment: "aprés",
          },
          {
            id: 9,
            title: "Nettoyer l'espace",
            description: "",
            is_done: false,
            moment: "aprés",
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, is_done: !task.is_done } : task,
      ),
    );
  };

  const addTask = (moment: "avant" | "pendant" | "aprés") => {
    const newTask: Task = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      title: "Nouvelle tâche",
      description: "",
      is_done: false,
      moment,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskDescription = (taskId: number, description: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, description } : task,
      ),
    );
  };

  const updateTaskTitle = (taskId: number, title: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, title } : task)),
    );
  };

  const downloadToDoList = async () => {
    if (!game) return;

    try {
      const todoResponse = await fetch(
        "http://localhost:3310/api/pdf/todolist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: game.id,
            tasks: tasks,
          }),
        },
      );

      if (!todoResponse.ok) {
        throw new Error("Erreur lors du téléchargement de la to-do list");
      }

      const gameSheetResponse = await fetch(
        `http://localhost:3310/api/pdf/game-sheet/${game.id}`,
        {
          method: "GET",
        },
      );

      if (!gameSheetResponse.ok) {
        throw new Error("Erreur lors du téléchargement de la fiche de jeu");
      }

      const todoHtmlContent = await todoResponse.text();
      const gameSheetHtmlContent = await gameSheetResponse.text();

      const todoBlob = new Blob([todoHtmlContent], { type: "text/html" });
      const gameSheetBlob = new Blob([gameSheetHtmlContent], {
        type: "text/html",
      });

      const gameTitle = game.title.replace(/[^a-zA-Z0-9]/g, "-");

      const gameSheetUrl = window.URL.createObjectURL(gameSheetBlob);
      const gameSheetLink = document.createElement("a");
      gameSheetLink.href = gameSheetUrl;
      gameSheetLink.download = `fiche-jeu-${gameTitle}.html`;
      document.body.appendChild(gameSheetLink);
      gameSheetLink.click();
      document.body.removeChild(gameSheetLink);
      window.URL.revokeObjectURL(gameSheetUrl);

      setTimeout(() => {
        const todoUrl = window.URL.createObjectURL(todoBlob);
        const todoLink = document.createElement("a");
        todoLink.href = todoUrl;
        todoLink.download = `todolist-${gameTitle}.html`;
        document.body.appendChild(todoLink);
        todoLink.click();
        document.body.removeChild(todoLink);
        window.URL.revokeObjectURL(todoUrl);
      }, 500);

      alert(
        "Téléchargement terminé ! Vous devriez avoir reçu 2 fichiers :\n- La fiche de jeu\n- Votre to-do list personnalisée",
      );
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement des fichiers");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="todolist-container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="todolist-container">
        <div className="error">Activité introuvable</div>
      </div>
    );
  }

  const tasksByMoment = {
    avant: tasks.filter((task) => task.moment === "avant"),
    pendant: tasks.filter((task) => task.moment === "pendant"),
    aprés: tasks.filter((task) => task.moment === "aprés"),
  };

  return (
    <main className="todolist-container">
      <header className="todolist-header">
        <div className="header-content">
          <button type="button" className="menu-btn">
            ☰
          </button>
        </div>
      </header>

      <div className="todolist-content">
        <h1 className="game-title">{game.title}</h1>
        <h2 className="subtitle">To do list</h2>

        <section className="tasks-section">
          <h3 className="section-title">Avant</h3>
          <div className="tasks-list">
            {tasksByMoment.avant.map((task, index) => (
              <div key={task.id} className="task-item">
                <span className="task-number">{index + 1}</span>
                <div className="task-content">
                  <input
                    type="text"
                    className="task-title-input"
                    value={task.title}
                    onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                    placeholder="Titre de la tâche..."
                  />
                  <textarea
                    className="task-description-input"
                    value={task.description}
                    onChange={(e) =>
                      updateTaskDescription(task.id, e.target.value)
                    }
                    placeholder="Ajouter des notes personnalisées..."
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  className={`task-checkbox ${task.is_done ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.is_done ? "✓" : ""}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-task-btn"
              onClick={() => addTask("avant")}
            >
              ⊕
            </button>
          </div>
        </section>

        <section className="tasks-section">
          <h3 className="section-title">Pendant</h3>
          <div className="tasks-list">
            {tasksByMoment.pendant.map((task, index) => (
              <div key={task.id} className="task-item">
                <span className="task-number">{index + 1}</span>
                <div className="task-content">
                  <input
                    type="text"
                    className="task-title-input"
                    value={task.title}
                    onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                    placeholder="Titre de la tâche..."
                  />
                  <textarea
                    className="task-description-input"
                    value={task.description}
                    onChange={(e) =>
                      updateTaskDescription(task.id, e.target.value)
                    }
                    placeholder="Ajouter des notes personnalisées..."
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  className={`task-checkbox ${task.is_done ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.is_done ? "✓" : ""}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-task-btn"
              onClick={() => addTask("pendant")}
            >
              ⊕
            </button>
          </div>
        </section>

        <section className="tasks-section">
          <h3 className="section-title">Après</h3>
          <div className="tasks-list">
            {tasksByMoment.aprés.map((task, index) => (
              <div key={task.id} className="task-item">
                <span className="task-number">{index + 1}</span>
                <div className="task-content">
                  <input
                    type="text"
                    className="task-title-input"
                    value={task.title}
                    onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                    placeholder="Titre de la tâche..."
                  />
                  <textarea
                    className="task-description-input"
                    value={task.description}
                    onChange={(e) =>
                      updateTaskDescription(task.id, e.target.value)
                    }
                    placeholder="Ajouter des notes personnalisées..."
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  className={`task-checkbox ${task.is_done ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.is_done ? "✓" : ""}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-task-btn"
              onClick={() => addTask("aprés")}
            >
              ⊕
            </button>
          </div>
        </section>

        <div className="actions-section">
          <button type="button" className="btn-back" onClick={goBack}>
            ← Retour
          </button>
          <button
            type="button"
            className="btn-download-todolist"
            onClick={downloadToDoList}
          >
            📥 Télécharger la fiche de jeu + to-do list
          </button>
        </div>
      </div>
    </main>
  );
}

export default ToDoList;
