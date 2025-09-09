// import React from "react";

const blogs = [
  {
    title: "Benefits of Mobile Apps",
    body: "Mobile apps help businesses reach customers directly and improve engagement all the time.",
    image: "https://picsum.photos/300/500?random=1",
  },
  {
    title: "SMEs are Going Mobile in 2025",
    body: "More small businesses are embracing mobile-first strategies to stay competitive.",
    image: "https://picsum.photos/300/500?random=2",
  },
  {
    title: "iBuild Glass in iOS 26: Pros & Cons",
    body: "The new iBuild Glass feature in iOS 26 is revolutionizing design—but it comes with trade-offs.",
    image: "https://picsum.photos/300/500?random=3",
  },
  {
    title: "AI Table Turned Mobile App Development",
    body: "AI-generated tables are now powering full-fledged mobile app code scaffolding.",
    image: "https://picsum.photos/300/500?random=4",
  },
];

const BlogPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center relative">
      {/* Purple fusion semi-circle at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-600 rounded-t-full"></div>

      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 lg:px-24">
        <h1 className="text-blue-600 text-3xl sm:text-4xl font-bold mt-8 underline">
          Blog
        </h1>
        <div className="relative mt-4 sm:mt-8 w-full sm:w-auto max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 pl-4 rounded-full border border-blue-800 shadow-md focus:outline-none focus:border-2 border-blue-800"
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-blue-800 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm8 8h.01M21 21l-6-6"
            />
          </svg>
        </div>
      </div>

      {/* Phone-style blog cards */}
      <div
        className="
          flex flex-col items-center gap-8 mt-8 p-4 w-full 
          sm:flex-row sm:overflow-x-auto sm:space-x-6 sm:p-6 sm:snap-x sm:snap-mandatory sm:justify-center sm:no-scrollbar
        "
      >
        {blogs.map((blog, index) => (
          <div
            key={index}
            className={`relative flex-none w-64 h-[480px] sm:h-[500px] rounded-3xl border-[6px] border-black bg-gray-900 shadow-2xl snap-center overflow-hidden transition-transform duration-300 
              ${index % 4 === 1 || index % 4 === 2 ? "-translate-y-4 sm:-translate-y-6" : "translate-y-4 sm:translate-y-6"}
            `}
          >
            {/* Side buttons */}
            <div className="absolute left-[-6px] sm:left-[-8px] top-12 w-1.5 sm:w-2 h-10 sm:h-12 rounded-r-full bg-black"></div>
            <div className="absolute left-[-6px] sm:left-[-8px] top-28 w-1.5 sm:w-2 h-14 sm:h-20 rounded-r-full bg-black"></div>
            <div className="absolute right-[-6px] sm:right-[-8px] top-20 w-1.5 sm:w-2 h-12 sm:h-16 rounded-l-full bg-black"></div>

            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-5 bg-black rounded-b-2xl z-20"></div>

            {/* Blog background image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay with title + body */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col p-3 sm:p-4 text-white">
              <h2 className="text-base sm:text-lg font-bold mb-2 z-10">
                {blog.title}
              </h2>
              <div className="overflow-y-auto pr-1 text-xs sm:text-sm leading-relaxed">
                {blog.body.repeat(6)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;