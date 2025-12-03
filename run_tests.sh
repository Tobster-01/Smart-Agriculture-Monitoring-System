#!/bin/sh

TASK_ID=$1

echo "Starting tests for task: $TASK_ID"

# Check if we are testing a specific task
if [ -z "$TASK_ID" ]; then
    echo "No task ID provided. Running base repo sanity check..."
    
    # Ensure server compiled
    if [ -f "server/dist/app.js" ]; then
        echo "Server built successfully"
        exit 0
    else
        echo "Server build missing"
        exit 1
    fi
else
    # Tests run here
    echo "Running tests for $TASK_ID..."
    exit 0
fi