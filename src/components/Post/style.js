import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.colors.cardBackground};
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.cardBorderColor};
  padding: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  padding: 20px 24px;
  margin-top: 16px;
  background: ${(props) => props.theme.colors.cardBackground};
`;
