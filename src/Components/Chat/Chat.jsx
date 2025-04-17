

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../../utils/Socket/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/Constants/constants';

const Chat = () => {

    const {targetUserId} = useParams();
    const [message , setMessage] = useState([]);
    const [newMessage , setNewMessage] = useState("");
    const profile = useSelector((store) => store.profile);
    const userId = profile?.userId;

    const socketRef = useRef(null);
    console.log(message);

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "chat/" + targetUserId, {
          withCredentials: true,
        });
    
        console.log(chat);
        console.log(chat.data.messages);
    
        const chatMessages = chat?.data?.messages.map((msg) => {
          const { senderId, text } = msg;
          return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
          };
        });
        setMessage(chatMessages);
      };

    useEffect(() => {
    fetchChatMessages();
    }, []);

    useEffect(() => {
        if ( !userId ) {
            return ;
        }

        console.log("I am in Chat useEffect !!");
        const socket = createSocketConnection();
        socketRef.current = socket; // ✅ Save socket to ref

        const firstName = profile.firstName;

        console.log(firstName+" "+userId+" "+targetUserId);

        // As soon as the page loaded , the socket connection is made and joinChat event is emitted.....
        socket.emit("joinChat" , {firstName , userId , targetUserId} );

        socket.on("messageReceived" , ({ firstName , text }) => {
            console.log(firstName+" "+text);
            setMessage((messages) => [...messages , {firstName , text}]);
        });

        return () => {
            socket.disconnect();
        }
    } , [profile.firstName , userId , targetUserId]);

    const sendMessage = () => {
        const socket = socketRef.current;
        if (!socket) return;

        socket.emit("sendMessage" , {
            firstName: profile.firstName,
            userId,
            targetUserId,
            text: newMessage
        });

        setNewMessage("");
    };

  return (
    <div className="w-full h-screen text-black flex justify-center items-center " >
        <div className="border-2 border-gray-700 w-1/2 h-3/4 bg-gray-200 flex flex-col" >
            <div className="border-2 border-gray-700 w-full h-2/12 flex justify-center items-center" >
                <h1>Chat</h1>
            </div>
            <div className="border-2 border-gray-700 w-full h-8/12 overflow-y-scroll" >
            {message.map((message , index) => {
                if (message.firstName === profile.firstName) {
                    return (
                        <div
                            key={index}
                            className="w-full flex justify-end pr-4 mb-2"
                        >
                            <div className="flex flex-col items-end max-w-[70%]">
                                <span className="text-sm text-gray-500 mb-1">{message.firstName}</span>
                                <div className="bg-green-500 text-white px-4 py-2 rounded-2xl shadow-md text-sm break-words">
                                {message.text}
                                </div>
                                <span className="text-xs text-gray-400 mt-1">
                                {new Date().toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={index}
                            className="w-full flex justify-start pl-4 mb-2"
                        >
                            <div className="flex flex-col items-start max-w-[70%]">
                                <span className="text-sm text-gray-500 mb-1">{message.firstName}</span>
                                <div className="bg-green-500 text-white px-4 py-2 rounded-2xl shadow-md text-sm break-words">
                                {message.text}
                                </div>
                                <span className="text-xs text-gray-400 mt-1">
                                {new Date().toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    );
                }
            })}

            </div>
            <div className="border-2 border-gray-700 w-full h-2/12 flex justify-around" >
                <input  
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text" 
                    placeholder="Write Your message...." 
                    className="bg-black text-white p-2 m-1 w-full border-none " 
                />
                <button 
                    className="p-3 hover:scale-105 active:scale-100 bg-green-600 m-1 cursor-pointer " 
                    onClick={sendMessage}    
                >
                    Send
                </button>
            </div>
        </div>
    </div>
  )
}

export default Chat