import React from 'react'
import Home from '../pages/Home'
import RecommendationPage from '../pages/RecommendationPage'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<RecommendationPage />} />
    </Routes>
  )
}

export default AppRouter