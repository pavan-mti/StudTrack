<template>
  <div>
    <!-- Landing Page -->
    <LandingPage v-if="!user" @open-auth="showAuthModal = true" />
    
    <!-- Auth Modal -->
    <AuthModal
      v-if="showAuthModal"
      :is-open="showAuthModal"
      @close="showAuthModal = false"
      @login="handleLogin"
    />
    
    <!-- Main App -->
    <div v-if="user" :class="`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`">
      <Navigation 
        :active-tab="activeTab" 
        :is-dark-mode="isDarkMode" 
        :user="user"
        @set-active-tab="setActiveTab"
        @logout="handleLogout"
      />
      <main class="transition-all duration-300">
        <component :is="currentComponent" :user="user" @toggle-dark-mode="toggleDarkMode" :is-dark-mode="isDarkMode" @logout="handleLogout" />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import LandingPage from './components/Auth/LandingPage.vue'
import AuthModal from './components/Auth/AuthModal.vue'
import Navigation from './components/Navigation.vue'
import Dashboard from './components/Dashboard.vue'
import StudyTimer from './components/StudyTimer.vue'
import TaskManager from './components/TaskManager.vue'
import Analytics from './components/Analytics.vue'
import BadgeSystem from './components/BadgeSystem.vue'
import MentorChannels from './components/MentorChannels.vue'
import UserProfile from './components/UserProfile.vue'
import Calendar from './components/Calendar.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    AuthModal,
    Navigation,
    Dashboard,
    StudyTimer,
    TaskManager,
    Analytics,
    BadgeSystem,
    MentorChannels,
    UserProfile,
    Calendar
  },
  setup() {
    const activeTab = ref('dashboard')
    const isDarkMode = ref(false)
    const user = ref(null)
    const showAuthModal = ref(false)

    const componentMap = {
      dashboard: Dashboard,
      timer: StudyTimer,
      tasks: TaskManager,
      calendar: Calendar,
      analytics: Analytics,
      badges: BadgeSystem,
      mentors: MentorChannels,
      profile: UserProfile
    }

    const currentComponent = computed(() => {
      return componentMap[activeTab.value] || Dashboard
    })

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
    }

    const handleLogin = (userData) => {
      user.value = userData
      showAuthModal.value = false
    }

    const handleLogout = () => {
      user.value = null
      activeTab.value = 'dashboard'
    }

    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    return {
      activeTab,
      isDarkMode,
      user,
      showAuthModal,
      currentComponent,
      toggleDarkMode,
      handleLogin,
      handleLogout,
      setActiveTab
    }
  }
}
</script>