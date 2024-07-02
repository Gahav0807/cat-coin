import asyncio
from ... import logger
import threading
from .app.core.database import Database
from miniapp.backend.app.servers.clicker_server import ClickerServer
from miniapp.backend.app.servers.friends_server import FriendsServer
from miniapp.backend.app.servers.task_server import TaskServer
from miniapp.backend.app.servers.top_server import TopServer

data=Database()

def start_app():
    """
        Запускает все четыре сервера в отдельных потоках.
    """
    
    try:
        logger.info("Старт всех серверов...")
    
        # Создаем список потоков
        threads = []
    
        # Запускаем сервер Clicker
        clicker_server = ClickerServer()
        clicker_thread = threading.Thread(target=clicker_server.run)
        clicker_thread.start()
        threads.append(clicker_thread)
    
        # Запускаем сервер Friends
        friends_server = FriendsServer()
        friends_thread = threading.Thread(target=friends_server.run)
        friends_thread.start()
        threads.append(friends_thread)
    
        # Запускаем сервер Task
        task_server = TaskServer()
        task_thread = threading.Thread(target=task_server.run)
        task_thread.start()
        threads.append(task_thread)
    
        # Запускаем сервер Top
        top_server = TopServer()
        top_thread = threading.Thread(target=top_server.run)
        top_thread.start()
        threads.append(top_thread)
    
        # Ждем, пока все потоки не завершатся
        for thread in threads:
            thread.join()

    except KeyboardInterrupt:
        logger.warning("Сервера остановлены")
    except Exception as e:
        logger.error("Ошибка при старте серверов: %s", e)
    finally:
        asyncio.run(data.close_connection)
