import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const Container = styled(Content)`
  max-width: 1000px;
  min-height: 280px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 0;
`;
