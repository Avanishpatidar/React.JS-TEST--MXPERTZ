export const fetchAllStories = async () => {
    try {
        const response = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all stories:', error);
        throw error;
    }
};

export const fetchStoryById = async (id) => {
    try {
        const response = await fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching story with id ${id}:`, error);
        throw error;
    }
};

