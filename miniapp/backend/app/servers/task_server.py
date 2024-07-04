import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..handlers.task_handlers import TaskHandler

class TaskServer:
    def __init__(self):
        self.app = FastAPI()
        self.handler = TaskHandler()

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

        self.app.get("/tryDoTask/{user_id}/{task_in_db}/{task_price}")(self.do_task)

    async def do_task(self, user_id: int, task_in_db: str, task_price: int):
        result = await self.handler.try_do_task(user_id, task_in_db, task_price)
        return result

    def run(self):
        uvicorn.run(self.app, host="0.0.0.0", port=9001)
