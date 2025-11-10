import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
    setIsChatMinimized(false);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setIsChatMinimized(false);
    setIsChatExpanded(false);
  };

  const handleToggleMinimize = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const handleToggleExpand = () => {
    setIsChatExpanded(!isChatExpanded);
    if (isChatMinimized) {
      setIsChatMinimized(false); // Un-minimize when expanding
    }
  };

  return (
    <div className="App">
      <LandingPage onStartChat={handleStartChat} />
      
      {showChat && (
        <ChatInterface
          onClose={handleCloseChat}
          isMinimized={isChatMinimized}
          onToggleMinimize={handleToggleMinimize}
          isExpanded={isChatExpanded}
          onToggleExpand={handleToggleExpand}
        />
      )}
    </div>
  );
}

export default App;
