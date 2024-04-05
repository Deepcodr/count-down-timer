// src/Countdown.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Countdown.css';

function Countdown() {
    const [timers, setTimers] = useState([
        { id: 1, category: '', targetDateTime: '', timeRemaining: 0, isRunning: false, title: '' },
    ]);

    const categoryColors = {
        'Category 1': 'bg-success',
        'Category 2': 'bg-secondary',
        'Category 3': 'bg-dark',
        // Add more category-color mappings as needed
    };

    useEffect(() => {
        let intervalIds = {};

        timers.forEach((timer) => {
            if (timer.isRunning && timer.timeRemaining > 0) {
                intervalIds[timer.id] = setInterval(() => {
                    setTimers((prevTimers) =>
                        prevTimers.map((t) =>
                            t.id === timer.id ? { ...t, timeRemaining: t.timeRemaining - 1 } : t
                        )
                    );
                }, 1000);
            } else if (timer.timeRemaining === 0) {
                clearInterval(intervalIds[timer.id]);
                setTimers((prevTimers) =>
                    prevTimers.map((t) =>
                        t.id === timer.id ? { ...t, isRunning: false } : t
                    )
                );
            }
        });

        return () => {
            Object.values(intervalIds).forEach((intervalId) => clearInterval(intervalId));
        };
    }, [timers]);

    const startTimer = (timerId) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, isRunning: true } : timer
            )
        );
    };

    const pauseTimer = (timerId) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, isRunning: false } : timer
            )
        );
    };

    const resetTimer = (timerId) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, timeRemaining: 0, isRunning: false } : timer
            )
        );
    };

    const handleCategoryChange = (timerId, category) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, category } : timer
            )
        );
    };

    const handleDateTimeChange = (timerId, targetDateTime) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, targetDateTime } : timer
            )
        );
    };

    const handleTitleChange = (timerId, title) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === timerId ? { ...timer, title } : timer
            )
        );
    };

    const calculateTimeRemaining = (timerId) => {
        const timer = timers.find((t) => t.id === timerId);
        const targetDate = new Date(timer.targetDateTime);
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
        const secondsRemaining = Math.floor(timeDifference / 1000);

        setTimers((prevTimers) =>
            prevTimers.map((t) =>
                t.id === timerId ? { ...t, timeRemaining: secondsRemaining } : t
            )
        );
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const addTimer = () => {
        const newTimerId = timers.length + 1;
        setTimers((prevTimers) => [
            ...prevTimers,
            { id: newTimerId, category: '', targetDateTime: '', timeRemaining: 0, isRunning: false },
        ]);
    };

    const removeTimer = (timerId) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== timerId));
    };

    return (
        <div className="countdown-container">
            <div className="overlay">
                <h1 className="text-center text-success my-4">GeeksForGeeks Countdown Timer</h1>
                <div className="timers">
                    {timers.map((timer) => (
                        <div key={timer.id} className={`card mb-4 ${categoryColors[timer.category] || ''}`}>
                            <div className="card-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Timer Title"
                                    value={timer.title}
                                    onChange={(e) => handleTitleChange(timer.id, e.target.value)}
                                    disabled={timer.isRunning}
                                />
                                <select
                                    className="form-select mb-2"
                                    value={timer.category}
                                    onChange={(e) => handleCategoryChange(timer.id, e.target.value)}
                                    disabled={timer.isRunning}
                                >
                                    <option selected value="Category 1">Category 1</option>
                                    <option value="Category 2">Category 2</option>
                                    <option value="Category 3">Category 3</option>
                                    {/* Add more category options as needed */}
                                </select>
                                <input
                                    type="datetime-local"
                                    value={timer.targetDateTime}
                                    onChange={(e) => handleDateTimeChange(timer.id, e.target.value)}
                                    disabled={timer.isRunning}
                                    className="mb-2 form-control"
                                />
                                <div className="text-center text-warning ">
                                    <h3 className="display-1 mb-3">{formatTime(timer.timeRemaining)}</h3>
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => calculateTimeRemaining(timer.id)}
                                        disabled={timer.isRunning || !timer.category || !timer.targetDateTime}
                                    >
                                        Set Timer
                                    </button>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => startTimer(timer.id)}
                                        disabled={timer.isRunning || timer.timeRemaining <= 0}
                                    >
                                        Start
                                    </button>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => pauseTimer(timer.id)}
                                        disabled={!timer.isRunning}
                                    >
                                        Pause
                                    </button>
                                    <button
                                        className="btn btn-danger me-2"
                                        onClick={() => resetTimer(timer.id)}
                                        disabled={timer.timeRemaining <= 0}
                                    >
                                        Reset
                                    </button>
                                    <button className="btn btn-danger" onClick={() => removeTimer(timer.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button className="btn btn-warning" onClick={addTimer}>
                        Add Timer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Countdown;
