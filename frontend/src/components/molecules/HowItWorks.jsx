import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { RobotOutlined, SearchOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const steps = [
  {
    icon: <SearchOutlined className="text-4xl text-blue-500" />,
    title: 'Search & Select',
    description: 'Search and select your favorite anime titles from our extensive database.'
  },
  {
    icon: <RobotOutlined className="text-4xl text-purple-500" />,
    title: 'AI Analysis',
    description: 'Our ML model analyzes your preferences and viewing history.'
  },
  {
    icon: <HeartOutlined className="text-4xl text-red-500" />,
    title: 'Get Recommendations',
    description: 'Receive personalized anime recommendations tailored just for you.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Title level={2} className="!text-3xl md:!text-4xl font-bold mb-4">How It Works</Title>
          <Text type="secondary" className="text-lg max-w-2xl mx-auto">
            Our recommendation system uses advanced machine learning to help you discover your next favorite anime.
          </Text>
        </div>
        
        <Row gutter={[24, 24]} justify="center">
          {steps.map((step, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card 
                hoverable 
                className="h-full text-center p-6 transition-all hover:shadow-lg"
                bodyStyle={{ height: '100%' }}
              >
                <div className="mb-4">{step.icon}</div>
                <Title level={4} className="!text-xl !mb-3">{step.title}</Title>
                <Text type="secondary">{step.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default HowItWorks;
