"""
Simple FastAPI backend application
This will be our backend service that runs on port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI instance
app = FastAPI(title="Docker Learning Backend", version="1.0.0")

# Add CORS middleware to allow frontend to make requests
# This is important when frontend and backend are in different containers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Simple endpoint that returns a JSON message
    This is what our frontend will fetch and display
    """
    return {"message": "Hello from backend"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify the service is running
    """
    return {"status": "healthy", "service": "backend"}

# This will be used when running with uvicorn directly
if __name__ == "__main__":
    import uvicorn
    # Run on host 0.0.0.0 to allow connections from outside the container
    # Port 8000 as specified in requirements
    uvicorn.run(app, host="0.0.0.0", port=8000)
