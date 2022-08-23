var MarkdownIt = require('markdown-it');
import parse from 'html-react-parser';

const Marked = ({ content }) => {
  MarkdownIt;
  var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });

  return parse(md.render(content));
};

export default Marked;
