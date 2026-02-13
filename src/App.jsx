import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [mode, setMode] = useState("By Connector");
  const [view, setView] = useState("MAIN");

  // GitHub Pages-safe base path (works for /REPO_NAME/ deployments)
  const BASE = import.meta.env.BASE_URL || "/";

  const img = {
    connectorThumb: `${BASE}connector-1.png`,
    connectorMain: `${BASE}connector-2.jpg`,
    tacThumb: `${BASE}tac-1.jpg`,
    tacMain: `${BASE}tac-2.png`,
    panelThumb: `${BASE}panel-1.jpg`,
    panelMain: `${BASE}panel-2.jpg`,
  };

  const sidebarData = {
    "By Connector": {
      items: [
        { id: "J109", label: "J109", type: "connector" },
        { id: "P210", label: "P210", type: "connector" },
        { id: "J332", label: "J332", type: "connector" },
        { id: "P415", label: "P415", type: "connector" },
        { id: "J522", label: "J522", type: "connector" },
      ],
      img: img.connectorThumb,
    },
    "By TAC": {
      items: [
        { id: "TAC 1", label: "TAC 1", type: "tac" },
        { id: "TAC 2", label: "TAC 2", type: "tac" },
        { id: "TAC 3", label: "TAC 3", type: "tac" },
        { id: "TAC 4", label: "TAC 4", type: "tac" },
      ],
      img: img.tacThumb,
    },
    "By Panel": {
      items: [
        { id: "Panel 1", label: "Panel 1", type: "panel" },
        { id: "Panel 2", label: "Panel 2", type: "panel" },
        { id: "Panel 3", label: "Panel 3", type: "panel" },
        { id: "Panel 4", label: "Panel 4", type: "panel" },
      ],
      img: img.panelThumb,
    },
  };

  // WORKING HOTSPOTS
  const hotspots = [
    { id: "J109", top: 0.3, left: 0.45 },
    { id: "P210", top: 0.42, left: 0.55 },
    { id: "TAC 1", top: 0.55, left: 0.35 },
    { id: "Panel 2", top: 0.65, left: 0.6 },
  ];

  const getMainImage = (type) => {
    switch (type) {
      case "connector":
        return img.connectorMain;
      case "tac":
        return img.tacMain;
      case "panel":
        return img.panelMain;
      default:
        return "";
    }
  };

  const findItemById = (id) => {
    for (const group of Object.values(sidebarData)) {
      const found = group.items.find((item) => item.id === id);
      if (found) return found;
    }
    return null;
  };

  const handleSelect = (item) => {
    setView(item);
  };

  const handleHotspotClick = (id) => {
    const item = findItemById(id);
    if (item) setView(item);
  };

  const resetViewer = () => {
    setView("MAIN");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex flex-col p-4">
        <button
  className="mb-4 px-3 py-2 bg-gray-700 text-white rounded"
  onClick={resetViewer}
>
  ← Back
</button>


        <select
          className="mb-4 p-2 rounded bg-gray-800 text-white border border-gray-600 w-full"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>By Connector</option>
          <option>By TAC</option>
          <option>By Panel</option>
        </select>

        <div className="flex-1 overflow-y-auto space-y-3">
          {sidebarData[mode].items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-gray-800 p-3 rounded text-center"
              onClick={() => handleSelect(item)}
            >
              <img
                src={sidebarData[mode].img}
                alt={item.label}
                className="w-12 h-12 md:w-full md:h-20 object-contain mx-auto mb-2"
                loading="lazy"
              />
              <div className="text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-black text-white">
        <div className="absolute top-4 left-0 w-full z-10 text-xl md:text-3xl font-bold text-center bg-white/20 py-2 px-2">
          Eclypse INT F15 Supplemental Instruction Guide (Sig)
        </div>

        {view === "MAIN" && (
          <div className="w-full h-full relative flex justify-center items-center p-2 md:p-4">
            <div className="w-full max-w-6xl aspect-video">
              <iframe
                title="F15E Strike Eagle"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                src="https://sketchfab.com/models/b7e942cd45e044d9872282f0f233740d/embed?autostart=1"
              />
            </div>

            {hotspots.map((spot) => (
              <motion.div
                key={spot.id}
                className="absolute cursor-pointer flex flex-col items-center z-30"
                style={{
                  top: `${spot.top * 100}%`,
                  left: `${spot.left * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.3 }}
                onClick={() => handleHotspotClick(spot.id)}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full ring-4 ring-red-300" />
                <div className="text-xs mt-1 bg-black/70 px-1 rounded">
                  {spot.id}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view !== "MAIN" && (
          <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
            <img
              src={getMainImage(view.type)}
              alt={view.label}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
