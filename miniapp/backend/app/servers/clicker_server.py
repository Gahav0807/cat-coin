import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..handlers.clicker_handlers import ClickerHandler

class ClickerServer:
    def __init__(self):
        self.app = FastAPI()
        self.handler = ClickerHandler()

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

        self.app.get("/getInfo/{user_id}/{username}")(self.get_info)
        self.app.get("/updateInfo/{user_id}/{username}/{new_clicks}/{balance}/{limit_clicks}")(self.update_info)

    async def get_info(self, user_id: int, username: str):
        result = await self.handler.get_info_by_user_id(user_id, username)
        result_json = {
            "user_id": result["user_id"],
            "wallet": result["wallet"],
            "limit_clicks": result["limit_clicks"]
        }
        return result_json

    async def update_info(self, user_id: int, username: str, new_clicks: int, balance: int, limit_clicks: int):
        await self.handler.update_info_by_user_id(user_id, username, new_clicks, balance, limit_clicks)

    def run(self):
        uvicorn.run(self.app, host="0.0.0.0", port=9000)
