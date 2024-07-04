import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..handlers.top_handlers import TopHandler

class TopServer:
    def __init__(self):
        self.app = FastAPI()
        self.handler = TopHandler()

        self.origins = [
            "http://localhost:3000",
        ]

        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=self.origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        self.app.get("/getTopBalance")(self.get_top_balance)
        self.app.get("/getTopMonth")(self.get_top_month)
        self.app.get("/getTopDay")(self.get_top_day)

    async def get_top_balance(self):
        result = await self.handler.get_the_top_balance()
        return result

    async def get_top_month(self):
        result = await self.handler.get_the_top_month()
        return result

    async def get_top_day(self):
        result = await self.handler.get_the_top_day()
        return result

    def run(self):
        uvicorn.run(self.app, host="0.0.0.0", port=9003)
