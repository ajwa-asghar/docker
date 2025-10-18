# Use Python 3.11 slim image as base
# Slim images are smaller and more secure (fewer packages)
FROM python:3.11-slim

# Set working directory inside the container
# This is where our application code will live
WORKDIR /app

# Copy requirements.txt first (Docker layer caching optimization)
# This allows Docker to cache the pip install step if requirements don't change
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir reduces image size by not storing pip cache
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of our application code
# This comes after pip install to leverage Docker layer caching
COPY . .

# Expose port 8000 to the host
# This tells Docker which port the container will listen on
EXPOSE 8000

# Set the default command to run when container starts
# uvicorn is the ASGI server that will run our FastAPI app
# --host 0.0.0.0 allows connections from outside the container
# --port 8000 matches the EXPOSE directive
# --reload enables auto-reload during development (remove in production)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
