import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PageMenuContainer, PageMenu } from './styles';

function Header() {
  const { pathname } = useLocation();

  return (
    <PageMenuContainer>
      <PageMenu mode="horizontal" selectedKeys={[pathname]}>
        <PageMenu.Item key="/">
          <Link to="/">Post Archive</Link>
        </PageMenu.Item>
        <PageMenu.Item key="/addresses">
          <Link to="/addresses">Addresses</Link>
        </PageMenu.Item>
      </PageMenu>
    </PageMenuContainer>
  );
}

export default Header;
