tell application "Terminal"
    -- Get the directory path
    set projectPath to "/Users/jay/Desktop/Equihome Random/equihome-infrastructure/equihome-platform2"
    
    -- First window: Kill existing processes and start frontend
    do script "clear && echo '🔄 Cleaning up...' && lsof -ti:3001,3007,3008 | xargs kill -9 2>/dev/null || true && echo '🚀 Starting frontend...' && cd " & quoted form of projectPath & " && npm run dev"
    
    -- Wait a bit
    delay 2
    
    -- Second window: Start ML service
    do script "cd " & quoted form of projectPath & "/ml_service && source venv/bin/activate && python3 main.py"
    
    -- Bring Terminal to front
    activate
    
    -- Display completion message
    do script "echo '✅ Setup complete! Services should be available at:'" & return & "echo '   Frontend: http://localhost:3001'" & return & "echo '   Backend: http://localhost:3007'" & return & "echo '   ML Service: http://localhost:3008'" in front window
end tell 