var MarkdownIt = require('markdown-it');

// import ReactMarkdown from "react-markdown";


import parse from 'html-react-parser';
import { sanitize } from 'dompurify';


const Marked = ({ content }) => {
  MarkdownIt;
  var md = new MarkdownIt('commonmark', {
    breaks: true,
    html: true,
    xhtmlOut: true,
    typographer: true,
    linkify: false

  });
  return (parse(sanitize(md.render(content))));
};

export default Marked;







