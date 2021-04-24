import { useState } from 'react'

import Header from '@components/Header'
import Player from '@components/Player'
import { EpisodeModel } from '@models/episode'

import '../styles/global.scss'
import PlayerContext from '@contexts/PlayerContext'
import styles from '../styles/app.module.scss'

function PodcastrApp({ Component, pageProps }): JSX.Element {
  const [episodeList, setEpisodeList] = useState<Array<EpisodeModel>>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: EpisodeModel) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    togglePlay()
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={{ currentEpisodeIndex, episodeList, isPlaying, play, togglePlay, setPlayingState }}
    >
      <div className={styles.appContainer}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default PodcastrApp
