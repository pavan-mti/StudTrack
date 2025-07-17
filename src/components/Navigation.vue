<template>
  <nav :class="`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300`">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-2">
          <BookOpen class="h-8 w-8 text-blue-600" />
          <h1 :class="`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`">
            StudTrack
          </h1>
          <span :class="`px-2 py-1 text-xs rounded-full ${
            user.userType === 'mentor' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`">
            {{ user.userType === 'mentor' ? 'Mentor' : 'Student' }}
          </span>
        </div>
        
        <div class="hidden md:flex space-x-1">
          <button
            v-for="item in filteredNavItems"
            :key="item.id"
            @click="$emit('set-active-tab', item.id)"
            :class="`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg'
                : isDarkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`"
          >
            <component :is="item.icon" class="h-4 w-4" />
            <span>{{ item.label }}</span>
          </button>
        </div>
        
        <div class="md:hidden">
          <select
            :value="activeTab"
            @change="$emit('set-active-tab', $event.target.value)"
            :class="`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`"
          >
            <option v-for="item in filteredNavItems" :key="item.id" :value="item.id">
              {{ item.label }}
            </option>
          </select>
        </div>
        
        <div class="flex items-center space-x-3">
          <span :class="`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`">
            Welcome, {{ user.firstName }}
          </span>
          <button
            @click="$emit('logout')"
            :class="`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
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
} from 'lucide-vue-next'

export default {
  name: 'Navigation',
  components: {
    Home,
    Timer,
    CheckSquare,
    CalendarIcon,
    BarChart3,
    Award,
    Users,
    User,
    BookOpen
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['set-active-tab', 'logout'],
  setup(props) {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'timer', label: 'Study Timer', icon: Timer },
      { id: 'tasks', label: 'Tasks', icon: CheckSquare },
      { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'badges', label: 'Badges', icon: Award },
      { id: 'mentors', label: 'Mentors', icon: Users },
      { id: 'profile', label: 'Profile', icon: User },
    ]

    const filteredNavItems = computed(() => {
      return props.user.userType === 'mentor' 
        ? navItems.filter(item => !['timer', 'tasks', 'calendar', 'badges'].includes(item.id))
        : navItems
    })

    return {
      filteredNavItems
    }
  }
}
</script>