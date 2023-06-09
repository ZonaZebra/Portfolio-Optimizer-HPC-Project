import { Router } from "express";
import { optimizePortfolio } from "./controllers/portfolioController";

export const apiRouter = Router();

apiRouter.post("/optimize_portfolio", optimizePortfolio);
apiRouter.get("/ping", (req, res) => {
    res.json({ message: "pong" });
    }
);

