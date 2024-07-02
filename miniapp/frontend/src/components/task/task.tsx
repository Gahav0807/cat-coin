'use client'
import './task.css';

export default function Task({task_in_db,task_name, task_price, url_of_btn, user_id}){

    const tryDoTask = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:9001/tryDoTask/${user_id}/${task_in_db}/${task_price}`);
          const data = await response.json();
        } catch (error) {
          console.error(error);
        }
      };

    const handleButtonClick = () => {
        tryDoTask(); // Вызов функции tryDoTask при нажатии на кнопку
    };

    return(
        <div className='task'>
            <p className='task-name'>{task_name}</p> 
            <p className='task-price'>{task_price}</p>
            <button className='claim-btn' onClick={handleButtonClick}>
                <a href={url_of_btn}>Join</a>
            </button>
        </div>
    )
}