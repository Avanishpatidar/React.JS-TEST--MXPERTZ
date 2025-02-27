import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoryDetail from '../components/StoryDetail';
import { fetchStoryById } from '../services/api';

const StoryPage = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStory = async () => {
            try {
                const data = await fetchStoryById(id);
                setStory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getStory();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {story && <StoryDetail story={story} />}
        </div>
    );
};

export default StoryPage;