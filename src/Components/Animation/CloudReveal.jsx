import React, { useEffect, useState } from "react";
import "./CloudReveal.css";
import cloudLeft from "../../assets/cloud-left.png";
import cloudRight from "../../assets/cloud-right.png";
import sunGlow from "../../assets/ImageTitleTheSimpsons.png";

const CloudReveal = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="cloud-reveal" aria-hidden>
      <img src={sunGlow} alt="" className="sun-glow" />
      <img src={cloudLeft} alt="" className="cloud-img cloud-left" />
      <img src={cloudRight} alt="" className="cloud-img cloud-right" />
    </div>
  );
};

export default CloudReveal;
