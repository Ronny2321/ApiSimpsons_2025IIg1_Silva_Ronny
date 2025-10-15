import React, { useEffect, useState } from "react";
import "./CloudRevealLite.css";
import cloudLeft from "../../assets/cloud-left.png";
import cloudRight from "../../assets/cloud-right.png";

const CloudRevealLite = ({ durationMs = 1400 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), Math.max(300, durationMs + 100));
    return () => clearTimeout(t);
  }, [durationMs]);

  if (!show) return null;

  return (
    <div
      className="cloud-reveal-lite"
      aria-hidden
      style={{ "--cloud-lite-duration": `${durationMs}ms` }}
    >
      <img src={cloudLeft} alt="" className="cloud-lite-img cloud-lite-left" />
      <img
        src={cloudRight}
        alt=""
        className="cloud-lite-img cloud-lite-right"
      />
    </div>
  );
};

export default CloudRevealLite;
