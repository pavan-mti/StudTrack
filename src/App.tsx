import React, { useState } from 'react';
import { AuthModal } from './components/Auth/AuthModal';
import { LandingPage } from './components/Auth/LandingPage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { StudyTimer } from './components/StudyTimer';
import { TaskManager } from './components/TaskManager';
import { Analytics } from './components/Analytics';
import { BadgeSystem } from './components/BadgeSystem';
import { MentorChannels } from './components/MentorChannels';
import { UserProfile } from './components/UserProfile';
import { Calendar } from './components/Calendar';

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

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'timer':
        return <StudyTimer />;
      case 'tasks':
        return <TaskManager />;
      case 'calendar':
        return <Calendar />;
      case 'analytics':
        return <Analytics />;
      case 'badges':
        return <BadgeSystem />;
      case 'mentors':
        return <MentorChannels />;
      case 'profile':
        return <UserProfile onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  // Show landing page if user is not logged in
  if (!user) {
    return (
      <>
        <LandingPage onOpenAuth={() => setShowAuthModal(true)} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        user={user}
        onLogout={handleLogout}
      />
      <main className="transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;