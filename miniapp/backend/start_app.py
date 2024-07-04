import asyncio
from  .app.core.database import Database
from .app.servers.clicker_server import ClickerServer
from .app.servers.friends_server import FriendsServer
from .app.servers.task_server import TaskServer
from .app.servers.top_server import TopServer
from ... import logger

data = Database()

async def start_app():
    """
    Запускает все четыре сервера параллельно.
    """
    try:
        logger.info("Старт всех серверов...")

        # Создаем экземпляры серверов
        clicker_server = ClickerServer()
        friends_server = FriendsServer()
        task_server = TaskServer()
        top_server = TopServer()

        # Запускаем все сервера параллельно
        asyncio.gather(
            clicker_server.run(),
            friends_server.run(),
            task_server.run(),
            top_server.run()
        )

    except KeyboardInterrupt:
        logger.warning("Сервера остановлены")
    except Exception as e:
        logger.error("Ошибка при старте серверов: %s", e)
    finally:
        await data.close_connection()

