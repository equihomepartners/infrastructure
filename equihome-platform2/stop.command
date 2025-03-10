#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Run the stop script
./stop.sh

# Keep terminal window open for a moment to see the output
echo "Press any key to close this window..."
read -n 1 -s 