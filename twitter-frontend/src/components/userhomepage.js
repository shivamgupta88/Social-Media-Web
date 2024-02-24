import React, { useState } from 'react';
import Leftmenu from './left';
import Middlemenu from './middlemenu';
import Middlecreatetweet from './middlecreatetweet';
import Tweets from './tweets';
import Rightmenu from './rightmenu';

export default function Userhomepage() {
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);

    const handleLeftMenuToggle = () => {
        setIsLeftMenuOpen(!isLeftMenuOpen);
    };


    return (
        <div className="bg-blue-800 min-h-screen">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:hidden">
                    <button
                        onClick={handleLeftMenuToggle}
                        className="p-2 bg-blue-600 text-white absolute top-0 left-0 z-10"
                    >
                        ☰
                    </button>
                </div>
                {window.innerWidth <= 950 ? (
                    <div className={`w-full text-white h-auto py-4 border-b border-gray-600 ${isLeftMenuOpen ? 'block' : 'hidden'}`}>
                        <Leftmenu />
                    </div>
                ) : (
                    <div className="w-full lg:w-2/5 text-white lg:h-auto pl-4 lg:pl-32 py-4 lg:border-b lg:border-gray-600">
                        <Leftmenu />
                    </div>
                )}
                <div className="w-full lg:w-3/5 h-auto">
                    <Middlemenu />
                    <hr className="border-gray-600"></hr>
                    <Middlecreatetweet />
                    <Tweets />
                </div>
                <div className={`w-full lg:w-2/5 h-12`}>
                    <Rightmenu />
                </div>
                
            </div>
        </div>
    );
}
