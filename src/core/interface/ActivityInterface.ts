export default interface ActivityInterface {
  id: string
  priority: string
  title: string
  duration: number
  type: string
  note: string
  status: boolean
  filters: {
    filter_id: number
    filter_name: string
  }[]
}
