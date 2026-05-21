async function askAI() {
  const query = document.getElementById("input").value.trim();
  const output = document.getElementById("output");

  if (!query) return;

  output.innerHTML = "Searching...";

  const API_KEY = "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";

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are JREF AI. Respond like a search engine: short, structured, useful."
          },
          {
            role: "user",
            content: query
          }
        ]
      })
    });

    const data = await res.json();

    if (!res.ok) {
      output.innerHTML = "API ERROR: " + JSON.stringify(data);
      return;
    }

    const reply = data?.choices?.[0]?.message?.content;

    output.innerHTML = reply || "No response.";

  } catch (err) {
    output.innerHTML = "Error: " + err.message;
  }
}
