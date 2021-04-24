import { EpisodeModel } from '@models/episode'
import { createContext } from 'react'

type PlayerContextData = {
  episodeList: Array<EpisodeModel>
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: EpisodeModel) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
}

const PlayerContext = createContext({} as PlayerContextData)

export default PlayerContext
