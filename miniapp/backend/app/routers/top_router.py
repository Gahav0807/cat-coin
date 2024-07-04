from fastapi import APIRouter
from ..handlers.top_handlers import TopHandler

router = APIRouter()
top_handler = TopHandler()

@router.get("/getTopBalance")
async def get_top_balance():
    result = await top_handler.get_the_top_balance()
    return result

@router.get("/getTopMonth")
async def get_top_month():
    result = await top_handler.get_the_top_month()
    return result

@router.get("/getTopDay")
async def get_top_day():
    result = await top_handler.get_the_top_day()
    return result
