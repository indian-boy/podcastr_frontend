import { Episode } from '@models/episode'
import { GetStaticProps } from 'next'

export default function Home({ episodes }): JSX.Element {
  return <code>{JSON.stringify(episodes)}</code>
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = (await response.json()) as Episode[]

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
