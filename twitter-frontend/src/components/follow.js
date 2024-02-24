import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Follow() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedInUserId = user ? user.userId : null;
    console.log(loggedInUserId);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 5;
    const totalPages = Math.ceil(users.length / usersPerPage);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/getOtherUsers/${loggedInUserId}?`
                );
                const updatedUsers = response.data.users.map(user => {
                    return {
                        ...user,
                        isFollowing: user.followers.includes(loggedInUserId.toString()) 
                    };
                });
                setUsers(updatedUsers);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    
        fetchUsers();
    }, [loggedInUserId]);
    

    const handleFollow = async (followedUserId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/follow-user`, {
                currentUserId: loggedInUserId,
                followedUserId: followedUserId
            });
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.userid === followedUserId ? { ...user, isFollowing: true } : user
                )
            );
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {users.slice(startIndex, endIndex).map((userData) => (
                        <div
                            key={userData.userid} 
                            className="flex items-center bg-white p-4 rounded-lg shadow-md mb-2"
                        >
                            <img
                                className="h-16 w-16 rounded-full border-2 border-white"
                                src={userData.userImage}
                                alt="User Profile"
                            />
                            <div className="flex flex-grow justify-between items-center ml-4">
                                <div>
                                    <p className="font-bold">@{userData.username}</p>
                                </div>
                                <button
                                    className="bg-blue-500 text-white rounded px-3 py-1"
                                    onClick={() => handleFollow(userData.userid)}
                                >
                                    {userData.isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 text-white rounded px-3 py-1 mr-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Back
                </button>
                <button
                    className="bg-blue-500 text-white rounded px-3 py-1"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
