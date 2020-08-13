import React, { useState, useEffect } from 'react';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Skeleton, Col, Popover, Collapse, Space } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AddressCard } from './styles';

import AddTag from '../AddTag';
import TagsList from '../TagsList';

const { Panel } = Collapse;

function AddressesList({ loading, addresses }) {
  const [copied, setCopied] = useState([]);
  const [tags, setTags] = useState(
    JSON.parse(localStorage.getItem('@ninjastic/tags')) || []
  );

  useEffect(() => {
    localStorage.setItem('@ninjastic/tags', JSON.stringify(tags));
  }, [tags]);

  const handleAddTag = ({ value, id }) => {
    if (!value.trim()) return;
    const index = tags.findIndex((tag) => tag.id === id);
    const current = [...tags];

    if (index === -1) {
      current.push({ id, tags: [value] });
    } else {
      current[index].tags.push(value);
    }

    setTags(current);
  };

  const handleDeleteTag = ({ id, value }) => {
    const tagIndex = tags.findIndex((tag) => tag.id === id);

    const current = [...tags];
    const valueIndex = current[tagIndex].tags.indexOf(value);

    current[tagIndex].tags.splice(valueIndex, 1);
    setTags(current);
  };

  const generateTable = ({ data, id }) => {
    let forumPostCode = ``;

    forumPostCode += `[table]\n`;
    forumPostCode += `[tr][td]_________________[/td][td]_____________________________________________[/td][td]_____________________________________________[/td][/tr]\n`;
    forumPostCode += `[tr][td][b]Username[/b][/td][td][b]Posts[/b][/td][td][b]Archive[/b][/td][/tr]\n`;

    data.forEach(({ author, author_uid, posts }) => {
      forumPostCode += `[tr][td]`;
      forumPostCode += author_uid
        ? `[url=/index.php?action=profile;u=${author_uid}]`
        : '';
      forumPostCode += author;
      forumPostCode += author_uid ? '[/url]' : '';
      forumPostCode += `[/td][td]`;

      posts.forEach((post, i, array) => {
        forumPostCode += `[url=/index.php?topic=${post}]${i + 1}[/url]`;
        forumPostCode += array.length - i > 1 ? ', ' : '';
      });

      forumPostCode += '[/td][td]';

      posts.forEach((post, i, array) => {
        const post_id = post.replace(/.*#msg/gi, '');

        forumPostCode += `[url=https://posts.ninjastic.space/post/${post_id}]${
          i + 1
        }[/url]`;
        forumPostCode += array.length - i > 1 ? ', ' : '';
      });

      forumPostCode += '[/td][/tr]\n';
    });

    forumPostCode += `[tr][td][b]Related address:[/b][/td][td][glow=brown,0,0][color=white]${id}[/color][/glow][/td][td]Powered by ninjastic.space[/td][/tr]\n`;
    forumPostCode += '[/table]';

    return <CopyPopover text={forumPostCode} id={id} />;
  };

  const CopyPopover = ({ text, id }) => {
    return (
      <Popover content="Copy BBCode" trigger="hover">
        <CopyToClipboard
          text={text}
          style={{ marginLeft: 5 }}
          onCopy={() => setCopied([...copied, id])}
        >
          {copied.includes(id) ? (
            <CheckOutlined style={{ fontSize: '32px' }} />
          ) : (
            <CopyOutlined style={{ fontSize: '32px' }} />
          )}
        </CopyToClipboard>
      </Popover>
    );
  };

  const EmptyContainer = () =>
    !loading && !addresses.length ? (
      <Col span={12} style={{ marginTop: 5 }}>
        <h3>Nothing to see here...</h3>
      </Col>
    ) : null;

  const AddressesContainer = () =>
    !loading
      ? addresses.map((address) => {
          const { address: id, mentions } = address;

          const organized = [];

          mentions.forEach((mention) => {
            const index = organized.findIndex(
              (o) => o.author === mention.author
            );

            if (index === -1) {
              organized.push({
                author: mention.author,
                author_uid: mention.author_uid,
                posts: [mention.post_url],
              });
            } else {
              organized[index].posts.push(mention.post_url);
            }
          });

          return (
            <Col lg={12} xs={24} key={id}>
              <AddressCard
                title={id}
                loading={false}
                extra={generateTable({ data: organized, id })}
                bodyStyle={{ paddingTop: 12 }}
              >
                <div>
                  <TagsList tags={tags} id={id} onDeleteTag={handleDeleteTag} />
                  <AddTag onAdd={handleAddTag} id={id} />
                </div>
                <Space direction="vertical" style={{ marginTop: 12 }}>
                  <div>
                    {organized.map(({ author, posts }) => {
                      return (
                        <Collapse key={`${id}_${author}`}>
                          <Panel
                            header={`${author} (${posts.length})`}
                            key={author}
                          >
                            {posts.map((post) => {
                              const post_id = post.replace(/.*#msg/g, '');

                              return (
                                <div key={post}>
                                  <a
                                    href={`https://bitcointalk.org/index.php?topic=${post}`}
                                  >
                                    {post_id}
                                  </a>{' '}
                                  <a href={`/post/${post_id}`}>(archive)</a>
                                </div>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </div>
                </Space>
              </AddressCard>
            </Col>
          );
        })
      : [...Array(2)].map(() => {
          return (
            <Col lg={12} xs={24} key={Math.random()}>
              <AddressCard style={{ width: '100%' }}>
                <Skeleton loading={loading} active />
              </AddressCard>
            </Col>
          );
        });

  return (
    <>
      {!loading && !addresses.length ? <EmptyContainer /> : null}
      <AddressesContainer />
    </>
  );
}

export default AddressesList;
