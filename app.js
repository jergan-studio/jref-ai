async function askAI() {
  const query = document.getElementById("input").value.trim();
  const output = document.getElementById("output");

  if (!query) return;

  output.innerHTML = "Searching AI...";

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
            content:
              "You are JREF AI, a search engine assistant. Always respond like search results. Be short, structured, and useful."
          },
          {
            role: "user",
            content: `Search query: ${query}`
          }
        ]
      })
    });

    const data = await res.json();

    console.log("GROQ:", data);

    if (!res.ok) {
      output.innerHTML = "API ERROR: " + JSON.stringify(data);
      return;
    }

    const reply = data?.choices?.[0]?.message?.content;

    output.innerHTML = reply || "No result found.";

  } catch (err) {
    output.innerHTML = "Fetch error: " + err.message;
  }
}
