import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import "./earn_page_style.css";
import Task from '@/components/task/task';
import BackBtn from '@/components/back-btn/back-btn';
import { ITaskData } from '@/types/items.interface';
import { useEffect, useState } from "react";

export default function EarnPage() {
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const tg_data = window.Telegram.WebApp.initDataUnsafe;
    setUserId(tg_data.user.id);
  }, []);

  let taskData: ITaskData[] = [
    {
      task_in_db: 'task1',
      task_name: "Subscribe on our Telegram channel",
      task_price: 10000,
      url_of_btn: 'https://www.youtube.com/',
      user_id: userId,
    },
    {
      task_in_db: 'task2',
      task_name: "Subscribe on our Telegram channel",
      task_price: 20000,
      url_of_btn: 'https://fonts.google.com/selection/embed',
      user_id: userId,
    },
    {
      task_in_db: 'task3',
      task_name: "Subscribe on our Telegram channel",
      task_price: 30000,
      url_of_btn: 'https://fonts.google.com/selection/embed',
      user_id: userId,
    },
    {
      task_in_db: 'task4',
      task_name: "Subscribe on our Telegram channel",
      task_price: 40000,
      url_of_btn: 'https://fonts.google.com/selection/embed',
      user_id: userId,
    },
    {
      task_in_db: 'task5',
      task_name: "Subscribe on our Telegram channel",
      task_price: 50000,
      url_of_btn: 'https://fonts.google.com/selection/embed',
      user_id: userId,
    },
  ];

  return (
    <div>
      <BackBtn />
      <div className='message-of-earn'>
        <FontAwesomeIcon icon={faBullhorn} className='bullhorn-icon' />
        <h1>Subscribe & Earn coins</h1>
      </div>
      <div className='container-of-tasks'>
        {taskData.map((task, index) => (
          <Task
            key={index}
            task_in_db={task.task_in_db}
            task_name={task.task_name}
            task_price={task.task_price}
            url_of_btn={task.url_of_btn}
            user_id={userId ?? task.user_id}
          />
        ))}
      </div>
    </div>
  );
}
