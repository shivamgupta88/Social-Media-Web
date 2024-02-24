import React from 'react';
import { signout } from './helper';

export default function Logout() {

    const handleLogout = () => {
        signout(() => {
          window.location.href = '/';
        });
      };

    return (
        <div className="flex items-center mt-4">
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Log out
            </button>
        </div>
    );
}
