import * as configcat from 'configcat-js';

const logger = configcat.createConsoleLogger(3);

const configCatClient = configcat.createClient(
  process.env.REACT_APP_CONFIGCAT_API_KEY,
  { logger }
);

export default configCatClient;
