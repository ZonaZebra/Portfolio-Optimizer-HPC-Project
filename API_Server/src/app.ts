import express from "express";
import { json } from "body-parser";
import { apiRouter } from "./routes";

const app = express();

app.use(json());
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
