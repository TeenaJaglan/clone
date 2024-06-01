import React from "react";
import TeamMember from "./TeamMember";

export default function Team() {
  const data = [
    {
      image:
        "https://th.bing.com/th/id/R.9b382759bd5387d7d186c4848996f717?rik=wzC1zVZtU6qKcQ&riu=http%3a%2f%2fthispix.com%2fwp-content%2fuploads%2f2015%2f06%2fpassport-023.jpg&ehk=Vis5IW%2bFUXttSO882w%2fjgR9jSw1ZSmnQYLOuMcwy5A0%3d&risl=&pid=ImgRaw&r=0",
      name: "Jeffrey Brown",
      role: "creative leader",
      description:
        "sample text.click to selct the text box . click again or double click to start editing the text",

      data2: {
        image:
          "https://th.bing.com/th/id/R.9b382759bd5387d7d186c4848996f717?rik=wzC1zVZtU6qKcQ&riu=http%3a%2f%2fthispix.com%2fwp-content%2fuploads%2f2015%2f06%2fpassport-023.jpg&ehk=Vis5IW%2bFUXttSO882w%2fjgR9jSw1ZSmnQYLOuMcwy5A0%3d&risl=&pid=ImgRaw&r=0",
        name: "Jeffrey Brown",
        role: "Programming leader",
        description:
          "sample text.click to selct the text box . click again or double click to start editing the text",
      },
    },
    {
      image:
        "https://th.bing.com/th/id/R.9b382759bd5387d7d186c4848996f717?rik=wzC1zVZtU6qKcQ&riu=http%3a%2f%2fthispix.com%2fwp-content%2fuploads%2f2015%2f06%2fpassport-023.jpg&ehk=Vis5IW%2bFUXttSO882w%2fjgR9jSw1ZSmnQYLOuMcwy5A0%3d&risl=&pid=ImgRaw&r=0",
      name: "Jeffrey Brown",
      role: "creative leader",
      description:
        "sample text.click to selct the text box . click again or double click to start editing the text",

      data2: {
        image:
          "https://th.bing.com/th/id/R.9b382759bd5387d7d186c4848996f717?rik=wzC1zVZtU6qKcQ&riu=http%3a%2f%2fthispix.com%2fwp-content%2fuploads%2f2015%2f06%2fpassport-023.jpg&ehk=Vis5IW%2bFUXttSO882w%2fjgR9jSw1ZSmnQYLOuMcwy5A0%3d&risl=&pid=ImgRaw&r=0",
        name: "Jeffrey Brown",
        role: "creative leader",
        description:
          "sample text.click to selct the text box . click again or double click to start editing the text",
      },
    },
  ];
  return (
    <div className="py-10 text-black bg-white">
         <h1 className="text-center  text-4xl font-bold">Perfect Team</h1>
    <div className="bg-white   flex flex-row items-center">
    
        <div className="bg-yellow-50 w-[14vw] text-center flex items-center  lg:h-[150px] h-[50vmax]"></div>
      
      <div className="bg-white my-4  flex flex-col w-10/12  mx-auto">
        {data.map((data, index) => (
          <div className="flex flex-row flex-wrap lg:flex-nowrap" key={index}>
            <TeamMember data={data} />
            <TeamMember data={data.data2} />
          </div>
        ))}
      </div>
     
      <div className="bg-yellow-50 w-[14vw] text-center flex items-center  lg:h-[150px] h-[50vmax]"></div>

    </div></div>
  );
}
