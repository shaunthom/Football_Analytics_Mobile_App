from fastapi import FastAPI, Request, Depends
import httpx

app = FastAPI()

BASE_URL = "http://[2620:cc:8000:e0d:a496:37ac:5f1b:74f5]:8080"


@app.get("/up")
async def up():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/up")
    return response.json()


@app.get("/data/sentiment")
async def sentiment():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/data/sentiment")
    return response.json()


@app.post("/transcribe_file")
async def transcribe_file(request: Request):
    data = await request.json()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{BASE_URL}/transcribe_file", json=data)
    return response.json()


@app.post("/play")
async def play(request: Request):
    data = await request.json()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{BASE_URL}/play", json=data)
    return response.json()


@app.get("/report")
async def report():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/report")
    return response.json()

