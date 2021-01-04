import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React, {useMemo} from 'react';
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';

import axios, { post } from 'axios';

import Image from 'next/image'

import useSWR from 'swr'
function CurrentTime () {
  const { data , error } = useSWR('/api/current_time', fetcher, { refreshInterval: 1000, dedupingInterval: 1000 })
  // console.log(`error is ${error}`)
  // console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  // render data
  // console.log(`time now is ${data.time}`)
  return <div>{data.time}</div>
}

function ListImages () {
  const { data , error } = useSWR('/api/list_imgs', fetcher, { refreshInterval: 1000, dedupingInterval: 1000 })
  // console.log(`error is ${error}`)
  // console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  // render data
  // console.log(`time now is ${data.time}`)
  function renderImg(img) {
    console.log(`Rendering img ${img}`)
    return <div margin={30}>
    <Image
    src={img}
    alt="Cell image"
    width={128}
    height={128}
    />
    </div>
  }
  return <div>{data.imgs.map(renderImg)}</div>
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone({onDrop}) {
const {
  getRootProps,
  getInputProps,
  isDragActive,
  isDragAccept,
  isDragReject
} = useDropzone({accept: 'image/*', onDrop: onDrop});

const style = useMemo(() => ({
  ...baseStyle,
  ...(isDragActive ? activeStyle : {}),
  ...(isDragAccept ? acceptStyle : {}),
  ...(isDragReject ? rejectStyle : {})
}), [
  isDragActive,
  isDragReject,
  isDragAccept
]);

return (
  <div className="container">
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  </div>
);
}

function fileUpload(file){
  const url = '/api/upload';
  const formData = new FormData();
  formData.append('img',file)
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return post(url, formData,config)
}

function onDrop(acceptedFiles) {
  console.log(acceptedFiles)
  console.assert(acceptedFiles.length == 1, acceptedFiles)
  const uploadRes = fileUpload(acceptedFiles[0])
  console.log(uploadRes)
}

const fetcher = (url) => fetch(url)
  // .then(data => { console.log(data); return data})
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

        <StyledDropzone onDrop={onDrop}/>
        <div><ListImages/></div>
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
