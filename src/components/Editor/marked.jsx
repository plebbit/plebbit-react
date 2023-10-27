var MarkdownIt = require('markdown-it');
import styles from './editor.module.css';

// import ReactMarkdown from "react-markdown";

import parse from 'html-react-parser';
import { sanitize } from 'dompurify';

const Marked = ({ content }) => {
  MarkdownIt;
  var md = new MarkdownIt('commonmark', {
    breaks: true,
    html: false,
    xhtmlOut: true,
    typographer: true,
    linkify: false,
  }).disable('image');
  return <div className={styles.marked_wrap}>{parse(sanitize(md.render(content)))}</div>;
};

export default Marked;
