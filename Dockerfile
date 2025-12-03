# Use a lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json ./

# Copy sub-project package files (to install dependencies efficiently)
COPY server/package.json ./server/
COPY client/package.json ./client/
COPY simulator/package.json ./simulator/

# Install all dependencies 
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Server 
RUN npm run build --workspace=server

# Build the Client 
RUN npm run build --workspace=client

# Setup permissions for the grader user 
RUN adduser -D appuser && chown -R appuser:appuser /app
RUN chmod +x run_tests.sh
USER appuser

# Entrypoint 
ENTRYPOINT ["./run_tests.sh"]