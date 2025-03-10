const WebSocket = require('ws');

function setupWebSocket(wss) {
  wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send initial heartbeat
    ws.isAlive = true;
    ws.send(JSON.stringify({ type: 'connection', status: 'connected' }));

    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        
        // Handle subscription requests
        if (data.type === 'subscribe') {
          ws.subscriptions = ws.subscriptions || new Set();
          data.channels.forEach(channel => {
            ws.subscriptions.add(channel);
          });
          ws.send(JSON.stringify({
            type: 'subscription',
            status: 'success',
            channels: Array.from(ws.subscriptions)
          }));
        }
        
        // Handle unsubscribe requests
        if (data.type === 'unsubscribe') {
          if (ws.subscriptions) {
            data.channels.forEach(channel => {
              ws.subscriptions.delete(channel);
            });
          }
          ws.send(JSON.stringify({
            type: 'subscription',
            status: 'success',
            channels: Array.from(ws.subscriptions || [])
          }));
        }

        // Handle ping messages
        if (data.type === 'ping') {
          ws.isAlive = true;
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch (error) {
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }));
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('Client disconnected');
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Setup heartbeat interval
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log('Terminating inactive client');
        return ws.terminate();
      }
      
      ws.isAlive = false;
      ws.send(JSON.stringify({ type: 'ping' }));
    });
  }, 30000);

  // Clean up on server close
  wss.on('close', () => {
    clearInterval(interval);
  });
}

module.exports = {
  setupWebSocket
}; 