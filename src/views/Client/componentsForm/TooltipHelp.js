'use client';

import React from 'react';

const TooltipHelp = ({ id, text }) => {
  return (
    <span id={id} className="tooltip-icon">
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default TooltipHelp;
