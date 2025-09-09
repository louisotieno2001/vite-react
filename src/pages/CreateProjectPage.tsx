// ChatUI.tsx
import React, { useState, useEffect } from "react";
import { Send, Folder, ArrowLeft } from "lucide-react";

// Message interface
interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatUIProps {
  firstName: string;
}

const KEY = import.meta.env.GEMINI_API_KEY;

const CreateProjectPage: React.FC<ChatUIProps> = ({ firstName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // preload welcome message
  useEffect(() => {
    setMessages([
      {
        text: `Hey ${firstName}, share your web URL or describe what you'd love me to build for you today!`,
        sender: "bot",
      },
    ]);
  }, [firstName]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: newMessage.text }] }],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t understand that.";

      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Could not connect to Gemini API.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Parser to detect code blocks and normal text
  const renderMessage = (text: string) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <p key={lastIndex} className="mb-2 whitespace-pre-wrap">
            {text.slice(lastIndex, match.index)}
          </p>
        );
      }
      const lang = match[1] || "text";
      const code = match[2];
      parts.push(
        <pre
          key={match.index}
          className="bg-gray-900 text-green-400 p-3 rounded-md text-sm overflow-x-auto mb-2"
        >
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(
        <p key={lastIndex} className="whitespace-pre-wrap">
          {text.slice(lastIndex)}
        </p>
      );
    }

    return parts;
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Phone Preview */}
      <div className="bg-purple-700 w-1/3 flex flex-col items-center justify-center text-white p-6">
        <div className="flex items-center mb-6">
          <img src="/logo_icon.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg">Applaude</span>
        </div>
        <div className="relative w-56 h-[450px] rounded-[40px] border-8 border-black bg-black flex flex-col items-center justify-center">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-lg"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-purple-400 rounded-full animate-spin"></div>
            <p className="mt-4 text-white">7%</p>
          </div>
        </div>
        <p className="mt-6 text-lg">App Preview</p>
      </div>

      {/* Right Side - Chat */}
      <div className="flex-1 bg-white flex flex-col p-6">
        {/* Back button */}
        <div className="flex items-center mb-6 text-purple-700">
          <ArrowLeft className="w-6 h-6 mr-2 cursor-pointer border border-blue-800 rounded-full" />
        </div>

        {/* Chat bubbles */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[100%] p-3 rounded-2xl text-white whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "self-end bg-purple-600 rounded-br-none"
                  : "self-start bg-gray-800 text-white rounded-bl-none"
              }`}
            >
              {renderMessage(msg.text)}
            </div>
          ))}
          {loading && (
            <div className="self-start text-gray-500 text-sm">...</div>
          )}
        </div>

        {/* Input box */}
        <div className="mt-4 flex items-center border-2 border-purple-600 rounded-full px-3 py-2">
          <Folder className="w-6 h-6 text-purple-600 mr-2 cursor-pointer" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none text-gray-800 px-2"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-purple-600 p-2 rounded-full text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
