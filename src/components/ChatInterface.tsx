import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Send, X, MinusCircle, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatInterface.css';

interface ChatOption {
  id: string;
  label: string;
  next?: string;
  action?: string;
  response?: string;
  link?: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  options?: ChatOption[];
  action?: string;
  link?: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, isMinimized, onToggleMinimize, isExpanded = false, onToggleExpand }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection with cache busting
    const timestamp = Date.now();
    console.log(`🔄 Attempting to connect to Socket.IO server... [${timestamp}]`);
    const socket = io('http://localhost:5001', {
      forceNew: true,
      transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket.IO connected successfully!');
      setIsConnected(true);
      socket.emit('join-chat', userId);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Chào bạn! Tôi là trợ lý ảo của LOTTE Finance, bạn có thể cho tôi biết tôi có thể giúp gì cho bạn hôm nay không ạ?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        options: [
          {
            id: "1",
            label: "Tư vấn đăng ký khoản vay tín chấp"
          },
          {
            id: "2", 
            label: "Tư vấn mở thẻ tín dụng"
          },
          {
            id: "3",
            label: "Tư vấn đăng ký sản phẩm khác (Vay ô tô, Trả góp Y tế/Giáo dục, Mua trước trả sau)"
          }
        ]
      };
      setMessages([welcomeMessage]);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket.IO disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error: any) => {
      console.error('❌ Socket.IO connection error:', error);
      setIsConnected(false);
    });

    socket.on('receive-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (messageText?: string) => {
    const messageToSend = messageText || inputMessage;
    if (!messageToSend.trim() || !isConnected) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Emit message through socket
    socketRef.current?.emit('send-message', {
      userId,
      message: messageToSend,
      timestamp: userMessage.timestamp
    });

    if (!messageText) {
      setInputMessage('');
    }
  };

  const handleQuickResponse = (option: ChatOption) => {
    // Handle different option types
    if (option.link) {
      window.open(option.link, '_blank');
    } else if (option.action) {
      handleAction(option.action);
    } else {
      sendMessage(option.label);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'call_1900633070':
        window.open('tel:1900633070');
        break;
      case 'redirect_to_promo_page':
        window.open('https://lottefinance.vn/promotions', '_blank');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isMinimized) {
    return (
      <div className="chat-minimized" onClick={onToggleMinimize}>
        <div className="chat-minimized-content">
          <span>💬 Lotte Finance Chat</span>
          <button className="close-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-interface ${isExpanded ? 'expanded' : ''}`}>
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">🏦</div>
          <div className="chat-title">
            <h3>Lotte Finance Assistant</h3>
            <span className={`status ${isConnected ? 'online' : 'offline'}`}>
              {isConnected ? 'Online' : 'Connecting...'}
            </span>
          </div>
        </div>
        <div className="chat-controls">
          {onToggleExpand && (
            <button className="control-button" onClick={onToggleExpand} title={isExpanded ? "Minimize" : "Expand"}>
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          )}
          <button className="control-button" onClick={onToggleMinimize} title="Minimize">
            <MinusCircle size={20} />
          </button>
          <button className="control-button" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <div className="message-text">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
              <span className="message-time">{formatTime(message.timestamp)}</span>
              {message.options && message.sender === 'bot' && (
                <div className="quick-responses">
                  {message.options.map((option, index) => (
                    <button
                      key={option.id || index}
                      className={`quick-response-btn ${option.link ? 'link-btn' : ''} ${option.action ? 'action-btn' : ''}`}
                      onClick={() => handleQuickResponse(option)}
                      title={option.link ? 'Mở liên kết' : option.action ? 'Thực hiện hành động' : 'Chọn tùy chọn này'}
                    >
                      {option.link && '🔗 '}
                      {option.action === 'call_1900633070' && '📞 '}
                      {option.action === 'redirect_to_promo_page' && '🎁 '}
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              
              {message.link && message.sender === 'bot' && (
                <div className="message-link">
                  <a href={message.link} target="_blank" rel="noopener noreferrer" className="external-link">
                    🔗 Mở liên kết
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={!isConnected}
            rows={1}
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || !isConnected}
            className="send-button"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="chat-disclaimer">
          <small>This chat is secured and your information is protected.</small>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;