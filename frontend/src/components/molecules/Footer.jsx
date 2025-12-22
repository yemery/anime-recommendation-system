import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, TwitterOutlined, RedditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <AntFooter className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AnimeRec</h3>
            <p className="text-gray-400">
              Discover your next favorite anime with our AI-powered recommendation system.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/yourusername/anime-rec-sys" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <GithubOutlined className="text-2xl" />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <TwitterOutlined className="text-2xl" />
              </a>
              <a href="https://reddit.com/r/anime" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <RedditOutlined className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-gray-400 hover:text-white">Browse Anime</Link></li>
              <li><Link to="/recommend" className="text-gray-400 hover:text-white">Get Recommendations</Link></li>
              <li><Link to="/trending" className="text-gray-400 hover:text-white">Trending</Link></li>
              <li><Link to="/genres" className="text-gray-400 hover:text-white">Genres</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Jikan API</a></li>
              <li><a href="https://myanimelist.net/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">MyAnimeList</a></li>
              <li><a href="https://anilist.co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">AniList</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/dmca" className="text-gray-400 hover:text-white">DMCA</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <Divider className="bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Text className="text-gray-400">
            © {currentYear} AnimeRec. All rights reserved.
          </Text>
          <Text className="text-gray-500 text-sm mt-4 md:mt-0">
            Data provided by <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Jikan API</a>
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
