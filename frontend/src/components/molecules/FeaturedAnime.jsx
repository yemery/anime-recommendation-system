import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Spin, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import animeService from '../../services/animeService';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const FeaturedAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await animeService.getAnimeList(currentPage, 6);
        setAnimeList(response.data);
        setTotalPages(response.pagination?.last_visible_page || 1);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading && animeList.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="!text-3xl md:!text-4xl font-bold">Featured Anime</Title>
          <div className="flex gap-2">
            <Button 
              icon={<LeftOutlined />} 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex items-center justify-center"
            />
            <Button 
              icon={<RightOutlined />} 
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="flex items-center justify-center"
            />
          </div>
        </div>
        
        <Row gutter={[24, 24]}>
          {animeList.map(anime => (
            <Col xs={24} sm={12} md={8} lg={4} key={anime.mal_id}>
              <Link to={`/anime/${anime.mal_id}`}>
                <Card
                  hoverable
                  cover={
                    <img 
                      alt={anime.title} 
                      src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'} 
                      className="h-64 object-cover"
                    />
                  }
                  className="h-full"
                  bodyStyle={{ padding: '16px' }}
                >
                  <Title level={5} ellipsis={{ rows: 2 }} className="!text-base !mb-2 h-12">
                    {anime.title}
                  </Title>
                  <div className="flex justify-between items-center">
                    <Text type="secondary" className="text-sm">
                      {anime.type} • {anime.episodes || '?'} eps
                    </Text>
                    <Text strong className="text-yellow-500">
                      {anime.score ? `${anime.score}/10` : 'N/A'}
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-8">
          <Link to="/browse">
            <Button type="primary" size="large">
              Browse All Anime
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnime;
