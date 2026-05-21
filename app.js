async function askAI() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerHTML = "Thinking...";

  const API_KEY = "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";

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
          { role: "system", content: "You are JREF AI." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", data); // 👈 IMPORTANT

    if (!res.ok) {
      output.innerHTML = "API ERROR: " + JSON.stringify(data);
      return;
    }

    const reply = data?.choices?.[0]?.message?.content;

    output.innerHTML = reply || "No AI reply found.";

  } catch (err) {
    output.innerHTML = "Fetch error: " + err.message;
  }
}
