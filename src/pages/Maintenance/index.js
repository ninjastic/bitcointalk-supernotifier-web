import React from 'react';
import { Result } from 'antd';

import Header from '../../components/Header';

export default function Maintenance() {
  return (
    <div>
      <Header />
      <Result
        status="403"
        title="Maintenance"
        subTitle="The website is in maintenance mode right now. Try again later."
      />
    </div>
  );
}
