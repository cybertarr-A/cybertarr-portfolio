import { useEffect } from "react";

const quotes = [
  "Talk is cheap. Show me the code.",
  "First, solve the problem. Then, write the code.",
  "Code never lies, comments sometimes do.",
  "Debugging is like being a detective in a crime movie where you are the murderer.",
  "Programs must be written for people to read.",
  "A good developer is a silent poet of logic.",
  "Every bug is just a misunderstood feature."
];

export default function RobotWidget() {

  useEffect(() => {
    const quoteBox = document.getElementById("robot-quote");

    function updateQuote() {
      if (!quoteBox) return;
      quoteBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    updateQuote();
    const interval = setInterval(updateQuote, 120000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "18%",
        right: "10%",
        textAlign: "center",
        zIndex: 99
      }}
    >
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
        camera-controls
        autoplay
        animation-name="Wave"
        style={{ width: "260px", height: "260px" }}
      />

      <div
        id="robot-quote"
        style={{
          marginTop: "12px",
          padding: "12px 18px",
          background: "rgba(0,0,0,0.65)",
          border: "1px solid cyan",
          borderRadius: "14px",
          color: "#7df9ff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "14px",
          boxShadow: "0 0 18px rgba(0,255,255,0.7)"
        }}
      ></div>
    </div>
  );
}
