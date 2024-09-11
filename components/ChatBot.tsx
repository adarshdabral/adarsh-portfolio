import { useState } from "react";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Predefined data
  const data = {
    // Work Experience
    "Designnovation": "Adarsh is the president of The Designnovation Hub (TDH) since 08/2023.",
    "IEEE": "Adarsh is a researcher in IEEE working on AI Bots from 11/2023 to 03/2024.",
    "Young Protons": "Adarsh founded Young Protons in 03/2023.",
    "Makerspace": "Adarsh interned at Makerspace, IIT Delhi, where he learned about prototyping machines.",
    "Nova": "Adarsh worked as a Junior Marketing Associate at Nova from 04/2023 to 07/2023.",
    "IIT Delhi": "Adarsh attended the Changemaker Bootcamp at IIT Delhi and also worked on projects at Makerspace.",
    
    // Skills
    "Team Management": "Adarsh is skilled in Team Management.",
    "Research": "Adarsh has strong research skills, especially in AI and data-driven insights.",
    "Leadership": "Adarsh has leadership experience as the president of The Designnovation Hub.",
    "JavaScript": "Adarsh is proficient in JavaScript and uses it in his web development projects.",
    "Python": "Adarsh has experience in Python, particularly in AI and machine learning.",
    "HTML": "Adarsh is proficient in HTML and uses it in his frontend development.",
    "Next.js": "Adarsh is experienced in Next.js for building web applications.",
    "Robotics": "Adarsh has worked on MONbot, a quadruped robot project.",
    
    // Education
    "BTech": "Adarsh is pursuing a B.Tech in Artificial Intelligence and Data Science from Graphic Era.",
    "Artificial Intelligence": "Adarsh is studying Artificial Intelligence as part of his B.Tech program.",
    "Data Science": "Adarsh is focused on Data Science in his B.Tech program at Graphic Era University.",
    "Graphic Era": "Adarsh is a student at Graphic Era Deemed to Be University, pursuing AI & Data Science.",
    "Carmel School": "Adarsh completed his schooling in Science from Carmel School, Chamba.",
    
    // Certifications
    "Data Analysis with Python": "Adarsh is certified in Data Analysis with Python from freeCodeCamp.",
    "Google Analytics": "Adarsh is certified in Google Analytics from Liontech.",
    "Web Development": "Adarsh completed a Web Development certification from Microsoft Learn.",
    "Personality Development": "Adarsh completed the 'Personality Development Through Self Awareness' certification from SAVE.",
    
    // Awards & Scholarships
    "Change Maker": "Adarsh won the 'Change Maker' award from IIT Delhi in 06/2024.",
    
    // Projects
    "MONbot": "MONbot is a quadruped robot designed by Adarsh using Arduino and servo motors.",
    "Auto Attendance": "Adarsh developed an Auto Attendance system using CNN and RNN for face recognition.",
    "StatCalc": "StatCalc is a calculator designed by Adarsh that calculates mean, variance, and standard deviation.",
    "Arduino Clock": "Adarsh created a digital Arduino Clock that can be integrated with an RTC module.",
    
    // Volunteering & Leadership
    "Graphic Era": "Adarsh is part of the organizing committee at Graphic Era Deemed To Be University.",
    
    // Publications
    "LiFi": "Adarsh published a paper on 'Development of LiFi System for Communication in Hilly Regions'.",
    "Image Caption Bots": "Adarsh published research on 'Advancements in Image Caption Bots' through IEEE."
  };

  // Helper function to extract keywords
  const extractKeywords = (input) => {
    return input
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 2); // filter short/common words
  };

  // Handle user input and find matching keywords
  const handleSubmit = (e) => {
    e.preventDefault();
    const keywords = extractKeywords(question);
    let foundAnswer = "";

    keywords.forEach((keyword) => {
      Object.keys(data).forEach((key) => {
        if (key.toLowerCase().includes(keyword)) {
          foundAnswer = data[key];
        }
      });
    });

    setAnswer(foundAnswer ? foundAnswer : "I can't share this");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>ChatBot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
          Ask
        </button>
      </form>
      {answer && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
