import React from 'react';
import gridIcon from '../assets/grid-layout-icon.png';
import flexIcon from '../assets/flex-layout-icon.png';

export default function Switcher() {

  const [isFlex, setLayout] = React.useState(false);

  const toggleHighlight = () => {
    const btns = document.getElementById("switcher").children;
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].className === "highlighted-icon") {
        btns[i].className = "icon"
      } else {
        btns[i].className = "highlighted-icon" 
      }
    }
    setLayout((prev) => !prev);
  };
  
  return (
    <div id="switcher" className="layout-switcher">
      <img 
        className="highlighted-icon"
        onClick={isFlex ? toggleHighlight : null}
        src={gridIcon}
        alt="grid icon"
      />
      <img
        className="icon"
        onClick={isFlex ? null : toggleHighlight}
        src={flexIcon}
        alt="flex icon"
      />
    </div>
  );
}