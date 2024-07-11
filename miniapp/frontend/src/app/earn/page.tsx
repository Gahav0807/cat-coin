import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import "./earn_page_style.css";
import Task from '@/components/task/task';
import BackBtn from '@/components/back-btn/back-btn';
import { useEffect, useState } from "react";

// тестовые данные
const userId=1573555554;

export default function Earn(){
    // const [userId, setUserId] = useState();

    // С помощью апи телеграма берем данные юзера 
    // useEffect(() => {
    //     setUserId(window.Telegram.WebApp.initDataUnsafe.user.id);
    // }, []);

    return(
        <div>
        <BackBtn />
        <div className='message-of-earn'>
            <FontAwesomeIcon icon={faBullhorn} className='bullhorn-icon'/>
            <h1>Subscribe & Earn coins</h1>
        </div>
        <div className='container-of-tasks'>
            <Task task_in_db={'task1'} task_name={"Subsribe on our Telegram channel"} task_price={10000} url_of_btn={'https://www.youtube.com/'} user_id={userId}/>
            <Task task_in_db={'task2'} task_name={"Subsribe on our Telegram channel"} task_price={20000} url_of_btn={'https://fonts.google.com/selection/embed'} user_id={userId}/>
            <Task task_in_db={'task3'} task_name={"Subsribe on our Telegram channel"} task_price={30000} url_of_btn={'https://fonts.google.com/selection/embed'} user_id={userId}/>
            <Task task_in_db={'task4'} task_name={"Subsribe on our Telegram channel"} task_price={40000} url_of_btn={'https://fonts.google.com/selection/embed'} user_id={userId}/>
            <Task task_in_db={'task5'} task_name={"Subsribe on our Telegram channel"} task_price={50000} url_of_btn={'https://fonts.google.com/selection/embed'} user_id={userId}/>
        </div>
        </div>
    )
}