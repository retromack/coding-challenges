from typing import Union
from datetime import datetime
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "status": "ok",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
