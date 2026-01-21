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

  function completeActivity(id: number | string): void
  function completeActivity(activity: ActivityInterface): void

  function completeActivity(payload: number | string | ActivityInterface) {
    const activity =
      typeof payload === 'object' && 'id' in payload
        ? allActivities.value.filter((a) => a.id === payload.id)
        : allActivities.value.filter((a) => a.id === payload)

    if (!activity || !activity[0]) throw new Error('')

    activity[0].status = true
  }

  function getNumByType(status: boolean): number
  function getNumByType(filter_id: number): number

  function getNumByType(param: boolean | number): number {
    if (typeof param === 'boolean') {
      return allActivities.value.filter((a) => a.status === param).length
    }
    return allActivities.value.flatMap((a) => a.filters || []).length
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
    } catch {
      allActivities.value = []
    }
  })

  return {
    allActivities,
    totalActivities,
    addActivity,
    removeActivity,
    completeActivity,
    getNumByType,
  }
}
