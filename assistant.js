import dotenv from "dotenv";
import fs from "fs";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

const apiKey = process.env.VITE_GOOGLE_AI_API_KEY;  // Ensure correct API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model
const model = genAI.getGenerativeModel({
 model: "gemini-1.5-flash",  // Updated model name
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function main() {
  const filePath = process.argv[2];
  const userQuery = process.argv[3];  // User's query

  // Ensure the file path and query are provided
  if (!filePath || !userQuery) {
    console.error("Please provide both a file path and a query.");
    process.exit(1);
  }

  // Read the file content
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error.message);
    process.exit(1);
  }

  const prompt = `
You are an expert JavaScript interpreter. I will provide you with JavaScript code from a file.
1. If there is no error, respond: "There is no error in the provided code."
2. If there is an error, explain the issue and suggest a solution.
3. I also need you to answer the following query from the user: "${userQuery}"

Here is the code:
${fileContent}`;

  // Send the text content as a prompt
  const AIChatSession = model.startChat();

  const result = await AIChatSession.sendMessage(prompt);
  const respText = await result.response.text();

  // Parse the response JSON


  console.log(respText)
}


main();
