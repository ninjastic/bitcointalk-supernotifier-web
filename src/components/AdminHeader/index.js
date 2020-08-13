import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../services/history';

import { PageMenuContainer, PageMenu } from './styles';

function AdminHeader({ authenticated }) {
  function handleLogOut() {
    localStorage.removeItem('@admin-ninjastic/token');
    history.push('/admin/login');
  }

  return (
    <PageMenuContainer>
      <PageMenu mode="horizontal" selectable={false}>
        <PageMenu.Item key="1">
          <Link to="/admin">Admin</Link>
        </PageMenu.Item>
        {authenticated ? (
          <PageMenu.Item
            key="2"
            style={{ float: 'right' }}
            onClick={handleLogOut}
          >
            Log out
          </PageMenu.Item>
        ) : null}
      </PageMenu>
    </PageMenuContainer>
  );
}

export default AdminHeader;
