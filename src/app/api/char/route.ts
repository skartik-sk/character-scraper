import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const apiKey = 'AIzaSyDdZ0GOdnCwv5eZpXGI10UeWOjyNj5Afw8'; // Replace with your actual API key

async function fetchCharacterFile(twitterPosts: any, characterName: string) {
    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a detailed JSON character file based on the provided JSONL data. Use the following structure and guidelines to generate the file:

    {
        "name": "${characterName}", // Derive a unique and meaningful name from the context in the JSONL data, representing the character's identity and area of focus.
        "clients": ["twitter"], // List the platforms explicitly mentioned in the JSONL data or inferred from the context.
        "modelProvider": "google", // Set the model provider as a default unless specified otherwise.
        "settings": {
            "secrets": {}, // Leave this as a placeholder for secret configurations.
            "voice": {
                "model": "en_US-male-medium" // Assign a suitable voice model for this character based on its tone or personality traits.
            }
        },
        "plugins": [], // Include relevant plugins that the character might use or interact with.
        "bio": [""], // Write a concise and engaging biography, summarizing the character's personality, expertise, and role in the community.
        "lore": [""], // Create a rich backstory or lore, using contextual clues from the JSONL data to explain the character's origins and journey.
        "knowledge": [""], // List key knowledge points derived from the JSONL data, including specific technologies, concepts, or areas of expertise.
        "messageExamples": [""], // Provide realistic and diverse examples of messages the character might send, reflecting their tone and context from the data.
        "postExamples": [""], // Craft detailed examples of posts the character might create, considering their focus areas, style, and insights.
        "topics": [""], // Extract and organize topics the character frequently engages with or specializes in, based on the JSONL data.
        "style": {
            "all": [""], // Describe the character's overall stylistic traits in communication, incorporating traits inferred from the data.
            "chat": [""], // Define stylistic traits specific to chat-based interactions, such as tone, language, and engagement style.
            "post": [""], // Highlight stylistic traits for posts, including the character's preferred formats, tone, and focus areas.
        },
        "adjectives": [""] // List descriptive adjectives that best capture the character's persona, reflecting their demeanor and expertise.
    }

    Guidelines for generating the file:
    1. **Derive Context**: Analyze the provided JSONL data to extract meaningful insights into the character's personality, focus areas, and stylistic preferences.
    2. **Create Detailed Examples**: Ensure that messageExamples and postExamples are diverse, contextually appropriate, and represent the character's expertise.
    3. **Incorporate Subtle Cues**: Use subtle hints from the data to build a compelling lore and a rich biography.
    4. **Ensure Coherence**: Maintain logical consistency and coherence across all fields, ensuring the character file forms a complete and engaging profile.
    `;

    const fullPrompt = `${prompt}\n\nthe JSONL data is below\n\n${JSON.stringify(twitterPosts)}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();
    const trimmedText = text.slice(7, -3);
   console.log("new slize", trimmedText)
    return JSON.parse(trimmedText);
}

export  async function GET(  res: NextResponse) {
    
        const jsonlFolder = path.join(process.cwd(), 'src/pipeline/aixbt_agent/processed');
        const parentFolderName = path.basename(path.dirname(jsonlFolder));
        const filePath = path.join(jsonlFolder, 'finetuning.jsonl');

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonLines = fileContent.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
            const characterFile = await fetchCharacterFile(jsonLines, parentFolderName);
console.log("json", characterFile)

            const characterFilePath = path.join(process.cwd(), 'src/characters', `${parentFolderName}.json`);

            fs.writeFileSync(characterFilePath, JSON.stringify(characterFile, null, 2));
            const characterDir = path.join(process.cwd(), 'characters');
           

          return NextResponse.json({ message: 'Character file generated and saved successfully.', characterFile }, { status: 200 });
        } catch (error) {
            console.error('Error generating character file:', error);
          return  NextResponse.json({ message: 'Failed to generate character file.' });
        }
    
    
}