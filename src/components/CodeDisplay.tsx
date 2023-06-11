interface CodeDisplayProps {
  text: string
}

const CodeDisplay = ( { text } : CodeDisplayProps) => {
    return (
      <div className="code-display">
        <div className="code-output">
            <p>{text}</p>
        </div>
      </div>
    );
  }
  
  export default CodeDisplay;
  