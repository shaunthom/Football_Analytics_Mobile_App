# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install FastAPI, Uvicorn, and httpx
RUN pip install fastapi[all] httpx uvicorn

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the FastAPI application when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
