import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { Space, Table, Tag, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import api from '../../services/api';

function LogsContainer({ token }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex, fieldText) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${fieldText}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : null,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
  });

  const tagColors = {
    type: 'blue',
    process: 'red',
    chat_id: 'magenta',
  };

  const logsColumn = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 120,
      render: (timestamp) => dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss'),
      sorter: (a) => dayjs(a.timestamp).unix(),
      sortDirections: ['descend'],
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 80,
      render: (level) =>
        level === 'error' ? (
          <span style={{ color: 'red' }}>{level}</span>
        ) : (
          level
        ),
      filters: [
        {
          text: 'Info',
          value: 'info',
        },
        {
          text: 'Error',
          value: 'error',
        },
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
      filterMultiple: false,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ...getColumnSearchProps('message', 'Message'),
    },
    {
      title: 'Meta',
      dataIndex: 'meta',
      key: 'meta',
      width: 250,
      render: (item) =>
        Object.keys(item).map((key) => (
          <Tag color={tagColors[key]}>{item[key]}</Tag>
        )),
      filters: [
        {
          text: 'Notification',
          value: 'notification',
        },
        {
          text: 'Bot',
          value: 'bot',
        },
        {
          text: 'Scrapper',
          value: 'scrapper',
        },
      ],
      onFilter: (value, record) => {
        let filtered = false;
        Object.keys(record.meta).forEach((r) => {
          if (record.meta[r].toString().toLowerCase() === value.toLowerCase())
            filtered = true;
        });
        return filtered;
      },
      filterMultiple: false,
    },
  ];

  useEffect(() => {
    async function getLogs() {
      const response = await api.post('/admin/logs', null, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      setLogs(response.data);
      setLoading(false);
    }

    if (token) {
      getLogs();
    }
  }, [token]);

  return <Table loading={loading} dataSource={logs} columns={logsColumn} />;
}

export default LogsContainer;
