<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <BookOpen class="h-8 w-8 text-blue-600" />
            <h1 class="text-2xl font-bold text-gray-900">StudTrack</h1>
          </div>
          <button
            @click="$emit('open-auth')"
            class="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Study Journey</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your learning experience with intelligent study tracking, expert mentorship, 
            and gamified progress that keeps you motivated every step of the way.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="$emit('open-auth')"
              class="flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-medium"
            >
              <span>Start Learning Today</span>
              <ArrowRight class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ stat.number }}</div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Excel
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed to help students and mentors achieve their academic goals
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div :class="`w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center mb-6 ${feature.color} bg-current`">
              <component :is="feature.icon" :class="`h-6 w-6 ${feature.color}`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            How StudTrack Works
          </h2>
          <p class="text-xl text-gray-600">
            Get started in three simple steps
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(step, index) in steps" :key="step.title" class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Loved by Students & Mentors
          </h2>
          <p class="text-xl text-gray-600">
            See what our community has to say about StudTrack
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="p-8 bg-gray-50 rounded-2xl">
            <div class="flex items-center mb-6">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
                <p class="text-sm text-gray-500">{{ testimonial.university }}</p>
              </div>
            </div>
            <p class="text-gray-700 italic">"{{ testimonial.quote }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of students and mentors who are already achieving their goals with StudTrack
        </p>
        <button
          @click="$emit('open-auth')"
          class="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-medium"
        >
          <span>Get Started Free</span>
          <ArrowRight class="h-5 w-5" />
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <BookOpen class="h-8 w-8 text-blue-400" />
              <h3 class="text-xl font-bold">StudTrack</h3>
            </div>
            <p class="text-gray-400">
              Empowering students and mentors to achieve academic excellence through intelligent tracking and community learning.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Features</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Study Timer</li>
              <li>Task Management</li>
              <li>Progress Analytics</li>
              <li>Badge System</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Community</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Mentor Channels</li>
              <li>Student Forums</li>
              <li>Success Stories</li>
              <li>Help Center</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StudTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { BookOpen, Timer, BarChart3, Award, Users, Calendar, ArrowRight } from 'lucide-vue-next'

export default {
  name: 'LandingPage',
  components: {
    BookOpen,
    Timer,
    BarChart3,
    Award,
    Users,
    Calendar,
    ArrowRight
  },
  emits: ['open-auth'],
  setup() {
    const features = [
      {
        icon: Timer,
        title: 'Smart Study Timer',
        description: 'Track your study sessions with our Pomodoro-style timer and build consistent habits.',
        color: 'text-blue-600'
      },
      {
        icon: Calendar,
        title: 'Task Management',
        description: 'Organize assignments, set priorities, and never miss a deadline with our integrated calendar.',
        color: 'text-green-600'
      },
      {
        icon: BarChart3,
        title: 'Progress Analytics',
        description: 'Visualize your study patterns with interactive charts and productivity insights.',
        color: 'text-purple-600'
      },
      {
        icon: Award,
        title: 'Achievement System',
        description: 'Earn badges and unlock rewards as you reach your study goals and milestones.',
        color: 'text-yellow-600'
      },
      {
        icon: Users,
        title: 'Mentor Channels',
        description: 'Join expert-led learning communities with video lessons and assignments.',
        color: 'text-red-600'
      },
      {
        icon: BookOpen,
        title: 'Personalized Learning',
        description: 'Get custom study plans and mentor recommendations based on your goals.',
        color: 'text-indigo-600'
      }
    ]

    const testimonials = [
      {
        name: 'Sarah Chen',
        role: 'Computer Science Student',
        university: 'Stanford University',
        quote: 'StudTrack helped me increase my study time by 40% and maintain a consistent schedule.',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Dr. Michael Johnson',
        role: 'Mathematics Mentor',
        university: 'MIT',
        quote: 'The mentor channels feature allows me to reach and help hundreds of students effectively.',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Pre-Med Student',
        university: 'Harvard University',
        quote: 'The gamification aspect keeps me motivated, and the analytics help me optimize my study habits.',
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]

    const stats = [
      { number: '50K+', label: 'Active Students' },
      { number: '2K+', label: 'Expert Mentors' },
      { number: '1M+', label: 'Study Hours Tracked' },
      { number: '95%', label: 'Success Rate' }
    ]

    const steps = [
      {
        title: 'Sign Up & Set Goals',
        description: 'Create your account as a student or mentor and define your learning objectives'
      },
      {
        title: 'Track & Learn',
        description: 'Use our study timer, join mentor channels, and complete tasks to build momentum'
      },
      {
        title: 'Achieve Success',
        description: 'Monitor your progress, earn badges, and reach your academic milestones'
      }
    ]

    return {
      features,
      testimonials,
      stats,
      steps
    }
  }
}
</script>