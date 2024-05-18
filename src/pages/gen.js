import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Gen = () => {
    const [text, setText] = useState("");

    // Fetch your API_KEY
    const API_KEY = "AIzaSyCkkSkk0Mx9LzGCA8nlXMbuf_Riwzcgd0M";

    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

    // For text-only input, use the embedding-001 model
    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    async function run() {
        const prompt = "Write a story about a magic backpack.";

        try {
            const result = await model.embedContent(prompt);
            const response = await result.response;
            const text = response.text();
            setText(text);
        } catch (error) {
            console.error(error);
            setText("Error: " + error.message);
        }
    }

    return (
        <div>
            <button onClick={run}>Generate Text</button>
            <p>{text}</p>
        </div>
    );
};

export default Gen;