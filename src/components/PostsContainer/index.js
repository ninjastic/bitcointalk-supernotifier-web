import React from 'react';
import { Spin } from 'antd';

import { Container } from './style';

import Post from '../Post';

export default function PostsContainer({ posts, loading }) {
  const { length } = posts;

  return (
    <Container>
      <Spin size="large" spinning={loading} style={{ marginTop: 80 }}>
        {posts.length === 0 && loading ? null : (
          <span>
            Showing <strong>{length || 0}</strong>{' '}
            {length === 1 ? 'post' : 'posts'}.{' '}
            {length >= 30 ? 'Scroll down for more.' : null}
          </span>
        )}
        <div style={{ marginTop: 20 }}>
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </Spin>
    </Container>
  );
}
