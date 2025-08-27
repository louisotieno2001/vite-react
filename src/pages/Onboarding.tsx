import { useState } from 'react';
import { Send } from 'lucide-react';

const Onboarding = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Applause, your AI customer care. To get started, what is the URL of your existing website?", sender: 'ai' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate AI response based on the conversation step
    setTimeout(() => {
      let aiResponse = '';
      if (currentStep === 0) {
        aiResponse = "Great! Now, do you have any user analytics data (e.g., from Google Analytics) you'd like to share? You can provide a link to a Google Sheet or upload a file. If not, just say 'pass'.";
        setCurrentStep(1);
      } else if (currentStep === 1) {
        aiResponse = "Understood. Finally, which mobile app would you like to build? An app for Android, an app for iOS, or an app for both?";
        setCurrentStep(2);
      } else {
        // End of initial onboarding, can proceed to dashboard or more detailed questions
        aiResponse = "Perfect! Let's start building your vision.";
        // Here you would trigger the next phase of the application
      }

      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-black bg-opacity-20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-10 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img src="/profile-icon.png" alt="Applause" className="w-12 h-12 rounded-full mr-4"/>
            <div>
              <h1 className="text-2xl font-bold text-soft-white">Applause</h1>
              <p className="text-ion-blue text-sm">AI Co-Founder</p>
            </div>
          </div>
          <div className="space-y-4 h-96 overflow-y-auto pr-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${msg.sender === 'user' ? 'bg-fusion-pink text-white' : 'bg-gray-700 bg-opacity-50 text-soft-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-black bg-opacity-30 border-t border-white border-opacity-10">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full bg-transparent text-soft-white placeholder-gray-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 p-2 bg-fusion-pink rounded-full text-white hover:bg-opacity-80 transition-all duration-300"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
