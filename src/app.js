import express from "express";
import morgan from "morgan";
import rateRouter from "./routes/rate.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Use morgan for request logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/rate", rateRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
