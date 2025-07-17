<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p class="text-gray-600">Organize and track your study tasks</p>
        </div>
        <button
          @click="showAddModal = true"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
        >
          <Plus class="h-5 w-5" />
          <span>Add Task</span>
        </button>
      </div>

      <!-- Filters and Sort -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="flex space-x-2">
          <button
            @click="filter = 'all'"
            :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`"
          >
            All ({{ tasks.length }})
          </button>
          <button
            @click="filter = 'pending'"
            :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`"
          >
            Pending ({{ tasks.filter(t => !t.completed).length }})
          </button>
          <button
            @click="filter = 'completed'"
            :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`"
          >
            Completed ({{ tasks.filter(t => t.completed).length }})
          </button>
        </div>
        
        <select
          v-model="sortBy"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
    </div>

    <!-- Task List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="task in sortedTasks"
        :key="task.id"
        :class="`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all duration-200 ${
          task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
        } ${isOverdue(task.dueDate) ? 'border-red-200 bg-red-50' : ''}`"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <button
              @click="toggleComplete(task.id)"
              :class="`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'border-gray-300 hover:border-blue-500'
              }`"
            >
              <CheckCircle v-if="task.completed" class="h-4 w-4" />
            </button>
            <div>
              <h3 :class="`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`">
                {{ task.title }}
              </h3>
              <p class="text-sm text-gray-600">{{ task.subject }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="handleEditTask(task)"
              class="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Edit2 class="h-4 w-4" />
            </button>
            <button
              @click="handleDeleteTask(task.id)"
              class="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>

        <p :class="`text-sm mb-4 ${task.completed ? 'text-gray-500' : 'text-gray-700'}`">
          {{ task.description }}
        </p>

        <div class="flex items-center justify-between mb-3">
          <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`">
            {{ task.priority }}
          </span>
          <div class="flex items-center space-x-1 text-sm text-gray-600">
            <Calendar class="h-4 w-4" />
            <span>{{ new Date(task.dueDate).toLocaleDateString() }}</span>
            <AlertCircle v-if="isOverdue(task.dueDate)" class="h-4 w-4 text-red-500" />
          </div>
        </div>

        <div v-if="task.resourceLinks.length > 0" class="pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-600 mb-1">Resources:</p>
          <a
            v-for="(link, index) in task.resourceLinks"
            :key="index"
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-blue-600 hover:text-blue-800 underline block"
          >
            Resource {{ index + 1 }}
          </a>
        </div>
      </div>
    </div>

    <!-- Add/Edit Task Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          {{ editingTask ? 'Edit Task' : 'Add New Task' }}
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              v-model="newTask.title"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newTask.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter task description"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                v-model="newTask.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                v-model="newTask.subject"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              v-model="newTask.dueDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="editingTask ? handleUpdateTask() : handleAddTask()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {{ editingTask ? 'Update Task' : 'Add Task' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { Plus, Edit2, Trash2, Calendar, AlertCircle, CheckCircle } from 'lucide-vue-next'

export default {
  name: 'TaskManager',
  components: {
    Plus,
    Edit2,
    Trash2,
    Calendar,
    AlertCircle,
    CheckCircle
  },
  setup() {
    const tasks = ref([
      {
        id: '1',
        title: 'Complete Math Assignment Chapter 5',
        description: 'Solve problems 1-20 from Chapter 5: Quadratic Equations',
        priority: 'High',
        dueDate: '2024-12-20',
        subject: 'Mathematics',
        completed: false,
        resourceLinks: ['https://example.com/math-resources']
      },
      {
        id: '2',
        title: 'Physics Lab Report',
        description: 'Write lab report on pendulum motion experiment',
        priority: 'Medium',
        dueDate: '2024-12-22',
        subject: 'Physics',
        completed: false,
        resourceLinks: []
      },
      {
        id: '3',
        title: 'Chemistry Quiz Preparation',
        description: 'Review chapters 3-5 for upcoming quiz',
        priority: 'High',
        dueDate: '2024-12-18',
        subject: 'Chemistry',
        completed: true,
        resourceLinks: ['https://example.com/chem-quiz']
      },
      {
        id: '4',
        title: 'Biology Notes Review',
        description: 'Review cell structure and function notes',
        priority: 'Low',
        dueDate: '2024-12-25',
        subject: 'Biology',
        completed: false,
        resourceLinks: []
      }
    ])

    const showAddModal = ref(false)
    const editingTask = ref(null)
    const filter = ref('all')
    const sortBy = ref('dueDate')

    const newTask = reactive({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      subject: 'Mathematics',
      resourceLinks: []
    })

    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History']

    const filteredTasks = computed(() => {
      return tasks.value.filter(task => {
        switch (filter.value) {
          case 'pending':
            return !task.completed
          case 'completed':
            return task.completed
          default:
            return true
        }
      })
    })

    const sortedTasks = computed(() => {
      return [...filteredTasks.value].sort((a, b) => {
        if (sortBy.value === 'dueDate') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        } else {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
      })
    })

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High':
          return 'bg-red-100 text-red-800'
        case 'Medium':
          return 'bg-yellow-100 text-yellow-800'
        case 'Low':
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const isOverdue = (dueDate) => {
      return new Date(dueDate) < new Date() && !tasks.value.find(t => t.dueDate === dueDate)?.completed
    }

    const handleAddTask = () => {
      if (newTask.title.trim()) {
        const task = {
          ...newTask,
          id: Date.now().toString(),
          completed: false,
          resourceLinks: [...newTask.resourceLinks]
        }
        tasks.value.push(task)
        resetForm()
        showAddModal.value = false
      }
    }

    const handleEditTask = (task) => {
      editingTask.value = task
      Object.assign(newTask, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        subject: task.subject,
        resourceLinks: [...task.resourceLinks]
      })
      showAddModal.value = true
    }

    const handleUpdateTask = () => {
      if (editingTask.value && newTask.title.trim()) {
        const index = tasks.value.findIndex(task => task.id === editingTask.value.id)
        if (index !== -1) {
          tasks.value[index] = { ...tasks.value[index], ...newTask }
        }
        resetForm()
        editingTask.value = null
        showAddModal.value = false
      }
    }

    const handleDeleteTask = (id) => {
      tasks.value = tasks.value.filter(task => task.id !== id)
    }

    const toggleComplete = (id) => {
      const task = tasks.value.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    }

    const resetForm = () => {
      Object.assign(newTask, {
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        subject: 'Mathematics',
        resourceLinks: []
      })
    }

    const closeModal = () => {
      showAddModal.value = false
      editingTask.value = null
      resetForm()
    }

    return {
      tasks,
      showAddModal,
      editingTask,
      filter,
      sortBy,
      newTask,
      subjects,
      sortedTasks,
      getPriorityColor,
      isOverdue,
      handleAddTask,
      handleEditTask,
      handleUpdateTask,
      handleDeleteTask,
      toggleComplete,
      closeModal
    }
  }
}
</script>