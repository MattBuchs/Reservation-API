import express from "express";
import controllerAuth from "../controllers/auth.controller.js";
import ControllerRoom from "../controllers/room.controller.js";

const router = express.Router();

// Auth
router.route("/login").post(controllerAuth.login);
router.route("/signup").post(controllerAuth.signup);

// rooms
router.route("/rooms").get(ControllerRoom.getRooms);

export default router;
