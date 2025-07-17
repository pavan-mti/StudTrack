<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <BookOpen class="h-8 w-8 text-blue-600" />
          <h2 class="text-2xl font-bold text-gray-900">StudTrack</h2>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X class="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <!-- User Type Selection -->
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">I am a...</h3>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="userType = 'student'"
            :class="`p-4 rounded-xl border-2 transition-all duration-200 ${
              userType === 'student'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`"
          >
            <GraduationCap class="h-8 w-8 mx-auto mb-2" />
            <div class="font-medium">Student</div>
            <div class="text-sm opacity-75">Learn & Track Progress</div>
          </button>
          <button
            @click="userType = 'mentor'"
            :class="`p-4 rounded-xl border-2 transition-all duration-200 ${
              userType === 'mentor'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`"
          >
            <Users class="h-8 w-8 mx-auto mb-2" />
            <div class="font-medium">Mentor</div>
            <div class="text-sm opacity-75">Teach & Guide Students</div>
          </button>
        </div>
      </div>

      <!-- Mode Toggle -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            @click="switchMode('signin')"
            :class="`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              mode === 'signin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`"
          >
            Sign In
          </button>
          <button
            @click="switchMode('signup')"
            :class="`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              mode === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`"
          >
            Sign Up
          </button>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div v-if="mode === 'signup'" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              v-model="formData.firstName"
              :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="John"
            />
            <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              v-model="formData.lastName"
              :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="Doe"
            />
            <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              v-model="formData.email"
              :class="`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="your@email.com"
            />
          </div>
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="formData.password"
              :class="`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <EyeOff v-if="showPassword" class="h-5 w-5" />
              <Eye v-else class="h-5 w-5" />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <div v-if="mode === 'signup'">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="formData.confirmPassword"
              :class="`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <EyeOff v-if="showConfirmPassword" class="h-5 w-5" />
              <Eye v-else class="h-5 w-5" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Additional Fields for Sign Up -->
        <div v-if="mode === 'signup' && userType === 'student'">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              University
            </label>
            <input
              type="text"
              v-model="formData.university"
              :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.university ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="Stanford University"
            />
            <p v-if="errors.university" class="text-red-500 text-xs mt-1">{{ errors.university }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Major
              </label>
              <input
                type="text"
                v-model="formData.major"
                :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.major ? 'border-red-300' : 'border-gray-300'
                }`"
                placeholder="Computer Science"
              />
              <p v-if="errors.major" class="text-red-500 text-xs mt-1">{{ errors.major }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                v-model="formData.year"
                :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.year ? 'border-red-300' : 'border-gray-300'
                }`"
              >
                <option value="">Select Year</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>
              <p v-if="errors.year" class="text-red-500 text-xs mt-1">{{ errors.year }}</p>
            </div>
          </div>
        </div>

        <div v-if="mode === 'signup' && userType === 'mentor'">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Area of Expertise
            </label>
            <input
              type="text"
              v-model="formData.expertise"
              :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expertise ? 'border-red-300' : 'border-gray-300'
              }`"
              placeholder="Mathematics, Physics, Computer Science"
            />
            <p v-if="errors.expertise" class="text-red-500 text-xs mt-1">{{ errors.expertise }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              v-model="formData.experience"
              :class="`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.experience ? 'border-red-300' : 'border-gray-300'
              }`"
            >
              <option value="">Select Experience</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
            <p v-if="errors.experience" class="text-red-500 text-xs mt-1">{{ errors.experience }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Bio (Optional)
            </label>
            <textarea
              v-model="formData.bio"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell students about your background and teaching approach..."
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          :class="`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            userType === 'student'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`"
        >
          <div v-if="isLoading" class="flex items-center justify-center space-x-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{{ mode === 'signin' ? 'Signing In...' : 'Creating Account...' }}</span>
          </div>
          <span v-else>{{ mode === 'signin' ? 'Sign In' : 'Create Account' }}</span>
        </button>

        <div v-if="mode === 'signin'" class="text-center">
          <button
            type="button"
            class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Forgot your password?
          </button>
        </div>
      </form>

      <!-- Footer -->
      <div class="px-6 pb-6 text-center text-sm text-gray-600">
        {{ mode === 'signin' ? "Don't have an account? " : "Already have an account? " }}
        <button
          @click="switchMode(mode === 'signin' ? 'signup' : 'signin')"
          class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          {{ mode === 'signin' ? 'Sign up' : 'Sign in' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { X, User, Users, Mail, Lock, Eye, EyeOff, BookOpen, GraduationCap } from 'lucide-vue-next'

export default {
  name: 'AuthModal',
  components: {
    X,
    User,
    Users,
    Mail,
    Lock,
    Eye,
    EyeOff,
    BookOpen,
    GraduationCap
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'login'],
  setup(props, { emit }) {
    const mode = ref('signin')
    const userType = ref('student')
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const isLoading = ref(false)

    const formData = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      university: '',
      major: '',
      year: '',
      expertise: '',
      bio: '',
      experience: ''
    })

    const errors = reactive({})

    const validateForm = () => {
      Object.keys(errors).forEach(key => delete errors[key])

      if (!formData.email) {
        errors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email'
      }

      if (!formData.password) {
        errors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }

      if (mode.value === 'signup') {
        if (!formData.firstName) errors.firstName = 'First name is required'
        if (!formData.lastName) errors.lastName = 'Last name is required'
        
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match'
        }

        if (userType.value === 'student') {
          if (!formData.university) errors.university = 'University is required'
          if (!formData.major) errors.major = 'Major is required'
          if (!formData.year) errors.year = 'Academic year is required'
        } else {
          if (!formData.expertise) errors.expertise = 'Area of expertise is required'
          if (!formData.experience) errors.experience = 'Experience level is required'
        }
      }

      return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
      if (!validateForm()) return

      isLoading.value = true

      // Simulate API call
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          email: formData.email,
          firstName: formData.firstName || 'John',
          lastName: formData.lastName || 'Doe',
          userType: userType.value,
          ...(userType.value === 'student' ? {
            university: formData.university,
            major: formData.major,
            year: formData.year
          } : {
            expertise: formData.expertise,
            experience: formData.experience,
            bio: formData.bio
          })
        }

        emit('login', userData)
        isLoading.value = false
        emit('close')
      }, 1500)
    }

    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      Object.keys(errors).forEach(key => delete errors[key])
    }

    const switchMode = (newMode) => {
      mode.value = newMode
      resetForm()
    }

    return {
      mode,
      userType,
      showPassword,
      showConfirmPassword,
      isLoading,
      formData,
      errors,
      handleSubmit,
      switchMode
    }
  }
}
</script>