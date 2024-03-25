import express from "express";
import controllerAuth from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/login").post(controllerAuth.login);
router.route("/signup").post(controllerAuth.signup);

export default router;
