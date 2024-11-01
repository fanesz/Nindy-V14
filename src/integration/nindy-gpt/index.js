async function chat(message) {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(`${process.env.NINDY_GPT_ENDPOINT}/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  });
  const data = await response.json();
  return data;
}

module.exports = { chat };
