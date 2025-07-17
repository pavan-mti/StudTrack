<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
          <p class="text-gray-600">View and manage your study schedule</p>
        </div>
        <button
          @click="showAddModal = true"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
        >
          <Plus class="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Calendar Grid -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ monthNames[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}
            </h2>
            <div class="flex items-center space-x-2">
              <button
                @click="navigateMonth('prev')"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft class="h-5 w-5 text-gray-600" />
              </button>
              <button
                @click="currentDate = new Date()"
                class="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                Today
              </button>
              <button
                @click="navigateMonth('next')"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronRight class="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <!-- Calendar Days Header -->
          <div class="grid grid-cols-7 border-b border-gray-200">
            <div v-for="day in dayNames" :key="day" class="p-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0">
              {{ day }}
            </div>
          </div>

          <!-- Calendar Days -->
          <div class="grid grid-cols-7">
            <div v-for="(day, index) in calendarDays" :key="index" v-html="day"></div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Add -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button
              @click="showAddModal = true"
              class="w-full flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus class="h-4 w-4" />
              <span>Add Task</span>
            </button>
            <button class="w-full flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              <CalendarIcon class="h-4 w-4" />
              <span>Schedule Study</span>
            </button>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div class="space-y-3">
            <div v-for="task in tasks.slice(0, 5)" :key="task.id" class="p-3 bg-gray-50 rounded-lg">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 text-sm">{{ task.title }}</h4>
                  <p class="text-xs text-gray-600 mt-1">{{ task.subject }}</p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ new Date(task.date).toLocaleDateString() }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm">{{ getTypeIcon(task.type) }}</span>
                  <div :class="`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- This Week Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Tasks</span>
              <span class="font-semibold text-gray-900">12</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Completed</span>
              <span class="font-semibold text-green-600">8</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Pending</span>
              <span class="font-semibold text-yellow-600">4</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Overdue</span>
              <span class="font-semibold text-red-600">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-vue-next'

export default {
  name: 'Calendar',
  components: {
    ChevronLeft,
    ChevronRight,
    Plus,
    CalendarIcon
  },
  setup() {
    const currentDate = ref(new Date())
    const selectedDate = ref(null)
    const showAddModal = ref(false)

    const tasks = ref([
      { id: '1', title: 'Math Assignment', date: '2024-12-20', priority: 'High', subject: 'Mathematics', type: 'assignment' },
      { id: '2', title: 'Physics Quiz', date: '2024-12-18', priority: 'Medium', subject: 'Physics', type: 'exam' },
      { id: '3', title: 'Chemistry Lab', date: '2024-12-22', priority: 'High', subject: 'Chemistry', type: 'task' },
      { id: '4', title: 'Biology Study Session', date: '2024-12-19', priority: 'Low', subject: 'Biology', type: 'study' },
      { id: '5', title: 'English Essay', date: '2024-12-25', priority: 'Medium', subject: 'English', type: 'assignment' },
    ])

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const daysInMonth = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate())
    const firstDayOfMonth = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay())

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate.value)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      currentDate.value = newDate
    }

    const getTasksForDate = (date) => {
      const dateStr = `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
      return tasks.value.filter(task => task.date === dateStr)
    }

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High':
          return 'bg-red-500'
        case 'Medium':
          return 'bg-yellow-500'
        case 'Low':
          return 'bg-green-500'
        default:
          return 'bg-gray-500'
      }
    }

    const getTypeIcon = (type) => {
      switch (type) {
        case 'exam':
          return '📝'
        case 'assignment':
          return '📋'
        case 'study':
          return '📚'
        default:
          return '📌'
      }
    }

    const calendarDays = computed(() => {
      const days = []
      const today = new Date()
      
      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth.value; i++) {
        days.push('<div class="h-24 border border-gray-200"></div>')
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth.value; day++) {
        const dayTasks = getTasksForDate(day)
        const isToday = today.getDate() === day && 
                       today.getMonth() === currentDate.value.getMonth() && 
                       today.getFullYear() === currentDate.value.getFullYear()
        
        let dayHtml = `<div class="h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
          isToday ? 'bg-blue-50 border-blue-300' : ''
        }">`
        
        dayHtml += `<div class="text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}">${day}</div>`
        dayHtml += '<div class="space-y-1">'
        
        dayTasks.slice(0, 2).forEach((task) => {
          const priorityColor = getPriorityColor(task.priority)
          dayHtml += `<div class="text-xs p-1 rounded truncate ${priorityColor} text-white" title="${task.title}">`
          dayHtml += `${getTypeIcon(task.type)} ${task.title}`
          dayHtml += '</div>'
        })
        
        if (dayTasks.length > 2) {
          dayHtml += `<div class="text-xs text-gray-500 pl-1">+${dayTasks.length - 2} more</div>`
        }
        
        dayHtml += '</div></div>'
        days.push(dayHtml)
      }
      
      return days
    })

    return {
      currentDate,
      selectedDate,
      showAddModal,
      tasks,
      monthNames,
      dayNames,
      calendarDays,
      navigateMonth,
      getPriorityColor,
      getTypeIcon
    }
  }
}
</script>