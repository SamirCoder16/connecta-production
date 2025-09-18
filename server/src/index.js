import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import connectDB from "./config/db.config.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import { ENV } from "./config/env.js";

const app = express();

app.use(clerkMiddleware()); // clerk middleware for check authenticated user.
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan("dev"));

app.use("/api/inngest", serve({ client: inngest, functions })); // inngest route

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server is running on PORT ---> ", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();