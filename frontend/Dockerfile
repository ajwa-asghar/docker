# Use Node.js 18 Alpine image as base
# Alpine images are very small and secure
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# This allows Docker to cache the npm install step if dependencies don't change
COPY package*.json ./

# Install dependencies
# --silent reduces output noise during build
RUN npm install --silent

# Copy the rest of our application code
# This comes after npm install to leverage Docker layer caching
COPY . .

# Expose port 3000 to the host
# This is the default port for React development server
EXPOSE 3000

# Set environment variable for React
# This tells React to accept connections from any host (not just localhost)
# Important for Docker networking
ENV HOST=0.0.0.0

# Start the React development server
# --host 0.0.0.0 allows connections from outside the container
# --port 3000 matches the EXPOSE directive
CMD ["npm", "start"]
