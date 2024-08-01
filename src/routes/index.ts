import { Request, Response, Router } from "express";

import { NotFoundException } from "../exceptions/NotFoundException";

import AsyncHandler from "../middlewares/AsyncHandler";
import BasicAuthHandler from "../middlewares/BasicAuthHandler";
import PrometheusHandler from "../middlewares/PrometheusHandler";
import AuthController from "../controllers/AuthController";

// import unitRouter from "./unit.route";
// import scheduleRouter from "./schedule.route";

// import TermController from "../controllers/TermController";
// import FaqsController from "../controllers/FaqsController";
// import DoctorQuotaController from "../controllers/DoctorQuotaController";

const routes = Router();

// @desc Root
// @route GET /
routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Hello there! Are you lost?",
  });
});

// @desc metrics untuk monitoring API Server
// @route GET /
routes.get("/metrics", async (req, res) => {
  try {
    const metrics = await PrometheusHandler.prometheus.register.metrics(); // Await metrics collection

    res.set("Content-Type", PrometheusHandler.prometheus.register.contentType);
    res.end(metrics); // Send metrics as string
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).send("Error fetching metrics"); // Handle error fetching metrics
  }
});

// @desc    Syarat dan Ketentuan
// @route   GET /terms
// routes.get("/terms", AsyncHandler(TermController));

// @desc    Pertanyaan dan Jawaban
// @route   GET /faqs
// routes.get("/faqs", AsyncHandler(FaqsController));

// @desc    Antrian
// @route   GET /queue/*
// routes.use('/queue', queueRouter)

// @desc    Unit
// @route   GET /units
// routes.use("/units", unitRouter);

// @desc    Doctor Schedule
// @route   GET /schedule
// routes.use('/schedule', scheduleRouter)

// @desc    Quota Dokter Unit
// @route   POST /quota
// routes.post("/quota", AsyncHandler(DoctorQuotaController));

// @desc    Authorization Registration / Status
// @route   POST /auth
routes.use('/auth', AsyncHandler(AuthController));

// @desc    Status Reservasi
// @route   GET /status
// routes.use('/status', validateToken, statusRouter)

// @desc    Registrasi PM Online
// @route   POST /registration
// routes.use('/registration', registrationRouter)

// return 404 for unknow route
routes.all("*", (req: Request, res: Response, next) => {
  const err = new NotFoundException("404 Not Found!");
  next(err);
});

export default routes;
