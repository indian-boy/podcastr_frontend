import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { EpisodeModel } from '@models/episode'
import { getEpisodes } from '@api/episodes.api'
import ApiSortOrder from '@enums/api/ApiSortOrder.enum'
import ConvertDurationFromTimeString from '@utils/helpers/ConvertDurationFromTimeString'
import styles from './styles.module.scss'

type HomeProps = {
  allEpisodes: Array<EpisodeModel>
  latestEpisodes: Array<EpisodeModel>
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps): JSX.Element {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <Image
                objectFit="cover"
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.published_at_formatted}</span>
                <span>{episode.file.duration_as_time_string}</span>
              </div>
              <button type="button">
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.published_at_formatted}</td>
                <td>{episode.file.duration_as_time_string}</td>
                <td>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getEpisodes({
    _limit: 12,
    _sort: 'published_at',
    _order: ApiSortOrder.Desc,
  })

  const episodes = data.map((episode) => ({
    ...episode,
    published_at_formatted: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
    file: {
      ...episode.file,
      duration_as_time_string: ConvertDurationFromTimeString(episode.file.duration),
    },
  }))

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      allEpisodes,
      latestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
