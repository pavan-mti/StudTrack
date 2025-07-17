import React, { useState } from 'react';
import { User, Camera, Settings, Bell, Globe, Moon, Sun, Save, Edit2, LogOut } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'mentor';
  university?: string;
  major?: string;
  year?: string;
  expertise?: string;
  experience?: string;
  bio?: string;
}

interface UserProfileProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  user?: User | null;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onToggleDarkMode, isDarkMode, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : 'Alex Johnson',
    email: user?.email || 'alex.johnson@email.com',
    bio: user?.bio || (user?.userType === 'mentor' ? 'Experienced educator passionate about helping students succeed' : 'Computer Science student passionate about learning and growth'),
    university: user?.university || 'Stanford University',
    year: user?.year || 'Junior',
    major: user?.major || 'Computer Science',
    expertise: user?.expertise || '',
    experience: user?.experience || '',
    studyGoals: 'Master advanced algorithms and data structures',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [settings, setSettings] = useState({
    notifications: {
      studyReminders: true,
      taskDeadlines: true,
      badgeEarned: true,
      mentorMessages: true,
      weeklyReport: false
    },
    preferences: {
      language: 'English',
      timezone: 'UTC-8 (Pacific)',
      startOfWeek: 'Monday',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const studyStats = [
    { label: 'Total Study Time', value: '126h 45m', change: '+12%' },
    { label: 'Sessions Completed', value: '287', change: '+15%' },
    { label: 'Badges Earned', value: '12', change: '+2' },
    { label: 'Channels Joined', value: '8', change: '+1' },
    { label: 'Tasks Completed', value: '94', change: '+8' },
    { label: 'Current Streak', value: '7 days', change: '+3' }
  ];

  const recentAchievements = [
    { name: 'Streak Keeper', description: '7-day study streak', date: '2024-12-15', rarity: 'Uncommon' },
    { name: 'Time Master', description: '100+ hours studied', date: '2024-12-10', rarity: 'Rare' },
    { name: 'Social Butterfly', description: 'Joined 5 channels', date: '2024-12-05', rarity: 'Common' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-100 text-gray-800';
      case 'Uncommon':
        return 'bg-green-100 text-green-800';
      case 'Rare':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">{profileData.email}</p>
            <p className="text-sm text-gray-500">{profileData.university} • {profileData.year} • {profileData.major}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-gray-600">Profile Complete</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'account', label: 'Account', icon: LogOut }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                    <input
                      type="text"
                      value={profileData.university}
                      onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {user?.userType === 'mentor' ? 'Experience' : 'Year'}
                    </label>
                    {user?.userType === 'mentor' ? (
                      <input
                        type="text"
                        value={profileData.experience}
                        onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    ) : (
                      <select
                        value={profileData.year}
                        onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      >
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {user?.userType === 'mentor' ? 'Expertise' : 'Major'}
                    </label>
                    <input
                      type="text"
                      value={user?.userType === 'mentor' ? profileData.expertise : profileData.major}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        [user?.userType === 'mentor' ? 'expertise' : 'major']: e.target.value
                      })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                {user?.userType === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Study Goals</label>
                    <textarea
                      value={profileData.studyGoals}
                      onChange={(e) => setProfileData({...profileData, studyGoals: e.target.value})}
                      disabled={!isEditing}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Study Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
                {isDarkMode ? (
                  <Moon className="absolute left-1 h-3 w-3 text-blue-600" />
                ) : (
                  <Sun className="absolute right-1 h-3 w-3 text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="UTC-8 (Pacific)">UTC-8 (Pacific)</option>
                  <option value="UTC-5 (Eastern)">UTC-5 (Eastern)</option>
                  <option value="UTC-6 (Central)">UTC-6 (Central)</option>
                  <option value="UTC-7 (Mountain)">UTC-7 (Mountain)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start of Week</label>
                <select
                  value={settings.preferences.startOfWeek}
                  onChange={(e) => handlePreferenceChange('startOfWeek', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                <select
                  value={settings.preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
          
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {key === 'studyReminders' && 'Get reminders for your scheduled study sessions'}
                    {key === 'taskDeadlines' && 'Receive alerts for upcoming task deadlines'}
                    {key === 'badgeEarned' && 'Get notified when you earn new badges'}
                    {key === 'mentorMessages' && 'Receive notifications for mentor channel messages'}
                    {key === 'weeklyReport' && 'Get weekly summary of your study progress'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={value}
                    onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      value ? 'translate-x-5' : 'translate-x-0'
                    }`} style={{ margin: '2px' }} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Management</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Sign Out</h4>
              <p className="text-sm text-red-700 mb-4">
                You will be signed out of your account and redirected to the landing page.
              </p>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Account Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium capitalize">{user?.userType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">December 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};