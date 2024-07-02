# from loguru import logger
from core.database import Database
from ..... import logger

data=Database()

class TopHandler():
    """ --BY BALANCE-- """

    async def get_the_top_balance(self):
        logger.info("Забираем из бд топ игроков по балансу, в диапазоне 1000")
        
        query="SELECT username, user_id, wallet FROM main ORDER BY wallet DESC LIMIT 1000"
        result= await data.get_list(query)
        return result


    """ --BY MONTH-- """

    async def get_the_top_month(self):
        logger.info("Забираем из бд топ игроков месяца, в диапазоне 1000")

        query = "SELECT username,user_id,clicks FROM clicks_of_month ORDER BY clicks DESC LIMIT 1000"
        result= await data.get_list(query)
        return result
                    
                    
    """ --BY DAY-- """

    async def get_the_top_day(self):
        logger.info("Забираем из бд топ игроков дня, в диапазоне 1000")

        query = "SELECT username,user_id,clicks FROM clicks_of_day ORDER BY clicks DESC LIMIT 1000"
        result= await data.get_list(query)
        return result