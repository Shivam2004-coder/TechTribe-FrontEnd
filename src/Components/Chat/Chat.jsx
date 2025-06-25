import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../../utils/Socket/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/Constants/constants';
import Card from '../Tribe/Card';
import UserCard from '../Tribe/UserCard';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { AdvancedImage } from '@cloudinary/react';
import EmojiPicker from 'emoji-picker-react';


const Chat = () => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
        }
    };

    const [isHeaderClick , setIsHeaderClick] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiClick = (emojiData) => {
        setNewMessage(prev => prev + emojiData.emoji);
    };




    const {targetUserId} = useParams();
    const [message , setMessage] = useState([]);
    const [newMessage , setNewMessage] = useState("");
    const profile = useSelector((store) => store.profile);
    const connections = useSelector((store) => store.connections.currentConnection);
    const chatThemeImage = useSelector((store) => store.profile.chatThemeImage);
    const emojiPickerRef = useRef(null);

    const userId = profile?.userId;
    console.log("I am in the chat page :");
    console.log("This is connections");
    console.log(connections);
    const socketRef = useRef(null);
    console.log(message);

    // Calculate age
    const calculateAge = (dob) => {
        if (!dob) return '';
        const birthDate = new Date(dob); 
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        return age;
    };

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "chat/" + targetUserId, {
          withCredentials: true,
        });
    
        console.log(chat);
        console.log(chat.data.messages);
    
        const chatMessages = chat?.data?.messages.map((msg) => {
          const { senderId, text , createdAt  } = msg;
          return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
            timestamp: createdAt, // ✅ save this
          };
        });
        setMessage(chatMessages);
      };

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target)
            ) {
            setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);


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

        socket.on("messageReceived" , ({ firstName , text , timestamp}) => {
            console.log(firstName+" "+text);
            // setMessage((messages) => [...messages , {firstName , text}]);
            setMessage((messages) => [
                ...messages,
                {
                    firstName,
                    text,
                    timestamp, // save timestamp with message
                },
            ]);
        });

        return () => {
            socket.disconnect();
        }
    } , [profile.firstName , userId , targetUserId]);

    const sendMessage = () => {
        const socket = socketRef.current;
        if (!socket) return;

        const timestamp = new Date().toISOString(); // use ISO for consistency

        socket.emit("sendMessage" , {
            firstName: profile.firstName,
            userId,
            targetUserId,
            text: newMessage,
            timestamp,
        });

        setNewMessage("");
    };

    const handleUserInfoClick = () => {
        setIsHeaderClick(!isHeaderClick);
    }

  return (
    <div className="w-full h-screen  flex justify-between items-center " >
        <div className="hidden md:flex justify-center items-center p-4 flex[1] rounded-lg" >
            <div className="justify-center scale-125" >
                <UserCard
                    feed={connections}
                    isProfile={true}
                />
            </div>
        </div>
        <div className='flex items-center justify-center w-full flex-[3] h-full px-1 md:px-4' >
            <div className=" w-full h-9/10 flex flex-col" >
                <div className=" bg-gray-700 relative w-full h-1/11 md:h-2/12 rounded-xl pl-3 flex justify-center items-center" 
                    onClick={handleUserInfoClick}
                >
                    <div className="flex flex-row w-full items-center justify-start " >
                        <AdvancedImage
                            cldImg={cld.image(connections.profileImage).resize(fill().width(250).height(250))}
                            className="object-cover h-12 w-12 md:h-20 md:w-20 mr-2 md:mr-3 rounded-full shadow-black shadow-lg"
                        />
                        <h2 className="w-full text-xl md:text-2xl font-extrabold  text-white ">
                        {connections.firstName+" "+connections.lastName+" , "+calculateAge(connections.dateOfBirth)}  
                        </h2>
                    </div>
                </div>

                { isHeaderClick && 
                    <div className={`flex items-center justify-center md:hidden z-0 transition-all duration-300 ease-in-out ${isHeaderClick ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                        <div className={`justify-center transition-all duration-500 ease-in-out  ${ isHeaderClick ? "scale-100 opacity-100" : "scale-0 opacity-0" }`}>
                            <UserCard
                                feed={connections}
                                isProfile={true}
                            />
                        </div>
                    </div>
                }

                <div className={`transition-all w-full relative h-full duration-500 ease-in-out ${
                    isHeaderClick && window.innerWidth < 768 ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}>
                    <div 
                        ref={messageEndRef}
                        className={`rounded-xl bg-white p-2 md:p-4 w-full h-8/12 transition-all duration-300 ease-in-out  overflow-y-scroll scrollbar-hidden `}
                        style={{
                            backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${chatThemeImage}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "repeat",
                        }}
                    >
                            {/* <img
                                src={`https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${chatThemeImage}`}
                                alt="chat background"
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-xl z-0"
                            /> */}

                    {message.map((message , index) => {
                        if (message.firstName === profile.firstName) {
                            return (
                                <div
                                    key={index}
                                    className="w-full flex justify-end pr-4 mb-2 "
                                >
                                    <div className="flex flex-col items-end max-w-[70%] z-1">
                                        <div className="bg-gray-800 shadow-white shadow-inner text-white px-4 py-2 rounded-lg text-md break-words">
                                            {message.text}
                                            <div className="text-xs flex items-end justify-end text-white mt-1">
                                               {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    className="w-full flex justify-start pl-4 mb-2"
                                >
                                    <div className="flex flex-col items-start max-w-[70%] z-1">
                                        <div className="bg-gray-200 shadow-black shadow-xl text-black px-4 py-2 rounded-lg text-md break-words">
                                            {message.text}
                                            <div className="text-xs flex items-end justify-end text-black mt-1">
                                               {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}

                    </div>
                    <div className={`rounded-xl bg-black w-full h-1/11 md:h-2/12 flex transition-all duration-300 ease-in-out  items-center justify-around `} >
                        {showEmojiPicker && (
                            <div className="bg-white rounded-xl p-2"
                                ref={emojiPickerRef}
                            >
                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                height={300}
                                width="100%"
                            />
                            </div>
                        )}
                        <div className="w-full flex items-center justify-around">
                            <input  
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                type="text" 
                                placeholder="Write Your message...." 
                                className="text-white p-2 m-1 w-full border-none outline-none focus:outline-none focus:ring-0" 
                            />
                            <button
                                className="text-2xl h-full text-white mx-2 hover:bg-gray-500 p-4 rounded-lg cursor-pointer"
                                onClick={() => setShowEmojiPicker(prev => !prev)}
                            >
                            <i className='material-icons'>add_reaction</i>
                            </button>
                            <button 
                                className="h-13 w-13 md:h-18 md:w-18 p-3 md:p-4 hover:scale-115 rounded-full flex items-center transition-all duration-300 ease-in-out justify-center active:scale-100 bg-green-600 m-2 md:m-4 cursor-pointer " 
                                onClick={sendMessage}    
                            >
                                <i className='material-icons'>send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat