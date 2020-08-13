import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

const global = createGlobalStyle`

  html,
  body {
    height: 100%;
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Montserrat', sans-serif;
    color: ${(props) => props.theme.colors.textColor};
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }

  body {
    overflow-y: scroll;
  }

  img {
    max-width: 80%;
  }

  button {
    cursor: pointer;
  }

  .post {
    color: ${(props) => props.theme.colors.postTextColor};
    /* background-color: #ecedf3; */
    font-size: 12px;
    font-family: verdana, sans-serif;
    word-wrap: break-word;
    margin-bottom: 5px;
    padding: 5px;
  }

  .code {
    color: ${(props) => props.theme.colors.postTextColor};
    background-color: #fff;
    font-family: 'courier new', 'times new roman', monospace;
    font-size: 12px;
    line-height: 1.3em;
    border: 1px solid ${(props) => props.theme.colors.postTextColor};
    padding: 5px;
    margin: 1px 3px 4px 6px;
    width: 93%;
    white-space: nowrap;
    overflow: auto;
    max-height: 24em;
  }

  .post .quoteheader .codeheader {
    color: #476c8e;
    text-decoration: none;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 1.2em;
    margin-left: 6px;
  }

  .post .quote {
    color: ${(props) => props.theme.colors.postTextColor};
    background-color: ${(props) => props.theme.colors.postBackground};
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 0.2rem;
    padding: 5px;
    margin: 1px 3px 6px 6px;
  }

  .post a,
  .quote a {
    word-break: break-all;
  }

  .ant-space {
    margin-top: 15px;
    padding: 5px 0;
  }

  .ant-space, .ant-space-item {
    width: 100%;
  }

  .ant-menu {
    max-width: 1000px;
  }
`;

export default global;
