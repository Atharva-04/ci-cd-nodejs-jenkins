import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "CI/CD Pipeline Active 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
