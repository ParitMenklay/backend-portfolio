import "dotenv/config";
import express from "express"
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express()

app.use(express.json());

app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL,
            "https://react-portfolio-app-green.vercel.app", 
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.get("/test", (req, res) => {
    return res.json("Server API is working 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.get("/profiles", (req, res) => {
    return res.json({
        data: {
            name: "john",
            age: 20,
        },
    });
});

app.post("/posts", async (req, res) => {

  const newPost = req.body;

  try {
    const query = `insert into posts (title, image, category_id, description, content, status_id)
    values ($1, $2, $3, $4, $5, $6)`;

    const values = [
      newPost.title,
      newPost.image,
      newPost.category_id,
      newPost.description,
      newPost.content,
      newPost.status_id,
    ];

    await connectionPool.query(query, values);
  } catch {
    return res.status(500).json({
      message: `Server could not create post because database connection`,
    });
  }

  return res.status(201).json({ message: "Created post successfully" });
});

app.get("/posts",async (req,res)=>{
    const result = await connectionPool.query(`select * from posts`)
    res.status(200).json(result.rows)
})


if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
}


export default app;