import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div style={{background:'#0f172a', height:'100vh', color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading...</div>

  return (
    <div>
      <Head>
        <title>VisualSearch AI | Intelligent Product Research</title>
        <meta name="description" content="Analyze product images using AI to get structured research results and summaries." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Dashboard />
      </main>
    </div>
  )
}
