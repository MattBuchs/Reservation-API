import express from "express";
import cors from "cors";
import cron from "node-cron";
import router from "./routers/index.router.js";
import updateSessionController from "./controllers/updateSession.controller.js";

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

// Planifie une tâche qui s'exécutera tous les jours à minuit
cron.schedule(
    "0 0 * * *",
    () => {
        console.log("Ajout d'un nouveau jour et suppression du jour passé...");
        updateSessionController.addNewDay(); // Ajouter un nouveau jour
        updateSessionController.deletePastDay(); // Supprimer le jour passé
    },
    {
        timezone: "Europe/Paris",
    }
);

app.use(router);

export default app;
