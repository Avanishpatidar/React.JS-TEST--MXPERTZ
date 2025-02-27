import React, { useState } from 'react';
import '../styles/StoryDetail.css';

const StoryDetail = ({ story }) => {
    const [activeTab, setActiveTab] = useState('story');
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const renderStoryContent = () => {
        return story.Storyadvenure?.content?.map((section, index) => (
            <div key={index} className="story-section">
                {section.Storyimage.map((img, imgIndex) => (
                    <img 
                        key={imgIndex}
                        src={`https://ik.imagekit.io/dev24/${img}`}
                        alt={`Story section ${index + 1}`}
                    />
                ))}
                {section.Paragraph.map((para, paraIndex) => (
                    <p key={paraIndex}>{para}</p>
                ))}
            </div>
        ));
    };

    const renderWordExplore = () => {
        return story.Wordexplore?.map((word, index) => (
            <div key={index} className="word-card">
                <h3>{word.Storytitle}</h3>
                <img 
                    src={`https://ik.imagekit.io/dev24/${word.Storyimage[0]}`}
                    alt={word.Storytitle}
                />
                <p>{word.Storyttext}</p>
                <div className="word-details">
                    <p><strong>Synonyms:</strong> {word.Synonyms}</p>
                    <p><strong>Antonyms:</strong> {word.Antonyms}</p>
                    <p><strong>Noun:</strong> {word.Noun}</p>
                </div>
            </div>
        ));
    };

    const handleAnswerSelect = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        story.Brainquest?.forEach(quest => {
            if (answers[quest._id] === quest.Answer) {
                correct += 1;
            }
        });
        return correct;
    };

    const renderBrainQuest = () => {
        return (
            <div className="quiz-container">
                <div className="quiz-header">
                    <h2>Test Your Knowledge</h2>
                    {showResults && (
                        <div className="quiz-score">
                            Score: {calculateScore()}/{story.Brainquest?.length || 0}
                        </div>
                    )}
                </div>
                
                {story.Brainquest?.map((quest, index) => (
                    <div key={quest._id} className="quiz-card">
                        <h3>Question {index + 1}</h3>
                        <p className="question-text">{quest.Question}</p>
                        <div className="options-grid">
                            {quest.Option.map((option) => (
                                <button 
                                    key={option}
                                    className={`option-button ${
                                        answers[quest._id] === option ? 'selected' : ''
                                    } ${
                                        showResults ? 
                                            option === quest.Answer ? 'correct' :
                                            answers[quest._id] === option ? 'incorrect' : ''
                                        : ''
                                    }`}
                                    onClick={() => !showResults && handleAnswerSelect(quest._id, option)}
                                    disabled={showResults}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {!showResults && (
                    <button className="submit-button" onClick={() => setShowResults(true)}>
                        Submit Answers
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="story-detail">
            <div className="story-header">
                <h1>{story.Title}</h1>
                <img 
                    src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                    alt={story.Title}
                    className="main-image"
                />
            </div>

            <div className="story-cards">
                <div 
                    className={`story-card ${activeTab === 'story' ? 'active' : ''}`}
                    onClick={() => setActiveTab('story')}
                >
                    <h3>Story Adventure</h3>
                    <p>Explore the magical world of science fiction</p>
                    <div className="card-icon">📚</div>
                </div>

                <div 
                    className={`story-card ${activeTab === 'words' ? 'active' : ''}`}
                    onClick={() => setActiveTab('words')}
                >
                    <h3>Word Explore</h3>
                    <p>Learn new words and their meanings</p>
                    <div className="card-icon">🔤</div>
                </div>

                <div 
                    className={`story-card ${activeTab === 'quiz' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quiz')}
                >
                    <h3>Brain Quest</h3>
                    <p>Test your knowledge with fun quizzes</p>
                    <div className="card-icon">🧩</div>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'story' && (
                    <div className="story-content">
                        {renderStoryContent()}
                    </div>
                )}
                {activeTab === 'words' && (
                    <div className="word-explore">
                        {renderWordExplore()}
                    </div>
                )}
                {activeTab === 'quiz' && (
                    <div className="brain-quest">
                        {renderBrainQuest()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryDetail;