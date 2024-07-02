'use client';
import "./friends_page_style.css";
import Friend from '@/components/friend/friend';
import BackBtn from '@/components/back-btn/back-btn';
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";

const userId = 1573326142;

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setUserId] = useState();
  const [linkToCopy, setLinkToCopy] = useState(`https://t.me/bot_name?start=`+userId);

  useEffect(() => {
    // setUserId(window.Telegram.WebApp.initDataUnsafe.user.id);

    const getFriends = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9002/getFriends/${userId}`);
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
