import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // อนุญาตทุก domain (หรือระบุ domain ที่ต้องการ)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.get("/", (req, res) => {
  return res.json({
    message: "Backend API is running! 🚀",
    endpoints: {
      health: "/health",
      test: "/test",
      profiles: "/profiles",
    },
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ 
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

app.get("/test", (req, res) => {
  return res.json({
    message: "Server API is working 🚀",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/profiles", (req, res) => {
  return res.json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.url} not found`,
    availableRoutes: ["/", "/health", "/test", "/profiles"]
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
}

// Export for Vercel
export default app;
