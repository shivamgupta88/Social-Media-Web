import React, { useEffect, useState } from 'react';
import Logout from './logout';
import axios from 'axios';

export default function UserBox() {
  const [userData, setUserData] = useState(null); 
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user ? user.userId : null;

  useEffect(() => {
    
    fetchUserData(userid);
    
  },[userid]);

  const fetchUserData = async (userid) => {
    try {
      
        const response = await axios.get(`${process.env.REACT_APP_API}/userdata/${userid}?`);
          setUserData(response.data);
        }catch(error){
            console.log(error);
        };
  };
  
  


  return (
    <div>
      <div className="rounded-lg overflow-hidden bg-white shadow-md">
        <div className="h-24 bg-blue-600 flex items-center justify-center">
          <img
            className="h-16 w-16 rounded-full border-2 border-white"
            src={userData?.userImage} 
            alt="User Profile"
          />
        </div>
        <div className="px-4 py-2">
          <p className="font-bold text-xl">@{userData?.username}</p>
        </div>
        <div className="px-4 py-2 flex justify-between">
          <p className="text-gray-600">Followers: {userData?.followerCount}</p>
          <p className="text-gray-600">Following: {userData?.followingCount}</p>
        </div>
        <div className="flex justify-center mt-4"> 
          <Logout />
        </div>
      </div>
    </div>
  );
}
