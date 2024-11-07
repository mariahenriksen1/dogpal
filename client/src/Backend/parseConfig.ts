// parseConfig.js
// @ts-ignore
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'R4TSAlLeWGlEtCpohMIcQBAYk1eBnkaCeyDVAoLN';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'bl5RrUyWzji2UJJfPJL5d49PO8ZriqPItvd1DEE9';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


Parse.LiveQuery = undefined;
export default Parse;
