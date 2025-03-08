import { Router } from "express";
import path from "path";
import { router as authRouter } from "./auth";
import { router as captionRouter } from "./caption";

const router = Router();
const API_VERSION: string = "/api/v1/";


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});


router.use(`${API_VERSION}auth`, authRouter);

router.use(`${API_VERSION}caption`, captionRouter);


router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "notfound.html"));
});

export { router };
