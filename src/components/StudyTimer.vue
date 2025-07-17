<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Study Timer</h1>
      <p class="text-gray-600">Focus on your studies with our Pomodoro-style timer</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Timer Section -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div class="text-center mb-8">
            <div class="relative inline-block">
              <svg class="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  :r="radius"
                  stroke="#f3f4f6"
                  stroke-width="8"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  :r="radius"
                  stroke="#3b82f6"
                  stroke-width="8"
                  fill="none"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  stroke-linecap="round"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-4xl font-bold text-gray-900 mb-2">
                    {{ formatTime(time) }}
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ isActive ? (isPaused ? 'Paused' : 'Running') : 'Ready' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center space-x-4 mb-8">
            <button
              @click="toggleTimer"
              :class="`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } shadow-lg hover:shadow-xl`"
            >
              <Square v-if="isActive" class="h-5 w-5" />
              <Play v-else class="h-5 w-5" />
              <span>{{ isActive ? 'Stop' : 'Start' }}</span>
            </button>
            
            <button
              @click="pauseTimer"
              :disabled="!isActive"
              class="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Pause class="h-5 w-5" />
              <span>Pause</span>
            </button>
            
            <button
              @click="resetTimer"
              class="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw class="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>

          <!-- Subject Selection -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Select Subject</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                v-for="subject in subjects"
                :key="subject.name"
                @click="selectedSubject = subject.name"
                :class="`p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedSubject === subject.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`"
              >
                <div class="flex items-center space-x-3">
                  <div :class="`w-4 h-4 rounded-full ${subject.color}`"></div>
                  <div>
                    <div class="font-medium">{{ subject.name }}</div>
                    <div class="text-sm opacity-75">{{ subject.sessions }} sessions</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Session Goal -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Today's Goal</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Study Time Goal</span>
                <span class="text-sm font-medium text-gray-900">75 / {{ sessionGoal }} minutes</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-green-600 h-2 rounded-full transition-all duration-500"
                  :style="{ width: `${(75 / sessionGoal) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Sessions -->
      <div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Sessions</h2>
          <div class="space-y-4">
            <div v-for="(session, index) in recentSessions" :key="index" class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900">{{ session.subject }}</h3>
                <span class="text-sm font-medium text-blue-600">{{ session.duration }}</span>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>{{ session.type }}</span>
                <span>{{ session.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Today's Stats</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Sessions Completed</span>
              <span class="font-semibold text-gray-900">3</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Total Study Time</span>
              <span class="font-semibold text-gray-900">1h 15m</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Average Session</span>
              <span class="font-semibold text-gray-900">25m</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Focus Score</span>
              <span class="font-semibold text-green-600">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Play, Pause, Square, RotateCcw } from 'lucide-vue-next'

export default {
  name: 'StudyTimer',
  components: {
    Play,
    Pause,
    Square,
    RotateCcw
  },
  setup() {
    const time = ref(1500) // 25 minutes in seconds
    const isActive = ref(false)
    const isPaused = ref(false)
    const selectedSubject = ref('Mathematics')
    const sessionGoal = ref(120) // 2 hours in minutes
    let interval = null

    const subjects = [
      { name: 'Mathematics', color: 'bg-blue-500', sessions: 12 },
      { name: 'Physics', color: 'bg-purple-500', sessions: 8 },
      { name: 'Chemistry', color: 'bg-green-500', sessions: 6 },
      { name: 'Biology', color: 'bg-yellow-500', sessions: 10 },
      { name: 'English', color: 'bg-red-500', sessions: 5 },
      { name: 'History', color: 'bg-indigo-500', sessions: 7 },
    ]

    const recentSessions = [
      { subject: 'Mathematics', duration: '45 min', date: 'Today', type: 'Focus Session' },
      { subject: 'Physics', duration: '30 min', date: 'Today', type: 'Review' },
      { subject: 'Chemistry', duration: '60 min', date: 'Yesterday', type: 'Practice' },
      { subject: 'Biology', duration: '25 min', date: 'Yesterday', type: 'Focus Session' },
    ]

    const radius = 90
    const circumference = 2 * Math.PI * radius

    const progress = computed(() => ((1500 - time.value) / 1500) * 100)
    const strokeDashoffset = computed(() => circumference - (progress.value / 100) * circumference)

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const startTimer = () => {
      interval = setInterval(() => {
        time.value -= 1
        if (time.value <= 0) {
          clearInterval(interval)
          isActive.value = false
          time.value = 0
        }
      }, 1000)
    }

    const stopTimer = () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }

    const toggleTimer = () => {
      isActive.value = !isActive.value
      isPaused.value = false
      
      if (isActive.value) {
        startTimer()
      } else {
        stopTimer()
      }
    }

    const pauseTimer = () => {
      isPaused.value = !isPaused.value
      
      if (isPaused.value) {
        stopTimer()
      } else {
        startTimer()
      }
    }

    const resetTimer = () => {
      time.value = 1500
      isActive.value = false
      isPaused.value = false
      stopTimer()
    }

    onUnmounted(() => {
      stopTimer()
    })

    return {
      time,
      isActive,
      isPaused,
      selectedSubject,
      sessionGoal,
      subjects,
      recentSessions,
      radius,
      circumference,
      strokeDashoffset,
      formatTime,
      toggleTimer,
      pauseTimer,
      resetTimer
    }
  }
}
</script>