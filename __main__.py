"""

lets start this shit

"""

import asyncio

# from .bot.bot import start_bot

from miniapp.backend.start_app import start_app



if __name__ == "main":
    # asyncio.create_task(start_bot())
    asyncio.create_task(start_app())