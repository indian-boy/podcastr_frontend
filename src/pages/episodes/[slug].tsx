import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import ConvertDurationFromTimeString from '@utils/helpers/ConvertDurationFromTimeString'
import { getEpisodeById } from '@api/episodes.api'
import { EpisodeModel } from '@models/episode'
import styles from './styles.module.scss'

type EpisodeProps = {
  episode: EpisodeModel
}

export default function Episode({ episode }: EpisodeProps): JSX.Element {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at_formatted}</span>
        <span>{episode.file.duration_as_time_string}</span>
      </header>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { data } = await getEpisodeById(slug)

  const episode = {
    ...data,
    published_at_formatted: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    file: {
      ...data.file,
      duration_as_time_string: ConvertDurationFromTimeString(data.file.duration),
    },
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24,
  }
}
