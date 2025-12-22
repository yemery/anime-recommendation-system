import { App } from 'antd'
import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import HeroSection from '../components/molecules/HeroSection'

const Home = () => {
  return (
    <AppLayout>
      <HeroSection />
    </AppLayout>
  )
}

export default Home