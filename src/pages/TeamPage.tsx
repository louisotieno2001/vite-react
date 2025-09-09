// import React from "react";

const teamMembers = [
  {
    name: "Alex Kimani",
    role: "Frontend Developer",
    image: "https://picsum.photos/300/500?random=11",
  },
  {
    name: "Maria Lopez",
    role: "UI/UX Designer",
    image: "https://picsum.photos/300/500?random=12",
  },
  {
    name: "James Carter",
    role: "Backend Engineer",
    image: "https://picsum.photos/300/500?random=13",
  },
  {
    name: "Amina Hassan",
    role: "Mobile Developer",
    image: "https://picsum.photos/300/500?random=14",
  },
  {
    name: "Chen Wei",
    role: "DevOps Specialist",
    image: "https://picsum.photos/300/500?random=15",
  },
  {
    name: "Sophia Martins",
    role: "QA Engineer",
    image: "https://picsum.photos/300/500?random=16",
  },
];

const TeamsPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center relative p-6">
      {/* Purple semi-circle background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-600 rounded-t-full"></div>

      {/* Title */}
      <h1 className="text-blue-600 text-3xl sm:text-4xl font-bold mt-8 underline text-center z-10">
        Our Team
      </h1>

      {/* Team description */}
      <p className="text-gray-800 text-center mt-4 max-w-2xl z-10">
        We are a diverse group of developers, designers, and engineers united by
        a passion for creating modern, scalable, and impactful digital
        solutions. Each member brings unique expertise that fuels our creativity
        and innovation.
      </p>

      {/* Phone-style cards */}
      <div
        className="
          flex overflow-x-auto sm:flex-wrap sm:justify-center gap-6 mt-8 p-4 snap-x snap-mandatory w-full no-scrollbar z-10
        "
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative flex-none w-64 h-[500px] rounded-3xl border-[6px] border-black bg-gray-900 shadow-2xl snap-center overflow-hidden"
          >
            {/* Side buttons */}
            <div className="absolute left-[-6px] top-12 w-1.5 h-12 rounded-r-full bg-black"></div>
            <div className="absolute right-[-6px] top-20 w-1.5 h-16 rounded-l-full bg-black"></div>

            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 bg-black rounded-b-2xl z-20"></div>

            {/* Background image */}
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;