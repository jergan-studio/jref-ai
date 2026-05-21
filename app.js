async function askAI() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  if (!input.trim()) return;

  output.innerHTML = "Thinking...";

  try {
    const res = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    output.innerHTML = data.reply;

  } catch (err) {
    output.innerHTML = "Failed to connect to JREF AI server.";
  }
}