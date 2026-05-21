async function askAI() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerHTML = "Thinking...";

  const API_KEY = "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"; // ⚠️ exposed on GitHub Pages

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are JREF AI. Keep answers short and useful."
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await res.json();

    output.innerHTML =
      data.choices?.[0]?.message?.content || "No response from AI.";

  } catch (err) {
    output.innerHTML = "AI error: " + err.message;
  }
}
