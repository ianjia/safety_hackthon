import { useState} from "react"
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";
import ImageMagic from "./components/ImageMagic";

interface ChatData {
  role: string,
  content: string,
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const textOptions: string[] = [
      "What are typical community safety issues?",
      "What are the solutions for community drug problem?",
      "Are there any initiatives or programs aimed at promoting traffic safety within the community?",
      "What can we do to help improve community safety?"
  ];

  const sampleText = () => {
    setValue("");
    const randomValue = textOptions[Math.floor(Math.random() * textOptions.length)]
    setValue(randomValue);
}

  const getQuery = async () => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }

      const response = await fetch("http://localhost:8000/completions", options);
      const data: ChatData = await response.json();
      console.log(data);
      const userMessage = {
        role: "user",
        content: value
      }
      setChat(oldChat => [...oldChat, data, userMessage]);
    }
    catch (error) {
      console.error(error);
    }
  }
  
  const clearChat = () => {
    setValue("");
    setChat([]);
  }

  const filteredUserMessages = chat.filter(message => message.role === "user");
  const latestCode = chat.filter(message => message.role === "assistant").pop();

  return (
    <div className="app">
      <div className="topPane">
        <span> Ask Me Anything - </span> 
        <span className="aipower"> AI Powered </span> 
        Commumity Safety Tool
      </div>
      <div className="contentPane">
        <div className="leftPane">
          <div className="leftPaneButtonWrapper">
            <button className = "leftPaneButton" onClick={sampleText}> Try some sample questions 
            </button>
        </div>
          <MessagesDisplay userMessages={filteredUserMessages}/>
          <input value={value} onChange={e => setValue(e.target.value)}/>
          <CodeDisplay text={latestCode?.content || ""}/>
          <div className="button-container">
            <button id="submit" onClick={getQuery}>Submit</button>
            <button id="clear" onClick={clearChat}>Clear</button>
          </div>
        </div>
        <div className="rightPane">
          <ImageMagic/>
        </div>
      </div>
    </div>
  );
}

export default App;