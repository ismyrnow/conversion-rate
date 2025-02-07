import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rateRouter from "./routes/rate.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use morgan for request logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/rate", rateRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
