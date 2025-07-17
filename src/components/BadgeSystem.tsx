import React, { useState } from 'react';
import { Award, Trophy, Star, Zap, Users, Clock, Target, BookOpen } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  icon: React.ReactNode;
}

export const BadgeSystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEarnedOnly, setShowEarnedOnly] = useState(false);

  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first study session',
      category: 'Study',
      rarity: 'Common',
      earned: true,
      earnedDate: '2024-12-01',
      icon: <BookOpen className="h-8 w-8" />
    },
    {
      id: '2',
      name: 'Time Master',
      description: 'Study for 10 hours in total',
      category: 'Time',
      rarity: 'Common',
      earned: true,
      earnedDate: '2024-12-05',
      icon: <Clock className="h-8 w-8" />
    },
    {
      id: '3',
      name: 'Streak Keeper',
      description: 'Maintain a 7-day study streak',
      category: 'Achievement',
      rarity: 'Uncommon',
      earned: true,
      earnedDate: '2024-12-12',
      icon: <Zap className="h-8 w-8" />
    },
    {
      id: '4',
      name: 'Social Butterfly',
      description: 'Join 5 mentor channels',
      category: 'Social',
      rarity: 'Uncommon',
      earned: false,
      progress: 3,
      maxProgress: 5,
      icon: <Users className="h-8 w-8" />
    },
    {
      id: '5',
      name: 'Dedicated Scholar',
      description: 'Study for 100 hours in total',
      category: 'Time',
      rarity: 'Rare',
      earned: false,
      progress: 67,
      maxProgress: 100,
      icon: <Target className="h-8 w-8" />
    },
    {
      id: '6',
      name: 'Subject Expert',
      description: 'Complete 50 sessions in a single subject',
      category: 'Study',
      rarity: 'Rare',
      earned: false,
      progress: 32,
      maxProgress: 50,
      icon: <Star className="h-8 w-8" />
    },
    {
      id: '7',
      name: 'Marathon Runner',
      description: 'Study for 8 hours in a single day',
      category: 'Achievement',
      rarity: 'Epic',
      earned: false,
      progress: 0,
      maxProgress: 8,
      icon: <Trophy className="h-8 w-8" />
    },
    {
      id: '8',
      name: 'Legend',
      description: 'Reach 500 total study hours',
      category: 'Time',
      rarity: 'Legendary',
      earned: false,
      progress: 126,
      maxProgress: 500,
      icon: <Award className="h-8 w-8" />
    }
  ];

  const categories = ['all', 'Study', 'Time', 'Social', 'Achievement'];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Uncommon':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'from-gray-400 to-gray-600';
      case 'Uncommon':
        return 'from-green-400 to-green-600';
      case 'Rare':
        return 'from-blue-400 to-blue-600';
      case 'Epic':
        return 'from-purple-400 to-purple-600';
      case 'Legendary':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const filteredBadges = badges.filter(badge => {
    const categoryFilter = selectedCategory === 'all' || badge.category === selectedCategory;
    const earnedFilter = !showEarnedOnly || badge.earned;
    return categoryFilter && earnedFilter;
  });

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Badge Collection</h1>
            <p className="text-gray-600">Earn badges by completing study goals and milestones</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{earnedBadges.length}/{totalBadges}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Collection Progress</span>
            <span>{Math.round((earnedBadges.length / totalBadges) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / totalBadges) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEarnedOnly}
              onChange={(e) => setShowEarnedOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show earned only</span>
          </label>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all duration-300 hover:shadow-lg ${
              badge.earned ? 'border-green-300' : 'border-gray-200'
            }`}
          >
            <div className="text-center mb-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 bg-gradient-to-br ${
                  badge.earned ? getRarityGradient(badge.rarity) : 'from-gray-300 to-gray-400'
                } ${badge.earned ? 'text-white' : 'text-gray-500'}`}
              >
                {badge.icon}
              </div>
              
              <h3 className={`font-semibold text-lg mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                {badge.name}
              </h3>
              
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`}>
                {badge.rarity}
              </span>
            </div>

            <p className={`text-sm text-center mb-4 ${badge.earned ? 'text-gray-600' : 'text-gray-500'}`}>
              {badge.description}
            </p>

            {badge.earned ? (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-medium">Earned</span>
                </div>
                <p className="text-xs text-gray-500">
                  {badge.earnedDate && new Date(badge.earnedDate).toLocaleDateString()}
                </p>
              </div>
            ) : (
              badge.progress !== undefined && badge.maxProgress !== undefined && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Badge Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {badges.filter(b => b.earned && b.rarity === 'Common').length}
          </div>
          <div className="text-sm text-gray-600">Common Badges</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {badges.filter(b => b.earned && b.rarity === 'Uncommon').length}
          </div>
          <div className="text-sm text-gray-600">Uncommon Badges</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {badges.filter(b => b.earned && b.rarity === 'Rare').length}
          </div>
          <div className="text-sm text-gray-600">Rare Badges</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {badges.filter(b => b.earned && (b.rarity === 'Epic' || b.rarity === 'Legendary')).length}
          </div>
          <div className="text-sm text-gray-600">Epic & Legendary</div>
        </div>
      </div>
    </div>
  );
};