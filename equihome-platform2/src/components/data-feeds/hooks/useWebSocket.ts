import { useState, useEffect, useCallback } from 'react';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseWebSocketReturn {
  lastMessage: string | null;
  sendMessage: (message: string) => void;
  connectionStatus: ConnectionStatus;
}

const useWebSocket = (url: string): UseWebSocketReturn => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('connected');
      
      // Subscribe to all data channels
      socket.send(JSON.stringify({
        type: 'subscribe',
        channels: ['property-updates', 'market-updates', 'infrastructure-updates']
      }));
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      setLastMessage(event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };

    setWs(socket);

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [url]);

  // Send message function
  const sendMessage = useCallback((message: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }, [ws]);

  // Heartbeat to keep connection alive
  useEffect(() => {
    if (!ws) return;

    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [ws]);

  // Reconnection logic
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      const timeout = setTimeout(() => {
        console.log('Attempting to reconnect...');
        setWs(new WebSocket(url));
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [connectionStatus, url]);

  return {
    lastMessage,
    sendMessage,
    connectionStatus
  };
};

export default useWebSocket; 