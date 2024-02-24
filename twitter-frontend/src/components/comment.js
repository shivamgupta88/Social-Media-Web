import React, { useState } from 'react';
import axios from 'axios';
import CommentList from './commentlist';

export default function Comment({ tweetId}) {
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  const handleCommentSubmit = async (e) => {
    console.log(tweetId,userId);
    e.preventDefault();

    if (comment.trim() === '') {
      return; 
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/post-comments`, {
        text: comment,
        tweetId,
        userId,
      });
      console.log('Comment posted:', response.data);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCommentSubmit} className="flex">
        <input
          className="w-full rounded-l-full py-2 px-4 border border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-full px-4 hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </form>
      <CommentList tweetId={tweetId} />
    </div>
  );
}
