import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/api/chat/history")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching chat history:", err));
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setText(""); 

    try {
      const res = await api.post("/api/chat", { content: text });
      const aiMessage = res.data;
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      // fallback reply so UI never hangs
      const fallback = { id: Date.now(), role: "assistant", content: "(Sorry, no reply right now)" };
      setMessages((prev) => [...prev, fallback]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with Medical Assistant</div>
      <div className="chat-messages">
        {messages.map((m, index) => (
          <div key={m.id || index} className={`chat-message ${m.role}`}>
            {m.content && m.content.trim() !== ""
              ? m.content
              : m.role === "assistant"
                ? <i>(no reply)</i>
                : ""}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
