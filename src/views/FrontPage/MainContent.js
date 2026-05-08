'use client';

// Archivo: src/pages/FrontPage/MainContent.js
import React from 'react';
import dynamic from 'next/dynamic';
import Home from './Home';
import About from './About';
import ProjectIndicators from './ProjectIndicators';
import InterestingPages from './InterestingPages';
import HowItWorks from './HowItWorks';

const InteractiveMap = dynamic(() => import('./mapa/InteractiveMap'), {
    ssr: false,
});

const MainContent = () => {
    return (
        <div>
            <Home />
            <About />
            <ProjectIndicators />
            <InterestingPages />
            <HowItWorks />
            <InteractiveMap />
        </div>
    );
};

export default MainContent;
