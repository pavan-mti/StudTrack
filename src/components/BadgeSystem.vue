<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Badge Collection</h1>
          <p class="text-gray-600">Earn badges by completing study goals and milestones</p>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">{{ earnedBadges.length }}/{{ badges.length }}</div>
            <div class="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Award class="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Collection Progress</span>
          <span>{{ Math.round((earnedBadges.length / badges.length) * 100) }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${(earnedBadges.length / badges.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="flex space-x-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`"
          >
            {{ category === 'all' ? 'All Categories' : category }}
          </button>
        </div>
        
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="showEarnedOnly"
            class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">Show earned only</span>
        </label>
      </div>
    </div>

    <!-- Badge Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="badge in filteredBadges"
        :key="badge.id"
        :class="`bg-white rounded-xl shadow-sm border-2 p-6 transition-all duration-300 hover:shadow-lg ${
          badge.earned ? 'border-green-300' : 'border-gray-200'
        }`"
      >
        <div class="text-center mb-4">
          <div
            :class="`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 bg-gradient-to-br ${
              badge.earned ? getRarityGradient(badge.rarity) : 'from-gray-300 to-gray-400'
            } ${badge.earned ? 'text-white' : 'text-gray-500'}`"
          >
            <component :is="badge.icon" class="h-8 w-8" />
          </div>
          
          <h3 :class="`font-semibold text-lg mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`">
            {{ badge.name }}
          </h3>
          
          <span :class="`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`">
            {{ badge.rarity }}
          </span>
        </div>

        <p :class="`text-sm text-center mb-4 ${badge.earned ? 'text-gray-600' : 'text-gray-500'}`">
          {{ badge.description }}
        </p>

        <div v-if="badge.earned" class="text-center">
          <div class="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <Trophy class="h-4 w-4" />
            <span class="text-sm font-medium">Earned</span>
          </div>
          <p class="text-xs text-gray-500">
            {{ badge.earnedDate && new Date(badge.earnedDate).toLocaleDateString() }}
          </p>
        </div>

        <div v-else-if="badge.progress !== undefined && badge.maxProgress !== undefined">
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{{ badge.progress }}/{{ badge.maxProgress }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${(badge.progress / badge.maxProgress) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Badge Statistics -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <div class="text-3xl font-bold text-gray-900 mb-2">
          {{ badges.filter(b => b.earned && b.rarity === 'Common').length }}
        </div>
        <div class="text-sm text-gray-600">Common Badges</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <div class="text-3xl font-bold text-green-600 mb-2">
          {{ badges.filter(b => b.earned && b.rarity === 'Uncommon').length }}
        </div>
        <div class="text-sm text-gray-600">Uncommon Badges</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">
          {{ badges.filter(b => b.earned && b.rarity === 'Rare').length }}
        </div>
        <div class="text-sm text-gray-600">Rare Badges</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <div class="text-3xl font-bold text-purple-600 mb-2">
          {{ badges.filter(b => b.earned && (b.rarity === 'Epic' || b.rarity === 'Legendary')).length }}
        </div>
        <div class="text-sm text-gray-600">Epic & Legendary</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Award, Trophy, Star, Zap, Users, Clock, Target, BookOpen } from 'lucide-vue-next'

export default {
  name: 'BadgeSystem',
  components: {
    Award,
    Trophy,
    Star,
    Zap,
    Users,
    Clock,
    Target,
    BookOpen
  },
  setup() {
    const selectedCategory = ref('all')
    const showEarnedOnly = ref(false)

    const badges = ref([
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first study session',
        category: 'Study',
        rarity: 'Common',
        earned: true,
        earnedDate: '2024-12-01',
        icon: BookOpen
      },
      {
        id: '2',
        name: 'Time Master',
        description: 'Study for 10 hours in total',
        category: 'Time',
        rarity: 'Common',
        earned: true,
        earnedDate: '2024-12-05',
        icon: Clock
      },
      {
        id: '3',
        name: 'Streak Keeper',
        description: 'Maintain a 7-day study streak',
        category: 'Achievement',
        rarity: 'Uncommon',
        earned: true,
        earnedDate: '2024-12-12',
        icon: Zap
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
        icon: Users
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
        icon: Target
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
        icon: Star
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
        icon: Trophy
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
        icon: Award
      }
    ])

    const categories = ['all', 'Study', 'Time', 'Social', 'Achievement']

    const earnedBadges = computed(() => badges.value.filter(badge => badge.earned))

    const filteredBadges = computed(() => {
      return badges.value.filter(badge => {
        const categoryFilter = selectedCategory.value === 'all' || badge.category === selectedCategory.value
        const earnedFilter = !showEarnedOnly.value || badge.earned
        return categoryFilter && earnedFilter
      })
    })

    const getRarityColor = (rarity) => {
      switch (rarity) {
        case 'Common':
          return 'bg-gray-100 text-gray-800 border-gray-300'
        case 'Uncommon':
          return 'bg-green-100 text-green-800 border-green-300'
        case 'Rare':
          return 'bg-blue-100 text-blue-800 border-blue-300'
        case 'Epic':
          return 'bg-purple-100 text-purple-800 border-purple-300'
        case 'Legendary':
          return 'bg-yellow-100 text-yellow-800 border-yellow-300'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300'
      }
    }

    const getRarityGradient = (rarity) => {
      switch (rarity) {
        case 'Common':
          return 'from-gray-400 to-gray-600'
        case 'Uncommon':
          return 'from-green-400 to-green-600'
        case 'Rare':
          return 'from-blue-400 to-blue-600'
        case 'Epic':
          return 'from-purple-400 to-purple-600'
        case 'Legendary':
          return 'from-yellow-400 to-yellow-600'
        default:
          return 'from-gray-400 to-gray-600'
      }
    }

    return {
      selectedCategory,
      showEarnedOnly,
      badges,
      categories,
      earnedBadges,
      filteredBadges,
      getRarityColor,
      getRarityGradient
    }
  }
}
</script>