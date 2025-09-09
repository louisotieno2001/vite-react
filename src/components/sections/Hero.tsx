import React from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Go mobile <span className="text-[#8a2be2]">Now</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              It’s easy, fun, & simple.
              <br />
              Build your own native mobile app with just a website URL & simple
              prompt.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#8a2be2] hover:bg-[#701db5] text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Get Started
              </button>

              <button onClick={() => navigate("/demo")} className="flex items-center gap-2 text-gray-800 hover:text-[#8a2be2] transition">
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Phone Mockup */}
            <div className="relative w-80 h-[600px] bg-black rounded-[50px] shadow-2xl border-[12px] border-gray-900 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10"></div>

              {/* Side buttons */}
              {/* Left (volume buttons) */}
              <div className="absolute left-[-10px] top-24 w-3 h-20 bg-gray-800 rounded-r"></div>
              <div className="absolute left-[-10px] top-52 w-3 h-14 bg-gray-800 rounded-r"></div>
              {/* Right (power button) */}
              <div className="absolute right-[-10px] top-40 w-3 h-24 bg-gray-800 rounded-l"></div>

              {/* Screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#6ec6ff] to-[#1e90ff] flex flex-col items-center justify-center text-white text-center px-4">
                <h3 className="text-2xl font-bold leading-snug">
                  Lead <br /> the{" "}
                  <span className="text-[#ff3d7f]">Applaude</span>
                </h3>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-16 -left-16 bg-white shadow-lg rounded-2xl px-6 py-4 flex gap-8 items-center">
              {/* Stat 1 */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#eee"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#8a2be2"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - 0.57)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-black">
                    57%
                  </span>
                </div>
                <p className="text-sm text-[#8a2be2] font-semibold mt-2 text-center">
                  Customer retention
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#eee"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#8a2be2"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - 0.4)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-black">
                    40%
                  </span>
                </div>
                <p className="text-sm text-[#8a2be2] font-semibold mt-2 text-center">
                  Increase sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;