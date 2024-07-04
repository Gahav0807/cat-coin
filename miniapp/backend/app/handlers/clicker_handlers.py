from ..core.database import Database
from ..... import logger

data=Database()

class ClickerHandler():
    async def get_info_by_user_id(self, user_id, username):
            try:
                logger.info("Получаем инфу про пользователя из бд(clicker)")
        
                result = await data.get_data(
                    f"SELECT * FROM main WHERE user_id = {user_id}"
                    )
                
                if result:
                    logger.info("Пользователь уже есть, отправляем данные")
        
                    return result[0]
                else:
                    logger.info("Пользователя нет, заносим в бд, отправляем базовые значения")
        
                    # Пользователь не найден, добавляем его в базу данных с балансом 0 и лимитом кликов 6000
                    await data.set_data(
                        f"INSERT INTO main (user_id, username, wallet, limit_clicks) VALUES ({user_id}, '{username}', 0, 6000)"
                    )
                    # Возвращаем информацию о пользователе
                    return {"user_id": user_id, "wallet": 0, "limit_clicks": 6000}
                
            except Exception as e:
                 logger.error(f"Ошибка при получении информации о пользователе: {e}")
    
            
    async def update_info_by_user_id(self,user_id, username, new_clicks,wallet, limit_clicks):
        try:
            logger.info("Обновляем инфу пользователя в бд.main")
        
            #Обновление баланса юзера
            await data.set_data(
            f"UPDATE main SET wallet = {wallet}, limit_clicks = {limit_clicks} WHERE user_id = {user_id}"
        )
        
            logger.info("Проверяем, есть ли пользователь в бд.clicks_od_day && clicks_of_month")
        
            # Проверка, есть ли юзер в таблицах,связанных с топом игроков
            is_exist = await data.get_data(
                f"SELECT * FROM clicks_of_day,clicks_of_month WHERE clicks_of_day.user_id = {user_id} AND clicks_of_month.user_id = {user_id}"
                )
        
            # Есть
            if is_exist:
                logger.info("Есть. Обновляем данные")
        
                await data.set_data(
                    f"UPDATE clicks_of_day SET clicks = clicks + {new_clicks} WHERE user_id = {user_id}"
                    )
                
                await data.set_data(
                    f"UPDATE clicks_of_month SET clicks = clicks + {new_clicks} WHERE user_id = {user_id}"
                    )
                
            # Нету
            else:
                logger.info("Нету.Добавляем, заносим полученные данные")
        
                await data.set_data(
                f"INSERT INTO clicks_of_day (user_id, username, clicks) VALUES ({user_id}, '{username}',{new_clicks})"
                )
                await data.set_data(
                f"INSERT INTO clicks_of_month (user_id, username, clicks) VALUES ({user_id}, '{username}', {new_clicks})"
                )         
                        
        except Exception as e:
            logger.error(f"Ошибка при обновлении информации о пользователе: {e}")