export default interface ActivityInterface {
  priority: string
  title: string
  duration: number
  type: string
  note: string
  status: {
    title: string,
    id: number
  }[]
}
