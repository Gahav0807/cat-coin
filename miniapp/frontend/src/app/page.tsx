"use client";
import React, { useState, useEffect } from 'react';
import './clicker_page_style.css';
import ProgressBar from '@/components/progress-bar/progress-bar';
import { Toaster, toast } from "sonner";

const userId = 1573326142;
const username = 'Vlad';

const Home = () => {
  const [balance, setBalance] = useState(null); // Изначально баланс равен null
  const [limitClicks, setLimitClicks] = useState(null); // Изначально лимит равен null
  const [newClicks, setNewClicks] = useState(0);
  // const [userId, setUserId] = useState();
  // const [username, setUsername] = useState();

  useEffect(() => {
    // setUserId(window.Telegram.WebApp.initDataUnsafe.user.id);
    // setUsername(window.Telegram.WebApp.initDataUnsafe.user.username);

    const getInfoFromDB = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/getInfo/${userId}/${username}`);
        const data = await response.json();

        setBalance(data.wallet);
        setLimitClicks(data.limit_clicks);
      } catch (error) {
        console.error(error);
      }
    };

    getInfoFromDB();
  }, []);

  // Только после загрузки данных будет добавлен обработчик на выход из приложения
  useEffect(() => {
    if (balance !== null && limitClicks !== null) {
      const handleUnload = () => {
        updateInfoInDB(newClicks, balance, limitClicks);
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [balance, limitClicks]);

  const updateInfoInDB = async (newClicks, updatedBalance, updatedLimitClicks) => {
    try {
      const response = await fetch(`http://127.0.0.1:9000/updateInfo/${userId}/${username}/${newClicks}/${updatedBalance}/${updatedLimitClicks}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (limitClicks === null || limitClicks === 0) {
      toast.error("Limit! Come back tomorrow");
      return; // Если данные еще не загружены или лимит исчерпан, завершаем функцию
    }

    setNewClicks(prevNewClciks => prevNewClciks + 1);
    setBalance(prevBalance => prevBalance + 1);

    setLimitClicks(prevLimitClicks => prevLimitClicks - 1);
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='main-block'>
        <div className='wallet-info'>
          <p className='text-your-balance'>Your balance</p>
          <p className='balance'>{balance !== null ? balance : 'Loading...'}</p>
        </div>
        <button className='main-btn' onClick={handleClick}>
          <img src='./cat_coin.png' alt='Монета' />
        </button>
        <ProgressBar progress={limitClicks !== null ? limitClicks : 0} />
      </div>
    </div>
  );
};

export default Home;
