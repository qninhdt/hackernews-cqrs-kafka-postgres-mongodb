FROM python:3.12-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code and .env file
COPY . .

# Expose the port defined in the environment variable
EXPOSE ${AUTH_SERVICE_PORT}

CMD ["python", "main.py"]
