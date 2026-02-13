import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [mode, setMode] = useState("By Connector");
  const [view, setView] = useState("MAIN");

  const sidebarData = {
    "By Connector": {
      items: [
        { id: "J109", label: "J109", type: "connector" },
        { id: "P210", label: "P210", type: "connector" },
        { id: "J332", label: "J332", type: "connector" },
        { id: "P415", label: "P415", type: "connector" },
        { id: "J522", label: "J522", type: "connector" },
      ],
      img: "https://topflitecomponents.com/wp-content/uploads/2022/06/Asset-1@4x-10-1-768x626.png",
    },
    "By TAC": {
      items: [
        { id: "TAC 1", label: "TAC 1", type: "tac" },
        { id: "TAC 2", label: "TAC 2", type: "tac" },
        { id: "TAC 3", label: "TAC 3", type: "tac" },
        { id: "TAC 4", label: "TAC 4", type: "tac" },
      ],
      img: "https://www.strantech.com/wp-content/uploads/2013/06/Cable-Assemblies-Photo-2-TFOCA-GenX-Rear-Mount-Receptacle-to-90degree-M38999-Connector-copy.jpg",
    },
    "By Panel": {
      items: [
        { id: "Panel 1", label: "Panel 1", type: "panel" },
        { id: "Panel 2", label: "Panel 2", type: "panel" },
        { id: "Panel 3", label: "Panel 3", type: "panel" },
        { id: "Panel 4", label: "Panel 4", type: "panel" },
      ],
      img: "https://c7.alamy.com/comp/2AH8G39/rocket-disarming-access-panel-on-a-military-aircraft-with-glowing-light-2AH8G39.jpg",
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
        return "https://www.glenair.com/powerload/img/cover.jpg";
      case "tac":
        return "https://www.airelectro.com/blog/wp-content/uploads/2024/08/MIL-DTL-Blog-Image-690x600-4.png";
      case "panel":
        return "https://aviationhumor.net/wp-content/uploads/2019/04/F-15-avionics-bay.jpg";
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <button
          className="mb-4 px-3 py-2 bg-gray-700 rounded"
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
                className="w-full h-20 object-contain mb-2"
              />
              <div className="text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-black text-white">
        <div className="absolute top-4 left-0 w-full z-10 text-3xl font-bold text-center bg-white/20 py-2">
          Eclypse INT F15 Supplemental Instruction Guide (Sig)
        </div>

        {view === "MAIN" && (
          <div className="w-full h-full relative flex justify-center items-center">
            <iframe
              title="F15E Strike Eagle"
              width="1920"
              height="1080"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              src="https://sketchfab.com/models/b7e942cd45e044d9872282f0f233740d/embed?autostart=1"
            />

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
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={getMainImage(view.type)}
              alt={view.label}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
