'use client';
import "./friends_page_style.css";
import Friend from '@/components/friend/friend';
import BackBtn from '@/components/back-btn/back-btn';
import { IFriendData } from "@/types/items.interface";
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";

export default function FriendsPage() {
  const [friends, setFriends] = useState<IFriendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [linkToCopy, setLinkToCopy] = useState<string>('');

  useEffect(() => {
    const { user } = window.Telegram.WebApp.initDataUnsafe;
    if (user && user.id) {
      setLinkToCopy(`https://t.me/bot_name?start=${user.id}`);
  
      const getFriends = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:9000/getFriends/${user.id}`);
          const data: IFriendData[] = await response.json();
          setFriends(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Error on server side!");
          setIsLoading(false);
        }
      };
      getFriends();
  }else{
    toast.error("Error on Telegram side!");
  }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
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

      <button className="copy-button" onClick={handleCopyLink}>Copy your link</button>
    </div>
  );
}
