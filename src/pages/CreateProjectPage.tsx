// ChatUI.tsx
import React, { useState, useEffect, useRef } from "react";
import { Send, Folder, ArrowLeft } from "lucide-react";
import { useAuthStore } from '@/stores/useAuth';

// Message interface
interface Message {
  text: string;
  sender: "user" | "bot" | "system";
}

// Project data interface
interface ProjectData {
  id: string;
  name: string;
  source_url?: string;
  user_persona_document?: string;
  brand_palette?: any;
  generated_code_path?: string;
}


interface ChatUIProps {
  firstName: string;
}

const CreateProjectPage: React.FC<ChatUIProps> = ({ firstName }) => {
  const { user, accessToken } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [projectProgress, setProjectProgress] = useState(0);
  const [projectStatus, setProjectStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTask, setCurrentTask] = useState<{name: string; description: string} | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Log the auth token for WebSocket testing when component mounts
  useEffect(() => {
    if (accessToken) {
      console.log('🔑 Auth Token for WebSocket testing:', accessToken);
      console.log('🌐 WebSocket URL:', `ws://localhost:8000/ws/chat/room1/?token=${accessToken}`);
    }
  }, [accessToken]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to websocket and preload welcome message
  useEffect(() => {
    if (user) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [user]);

  // Poll for project status updates every 3 seconds
  useEffect(() => {
    if (!currentProject?.id || !accessToken) return;

    const pollInterval = setInterval(async () => {
      try {
        const baseUrl = process.env.NODE_ENV === 'production'
          ? window.location.origin
          : 'http://localhost:8000';

        const response = await fetch(`${baseUrl}/api/projects/${currentProject.id}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const projectData = await response.json();
          const progress = getProgressFromStatus(projectData.status);

          // Update even if progress hasn't changed, but status might have
          setProjectProgress(progress);
          setProjectStatus(projectData.status_message || 'Processing...');

          // Update project data
          setCurrentProject({
            id: projectData.id,
            name: projectData.name,
            source_url: projectData.source_url,
            user_persona_document: projectData.user_persona_document,
            brand_palette: projectData.brand_palette,
            generated_code_path: projectData.generated_code_path,
          });

          // Check if processing status changed
          const isCurrentlyProcessing = [
            'ANALYSIS_PENDING',
            'DESIGN_PENDING',
            'CODE_GENERATION',
            'QA_PENDING',
            'DEPLOYMENT_PENDING',
          ].includes(projectData.status);

          setIsProcessing(isCurrentlyProcessing);

          // If completed, show completion message
          if (projectData.status === 'COMPLETED' && progress === 100) {
            setMessages((prev) => [...prev, {
              text: `🎉 Project completed! Your app is ready.`,
              sender: "system"
            }]);
            if (projectData.generated_code_path) {
              setMessages((prev) => [...prev, {
                text: `📥 Download your app: ${projectData.generated_code_path}`,
                sender: "system"
              }]);
            }
          }
        }
      } catch (error) {
        console.error('Error polling project status:', error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [currentProject?.id, accessToken]);

  // Helper function to convert status to progress
  const getProgressFromStatus = (status: string): number => {
    const statusProgress: { [key: string]: number } = {
      'PENDING': 0,
      'ANALYSIS_PENDING': 10,
      'ANALYSIS_COMPLETE': 20,
      'DESIGN_PENDING': 30,
      'DESIGN_COMPLETE': 40,
      'CODE_GENERATION': 50,
      'QA_PENDING': 60,
      'QA_COMPLETE': 70,
      'DEPLOYMENT_PENDING': 80,
      'COMPLETED': 100,
      'FAILED': 0,
    };
    return statusProgress[status] || 0;
  };

  const connectWebSocket = () => {
    if (!user || !accessToken) return;

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Determine WebSocket URL based on environment
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = process.env.NODE_ENV === 'production'
      ? window.location.host
      : 'localhost:8000';
  const wsUrl = `${protocol}//${host}/ws/chat/chat_room1/?token=${accessToken}`;

    console.log('🔌 Connecting to WebSocket:', wsUrl);

    // Connect to the chat websocket
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to Applaude Prime chat');
      setIsConnected(true);
      setMessages([
        {
          text: `Hey ${firstName}, share your web URL or describe what you'd love me to build for you today!`,
          sender: "bot",
        },
      ]);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'project_status_update') {
        // Handle project status updates
        setCurrentProject(data.project_data);
        setProjectProgress(data.progress);
        setProjectStatus(data.status_message);
        setIsProcessing(data.is_processing || false);

        // Add status update message to chat only if not processing
        if (!data.is_processing) {
          setMessages((prev) => [...prev, {
            text: `📊 Project Status: ${data.status_message} (${data.progress}%)`,
            sender: "system"
          }]);
        }

        // If project is completed, save the project data
        if (data.progress === 100 && data.project_data) {
          saveCompletedProject(data.project_data);
          // Show download URL if generated code path exists
          if (data.project_data.generated_code_path) {
            setMessages((prev) => [...prev, {
              text: `🎉 Your app is ready! Download the source code here: ${data.project_data.generated_code_path}`,
              sender: "system"
            }]);
          } else {
            setMessages((prev) => [...prev, {
              text: `🎉 Your project is complete! Check your project dashboard for download options.`,
              sender: "system"
            }]);
          }
        }
      } else if (data.type === 'task_started') {
        // Handle task start notifications
        setCurrentTask({ name: data.task_name, description: data.task_description });
        setIsProcessing(true);

        // Update status and progress immediately when task starts
        const taskStatusMap: { [key: string]: { status: string, progress: number } } = {
          'Market Analysis': { status: 'Analyzing market and target user...', progress: 10 },
          'UI/UX Design': { status: 'Creating UI/UX design...', progress: 30 },
          'Code Generation': { status: 'Generating application source code...', progress: 50 },
          'Quality Assurance': { status: 'Performing automated QA checks...', progress: 60 },
          'Security Analysis': { status: 'Performing cybersecurity audit...', progress: 70 },
          'Deployment': { status: 'Deploying application to Amazon S3...', progress: 80 }
        };

        const taskInfo = taskStatusMap[data.task_name];
        if (taskInfo) {
          setProjectStatus(taskInfo.status);
          setProjectProgress(taskInfo.progress);
        }

        setMessages((prev) => [...prev, {
          text: `🚀 Starting ${data.task_name}: ${data.task_description}`,
          sender: "system"
        }]);
      } else if (data.type === 'task_completed') {
        // Handle task completion notifications
        setMessages((prev) => [...prev, {
          text: `✅ ${data.task_name} completed: ${data.task_result}`,
          sender: "system"
        }]);
        setCurrentTask(null);

        // Update status and progress immediately when task completes
        const completionStatusMap: { [key: string]: { status: string, progress: number } } = {
          'Market Analysis': { status: 'Market analysis complete. Ready for design.', progress: 20 },
          'UI/UX Design': { status: 'Design complete. Ready for code generation.', progress: 40 },
          'Code Generation': { status: 'Code generation finished. Pending QA.', progress: 60 },
          'Quality Assurance': { status: 'QA checks passed. Ready for deployment.', progress: 70 },
          'Security Analysis': { status: 'Security audit passed. Ready for deployment.', progress: 80 },
          'Deployment': { status: 'Deployment successful! Your app is now available.', progress: 100 }
        };

        const completionInfo = completionStatusMap[data.task_name];
        if (completionInfo) {
          setProjectStatus(completionInfo.status);
          setProjectProgress(completionInfo.progress);
          if (completionInfo.progress === 100) {
            setIsProcessing(false);
          }
        } else {
          setIsProcessing(false);
        }
      } else {
        // Handle regular chat messages
        setMessages((prev) => [...prev, {
          text: data.message,
          sender: data.sender === 'Applaude Prime' ? 'bot' : data.sender === 'system' ? 'system' : 'bot'
        }]);
      }
      setLoading(false);
    };

    ws.onclose = (event) => {
      console.log('Disconnected from chat', event.code, event.reason);
      setIsConnected(false);
      
      // Only attempt to reconnect if it wasn't a manual close
      if (event.code !== 1000) {
        setTimeout(() => {
          if (!isConnected && user) {
            console.log('Attempting to reconnect...');
            connectWebSocket();
          }
        }, 3000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };
  };

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current || !isConnected) return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    const messageData = {
      message: input.trim()
    };

      wsRef.current.send(JSON.stringify(messageData));
  };

  const saveCompletedProject = async (projectData: ProjectData) => {
    try {
      const baseUrl = process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:8000';

      const response = await fetch(`${baseUrl}/api/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: projectData.name,
          source_url: projectData.source_url,
          user_persona_document: projectData.user_persona_document,
          brand_palette: projectData.brand_palette,
          generated_code_path: projectData.generated_code_path,
          status: 'COMPLETED'
        }),
      });

      if (response.ok) {
        console.log('Project saved successfully');
        setMessages((prev) => [...prev, {
          text: "🎉 Project completed and saved successfully! You can now access your generated app.",
          sender: "system"
        }]);
      } else {
        console.error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  // Parser to detect code blocks, normal text, and download URLs  
  const renderMessage = (text: string) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const urlRegex = /(http[s]?:\/\/[^\s]+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // First handle code blocks
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
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
      lastIndex = codeRegex.lastIndex;
    }

    // Handle the remaining text, which may include URLs
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      let match;
      let urlLastIndex = 0;
      
      // Extract URLs from remaining text
      while ((match = urlRegex.exec(remainingText)) !== null) {
        if (match.index > urlLastIndex) {
          parts.push(
            <p key={`remaining-${urlLastIndex}`} className="whitespace-pre-wrap mb-2">
              {remainingText.slice(urlLastIndex, match.index)}
            </p>
          );
        }
        
        // Add clickable URL
        parts.push(
          <p key={`url-${match.index}`} className="mb-2">
            <a 
              href={match[1]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              📥 Download your source code: {match[1]}
            </a>
          </p>
        );
        urlLastIndex = urlRegex.lastIndex;
      }
      
      // Add any remaining text after URLs
      if (urlLastIndex < remainingText.length) {
        parts.push(
          <p key={`final-text`} className="whitespace-pre-wrap">
            {remainingText.slice(urlLastIndex)}
          </p>
        );
      }
    }

    return parts;
  };

  return (
    <div className="flex h-screen w-full relative">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-pulse">
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center border-4 border-purple-300 max-w-md w-full mx-4">
            <div className="w-16 h-16 border-8 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-bounce">🚀 Building Your App</h2>
            
            {/* Current Task Information */}
            {currentTask && (
              <div className="bg-purple-50 p-4 rounded-lg mb-4 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">✅ {currentTask.name}</h3>
                <p className="text-sm text-purple-700">{currentTask.description}</p>
              </div>
            )}
            
            <p className="text-lg text-gray-700 mb-4 font-medium">{projectStatus}</p>
            <div className="mt-6 bg-gray-200 rounded-full h-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-700 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${projectProgress}%` }}
              ></div>
            </div>
            <p className="text-lg font-semibold text-purple-600 mt-4">{projectProgress}% Complete</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we work our magic...</p>
          </div>
        </div>
      )}

      {/* Left Side - Phone Preview */}
      <div className="bg-purple-700 w-1/3 flex flex-col items-center justify-center text-white p-6">
        <div className="flex items-center mb-6">
          <img src="/logo_icon.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg">Applaude</span>
        </div>
        <div className="relative w-56 h-[450px] rounded-[40px] border-8 border-black bg-black flex flex-col items-center justify-center">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-lg"></div>
          
          {currentProject ? (
            <div className="flex flex-col items-center p-4 text-center">
              {/* Progress Circle */}
              <div className="relative w-20 h-20 mb-4">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-400"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${projectProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{projectProgress}%</span>
                </div>
              </div>
              
              {/* Project Info */}
              <h3 className="text-lg font-bold mb-2">{currentProject.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{projectStatus}</p>
              
              {/* Brand Colors Preview */}
              {currentProject.brand_palette && (
                <div className="flex space-x-1 mt-2">
                  {Object.values(currentProject.brand_palette).slice(0, 3).map((color: any, index: number) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
              
              {/* Generated Code Status */}
              {currentProject.generated_code_path && (
                <div className="mt-2 text-xs text-green-400">
                  ✅ Code Generated
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-purple-400 rounded-full animate-spin"></div>
              <p className="mt-4 text-white">Waiting for project...</p>
            </div>
          )}
        </div>
        <p className="mt-6 text-lg">App Preview</p>
      </div>

      {/* Right Side - Chat */}
      <div className="flex-1 bg-white flex flex-col p-6">
        {/* Header with connection status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-purple-700">
            <ArrowLeft className="w-6 h-6 mr-2 cursor-pointer border border-blue-800 rounded-full" />
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
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
          {isProcessing && (
            <div className="self-start flex items-center space-x-3 bg-purple-50 p-3 rounded-lg border border-purple-200 animate-pulse">
              <div className="w-6 h-6 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <span className="text-purple-700 font-medium">🔧 Processing...</span>
                <p className="text-sm text-purple-600">{projectStatus}</p>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className={`mt-4 flex items-center border-2 rounded-full px-3 py-2 ${isProcessing ? 'border-gray-300 bg-gray-100' : 'border-purple-600'}`}>
          <Folder className={`w-6 h-6 mr-2 cursor-pointer ${isProcessing ? 'text-gray-400' : 'text-purple-600'}`} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isProcessing ? "Processing... Please wait" : "Type a message..."}
            className="flex-1 outline-none px-2 text-gray-800"
            onKeyDown={(e) => e.key === "Enter" && !isProcessing && sendMessage()}
            disabled={isProcessing}
          />
          <button
            onClick={sendMessage}
            className={`ml-2 p-2 rounded-full text-white ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
            disabled={isProcessing}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
