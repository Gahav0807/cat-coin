from fastapi import APIRouter
from ..handlers.friends_handlers import FriendsHandler

router = APIRouter()
friends_handler = FriendsHandler()

@router.get("/getFriends/{user_id}")
async def get_friends(user_id: int):
    result = await friends_handler.get_friends_by_id(user_id)
    return result
