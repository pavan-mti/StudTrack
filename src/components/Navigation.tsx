import React from 'react';
import { 
  Home, 
  Timer, 
  CheckSquare, 
  Calendar as CalendarIcon,
  BarChart3, 
  Award, 
  Users, 
  User,
  BookOpen
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'mentor';
}

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  user: User;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isDarkMode, user, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'timer', label: 'Study Timer', icon: Timer },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Filter navigation items based on user type
  const filteredNavItems = user.userType === 'mentor' 
    ? navItems.filter(item => !['timer', 'tasks', 'calendar', 'badges'].includes(item.id))
    : navItems;

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              StudTrack
            </h1>
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.userType === 'mentor' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.userType === 'mentor' ? 'Mentor' : 'Student'}
            </span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {filteredNavItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome, {user.firstName}
            </span>
            <button
              onClick={onLogout}
              className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};