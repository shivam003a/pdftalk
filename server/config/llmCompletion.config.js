import axios from "axios";


export const    llmCompletion = async (prompt) => {
    try {
        const chat = await axios.post(
            "https://api.sarvam.ai/v1/chat/completions",
            {
                model: "sarvam-105b",
                messages: [
                    {
                        role: "system",
                        content: "You're a helpful assistant answering based on the following context. Whenerver you include any link in your response never user angle brackets, always use HTML anchor tags. FOr example: <a href='https://google.com'>google.com</a>. Follow this format exactly.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SARVAM_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return chat?.data?.choices[0]?.message?.content
    } catch (e) {
        console.log("fewfwefewfewdwed", e)
        throw new Error("Error getting answer")
    }
}