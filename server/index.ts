import express from "express";
import cors from "cors";
import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { movieTool } from "./tools/movieTool";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a movie assistant. ALWAYS use the searchMovie tool when the user asks about a movie. Never answer movie requests directly from your own knowledge.",
      messages: await convertToModelMessages(messages),
      tools: {
        searchMovie: movieTool,
      },
    });

    return result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "The AI tool could not be executed.",
    });
  }
});

app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});