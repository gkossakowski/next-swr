import Head from 'next/head'
import styles from '../styles/Home.module.css'

import useSWR from 'swr'
function CurrentTime () {
  const { data , error } = useSWR('/api/current_time', fetcher, { refreshInterval: 1000, dedupingInterval: 1000 })
  console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  // render data
  console.log(`time now is ${data.time}`)
  return <div>{data.time}</div>
}

const fetcher = (url) => fetch(url)
  .then(data => { console.log(data); return data})
  .then(res => res.json())

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p>The current time is</p>
        <div>{CurrentTime()}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
