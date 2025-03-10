on run
	tell application "Terminal"
		activate
		
		-- Get the script's directory
		set scriptPath to POSIX path of ((path to me as text) & "::")
		
		-- Create a new terminal window and run the setup script
		do script "cd " & quoted form of scriptPath & " && ./setup.sh"
		
		-- Activate Terminal to bring it to front
		activate
	end tell
end run 