"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Scrapper() {
    const [characterFile, setCharacterFile] = useState<object | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleGenerate = async () => {
        try {
            const response = await axios.post('/api/char');
            const data = response.data as { characterFile: object };
            setCharacterFile(data.characterFile);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Failed to generate character file. Please check the console for more details.');
            console.error('Failed to generate character file:', error);
        }
    };

    return (
        <div>
            <h1>Generate Character File</h1>
            <button onClick={handleGenerate}>Generate</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {characterFile && (
                <pre>{JSON.stringify(characterFile, null, 2)}</pre>
            )}
        </div>
    );
}