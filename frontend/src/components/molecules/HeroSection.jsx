import React from 'react'
import { Button, Typography } from 'antd'
import { RocketOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <Title className="!text-5xl !font-extrabold !mb-6 !text-gray-900">
          Discover Anime You'll Love
        </Title>
        <Text className="text-xl text-gray-600 mb-8 block max-w-2xl mx-auto">
          Our advanced machine learning recommendation system analyzes your preferences to suggest the perfect anime for your next binge.
        </Text>
        <div className="flex justify-center gap-4">
          <Link to="/recommend">
            <Button type="primary" size="large" icon={<RocketOutlined />} className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700">
              Start Recommending
            </Button>
          </Link>
          <Button size="large" className="h-12 px-8 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
