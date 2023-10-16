import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function MarkdownTest({ text }) {
  return (
    <div>
      <ReactMarkdown children={text} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} />
    </div>
  );
}

export default MarkdownTest;
