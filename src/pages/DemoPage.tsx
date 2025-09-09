import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DemoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-white px-24 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex border border-blue-800 rounded-full items-center gap-2 text-purple-700 hover:text-purple-900 mb-6"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left - Video */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // sample video
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 bg-purple-700 hover:bg-purple-900 text-white px-6 py-3 rounded-full font-semibold transition w-full sm:w-auto"
          >
            Get Started
          </button>
        </div>

        {/* Right - Steps */}
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Steps</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base sm:text-lg">
            <li>
              <strong>Write what you need in plain English.</strong>  
              Example: “Create a login page with email and password input fields.”
            </li>
            <li>
              <strong>Use AI tools to generate code.</strong>  
              Try{" "}
              <a
                href="https://chat.openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                ChatGPT
              </a>{" "}
              or{" "}
              <a
                href="https://github.com/features/copilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                GitHub Copilot
              </a>{" "}
              to get working code snippets instantly.
            </li>
            <li>
              <strong>Copy & test the code.</strong>  
              Use online editors like{" "}
              <a
                href="https://codesandbox.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                CodeSandbox
              </a>{" "}
              or{" "}
              <a
                href="https://stackblitz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                StackBlitz
              </a>{" "}
              to paste the code and see results immediately.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default DemoPage;