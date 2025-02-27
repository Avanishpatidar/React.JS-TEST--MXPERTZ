import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { fetchAllStories } from '../services/api';
import '../styles/CardGrid.css';

const CardGrid = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStories = async () => {
            try {
                const data = await fetchAllStories();
                setStories(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching stories:', err);
            } finally {
                setLoading(false);
            }
        };

        getStories();
    }, []);

    if (loading) return <div>Loading stories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="card-grid">
            {stories.map(story => (
                <Link to={`/story/${story._id}`} key={story._id}>
                    <Card 
                        title={story.Title}
                        image={story.Image}
                        description={story.Storyadvenure?.Storytitle || 'No description available'}
                    />
                </Link>
            ))}
        </div>
    );
};

export default CardGrid;
