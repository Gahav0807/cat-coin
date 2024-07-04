'use client';
import "./friends_page_style.css";
import Friend from '@/components/friend/friend';
import BackBtn from '@/components/back-btn/back-btn';
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";

// тестовые данные
const userId = 1573326142;

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setUserId] = useState();
  const [linkToCopy, setLinkToCopy] = useState(`https://t.me/bot_name?start=`+userId);

  // При заходе в приложение берем данные юзера, посылаем запрос для получения списка людей 

  useEffect(() => {
    // setUserId(window.Telegram.WebApp.initDataUnsafe.user.id);

    const getFriends = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/getFriends/${userId}`);
        const data = await response.json();
        setFriends(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getFriends();
  }, [userId]);

  // Копируем ссылку в буфер обмена 
  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      <BackBtn />
      <div className='main-message'>
        <h1>Invite your friends!</h1>
        <p>You and your friend will receive a bonus</p>
      </div>

      <p className="list-message">List of your friends</p>

      {/* С помощью цикла добавляем список друзей  */}

      {isLoading ? (
        <p className="load-friends">Loading</p>
      ) : friends.length === 0 ? (
        <p className="load-friends">You don't have any friends.</p>
      ) : (
        <div className="list-of-friends">
          {friends.map((friend, index) => (
            <Friend
              key={friend.referal_id}
              number_of_friend={index + 1}
              friend_name={friend.referal_name}
            />
          ))}
        </div>
      )}

      <Toaster position="top-center" richColors  />
      <button className="copy-button" onClick={handleCopyLink}>Copy your link</button>
    </div>
  );
}
