# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code
COPY . .

# Stage 2: Production
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]