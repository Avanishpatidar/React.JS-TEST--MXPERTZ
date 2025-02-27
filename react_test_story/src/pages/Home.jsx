import React from 'react';
import Hero from '../components/Hero';
import CardGrid from '../components/CardGrid';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <Hero />
            <div className="home-content">
                <h2>Featured Stories</h2>
                <CardGrid />
            </div>
        </div>
    );
};

export default Home;