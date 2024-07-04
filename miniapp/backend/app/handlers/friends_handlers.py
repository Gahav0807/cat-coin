# from loguru import logger
from ..core.database import Database
from ..... import logger

data=Database()

class FriendsHandler():
    async def get_friends_by_id(self, user_id):
        logger.info("Получаем список друзей")
 
        query=f"SELECT * FROM friends WHERE referent_id = {user_id}"
        result=await data.get_list(query)
 
        return result
 
            
            
        
    