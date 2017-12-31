import * as React from 'react';
import * as marked from 'marked';
import styled from 'styled-components';

import prism from '../utils/prism';

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  const escapedText = text
    .toLowerCase()
    .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>/g, '')
    .replace(/[^\w]+/g, '-');

  return (
    `
    <h${level}>
      <a class="anchor-link" id="${escapedText}"></a>${text}` +
    `<a class="anchor-link-style" href="#${escapedText}">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M46.9 13.9c-.5-.6-1.2-.94-2.07-.94h-6.67l1.86-8.98c.17-.85 0-1.7-.52-2.3-.48-.6-1.2-.94-2.07-.94-1.6 0-3.2 1.27-3.54 2.93l-.5 2.42c0 .07-.07.13-.07.2l-1.37 6.62H20.7l1.88-8.96c.16-.85 0-1.7-.53-2.3-.48-.6-1.2-.94-2.07-.94-1.65 0-3.2 1.27-3.56 2.93l-.52 2.58v.08l-1.37 6.64H7.3c-1.67 0-3.22 1.3-3.58 2.96-.16.86 0 1.7.52 2.3.48.6 1.2.93 2.07.93h6.97l-2 9.65H4c-1.67 0-3.22 1.27-3.56 2.94-.2.8 0 1.67.5 2.27.5.6 1.2.93 2.08.93H10l-1.84 9.05c-.2.84 0 1.67.52 2.3.5.6 1.25.92 2.08.92 1.66 0 3.2-1.3 3.55-2.94l1.94-9.33h11.22l-1.87 9.05c-.15.84.03 1.67.53 2.3.5.6 1.2.92 2.07.92 1.65 0 3.22-1.3 3.56-2.94l1.9-9.33h7c1.6 0 3.2-1.28 3.53-2.93.2-.87 0-1.7-.52-2.3-.48-.62-1.2-.96-2.05-.96h-6.7l2.02-9.65h6.93c1.67 0 3.22-1.27 3.56-2.92.2-.85 0-1.7-.5-2.3l-.04.03zM17.53 28.77l1.95-9.65H30.7l-1.97 9.66H17.5h.03z"/></g></svg>
      </a></h${level}>
  `
  );
};

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'language-',
  highlight(code: string, lang: string) {
    let language;
    switch (lang) {
      case 'diff':
        language = prism.languages.diff;
        break;

      case 'css':
        language = prism.languages.css;
        break;

      case 'js':
      case 'jsx':
      default:
        language = prism.languages.jsx;
        break;
    }

    return prism.highlight(code, language);
  },
  renderer,
});

//   1: '#2D4059',
//   2: '#EA5455',
//   3: '#F07B3F',
//   4: '#FFD460',

// #525252
// #414141
// #313131
// #EC625F

const Marked = styled.div`
  font-size: 16;
  color: #eee;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 0 8px;
  background-color: #313131;
  & pre, & pre[class*="language-"] {
    margin: 15px 0;
    padding: 12px 18px;
    background-color: #414141;
    border-radius: 3px;
    overflow: auto;
  }
  & code {
    display: inline-block;
    line-height: 1.6;
    font-size: 14px;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    padding: 3px 6px;
    color: #eee;
    background-color: #414141;
    font-size: 14px;
  }
  & p code, & ul code, & pre code {
    font-size: 14px;
    line-height: 1.6;
  }
  & h1 {
    color: #EC625F;
    margin: 0.7em 0;
  }
  & h2 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & h3 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & h4 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & p, & ul, & ol {
    line-height: 1.6;
  }

  & h1, & h2, & h3, & h4 {
    & code {
      font-size: inherit;
      line-height: inherit;
    }
    & .anchor-link-style {
      opacity: 0;
      display: none;
    }

    &:hover .anchor-link-style {
      display: inline-block;
      opacity: 1;
      padding: 0 8px;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        color: #EC625F;
      }
      & svg {
        width: 0.55em;
        height: 0.55em;
        fill: currentColor;
      }
    }
  }

  & a, & a code {
    color: #F07B3F;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export interface MarkdownElementProps {
  text: string;
}

const MarkdownElement = (props: MarkdownElementProps) => {
  const { text } = props;
  return (
    <Marked
      dangerouslySetInnerHTML={{__html: marked(text)}}
    />
  );
};

export default MarkdownElement;
