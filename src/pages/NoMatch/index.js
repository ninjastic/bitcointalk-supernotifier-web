import React from 'react';
import { Result, Button } from 'antd';
import history from '../../services/history';

import Header from '../../components/Header';

export default function NoMatch() {
  return (
    <div>
      <Header />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
