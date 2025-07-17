<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
      <p class="text-gray-600">Manage your account and preferences</p>
    </div>

    <!-- Profile Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img
            :src="profileData.avatar"
            alt="Profile"
            class="w-24 h-24 rounded-full object-cover"
          />
          <button class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
            <Camera class="h-4 w-4" />
          </button>
        </div>
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <h2 class="text-2xl font-bold text-gray-900">{{ profileData.name }}</h2>
            <button
              @click="isEditing = !isEditing"
              class="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit2 class="h-4 w-4" />
            </button>
          </div>
          <p class="text-gray-600 mb-2">{{ profileData.email }}</p>
          <p class="text-sm text-gray-500">{{ profileData.university }} • {{ profileData.year }} • {{ profileData.major }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">87%</div>
          <div class="text-sm text-gray-600">Profile Complete</div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex space-x-1 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          activeTab === tab.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`"
      >
        <component :is="tab.icon" class="h-4 w-4" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Content -->
    <div v-if="activeTab === 'profile'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Profile Information -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button
              v-if="isEditing"
              @click="handleSaveProfile"
              class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Save class="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  v-model="profileData.name"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  v-model="profileData.email"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                v-model="profileData.bio"
                :disabled="!isEditing"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">University</label>
                <input
                  type="text"
                  v-model="profileData.university"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ user?.userType === 'mentor' ? 'Experience' : 'Year' }}
                </label>
                <input
                  v-if="user?.userType === 'mentor'"
                  type="text"
                  v-model="profileData.experience"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
                <select
                  v-else
                  v-model="profileData.year"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ user?.userType === 'mentor' ? 'Expertise' : 'Major' }}
                </label>
                <input
                  type="text"
                  :value="user?.userType === 'mentor' ? profileData.expertise : profileData.major"
                  @input="user?.userType === 'mentor' ? profileData.expertise = $event.target.value : profileData.major = $event.target.value"
                  :disabled="!isEditing"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>
            
            <div v-if="user?.userType === 'student'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Study Goals</label>
              <textarea
                v-model="profileData.studyGoals"
                :disabled="!isEditing"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        <!-- Study Statistics -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Study Statistics</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(stat, index) in studyStats" :key="index" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">{{ stat.label }}</span>
                <span class="text-sm font-medium text-green-600">{{ stat.change }}</span>
              </div>
              <div class="text-xl font-bold text-gray-900">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Achievements -->
      <div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div class="space-y-4">
            <div v-for="(achievement, index) in recentAchievements" :key="index" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-900">{{ achievement.name }}</h4>
                <span :class="`px-2 py-1 text-xs rounded-full ${getRarityColor(achievement.rarity)}`">
                  {{ achievement.rarity }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ achievement.description }}</p>
              <p class="text-xs text-gray-500">{{ new Date(achievement.date).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'settings'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
      
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">Dark Mode</h4>
            <p class="text-sm text-gray-600">Switch between light and dark themes</p>
          </div>
          <button
            @click="$emit('toggle-dark-mode')"
            :class="`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
            }`"
          >
            <span :class="`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            }`" />
            <Moon v-if="isDarkMode" class="absolute left-1 h-3 w-3 text-blue-600" />
            <Sun v-else class="absolute right-1 h-3 w-3 text-gray-400" />
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              v-model="settings.preferences.language"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              v-model="settings.preferences.timezone"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC-8 (Pacific)">UTC-8 (Pacific)</option>
              <option value="UTC-5 (Eastern)">UTC-5 (Eastern)</option>
              <option value="UTC-6 (Central)">UTC-6 (Central)</option>
              <option value="UTC-7 (Mountain)">UTC-7 (Mountain)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start of Week</label>
            <select
              v-model="settings.preferences.startOfWeek"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select
              v-model="settings.preferences.dateFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'notifications'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
      
      <div class="space-y-4">
        <div v-for="(value, key) in settings.notifications" :key="key" class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900 capitalize">
              {{ key.replace(/([A-Z])/g, ' $1').trim() }}
            </h4>
            <p class="text-sm text-gray-600">
              {{ getNotificationDescription(key) }}
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only"
              :checked="value"
              @change="handleNotificationChange(key, $event.target.checked)"
            />
            <div :class="`w-11 h-6 rounded-full transition-colors duration-200 ${
              value ? 'bg-blue-600' : 'bg-gray-200'
            }`">
              <div :class="`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                value ? 'translate-x-5' : 'translate-x-0'
              }`" style="margin: 2px" />
            </div>
          </label>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'account'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Account Management</h3>
      
      <div class="space-y-6">
        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 class="font-medium text-red-900 mb-2">Sign Out</h4>
          <p class="text-sm text-red-700 mb-4">
            You will be signed out of your account and redirected to the landing page.
          </p>
          <button
            @click="$emit('logout')"
            class="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut class="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
        
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Account Information</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Account Type</span>
              <span class="font-medium capitalize">{{ user?.userType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Member Since</span>
              <span class="font-medium">December 2024</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Account Status</span>
              <span class="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { User, Camera, Settings, Bell, Moon, Sun, Save, Edit2, LogOut } from 'lucide-vue-next'

export default {
  name: 'UserProfile',
  components: {
    User,
    Camera,
    Settings,
    Bell,
    Moon,
    Sun,
    Save,
    Edit2,
    LogOut
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      default: null
    }
  },
  emits: ['toggle-dark-mode', 'logout'],
  setup(props) {
    const activeTab = ref('profile')
    const isEditing = ref(false)

    const profileData = reactive({
      name: props.user ? `${props.user.firstName} ${props.user.lastName}` : 'Alex Johnson',
      email: props.user?.email || 'alex.johnson@email.com',
      bio: props.user?.bio || (props.user?.userType === 'mentor' ? 'Experienced educator passionate about helping students succeed' : 'Computer Science student passionate about learning and growth'),
      university: props.user?.university || 'Stanford University',
      year: props.user?.year || 'Junior',
      major: props.user?.major || 'Computer Science',
      expertise: props.user?.expertise || '',
      experience: props.user?.experience || '',
      studyGoals: 'Master advanced algorithms and data structures',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    })

    const settings = reactive({
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
    })

    const studyStats = [
      { label: 'Total Study Time', value: '126h 45m', change: '+12%' },
      { label: 'Sessions Completed', value: '287', change: '+15%' },
      { label: 'Badges Earned', value: '12', change: '+2' },
      { label: 'Channels Joined', value: '8', change: '+1' },
      { label: 'Tasks Completed', value: '94', change: '+8' },
      { label: 'Current Streak', value: '7 days', change: '+3' }
    ]

    const recentAchievements = [
      { name: 'Streak Keeper', description: '7-day study streak', date: '2024-12-15', rarity: 'Uncommon' },
      { name: 'Time Master', description: '100+ hours studied', date: '2024-12-10', rarity: 'Rare' },
      { name: 'Social Butterfly', description: 'Joined 5 channels', date: '2024-12-05', rarity: 'Common' }
    ]

    const tabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'account', label: 'Account', icon: LogOut }
    ]

    const handleSaveProfile = () => {
      isEditing.value = false
      // Here you would typically save to backend
    }

    const handleNotificationChange = (key, value) => {
      settings.notifications[key] = value
    }

    const getNotificationDescription = (key) => {
      const descriptions = {
        studyReminders: 'Get reminders for your scheduled study sessions',
        taskDeadlines: 'Receive alerts for upcoming task deadlines',
        badgeEarned: 'Get notified when you earn new badges',
        mentorMessages: 'Receive notifications for mentor channel messages',
        weeklyReport: 'Get weekly summary of your study progress'
      }
      return descriptions[key] || ''
    }

    const getRarityColor = (rarity) => {
      switch (rarity) {
        case 'Common':
          return 'bg-gray-100 text-gray-800'
        case 'Uncommon':
          return 'bg-green-100 text-green-800'
        case 'Rare':
          return 'bg-blue-100 text-blue-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    return {
      activeTab,
      isEditing,
      profileData,
      settings,
      studyStats,
      recentAchievements,
      tabs,
      handleSaveProfile,
      handleNotificationChange,
      getNotificationDescription,
      getRarityColor
    }
  }
}
</script>