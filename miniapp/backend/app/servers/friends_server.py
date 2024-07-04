import uvicorn
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..handlers.friends_handlers import FriendsHandler

class FriendsServer:
    def __init__(self):
        self.app = FastAPI()
        self.handler = FriendsHandler()

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

        self.app.get("/getFriends/{user_id}")(self.get_friends)

    async def get_friends(self, user_id: int):
        result = await self.handler.get_friends_by_id(user_id)
        return result

    def run(self):
        uvicorn.run(self.app, host="0.0.0.0", port=9002)

  