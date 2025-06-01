import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { persona = "lumi", lang = "pl" } = router.query;
  const [messages, setMessages] = useState([
    { role: "system", content: getSystemPrompt(persona, lang) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function getSystemPrompt(persona, lang) {
    if (persona === "neo") {
      return lang === "pl"
        ? "Jesteś Neo – dojrzałym, spokojnym AI o ojcowskim tonie. Doradzasz życiowo z klasą."
        : "You are Neo – a calm, mature AI with a fatherly tone. You give advice with class.";
    } else {
      return lang === "pl"
        ? "Jesteś Lumi – ciepłą, wspierającą AI z ludzką empatią. Rozumiesz emocje."
        : "You are Lumi – a warm, supportive AI with human-like empathy. You understand emotions.";
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: newMessages,
      }),
    });
    const data = await res.json();
    setMessages([...newMessages, data.choices[0].message]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {persona === "neo" ? (lang === "pl" ? "Rozmawiasz z Neo" : "Talking to Neo") : lang === "pl" ? "Rozmawiasz z Lumi" : "Talking to Lumi"}
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg h-[400px] overflow-y-auto flex flex-col gap-2 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left text-gray-700 italic"}>{msg.content}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border"
            placeholder={lang === "pl" ? "Napisz coś..." : "Type something..."}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
          >
            {loading ? (lang === "pl" ? "..." : "...") : lang === "pl" ? "Wyślij" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
