<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ userName }}!</h1>
      <p class="text-gray-600">
        {{ user?.userType === 'mentor' 
          ? "Here's your teaching dashboard and student progress" 
          : "Here's your study progress and upcoming tasks"
        }}
      </p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, index) in currentStats" :key="index" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div :class="`p-3 rounded-lg ${stat.color} bg-opacity-10`">
            <component :is="stat.icon" :class="`h-6 w-6 ${stat.color}`" />
          </div>
          <span :class="`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`">
            {{ stat.change }}
          </span>
        </div>
        <div class="mt-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h3>
          <p class="text-sm text-gray-600">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activities -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ user?.userType === 'mentor' ? 'Recent Channel Activity' : 'Recent Activities' }}
          </h2>
          <div class="space-y-4">
            <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ activity.subject }}</h3>
                  <p class="text-sm text-gray-600">{{ activity.type }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">{{ activity.time }}</p>
                <p class="text-sm text-gray-600">{{ activity.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ user?.userType === 'mentor' ? 'Pending Reviews' : 'Upcoming Tasks' }}
          </h2>
          <div class="space-y-3">
            <div v-for="(task, index) in upcomingTasks" :key="index" class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900 text-sm">{{ task.title }}</h3>
                <span :class="`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`">
                  {{ task.priority }}
                </span>
              </div>
              <p class="text-xs text-gray-600">{{ task.subject }}</p>
              <p class="text-xs text-gray-500 mt-1">Due: {{ task.dueDate }}</p>
            </div>
          </div>
        </div>

        <!-- Mentor Channels -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ user?.userType === 'mentor' ? 'Your Channels' : 'Active Channels' }}
          </h2>
          <div class="space-y-3">
            <div v-for="(channel, index) in mentorChannels" :key="index" class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900 text-sm">{{ channel.name }}</h3>
                <span v-if="channel.newContent > 0" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {{ channel.newContent }} new
                </span>
              </div>
              <p class="text-xs text-gray-600">{{ channel.mentor }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ channel.members }} members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Clock, Target, TrendingUp, Award, Users, BookOpen } from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    Clock,
    Target,
    TrendingUp,
    Award,
    Users,
    BookOpen
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const stats = [
      { icon: Clock, label: 'Total Study Time', value: '124h 30m', change: '+12%', color: 'text-blue-600' },
      { icon: Target, label: 'Tasks Completed', value: '45', change: '+8%', color: 'text-green-600' },
      { icon: TrendingUp, label: 'Weekly Average', value: '18h 45m', change: '+5%', color: 'text-purple-600' },
      { icon: Award, label: 'Badges Earned', value: '12', change: '+2', color: 'text-yellow-600' },
    ]

    const mentorStats = [
      { icon: Users, label: 'Total Students', value: '1,247', change: '+23%', color: 'text-blue-600' },
      { icon: BookOpen, label: 'Channels Created', value: '8', change: '+2%', color: 'text-green-600' },
      { icon: Target, label: 'Assignments Graded', value: '156', change: '+15%', color: 'text-purple-600' },
      { icon: Award, label: 'Average Rating', value: '4.8/5', change: '+0.2', color: 'text-yellow-600' },
    ]

    const recentActivities = [
      { subject: 'Mathematics', time: '2h 15m', type: 'Study Session', date: 'Today' },
      { subject: 'Physics', time: '1h 30m', type: 'Assignment', date: 'Yesterday' },
      { subject: 'Chemistry', time: '45m', type: 'Review', date: 'Yesterday' },
      { subject: 'Biology', time: '1h 00m', type: 'Study Session', date: '2 days ago' },
    ]

    const upcomingTasks = [
      { title: 'Math Assignment Chapter 5', dueDate: 'Today', priority: 'High', subject: 'Mathematics' },
      { title: 'Physics Lab Report', dueDate: 'Tomorrow', priority: 'Medium', subject: 'Physics' },
      { title: 'Chemistry Quiz Prep', dueDate: 'Friday', priority: 'High', subject: 'Chemistry' },
      { title: 'Biology Notes Review', dueDate: 'Saturday', priority: 'Low', subject: 'Biology' },
    ]

    const mentorChannels = [
      { name: 'Advanced Mathematics', mentor: 'Dr. Sarah Chen', members: 234, newContent: 3 },
      { name: 'Physics Mastery', mentor: 'Prof. John Williams', members: 187, newContent: 1 },
      { name: 'Chemistry Fundamentals', mentor: 'Dr. Maria Rodriguez', members: 156, newContent: 2 },
    ]

    const currentStats = computed(() => {
      return props.user?.userType === 'mentor' ? mentorStats : stats
    })

    const userName = computed(() => {
      return props.user ? props.user.firstName : 'Student'
    })

    return {
      currentStats,
      userName,
      recentActivities,
      upcomingTasks,
      mentorChannels
    }
  }
}
</script>