import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body.message || "");

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في المساعد" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
