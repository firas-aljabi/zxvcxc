import React, { useState } from "react";

const Timeline = ({ redIndices, pinkIndices }) => {
  const [hoveredDot, setHoveredDot] = useState(null);
  const timeSlots = Array.from(Array(49).keys()).map((slot) => {
    const hour = Math.floor(slot / 4) + 9;
    const minute = slot % 4 * 15;
    return {
      time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      color: (hour >= 15 && hour <= 18) ? "#E21684" : "#f2bedb"
    };
  });

  const handleDotHover = (index) => {
    setHoveredDot(index);
  };

  return (
    <div className="relative mt-20 bg-[#D9D9D9] flex">
      {timeSlots.map(({ time, color }, index) => {
        let dotClass = "";

        if (redIndices.includes(time)) {
          dotClass = "bg-[#E21684]";
        } else if (pinkIndices.includes(time)) {
          dotClass = "bg-[#f2bedb]";
        } else {
          dotClass = color;
        }

        return (
          <div
            key={index}
            className={`w-12 h-2  ${dotClass}`}
            onMouseEnter={() => handleDotHover(index)}
            onMouseLeave={() => handleDotHover(null)}
          />
        );
      })}
      {hoveredDot !== null && (
        <span className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-md shadow">
          {timeSlots[hoveredDot].time}
        </span>
      )}
    </div>
  );
};

export default Timeline;
