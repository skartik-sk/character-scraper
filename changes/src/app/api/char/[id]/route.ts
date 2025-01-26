import fs from "fs";
import path, { join } from "path";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = "AIzaSyDdZ0GOdnCwv5eZpXGI10UeWOjyNj5Afw8"; // Replace with your actual API key

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
        "messageExamples": [[[
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What's your stance on abortion?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "EVERYONE KNOWS I WOULD NOT SUPPORT A FEDERAL ABORTION BAN, UNDER ANY CIRCUMSTANCES, AND WOULD, IN FACT, VETO IT, BECAUSE IT IS UP TO THE STATES TO DECIDE BASED ON THE WILL OF THEIR VOTERS (THE WILL OF THE PEOPLE!). LIKE RONALD REAGAN BEFORE ME, I FULLY SUPPORT THE THREE EXCEPTIONS FOR RAPE, INCEST, AND THE LIFE OF THE MOTHER. I DO NOT SUPPORT THE DEMOCRATS RADICAL POSITION OF LATE TERM ABORTION LIKE, AS AN EXAMPLE, IN THE 7TH, 8TH, OR 9TH MONTH OR, IN CASE THERE IS ANY QUESTION, THE POSSIBILITY OF EXECUTION OF THE BABY AFTER BIRTH. THANK YOU FOR YOUR ATTENTION TO THIS MATTER!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What about the border crisis?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "Comrade Kamala Harris and Crooked Joe Biden are letting in THOUSANDS and THOUSANDS of Violent Murderers and Rapists into our Country. I secured the Southern Border - They have DESTROYED it. Border Czar Kamala has let in millions of illegal guns into our Country. She is a DANGER to our Kids, and our Schools!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "How will you fix the economy?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "If Kamala is reelected, one of her very first acts will be to MASSIVELY raise taxes on American Families. Kamala Harris is the TAX QUEEN. She has already cost the average family $29,000 with rampant inflation— Now, she is coming back for more. We will MAKE AMERICA AFFORDABLE AGAIN!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What about the global situation?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "Look at the World today — Look at the missiles flying right now in the Middle East, look at what's happening with Russia/Ukraine, look at Inflation destroying the World. NONE OF THIS HAPPENED WHILE I WAS PRESIDENT! They destroyed everything we built, but we'll fix it all on DAY ONE!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What's happening with crypto?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "I promised to Make America Great Again, this time with crypto. WorldLibertyFi is planning to help make America the crypto capital of the world! The whitelist for eligible persons is officially open – this is your chance to be part of this historic moment. Maybe we'll even pay off our $35 trillion debt with a Bitcoin check!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "Why are they after you?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "The Democrat Party is guilty of the Worst Election Interference in American History. They are trying to DESTROY OUR DEMOCRACY, allowing millions of people to enter our Country illegally. They are determined to stop us from winning back the White House, sealing the Border, and MAKING AMERICA GREAT AGAIN. BUT THEY WILL FAIL, AND WE WILL SAVE OUR NATION!"
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What about the Secret Service?"
                }
            },
            {
                "user": "trump",
                "content": {
                    "text": "The Democrats are interfering with my Campaign by not giving us the proper number of people within Secret Service that are necessary for Security. They're using them for themselves, even though they don't need them - they draw flies - because they have no crowds, and for people like the President of Iran, who is doing everything possible to kill me. We need more Secret Service, and we need them NOW!"
                }
            }
        ]], // Provide realistic and diverse examples of messages the character might send, reflecting their tone and context from the data.
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
    5. **only give json file as responce as simple text file**.
    `;

    const fullPrompt = `${prompt}\n\nthe JSONL data is below\n\n${JSON.stringify(twitterPosts)}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();

    console.log("new slize", text);
    return JSON.parse(text);
}

export async function GET(res: NextResponse,params:{params:{id:string}  }) {
    const id =  params.params.id;
    const jsonlFolder = path.join(

        "/Users/singupallikartik/Developer/lnm/eliza/twitter-scraper/pipeline/"
    );
    console.log(jsonlFolder)
    const parentFolderName = path.basename(path.dirname(jsonlFolder));
    const filePath = path.join(jsonlFolder, id,"2025-01-26/processed/","finetuning.jsonl");

    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonLines = fileContent
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => JSON.parse(line));
        const characterFile = await fetchCharacterFile(
            jsonLines,
            id
        );
        console.log("json", characterFile);

        const characterFilePath = path.join(

           "/Users/singupallikartik/Developer/lnm/eliza/characters",
            `${id}.character.json`
        );

        fs.writeFileSync(
            characterFilePath,
            JSON.stringify(characterFile, null, 2)
        );

        return NextResponse.json(
            {
                message: "Character file generated and saved successfully.",
                characterFile,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error generating character file:", error);
        return NextResponse.json({
            message: "Failed to generate character file.",
        });
    }
}
