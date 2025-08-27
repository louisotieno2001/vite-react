import React from 'react';

interface CodeBlockProps {
  htmlContent: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ htmlContent }) => {
  if (!htmlContent) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <p>No code available to display.</p>
      </div>
    );
  }

  return (
    <div
      className="code-block-wrapper"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default CodeBlock;
