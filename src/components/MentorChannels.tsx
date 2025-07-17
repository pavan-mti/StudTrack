import React, { useState } from 'react';
import { Users, Play, MessageCircle, Download, Star, Search, Filter, Plus } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  mentor: string;
  description: string;
  members: number;
  rating: number;
  subject: string;
  videos: number;
  assignments: number;
  isJoined: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lastActivity: string;
  tags: string[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  views: number;
  uploadDate: string;
  thumbnail: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submitted: boolean;
  grade?: number;
  feedback?: string;
}

export const MentorChannels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'joined' | 'create'>('browse');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const channels: Channel[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      mentor: 'Dr. Sarah Chen',
      description: 'Master calculus, linear algebra, and advanced mathematical concepts',
      members: 1247,
      rating: 4.8,
      subject: 'Mathematics',
      videos: 45,
      assignments: 12,
      isJoined: true,
      level: 'Advanced',
      lastActivity: '2 hours ago',
      tags: ['Calculus', 'Linear Algebra', 'Statistics']
    },
    {
      id: '2',
      name: 'Physics Fundamentals',
      mentor: 'Prof. John Williams',
      description: 'Build a strong foundation in physics principles and problem-solving',
      members: 892,
      rating: 4.6,
      subject: 'Physics',
      videos: 38,
      assignments: 8,
      isJoined: true,
      level: 'Intermediate',
      lastActivity: '5 hours ago',
      tags: ['Mechanics', 'Thermodynamics', 'Electromagnetism']
    },
    {
      id: '3',
      name: 'Organic Chemistry Mastery',
      mentor: 'Dr. Maria Rodriguez',
      description: 'Understand organic reactions, mechanisms, and synthesis pathways',
      members: 634,
      rating: 4.9,
      subject: 'Chemistry',
      videos: 52,
      assignments: 15,
      isJoined: false,
      level: 'Advanced',
      lastActivity: '1 day ago',
      tags: ['Organic Synthesis', 'Mechanisms', 'Spectroscopy']
    },
    {
      id: '4',
      name: 'Biology Basics',
      mentor: 'Dr. Michael Johnson',
      description: 'Explore cell biology, genetics, and human physiology',
      members: 756,
      rating: 4.5,
      subject: 'Biology',
      videos: 29,
      assignments: 7,
      isJoined: false,
      level: 'Beginner',
      lastActivity: '3 hours ago',
      tags: ['Cell Biology', 'Genetics', 'Physiology']
    },
    {
      id: '5',
      name: 'English Literature',
      mentor: 'Prof. Emily Davis',
      description: 'Analyze classic and contemporary literary works',
      members: 423,
      rating: 4.7,
      subject: 'English',
      videos: 31,
      assignments: 10,
      isJoined: true,
      level: 'Intermediate',
      lastActivity: '6 hours ago',
      tags: ['Poetry', 'Novels', 'Critical Analysis']
    }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Limits and Continuity',
      duration: '24:15',
      views: 1523,
      uploadDate: '2024-12-10',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Derivatives and Applications',
      duration: '31:42',
      views: 1342,
      uploadDate: '2024-12-08',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Integration Techniques',
      duration: '28:33',
      views: 1156,
      uploadDate: '2024-12-05',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set #3',
      dueDate: '2024-12-22',
      submitted: false
    },
    {
      id: '2',
      title: 'Linear Algebra Quiz',
      dueDate: '2024-12-18',
      submitted: true,
      grade: 87,
      feedback: 'Good work on matrix operations. Review eigenvalues section.'
    },
    {
      id: '3',
      title: 'Statistics Project',
      dueDate: '2024-12-15',
      submitted: true,
      grade: 92,
      feedback: 'Excellent analysis and interpretation of data.'
    }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || channel.subject === subjectFilter;
    const matchesTab = activeTab === 'browse' || (activeTab === 'joined' && channel.isJoined);
    return matchesSearch && matchesSubject && matchesTab;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Channels</h1>
            <p className="text-gray-600">Learn from expert mentors in dedicated study channels</p>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg">
            <Plus className="h-5 w-5" />
            <span>Create Channel</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'browse', label: 'Browse Channels', count: channels.length },
            { id: 'joined', label: 'Joined Channels', count: channels.filter(c => c.isJoined).length },
            { id: 'create', label: 'Create Channel', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'browse' | 'joined' | 'create')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label} {tab.count !== null && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels, mentors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedChannel ? (
        // Channel Detail View
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedChannel.name}</h2>
              <p className="text-gray-600">by {selectedChannel.mentor}</p>
            </div>
            <button
              onClick={() => setSelectedChannel(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Back to Channels
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Videos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Videos</h3>
                <div className="space-y-4">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{video.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                          <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          assignment.submitted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.submitted ? 'Submitted' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                      {assignment.grade && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Grade: {assignment.grade}/100</span>
                          {assignment.feedback && (
                            <p className="text-gray-600 mt-1">{assignment.feedback}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Channel Info</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(selectedChannel.level)}`}>
                    {selectedChannel.level}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium">{selectedChannel.members.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Videos</span>
                    <span className="font-medium">{selectedChannel.videos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assignments</span>
                    <span className="font-medium">{selectedChannel.assignments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedChannel.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChannel.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <MessageCircle className="h-5 w-5" />
                <span>Join Chat</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Channel List View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                    <p className="text-sm text-gray-600">{channel.mentor}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(channel.level)}`}>
                  {channel.level}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{channel.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {channel.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {channel.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{channel.tags.length - 2} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{channel.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{channel.rating}</span>
                  </div>
                </div>
                <span className="text-xs">{channel.lastActivity}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedChannel(channel)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  View Channel
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  channel.isJoined
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                  {channel.isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};