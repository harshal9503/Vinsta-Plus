import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('#15305F');
  const [textColor, setTextColor] = useState('#FFFFFF');

  const switchColor = (color) => {
    setBgColor(color);
    // Set text color based on bg color for contrast
    if (color === '#259E29') {
      setTextColor('#FFFFFF');
    } else if (color === '#675FD3') {
      setTextColor('#FFFFFF');
    } else {
      setTextColor('#FFFFFF');
    }
  };

  return (
    <ColorContext.Provider value={{ bgColor, textColor, switchColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
