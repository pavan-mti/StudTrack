import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Calendar, Filter } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  
  const weeklyData = [
    { day: 'Mon', hours: 3.5, sessions: 4 },
    { day: 'Tue', hours: 2.8, sessions: 3 },
    { day: 'Wed', hours: 4.2, sessions: 5 },
    { day: 'Thu', hours: 3.1, sessions: 4 },
    { day: 'Fri', hours: 2.6, sessions: 3 },
    { day: 'Sat', hours: 5.3, sessions: 6 },
    { day: 'Sun', hours: 4.8, sessions: 5 },
  ];

  const subjectData = [
    { subject: 'Mathematics', hours: 12.5, percentage: 35, color: 'bg-blue-500' },
    { subject: 'Physics', hours: 8.2, percentage: 23, color: 'bg-purple-500' },
    { subject: 'Chemistry', hours: 6.8, percentage: 19, color: 'bg-green-500' },
    { subject: 'Biology', hours: 4.9, percentage: 14, color: 'bg-yellow-500' },
    { subject: 'English', hours: 2.1, percentage: 6, color: 'bg-red-500' },
    { subject: 'History', hours: 1.0, percentage: 3, color: 'bg-indigo-500' },
  ];

  const hourlyActivity = [
    { hour: '6AM', value: 0.2 },
    { hour: '7AM', value: 0.5 },
    { hour: '8AM', value: 0.8 },
    { hour: '9AM', value: 1.2 },
    { hour: '10AM', value: 1.8 },
    { hour: '11AM', value: 2.1 },
    { hour: '12PM', value: 1.6 },
    { hour: '1PM', value: 1.3 },
    { hour: '2PM', value: 2.4 },
    { hour: '3PM', value: 2.8 },
    { hour: '4PM', value: 3.2 },
    { hour: '5PM', value: 2.6 },
    { hour: '6PM', value: 1.9 },
    { hour: '7PM', value: 2.2 },
    { hour: '8PM', value: 2.7 },
    { hour: '9PM', value: 1.4 },
    { hour: '10PM', value: 0.8 },
    { hour: '11PM', value: 0.3 },
  ];

  const stats = [
    { label: 'Total Study Time', value: '126h 45m', change: '+12.5%', icon: Clock, color: 'text-blue-600' },
    { label: 'Average Session', value: '42m', change: '+3.2%', icon: Target, color: 'text-green-600' },
    { label: 'Study Days', value: '28', change: '+5.7%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Productivity Score', value: '87%', change: '+4.1%', icon: TrendingUp, color: 'text-yellow-600' },
  ];

  const getHeatmapIntensity = (value: number) => {
    const maxValue = Math.max(...hourlyActivity.map(h => h.value));
    const intensity = (value / maxValue) * 100;
    if (intensity > 80) return 'bg-blue-600';
    if (intensity > 60) return 'bg-blue-500';
    if (intensity > 40) return 'bg-blue-400';
    if (intensity > 20) return 'bg-blue-300';
    if (intensity > 0) return 'bg-blue-200';
    return 'bg-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your study progress and patterns</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-2">
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Study Time Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Study Time</h2>
            <BarChart3 className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-blue-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(day.hours / 6) * 100}%` }}
                    >
                      <span className="text-white text-xs font-medium">{day.hours}h</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-16">{day.sessions} sessions</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Distribution</h2>
          
          <div className="space-y-4">
            {subjectData.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${subject.color}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{subject.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Activity Heatmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Hourly Activity Heatmap</h2>
        
        <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-18 gap-2 mb-4">
          {hourlyActivity.map((hour, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-8 h-8 rounded-md mb-1 transition-all duration-200 hover:scale-110 ${getHeatmapIntensity(hour.value)}`}
                title={`${hour.hour}: ${hour.value}h`}
              ></div>
              <div className="text-xs text-gray-500">{hour.hour}</div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};