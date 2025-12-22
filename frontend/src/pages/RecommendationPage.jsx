import React, { useState, useEffect, useRef } from 'react';
import { Input, Card, Button, Typography, Row, Col, message, Spin, Empty, Tag, Drawer, Pagination, Segmented } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, RocketOutlined, MenuOutlined, StarFilled } from '@ant-design/icons';
import { searchAnime, getRecommendations } from '../services/api';
import AppLayout from '../components/layout/AppLayout';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Meta } = Card;

const RecommendationPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommending, setRecommending] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState('');
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const recsRef = useRef(null);
  const sanitizeUrl = (u) => (typeof u === 'string' ? u.replace(/`/g, '').trim() : '');

  const fetchList = async (q, p = 1, t = '') => {
    setLoading(true);
    try {
      const data = await searchAnime(q, p, perPage, t);
      setSearchResults(data.data || []);
      const items = data.pagination?.items;
      setTotal(items?.total || 0);
    } catch {
      message.error('Failed to load anime list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      try {
        const data = await searchAnime('', 1, perPage, typeFilter);
        setSearchResults(data.data || []);
        const items = data.pagination?.items;
        setTotal(items?.total || 0);
      } catch {
        message.error('Failed to load anime list');
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, [perPage, typeFilter]);

  const onSearch = async (value) => {
    setQuery(value);
    setPage(1);
    fetchList(value, 1, typeFilter);
  };

  const addAnime = (anime) => {
    if (selectedAnime.find(a => a.mal_id === anime.mal_id)) {
      message.warning('Anime already selected');
      return;
    }
    setSelectedAnime([...selectedAnime, anime]);
    message.success(`Added ${anime.title}`);
  };

  const removeAnime = (animeId) => {
    setSelectedAnime(selectedAnime.filter(a => a.mal_id !== animeId));
  };
  const clearSelected = () => {
    setSelectedAnime([]);
    setRecommendations([]);
  };

  const handleRecommend = async () => {
    if (selectedAnime.length === 0) {
      message.warning('Please select at least one anime');
      return;
    }
    setRecommending(true);
    setDrawerVisible(false); // Close drawer on mobile if open
    try {
      const animeNames = selectedAnime.map(a => a.title);
      const data = await getRecommendations(animeNames);
      setRecommendations(data.recommendations);
      if (data.recommendations.length === 0) {
        message.info('No recommendations found');
      }
      recsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch {
      message.error('Failed to get recommendations');
    } finally {
      setRecommending(false);
    }
  };

  const openDetails = (item) => {
    setDetailItem(item);
    setDetailDrawerVisible(true);
  };

  const onPageChange = (p) => {
    setPage(p);
    fetchList(query, p, typeFilter);
  };

  return (
    <AppLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={2} className="!mb-2">Find Your Next Favorite Anime</Title>
        <Text type="secondary" className="text-lg">Search, select, and discover.</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-4 mb-6">
            <Search
              placeholder="Search anime (e.g. Naruto, Bleach)"
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={onSearch}
              loading={loading}
              className="flex-1"
              allowClear
            />
            <div className="flex items-center justify-between">
              <Segmented
                options={[
                  { label: 'All', value: '' },
                  { label: 'TV', value: 'tv' },
                  { label: 'Movie', value: 'movie' },
                  { label: 'OVA', value: 'ova' },
                  { label: 'ONA', value: 'ona' },
                  { label: 'Special', value: 'special' },
                  { label: 'Music', value: 'music' },
                ]}
                size="large"
                value={typeFilter}
                onChange={(val) => { setTypeFilter(val); setPage(1); fetchList(query, 1, val); }}
              />
              <Button 
                  className="lg:hidden" 
                  icon={<MenuOutlined />} 
                  size="large" 
                  onClick={() => setDrawerVisible(true)}
              >
                  Selected ({selectedAnime.length})
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm min-h-[400px]">
             <Title level={4} className="mb-4">Search Results</Title>
             {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
             ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {searchResults.map(anime => (
                        <Card
                            key={anime.mal_id}
                            hoverable
                            cover={
                                <div className="h-48 overflow-hidden relative group">
                                    <img 
                                        alt={anime.title} 
                                        src={anime.images.jpg.image_url} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button 
                                            type="primary" 
                                            shape="circle" 
                                            icon={<PlusOutlined />} 
                                            size="large"
                                            onClick={() => addAnime(anime)}
                                        />
                                    </div>
                                </div>
                            }
                            className="overflow-hidden border-gray-200"
                            bodyStyle={{ padding: '12px' }}
                        >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold truncate" title={anime.title}>{anime.title}</div>
                              {typeof anime.score === 'number' && (
                                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                  <StarFilled />
                                  <span>{anime.score}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Button type="default" onClick={() => addAnime(anime)}>Add</Button>
                              <Button onClick={() => openDetails(anime)}>Details</Button>
                            </div>
                        </Card>
                    ))}
                    {searchResults.length === 0 && !loading && (
                        <div className="col-span-full flex justify-center py-12">
                            <Empty description="Start searching to add anime" />
                        </div>
                    )}
                </div>
             )}
          </div>
          <div className="flex justify-center mt-10 pt-2">
            <Pagination
              current={page}
              pageSize={perPage}
              total={total}
              onChange={onPageChange}
              showSizeChanger={false}
              showTotal={(t, r) => `${r[0]}-${r[1]} of ${t}`}
            />
          </div>
        </Col>

        <Col xs={0} lg={8}>
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <Title level={4} className="!m-0">Selected Anime</Title>
                    <div className="flex items-center gap-3">
                      <Tag color="blue">{selectedAnime.length}</Tag>
                      <Button size="small" onClick={clearSelected}>Clear</Button>
                    </div>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto mb-6 space-y-3">
                  {selectedAnime.length === 0 ? (
                    <div className="text-center text-gray-500">No anime selected yet</div>
                  ) : (
                    selectedAnime.map(item => (
                      <div key={item.mal_id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={item.images.jpg.small_image_url} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
                          <Text className="font-medium" ellipsis={{ tooltip: item.title }}>{item.title}</Text>
                        </div>
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeAnime(item.mal_id)} />
                      </div>
                    ))
                  )}
                </div>
                
                <Button 
                    type="primary" 
                    size="large" 
                    block 
                    icon={<RocketOutlined />} 
                    onClick={handleRecommend}
                    loading={recommending}
                    disabled={selectedAnime.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
                >
                    Get Recommendations
                </Button>
            </div>
        </Col>
      </Row>

      <Drawer
        title={`Selected Anime (${selectedAnime.length})`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex justify-end mb-3">
          <Button size="small" onClick={clearSelected}>Clear</Button>
        </div>
        <div className="space-y-3">
          {selectedAnime.map(item => (
            <div key={item.mal_id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.images.jpg.small_image_url} alt={item.title} className="w-10 h-10 object-cover rounded" />
                <Text ellipsis>{item.title}</Text>
              </div>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeAnime(item.mal_id)} />
            </div>
          ))}
        </div>
        <div className="mt-4">
            <Button 
                type="primary" 
                size="large" 
                block 
                icon={<RocketOutlined />} 
                onClick={handleRecommend}
                loading={recommending}
                disabled={selectedAnime.length === 0}
            >
                Get Recommendations
            </Button>
        </div>
      </Drawer>

      <Drawer
        title={detailItem?.title || 'Anime Details'}
        placement="right"
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
        width={420}
      >
        {detailItem ? (
          <div className="space-y-4">
            {'images' in detailItem && detailItem.images?.jpg?.large_image_url && (
              <img
                src={detailItem.images.jpg.large_image_url}
                alt={detailItem.title}
                className="w-full h-56 object-cover rounded-md"
              />
            )}
            <div className="flex items-center gap-2">
              {typeof detailItem.score === 'number' && (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <StarFilled />
                  {detailItem.score}
                </span>
              )}
              {'type' in detailItem && detailItem.type && <Tag color="geekblue">{detailItem.type}</Tag>}
              {'year' in detailItem && detailItem.year && <Tag>{detailItem.year}</Tag>}
              {'episodes' in detailItem && typeof detailItem.episodes === 'number' && <Tag>Ep {detailItem.episodes}</Tag>}
            </div>

            {'synopsis' in detailItem && detailItem.synopsis && (
              <Paragraph className="text-gray-700">{detailItem.synopsis}</Paragraph>
            )}
            {'genres' in detailItem && Array.isArray(detailItem.genres) && detailItem.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {detailItem.genres.slice(0, 8).map((g) => (
                  <Tag key={g.mal_id || g.name} color="blue">{g.name}</Tag>
                ))}
              </div>
            )}
            {'genres' in detailItem && typeof detailItem.genres === 'string' && detailItem.genres && (
              <div className="flex flex-wrap gap-2">
                {detailItem.genres.split(',').slice(0,8).map((g, i) => (
                  <Tag key={i} color="blue">{g.trim()}</Tag>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Empty />
        )}
      </Drawer>

      <Drawer
        title={detailItem?.title || 'Anime Details'}
        placement="right"
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
        width={420}
      >
        {detailItem ? (
          <div className="space-y-4">
            {'images' in detailItem && detailItem.images?.jpg?.large_image_url && (
              <img
                src={detailItem.images.jpg.large_image_url}
                alt={detailItem.title}
                className="w-full h-56 object-cover rounded-md"
              />
            )}
            <div className="flex items-center gap-2">
              {typeof detailItem.score === 'number' && (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <StarFilled />
                  {detailItem.score}
                </span>
              )}
              {'type' in detailItem && detailItem.type && <Tag color="geekblue">{detailItem.type}</Tag>}
              {'year' in detailItem && detailItem.year && <Tag>{detailItem.year}</Tag>}
              {'episodes' in detailItem && typeof detailItem.episodes === 'number' && <Tag>Ep {detailItem.episodes}</Tag>}
              {'rating' in detailItem && detailItem.rating && <Tag>{detailItem.rating}</Tag>}
              {'status' in detailItem && detailItem.status && <Tag>{detailItem.status}</Tag>}
              {'source' in detailItem && detailItem.source && <Tag>{detailItem.source}</Tag>}
              {'duration' in detailItem && detailItem.duration && <Tag>{detailItem.duration}</Tag>}
            </div>

            {'titles' in detailItem && Array.isArray(detailItem.titles) && detailItem.titles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {detailItem.titles.map((t, i) => (
                  <Tag key={i} color="default">{t.type}: {t.title}</Tag>
                ))}
              </div>
            )}

            {'aired' in detailItem && detailItem.aired?.string && (
              <div>
                <Text strong>Aired</Text>
                <div className="text-gray-700">{detailItem.aired.string}</div>
              </div>
            )}
            {'broadcast' in detailItem && detailItem.broadcast?.string && (
              <div>
                <Text strong>Broadcast</Text>
                <div className="text-gray-700">{detailItem.broadcast.string}</div>
              </div>
            )}

            {'synopsis' in detailItem && detailItem.synopsis && (
              <Paragraph className="text-gray-700">{detailItem.synopsis}</Paragraph>
            )}
            {'background' in detailItem && detailItem.background && (
              <Paragraph className="text-gray-700">{detailItem.background}</Paragraph>
            )}

            {'genres' in detailItem && Array.isArray(detailItem.genres) && detailItem.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {detailItem.genres.slice(0, 12).map((g) => (
                  <Tag key={g.mal_id || g.name} color="blue">{g.name}</Tag>
                ))}
              </div>
            )}
            {'genres' in detailItem && typeof detailItem.genres === 'string' && detailItem.genres && (
              <div className="flex flex-wrap gap-2">
                {detailItem.genres.split(',').slice(0,12).map((g, i) => (
                  <Tag key={i} color="blue">{g.trim()}</Tag>
                ))}
              </div>
            )}

            {'producers' in detailItem && Array.isArray(detailItem.producers) && detailItem.producers.length > 0 && (
              <div className="space-y-2">
                <Text strong>Producers</Text>
                <div className="flex flex-wrap gap-2">
                  {detailItem.producers.map((p, i) => (
                    <a key={i} href={sanitizeUrl(p.url)} target="_blank" rel="noreferrer">
                      <Tag>{p.name}</Tag>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {'licensors' in detailItem && Array.isArray(detailItem.licensors) && detailItem.licensors.length > 0 && (
              <div className="space-y-2">
                <Text strong>Licensors</Text>
                <div className="flex flex-wrap gap-2">
                  {detailItem.licensors.map((p, i) => (
                    <a key={i} href={sanitizeUrl(p.url)} target="_blank" rel="noreferrer">
                      <Tag>{p.name}</Tag>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {'studios' in detailItem && Array.isArray(detailItem.studios) && detailItem.studios.length > 0 && (
              <div className="space-y-2">
                <Text strong>Studios</Text>
                <div className="flex flex-wrap gap-2">
                  {detailItem.studios.map((p, i) => (
                    <a key={i} href={sanitizeUrl(p.url)} target="_blank" rel="noreferrer">
                      <Tag>{p.name}</Tag>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {'trailer' in detailItem && detailItem.trailer?.embed_url && (
              <div className="space-y-2">
                <Text strong>Trailer</Text>
                <div className="aspect-video">
                  <iframe
                    src={sanitizeUrl(detailItem.trailer.embed_url)}
                    width="100%"
                    height="240"
                    title="Trailer"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {'url' in detailItem && detailItem.url && (
              <div>
                <a href={sanitizeUrl(detailItem.url)} target="_blank" rel="noreferrer">
                  <Button>Open on MyAnimeList</Button>
                </a>
              </div>
            )}
          </div>
        ) : (
          <Empty />
        )}
      </Drawer>

      <div ref={recsRef}>
      {recommendations.length > 0 && (
          <div className="mt-16 mb-12">
            <div className="flex items-center gap-3 mb-8">
                <RocketOutlined className="text-2xl text-blue-600" />
                <Title level={2} className="!m-0">Recommended For You</Title>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recommendations.map((rec, index) => (
                    <Card 
                        key={index} 
                        hoverable 
                        className="h-full border-gray-200 hover:border-blue-300 transition-colors"
                    >
                         <div className="flex items-center justify-between">
                           <div className="text-sm font-semibold truncate" title={rec.title}>{rec.title}</div>
                         </div>
                         <div className="mt-3 grid grid-cols-1 gap-2">
                           <Button onClick={() => openDetails(rec)}>Details</Button>
                         </div>
                    </Card>
                ))}
            </div>
          </div>
      )}
      </div>
    </div>
    </AppLayout>
  );
};

export default RecommendationPage;
