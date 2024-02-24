import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './comment';

export default function Tweets() {
  const [tweets, setTweets] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;
  const [commentsVisibility, setCommentsVisibility] = useState({});

  useEffect(() => {

    async function fetchTweets() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/get-tweets`);
        // console.log(response.data);
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }

    fetchTweets();
  }, []);

  const handleShare = async (tweetId) => {
    console.log("share");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/share-tweet`, {
        tweetId,
      });
      console.log(tweetId);

      const updatedTweet = response.data.tweet;

      const tweetIndex = tweets.findIndex(tweet => tweet._id === updatedTweet._id);

      const updatedTweets = [...tweets];
      updatedTweets[tweetIndex] = updatedTweet;

      setTweets(updatedTweets);
    } catch (error) {
      console.error('Error sharing tweet:', error);
    }
  };

  const toggleComments = (tweetId) => {
    setCommentsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [tweetId]: !prevVisibility[tweetId],
    }));
  };

  const handleLike = async (tweetId) => {
    console.log("like");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/like-tweet`, {
        userId: userId,
        tweetId,
      });
      console.log(tweetId, userId);

      const updatedTweet = response.data.tweet;

      const tweetIndex = tweets.findIndex(tweet => tweet._id === updatedTweet._id);

      const updatedTweets = [...tweets];
      updatedTweets[tweetIndex] = updatedTweet;

      setTweets(updatedTweets);
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.tweetId}>
          <div className="flex flex-shrink-0 p-4 pb-0">
            <a href="/" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base leading-6 font-medium text-white">
                    {tweet.username}
                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @{tweet.username} .{' '}
                      {new Date(tweet.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="pl-16">
            <p className="text-base width-auto font-medium text-white flex-shrink">
              {tweet.tweetDescription}
            </p>

            <div className="flex flex-wrap justify-between space-x-2 py-3">
              <button
                className={`group flex items-center text-blue-400 text-sm font-medium rounded-full px-2 py-1 hover:bg-blue-800 hover:text-blue-300 p-2 ${tweet.likeArray.includes('your_user_id_here')
                  ? 'bg-blue-800 text-blue-300'
                  : 'text-blue-400 hover:bg-blue-800 hover:text-blue-300'
                  }`}
                onClick={() => handleLike(tweet.tweetId)}
              >
                <span className="m-1 text-md">{tweet.likeCount}</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="h-5 w-5 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                </svg>
                <span className="mmd:hidden">Likes</span>
              </button>


              <a href="/" class="group flex items-center text-blue-400 text-sm font-medium rounded-full px-2 py-1 hover:bg-blue-800 hover:text-blue-300 p-2">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="h-5 w-5 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"></path>
                </svg>
                <span class="mmd:hidden">Retweet</span>
              </a>
              <a
                href='/'
                className="group flex items-center text-blue-400 text-sm font-medium rounded-full px-2 py-1 hover:bg-blue-800 hover:text-blue-300 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  toggleComments(tweet.tweetId); 
                }}
              >
                <span className="m-1 text-md">{tweet.commentCount}</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="h-5 w-5 mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M383.822 344.427c-16.045 0-31.024 5.326-41.721 15.979l-152.957-88.42c1.071-5.328 2.142-9.593 2.142-14.919 0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762 10.653 26.741 17.041 43.852 17.041 35.295 0 64.178-28.766 64.178-63.92C448 72.767 419.117 44 383.822 44c-35.297 0-64.179 28.767-64.179 63.92 0 5.327 1.065 9.593 2.142 14.919l-150.821 87.35c-11.767-10.654-26.741-17.041-43.856-17.041-35.296 0-63.108 28.766-63.108 63.92 0 35.153 28.877 63.92 64.178 63.92 17.115 0 32.089-6.389 43.856-17.042l151.891 88.421c-1.076 4.255-2.141 8.521-2.141 13.847 0 34.094 27.806 61.787 62.037 61.787 34.229 0 62.036-27.693 62.036-61.787.001-34.094-27.805-61.787-62.035-61.787z"></path>
                  </svg>
                  {commentsVisibility[tweet.tweetId] ? 'Hide Comments' : 'View Comments'}
              </a>

              <button
                className={`group flex items-center text-blue-400 text-sm font-medium rounded-full px-2 py-1 hover:bg-blue-800 hover:text-blue-300 p-2 ${tweet.likeArray.includes('your_user_id_here')
                  ? 'bg-blue-800 text-blue-300'
                  : 'text-blue-400 hover:bg-blue-800 hover:text-blue-300'
                  }`}
                onClick={() => handleShare(tweet.tweetId)}
              >
                <span class="m-1 text-md">{tweet.shareCount}</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M383.822 344.427c-16.045 0-31.024 5.326-41.721 15.979l-152.957-88.42c1.071-5.328 2.142-9.593 2.142-14.919 0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762 10.653 26.741 17.041 43.852 17.041 35.295 0 64.178-28.766 64.178-63.92C448 72.767 419.117 44 383.822 44c-35.297 0-64.179 28.767-64.179 63.92 0 5.327 1.065 9.593 2.142 14.919l-150.821 87.35c-11.767-10.654-26.741-17.041-43.856-17.041-35.296 0-63.108 28.766-63.108 63.92 0 35.153 28.877 63.92 64.178 63.92 17.115 0 32.089-6.389 43.856-17.042l151.891 88.421c-1.076 4.255-2.141 8.521-2.141 13.847 0 34.094 27.806 61.787 62.037 61.787 34.229 0 62.036-27.693 62.036-61.787.001-34.094-27.805-61.787-62.035-61.787z"></path>
                </svg>
                <span class="mmd:hidden">Shares</span>
              </button>


            </div>
          </div>
          <hr className="border-gray-600" />

          {commentsVisibility[tweet.tweetId] && <Comment tweetId={tweet.tweetId} />}
        </div>
      ))}
    </div>
  );
}
