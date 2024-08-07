"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './clicker_page_style.css';
import ProgressBar from '@/components/progress-bar/progress-bar';
import { IUserData } from '@/types/items.interface';
import { Toaster, toast } from "sonner";

export default function ClickerPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [limitClicks, setLimitClicks] = useState<number | null>(null);
  const [newClicks, setNewClicks] = useState(0);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  // При входе в приложение получаем данные пользователя 
  useEffect(() => {
    const { user } = window.Telegram.WebApp.initDataUnsafe;
    if (user && user.id) {
      setUserId(user.id);
      setUserName(user.username);

      const getInfoFromDB = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:9000/getInfo/${user.id}/${user.username}`);
          const data: IUserData = await response.json();
  
          setBalance(data.wallet);
          setLimitClicks(data.limit_clicks);
        } catch (error) {
          console.error(error);
          toast.error("Error on server side!");
        }
      };
      getInfoFromDB();
  }else{
    toast.error("Error on Telegram side!");
  }
}, []);
  
  // Обработчик на сохранение данных перед выходом со страницы
  useEffect(() => {

    const updateInfoInDB = async (newClicks: number, updatedBalance: number, updatedLimitClicks: number) => {
      try {
        await fetch(`http://127.0.0.1:9000/updateInfo/${userId}/${userName}/${newClicks}/${updatedBalance}/${updatedLimitClicks}`);
      } catch (error) {
        console.error(error);
      }
    };

    if (balance !== null && limitClicks !== null) {
      const handleUnload = () => {
        updateInfoInDB(newClicks, balance, limitClicks);
      };
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [userId, userName, balance, limitClicks, newClicks]);

  // Логика кликера
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    if (limitClicks === null || limitClicks === 0) {
      toast.error("Limit! Come back tomorrow");
      return;
    }

    setNewClicks((prevNewClicks) => prevNewClicks + 1);
    setBalance((prevBalance) => (prevBalance ?? 0) + 1);
    setLimitClicks((prevLimitClicks) => (prevLimitClicks ?? 0) - 1);
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
          <img 
          src='./images/cat_coin.png' 
          alt='Монета' 
          height={300}
          width={310.74}
          />
        </button>
        <ProgressBar progress={limitClicks !== null ? limitClicks : 0} />
      </div>
    </div>
  );
}
