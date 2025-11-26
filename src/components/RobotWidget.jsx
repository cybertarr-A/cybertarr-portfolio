import { useEffect } from "react";

const quotes = [
  "Talk is cheap. Show me the code.",
  "Code never lies, comments sometimes do.",
  "A bug is just a feature waiting for enlightenment.",
  "Every algorithm is a philosophy in motion.",
  "Silence the noise. Execute the logic.",
  "The universe runs on syntax and patience.",
  "Precision beats power."
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
        top: "5%",
        right: "20%",
        textAlign: "center",
        zIndex: 99,
        backdropFilter: "blur(4px)",
        padding: "10px",
        borderRadius: "16px"
      }}
    >
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        camera-controls
        autoplay
        style={{
          width: "260px",
          height: "260px",
          filter: "drop-shadow(0 0 25px #00ffff)"
        }}
        exposure="1.3"
        shadow-intensity="0"
        environment-image="neutral"
      />

      <div
        id="robot-quote"
        style={{
          marginTop: "12px",
          padding: "10px 16px",
          background: "rgba(0, 10, 20, 0.8)",
          border: "1px solid #00ffff",
          borderRadius: "14px",
          color: "#9efcff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "14px",
          boxShadow: "0 0 20px rgba(0,255,255,0.6)",
          textShadow: "0 0 8px rgba(0,255,255,0.8)"
        }}
      ></div>
    </div>
  );
}
