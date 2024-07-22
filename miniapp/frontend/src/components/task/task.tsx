'use client';
import './task.css';
import { Toaster, toast } from 'sonner';

interface TaskProps {
  task_in_db: string;
  task_name: string;
  task_price: number;
  url_of_btn: string;
  user_id: number | null;
}

export default function Task({
  task_in_db,
  task_name,
  task_price,
  url_of_btn,
  user_id,
}: TaskProps) {
  // Функция посылающая запрос на выполнение таска
  const tryDoTask = async () => {
    if (user_id === null) {
      toast.error('You must be logged in to perform this task.');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:9000/tryDoTask/${user_id}/${task_in_db}/${task_price}`
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
      toast.error('Error on server side!');
    }
  };

  // Вызов функции tryDoTask при нажатии на кнопку
  const handleButtonClick = () => {
    tryDoTask();
  };

  return (
    <div className="task">
      <p className="task-name">{task_name}</p>
      <p className="task-price">{task_price}</p>
      <button className="claim-btn" onClick={handleButtonClick}>
        <a href={url_of_btn}>Join</a>
      </button>
    </div>
  );
}
