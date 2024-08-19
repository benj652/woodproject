# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder

# Set working directory to /app/frontend
WORKDIR /app/frontend

# Copy the frontend source code into the container
COPY frontend/package*.json ./
COPY frontend/ ./

# Install Node.js dependencies and build the React app
RUN npm install
RUN npm run build

# Stage 2: Build Flask Backend with Gunicorn
FROM python:3.10-slim AS backend

# Set working directory to /app/backend
WORKDIR /app/backend

# Copy the backend source code into the container
COPY backend/ ./

# Copy the built React app from the frontend stage
# Copy the built React app to the location expected by server.py
COPY --from=frontend-builder /app/frontend/dist /app/backend/../frontend/dist

# Define a volume to persist the SQLite database
VOLUME /app/backend/db

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the Flask app
EXPOSE 8000

# Command to run the app with Gunicorn on WSGI
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8000", "wsgi:app"]
