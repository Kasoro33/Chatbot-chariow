import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 connexion OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🤖 route chatbot
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es un assistant pour une boutique e-commerce." },
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🌍 port serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur chatbot actif sur port " + PORT);
});
