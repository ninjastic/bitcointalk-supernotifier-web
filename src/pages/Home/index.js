import React, { useEffect, useState } from 'react';
import { Button, Space, Spin, Input, DatePicker, Form, BackTop } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useParams, useLocation } from 'react-router-dom';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import utc from 'dayjs/plugin/utc';

import Header from '../../components/Header';
import PostsContainer from '../../components/PostsContainer';

import { Container } from './style';

import history from '../../services/history';
import api from '../../services/api';

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(dayjsPluginUTC);

export default function Home({ location }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const { id, topicId } = useParams();

  const query = useQuery();
  const author = query.get('author');
  const topic = query.get('topic') || topicId;

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(0);
  const [searchAuthor, setSearchAuthor] = useState(author);
  const [searchTopic, setSearchTopic] = useState(topic);
  const [textSearch, setTextSearch] = useState('');
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  async function fetchPosts(reset, loadMore) {
    if (loadMore && lastPost === -1) return;
    if (loadMore && loadingMore) return;
    if (!loadMore) setLoading(true);
    if (loadMore) setLoadingMore(true);

    let specificPost = false;

    try {
      const limit = 30;

      const params = {
        limit,
        startId: reset || lastPost === -1 ? 0 : lastPost,
        from: timeStart
          ? dayjs(timeStart).format('YYYY-MM-DDTHH:mm:ss.000')
          : dayjs().subtract(10, 'year').format('YYYY-MM-DDTHH:mm:ss.000'),
        to: timeEnd
          ? dayjs(timeEnd).add(59, 'second').format('YYYY-MM-DDTHH:mm:ss.000')
          : dayjs().add(10, 'year').format('YYYY-MM-DDTHH:mm:ss.000'),
      };

      if (searchAuthor) params.author = searchAuthor;
      if (searchTopic) params.topic = searchTopic;
      if (textSearch) params.content = textSearch;

      if (id && !Number.isNaN(Number(id))) {
        params.id = id;
        specificPost = true;
      } else if (id && Number.isNaN(Number(id))) {
        toast.error(`Invalid post ID: ${id}`);
        history.push('/');
      }

      const response = await api.get('posts', {
        params,
      });

      setPosts(
        reset || specificPost || posts.length <= 1
          ? response.data.rows
          : [...posts, ...response.data.rows]
      );
      setLastPost(response.data.last || 0);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error(
          'You are making too many requests... try again in 1 minute.'
        );
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function searchPosts(e) {
    if (e.target.type === 'text' && e.key !== 'Enter') {
      return;
    }

    if (location.pathname === '/') {
      fetchPosts(true);
    } else {
      history.push('/');
    }
  }

  async function handleTimeRange(date) {
    setTimeStart(date ? date[0] : null);
    setTimeEnd(date ? date[1] : null);
  }

  async function handleScrollEnd() {
    if (!loading && !loadingMore) {
      fetchPosts(false, true);
    }
  }

  useBottomScrollListener(handleScrollEnd);

  return (
    <>
      <Header />
      <Container>
        <div>
          <Form layout="vertical">
            <Form.Item label="Author">
              <Input
                size="large"
                placeholder="TryNinja"
                onChange={(e) => setSearchAuthor(e.target.value)}
                onKeyPress={searchPosts}
                value={searchAuthor}
              />
            </Form.Item>
            <Form.Item label="Topic ID">
              <Input
                size="large"
                placeholder="5247023"
                onChange={(e) => setSearchTopic(e.target.value)}
                onKeyPress={searchPosts}
                value={searchTopic}
              />
            </Form.Item>
            <Form.Item label="Text Search">
              <Input
                size="large"
                placeholder="bot"
                onChange={(e) => setTextSearch(e.target.value)}
                onKeyPress={searchPosts}
              />
            </Form.Item>
            <Form.Item label="Date Range">
              <RangePicker showTime size="large" onChange={handleTimeRange} />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              loading={loading}
              icon={<SearchOutlined />}
              onClick={searchPosts}
            >
              Search
            </Button>
          </Form>
        </div>
        <PostsContainer posts={posts} loading={loading} />
        {loadingMore ? (
          <Space>
            <Spin size="large" style={{ width: '100%', alignSelf: 'center' }} />
          </Space>
        ) : null}
        <BackTop />
      </Container>
    </>
  );
}
