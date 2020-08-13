import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { List } from 'antd';

export const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
  background: #fff;
`;

export const Scroll = styled(InfiniteScroll)``;

export const LogsList = styled(List)``;
