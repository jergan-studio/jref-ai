const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post("/api/ai", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are JREF AI." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (err) {
    res.json({ reply: "AI error: " + err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 JREF AI running on http://localhost:3000");
});
