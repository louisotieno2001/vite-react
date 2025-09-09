// import React from "react";
import tsionImage from "@/assets/images/tsion_tamirat.jpg";
import mugambiImage from "@/assets/images/mugambi_john_ndeke.jpg";

const AboutUs = () => {
  const team = [
    {
      name: "Tsion Tamirat",
      image: tsionImage,
      role: "Co-Founder & Vision Lead",
    },
    {
      name: "Mugambi Ndoke",
      image: mugambiImage,
      role: "Co-Founder & Strategy Lead",
    },
    {
      name: "Laura Nyaga",
      image: "https://picsum.photos/300/500?random=8",
      role: "Co-Founder & Operations",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center relative p-6">
      {/* Purple semi-circle fusion at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-600 rounded-t-full"></div>

      {/* Title */}
      <h1 className="text-blue-600 text-3xl sm:text-4xl font-bold mt-8 underline text-center">
        About Us
      </h1>

      {/* Phones with founders */}
      <div
        className="
          flex flex-col items-center gap-8 mt-8 w-full
          sm:flex-row sm:justify-center sm:space-x-6
        "
      >
        {team.map((member, index) => (
          <div
            key={index}
            className="relative flex-none w-64 h-[500px] rounded-3xl border-[6px] border-black bg-gray-900 shadow-2xl overflow-hidden"
          >
            {/* Side buttons */}
            <div className="absolute left-[-6px] top-12 w-1.5 h-12 rounded-r-full bg-black"></div>
            <div className="absolute right-[-6px] top-20 w-1.5 h-16 rounded-l-full bg-black"></div>

            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 bg-black rounded-b-2xl z-20"></div>

            {/* Background (image of founder) */}
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay with name + role */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About Us description */}
      <div className="relative z-10 mt-10 max-w-3xl text-center sm:text-left text-gray-800 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
        <p className="mb-2">
          We are a passionate team of innovators committed to building technology
          that empowers communities and drives change. Our diverse expertise
          brings together creativity, strategy, and technical excellence.
        </p>
        <p className="mb-2">
          Our mission is to provide inclusive solutions that make everyday
          interactions simpler, safer, and more impactful for everyone.
        </p>
        <p>
          To check the rest of the team,{" "}
          <a href="/team" className="underline text-blue-700">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutUs;