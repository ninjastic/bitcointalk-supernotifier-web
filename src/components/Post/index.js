import React from 'react';
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Popover, Divider } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Container } from './style';

dayjs.extend(utc);

export default function Post({ data }) {
  const { id, title, author, content_full, link, date } = data;

  const sanitizedContent = sanitizeHtml(content_full, {
    allowedTags: [
      'img',
      'div',
      'a',
      'br',
      'b',
      'span',
      'i',
      'table',
      'tr',
      'td',
      'ul',
      'li',
    ],
    allowedAttributes: {
      img: ['src', 'width', 'height'],
      div: ['quote'],
      a: ['href'],
      span: ['style'],
    },
    allowedClasses: {
      div: ['quote', 'quoteheader', 'code', 'codeheader'],
    },
    allowProtocolRelative: false,
  });

  const formattedDate = dayjs(date).format('DD/MM/YYYY - HH:mm:ss UTC');

  const currentURL = window.location.origin;
  const copyURL = `${currentURL}/post/${id}`;

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header as="h4" style={{ maxWidth: '80%' }}>
          <a href={link}>{title}</a>
        </Header>
        <Popover content="Copy Shareable URL">
          <CopyToClipboard text={copyURL} style={{ marginLeft: 5 }}>
            <CopyOutlined style={{ fontSize: '32px' }} />
          </CopyToClipboard>
        </Popover>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          by <strong>{author}</strong> at <strong>{formattedDate}</strong>
        </span>
        <small>{id}</small>
      </div>
      <Divider />
      <div className="post">{parse(sanitizedContent)}</div>
    </Container>
  );
}
