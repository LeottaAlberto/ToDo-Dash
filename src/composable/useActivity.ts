import type ActivityInterface from '@/core/interface/ActivityInterface'
import { computed, onMounted, ref } from 'vue'

const allActivities = ref<ActivityInterface[]>([])

export function useActivity() {
  const addActivity = (act: ActivityInterface) => {
    const activity = act
    activity.id = 'activity-' + totalActivities.value
    allActivities.value.push(activity)
    localStorage.setItem('user-activity', JSON.stringify(allActivities.value))
  }

  const removeActivity = (id: number | string) => {
    allActivities.value = allActivities.value.filter((activity) => activity.id !== id)
  }

  const totalActivities = computed(() => allActivities.value.length)

  onMounted(() => {
    try {
      const stored = localStorage.getItem('user-activity')
      if (stored) {
        const parsedData = JSON.parse(stored)
        if (Array.isArray(parsedData)) allActivities.value = parsedData
        else allActivities.value = [parsedData]
      }
    } catch (error) {
      allActivities.value = []
      console.error('Error loading activities:', error)
    }
  })

  return {
    allActivities,
    totalActivities,
    addActivity,
    removeActivity,
  }
}
