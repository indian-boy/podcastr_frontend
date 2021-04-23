export interface EpisodeModel {
  id: string
  title: string
  members: string
  published_at: string
  published_at_formatted?: string
  thumbnail: string
  description: string
  file: File
}

export interface File {
  url: string
  type: string
  duration: number
  duration_as_time_string?: string
}
