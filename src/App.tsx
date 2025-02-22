import { useState, useEffect } from 'react';
import './App.css';

const FunnyButton = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [lastClickTime, setLastClickTime] = useState(null);
  const [clickTimes, setClickTimes] = useState([]);
  const [speedPopup, setSpeedPopup] = useState(null);

  const moveButton = () => {
    const newTop = Math.random() * (window.innerHeight - 300);;
    const newLeft = Math.random() * (window.innerWidth - 300);;
    setPosition({ top: newTop, left: newLeft });

    const now = Date.now();
    if (lastClickTime) {
      const clickSpeed = now - lastClickTime;
      setClickTimes((prev) => [...prev, clickSpeed]);

      // Show speed popup
      setSpeedPopup(clickSpeed);
      setTimeout(() => setSpeedPopup(null), 1000); // Hide after 1 sec
    }
    setLastClickTime(now);
  };

  const averageSpeed =
    clickTimes.length > 0
      ? (clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length).toFixed(2)
      : "N/A";

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Average Click Time: {averageSpeed} ms</h2>
      <div className="funny-button">
        <button
          onClick={moveButton}
          style={{ position: 'absolute', top: position.top, left: position.left }}
        >
          Click me!
        </button>
        {speedPopup && (
          <div className="speed-popup" style={{
            position: 'absolute',
            top: position.top - 30,
            left: position.left,
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            opacity: speedPopup ? 1 : 0,
            transition: 'opacity 1s ease-out'
          }}>
            {speedPopup} ms
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <FunnyButton />
      <p className="read-the-docs">
        This is a test for Vite deployment.
      </p>
    </>
  );
}

export default App;
