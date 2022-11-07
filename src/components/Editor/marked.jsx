var MarkdownIt = require('markdown-it');
import parse from 'html-react-parser';
import { sanitize } from 'dompurify';

const Marked = ({ content }) => {
  MarkdownIt;
  var md = new MarkdownIt({});
  return parse(sanitize(md.render(content)));
};

export default Marked;
