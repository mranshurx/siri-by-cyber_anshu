const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({}); // Automatically picks up GEMINI_API_KEY from environment variables

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a concise voice assistant like Siri. Keep answers brief and conversational."
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
