import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({ language, value }) {
  return (
    <div className="max-w-2xl mx-auto">
      <SyntaxHighlighter language={language} style={docco}>
      {value}
      </SyntaxHighlighter>
    </div>
  )
}
