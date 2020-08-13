import React from 'react';
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Collapse, Input, Button, Popover, Switch } from 'antd';

import TagsSelector from '../TagsSelector';

const { Panel } = Collapse;

function AddressesSearch({
  selectedTags,
  searchAddress,
  searchUsername,
  onSearchAddress,
  onSearchUsername,
  onShowOnlyMultiples,
  onChangeTags,
  onHandleSearch,
  loading,
}) {
  return (
    <Collapse style={{ marginBottom: 12 }} defaultActiveKey={['searchAddress']}>
      <Panel header="Search Options" key="searchAddress">
        <Input
          size="large"
          placeholder="Address"
          style={{ marginBottom: 10 }}
          value={searchAddress}
          onChange={(e) => onSearchAddress(e.target.value)}
          onPressEnter={onHandleSearch}
          disabled={selectedTags.length}
        />
        <Input
          size="large"
          placeholder="Username"
          style={{ marginBottom: 10 }}
          value={searchUsername}
          onChange={(e) => onSearchUsername(e.target.value)}
          onPressEnter={onHandleSearch}
        />
        <TagsSelector onChangeTags={onChangeTags} allowClear />
        <div style={{ marginBottom: 10 }}>
          <Switch onChange={onShowOnlyMultiples} />
          <span style={{ marginLeft: 5, marginRight: 5 }}>
            Only Multiple Entries
          </span>
          <Popover content="Shows only addresses which were mentioned in two or more different posts.">
            <InfoCircleOutlined />
          </Popover>
        </div>

        <Button
          size="large"
          type="primary"
          loading={loading}
          icon={<SearchOutlined />}
          onClick={onHandleSearch}
        >
          Search
        </Button>
      </Panel>
    </Collapse>
  );
}

export default AddressesSearch;
