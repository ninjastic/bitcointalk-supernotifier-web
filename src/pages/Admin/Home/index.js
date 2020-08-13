import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Col,
  Row,
  Card,
  Statistic,
  Table,
  Tag,
  Tabs,
  Skeleton,
  Popover,
  Input,
  Space,
  Button,
} from 'antd';
import {
  HeartOutlined,
  UserOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import AdminHeader from '../../../components/AdminHeader';
import LogsContainer from '../../../components/LogsContainer';

const { Content } = Layout;
const { TabPane } = Tabs;

function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [mentions, setMentions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef();

  useEffect(() => {
    async function getMentions() {
      await api
        .post('/admin/mentions', null, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((response) => {
          setMentions(response.data);
          setLoading(false);
        });
    }

    async function getTopics() {
      await api
        .post('/admin/topics', null, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((response) => {
          setTopics(response.data);
        });
    }

    const storedToken = localStorage.getItem('@admin-ninjastic/token');

    if (!storedToken) {
      toast.error('Please log in to continue.');
      history.push('/admin/login');
    }

    setToken(storedToken);
    setAuthenticated(true);

    if (token) {
      getMentions();
      getTopics();
    }
  }, [token]);

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

  const mentionColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend'],
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      render: (username, { uid }) => {
        const popDiv = (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>UID: {uid || 'None'}</span>
          </div>
        );
        return (
          <Popover content={popDiv} title="Details">
            <a
              href={`https://bitcointalk.org/index.php?action=profile;u=${uid}`}
            >
              {username}
            </a>
          </Popover>
        );
      },
      ...getColumnSearchProps('username', 'Username'),
    },
    {
      title: 'Chat Id',
      dataIndex: 'chat_id',
      key: 'chat_id',
      width: 100,
      ...getColumnSearchProps('chat_id', 'Chat IDd'),
    },
    {
      title: 'Mentions',
      dataIndex: 'enable_mentions',
      key: 'enable_mentions',
      width: 100,
      render: (value) =>
        value ? (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Yes
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="red">
            No
          </Tag>
        ),
      sorter: (a, b) => a.enable_mentions !== b.enable_mentions,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Merits',
      dataIndex: 'enable_merits',
      key: 'enable_merits',
      width: 100,
      render: (value) =>
        value ? (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Yes
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="red">
            No
          </Tag>
        ),
      sorter: (a, b) => a.enable_merits !== b.enable_merits,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      width: 100,
      ...getColumnSearchProps('language', 'Language'),
    },
    {
      title: 'Alt Username',
      dataIndex: 'alt_username',
      key: 'alt_username',
      width: 100,
      render: (value) => value,
      ...getColumnSearchProps('alt_username', 'Alt Username'),
    },
  ];

  const topicColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (value) => (
        <a href={`https://bitcointalk.org/index.php?topic=${value}`}>{value}</a>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ...getColumnSearchProps('title', 'Title'),
    },
    {
      title: 'Tracking',
      dataIndex: 'tracking',
      key: 'tracking',
      width: 200,
      render: (values) =>
        values.map(({ chat_id, username, uid }) => {
          const popDiv = (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Chat ID: {chat_id}</span>
              <span>UID: {uid || 'None'}</span>
            </div>
          );
          return (
            <Popover content={popDiv} title="Details">
              <Tag>{username}</Tag>
            </Popover>
          );
        }),
    },
  ];

  return (
    <>
      <AdminHeader authenticated={authenticated} />
      <Layout>
        <Content
          style={{
            maxWidth: 1000,
            padding: '30px 4px',
            width: '100%',
            margin: 'auto',
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                {loading ? (
                  <Skeleton paragraph={{ rows: 2 }} title={false} />
                ) : (
                  <Statistic
                    title="Status"
                    precision={0}
                    prefix={<HeartOutlined />}
                    value={mentions ? 'Online' : 'Offline'}
                  />
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                {loading ? (
                  <Skeleton paragraph={{ rows: 2 }} title={false} />
                ) : (
                  <Statistic
                    title="Users"
                    precision={0}
                    prefix={<UserOutlined />}
                    value={mentions.count}
                  />
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                {loading ? (
                  <Skeleton paragraph={{ rows: 2 }} title={false} />
                ) : (
                  <Statistic
                    title="Tracked Topics"
                    value={topics.length}
                    precision={0}
                    prefix={<SolutionOutlined />}
                  />
                )}
              </Card>
            </Col>
          </Row>
          <div style={{ marginTop: 24 }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Mentions" key="1">
                <Table
                  columns={mentionColumns}
                  loading={loading}
                  dataSource={mentions.rows}
                />
              </TabPane>
              <TabPane tab="Topics" key="2">
                <Table
                  columns={topicColumns}
                  loading={loading}
                  dataSource={topics}
                />
              </TabPane>
              <TabPane tab="Logs" key="3">
                <LogsContainer token={token} />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Home;
