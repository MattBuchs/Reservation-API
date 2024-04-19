import express from "express";
import controllerAuth from "../controllers/auth.controller.js";
import controllerRoom from "../controllers/room.controller.js";

const router = express.Router();

// Auth
router.route("/login").post(controllerAuth.login);
router.route("/signup").post(controllerAuth.signup);

// rooms
router.route("/get-day").get(controllerRoom.getTodaysRooms);
router.route("/get-week").get(controllerRoom.getWeekRooms);
router.route("/get-prices").get(controllerRoom.getRoomPrices);

export default router;
