import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

export const StudyTimer: React.FC = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [sessionGoal, setSessionGoal] = useState(120); // 2 hours in minutes

  const subjects = [
    { name: 'Mathematics', color: 'bg-blue-500', sessions: 12 },
    { name: 'Physics', color: 'bg-purple-500', sessions: 8 },
    { name: 'Chemistry', color: 'bg-green-500', sessions: 6 },
    { name: 'Biology', color: 'bg-yellow-500', sessions: 10 },
    { name: 'English', color: 'bg-red-500', sessions: 5 },
    { name: 'History', color: 'bg-indigo-500', sessions: 7 },
  ];

  const recentSessions = [
    { subject: 'Mathematics', duration: '45 min', date: 'Today', type: 'Focus Session' },
    { subject: 'Physics', duration: '30 min', date: 'Today', type: 'Review' },
    { subject: 'Chemistry', duration: '60 min', date: 'Yesterday', type: 'Practice' },
    { subject: 'Biology', duration: '25 min', date: 'Yesterday', type: 'Focus Session' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setTime(1500);
    setIsActive(false);
    setIsPaused(false);
  };

  const progress = ((1500 - time) / 1500) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Timer</h1>
        <p className="text-gray-600">Focus on your studies with our Pomodoro-style timer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isActive ? (isPaused ? 'Paused' : 'Running') : 'Ready'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={toggleTimer}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                {isActive ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isActive ? 'Stop' : 'Start'}</span>
              </button>
              
              <button
                onClick={pauseTimer}
                disabled={!isActive}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </button>
              
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Subject Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Subject</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.name}
                    onClick={() => setSelectedSubject(subject.name)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedSubject === subject.name
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm opacity-75">{subject.sessions} sessions</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Goal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Goal</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Study Time Goal</span>
                  <span className="text-sm font-medium text-gray-900">75 / {sessionGoal} minutes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(75 / sessionGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Sessions</h2>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{session.subject}</h3>
                    <span className="text-sm font-medium text-blue-600">{session.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{session.type}</span>
                    <span>{session.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sessions Completed</span>
                <span className="font-semibold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Study Time</span>
                <span className="font-semibold text-gray-900">1h 15m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Session</span>
                <span className="font-semibold text-gray-900">25m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Focus Score</span>
                <span className="font-semibold text-green-600">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};