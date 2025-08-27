import React, { useEffect, useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react'; // Import new icons

interface Message {
    text: string;
    sender: string;
}

interface InteractiveOption {
    text: string;
    payload: string | object;
}

interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string | object) => void;
    input: string;
    setInput: (value: string) => void;
    placeholder: string;
    interactiveOptions?: InteractiveOption[];
}


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, input, setInput, placeholder, interactiveOptions }) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const handleOptionClick = (option: InteractiveOption) => {
        onSendMessage(option);
    };


    return (
        <div className="flex flex-col h-[32rem] bg-black bg-opacity-20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-10 overflow-hidden">
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-md ${
                            msg.sender === 'user' ? 'bg-fusion-pink text-white' :
                            msg.sender === 'system' ? 'bg-gray-800 text-gray-400 italic' :
                            'bg-gray-700 bg-opacity-50 text-soft-white'
                        }`}>
                            <span className="font-bold block text-xs">{msg.sender}</span>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            {interactiveOptions && interactiveOptions.length > 0 && (
                <div className="p-4 flex flex-wrap gap-2 justify-center border-t border-white border-opacity-10">
                    {interactiveOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 bg-ion-blue text-black font-bold rounded-lg hover:bg-opacity-80 transition-all"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            )}


            <div className="p-4 bg-black bg-opacity-30 border-t border-white border-opacity-10">
                <div className="flex items-center">
                    {/* Placeholder Icons for future features */}
                    <button className="p-2 text-gray-400 hover:text-ion-blue transition-colors" title="Attach File">
                        <Paperclip size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-ion-blue transition-colors" title="Use Voice Input">
                        <Mic size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={placeholder}
                        className="w-full bg-transparent text-soft-white placeholder-gray-500 focus:outline-none px-2"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 p-2 bg-fusion-pink rounded-full text-white hover:bg-opacity-80 transition-all duration-300"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
