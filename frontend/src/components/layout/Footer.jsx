import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Text type="secondary">© {new Date().getFullYear()} AnimeRec</Text>
        <Text type="secondary">Built with FastAPI + React + Ant Design</Text>
      </div>
    </footer>
  )
}

export default Footer
