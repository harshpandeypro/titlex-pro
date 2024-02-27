// import express from "express";
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 5000;
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(apiKey.toString());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Titlex",
  });
});

app.post("/generate-title", async (req, res) => {
  const { title, description } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Title: ${title}\n Description: ${description}\n Generate a title for this video that can go viral by considering the given title and description as context. Keep the title under 60 characters, has keywords, use simple words instead of complex long words, triggers curiosity so that people want to click on it, uses numbers in a right way, create a sense of urgency.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  //   console.log(text);

  res.json(text);
});

app.listen(port, () => {
  // console.log(`Server is running at http://localhost:${port}`);
  console.log(`Server has started`);
});
