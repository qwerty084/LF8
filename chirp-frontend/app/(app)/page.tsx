"use client";
import React, { useState, useEffect, useRef } from "react";
import { emptyChat } from "../../components/loading.component";
import { session } from "@/components/session.component";
import { testcontacts, testgroups, testchat } from "../../components/testdata.component"

type Members = {
  id: number;
  name: string;
  avatar: string;
};

interface GroupType {
  id: number;
  name: string;
  avatar: string;
}

interface ContactType {
  id: number;
  name: string;
  avatar: string;
}

interface userDetails {
  id: number;
  name: string;
  avatar: string;
  status: string;
  bio: string;

  //other details
  messagescore: number;
  createdAt: string;
}

interface groupDetails {
  id: number;
  name: string;
  avatar: string;
  members: Members[];
  description: string;

  //group details
  messages: number;
  createdAt: string;
}

interface chatType {
  senderId: number;
  message: string;
}

export default function Home() {

  const [groups, setGroups] = useState<GroupType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const { user } = session()

  const [chat, setChat] = useState<chatType[] | null>();
  const [message, setMessage] = useState<string>("")
  const [isGroup, setIsGroup] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails>();
  const [groupDetails, setGroupDetails] = useState<groupDetails>();

  const defaultUser = {
    id: 0,
    name: "",
    avatar: "",
    status: "",
    bio: "",
    messagescore: 0,
    createdAt: "",
  }

  const defaultGroup = {
    id: 0,
    name: "",
    avatar: "",
    members: [],
    description: "",
    messages: 0,
    createdAt: "",
  }

  function get_groups_and_chats() {
    setGroups(testgroups);
    setContacts(testcontacts);
  }

  function select_group(id: any) {
    if (id === groupDetails?.id) {
      setIsGroup(null)
      setChat(null)
      setGroupDetails(defaultGroup)
    } else {
      //fetch groupchat data
      setGroupDetails({
        id: id,
        name: "Group one",
        avatar: "assets/pfp5.JPG",
        members: [
          { id: 1, name: "Luca Helms", avatar: "assets/pfp.JPG" },
          { id: 2, name: "Filip", avatar: "assets/pfp5.JPG" },
          { id: 3, name: "Hendrik", avatar: "assets/pfp6.JPG" },
          { id: 4, name: "Jasmin", avatar: "assets/pfp4.webp" },
        ],
        description: "First Test Group",
        messages: 122,
        createdAt: "2023-12-17",
      });
      setIsGroup(true);
      setChat(testchat);
    }
  }

  function select_chat(id: any) {
    if (id === userDetails?.id) {
      setIsGroup(null)
      setChat(null)
      setUserDetails(defaultUser)
    } else {
      //fetch user data
      setUserDetails({
        id: 1,
        name: "Filip",
        avatar: "assets/pfp5.JPG",
        status: "hey i use Chirp",
        bio: "JUNGE bin ich dumm...",
        messagescore: 12,
        createdAt: "2023-12-17",
      });
      setIsGroup(false);
      setChat(testchat);
    }
  }
  {/* Use senderId only for local messages. the backend should get the sender id of an verifyed JWT to secure the right id */ }
  function send_message(senderId: number, message: string) {
    // Create a new message object
    const newMessage = {
      senderId: senderId,
      message: message
    };

    // Add the new message to the chat
    setChat(prevChat => prevChat ? [...prevChat, newMessage] : [newMessage]);
    setMessage("")
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the addition of a new line in the text field (optional)
      userDetails && userDetails.id && send_message(userDetails.id, message);
    }
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chat]);

  useEffect(() => {
    get_groups_and_chats();
  }, []);

  return (
    <div id="body" className="flex flex-row flex-grow">
      {/* Group Map Function */}
      <div className="flex flex-col w-24 h-full shadow-custom">
        {groups.map((group: any) => (
          <div
            key={group.id}
            onClick={() => select_group(group.id)}
            className="w-full flex justify-center cursor-pointer py-1 mt-4"
          >
            <img
              src={group.avatar}
              alt={group.name}
              className="flex items-center justify-center w-14 rounded-num-full transition-border-radius duration-100 ease-in-out transform hover:rounded-num-2xl"
            />
          </div>
        ))}
        <div className="flex items-end justify-center h-full mb-4">
          <img src="/assets/settings.png" alt="" className="w-12 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110" onClick={() => window.location.href = "/settings"} />
        </div>
      </div>
      {/* Contact Map Function */}
      <div className="flex flex-col justify-items-start w-1/6">
        {contacts.map((contact: any) => (
          <div
            key={contact.id}
            onClick={() => select_chat(contact.id)}
            className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none"
          >
            <img
              src={contact.avatar}
              className="flex items-center w-14 rounded-full"
            />
            <p className="flex items-center text-xl">{contact.name}</p>
          </div>
        ))}
      </div>
      {/* Chat div with input controls */}
      <div className="flex flex-grow justify-between shadow-custom">
        <div className="flex flex-col w-[100%] h-[100%] mx-4">
          <div id="chatMessages" className="h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            {!chat ? emptyChat() : chat?.map((item, index) => (
              item.senderId === user?.id ?
                <div key={index} className="flex justify-end items-center mt-2">{item.message}<img src={user.avatar} alt="" className="rounded-full ml-2 w-10" /></div>
                :
                <div key={index} className="flex justify-start items-center mt-2"><img src={isGroup ?  groupDetails?.members.find(member => member.id === item.senderId)?.avatar : userDetails?.avatar} alt="" className="rounded-full mr-2 w-10" />{item.message}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div id="controlls" className={`flex rounded-md mt-8 mb-4 gap-4 ${!chat ? "hidden" : ""}`}>
            <label htmlFor="upload" className="flex items-center justify-center text-5xl transition duration-300 cursor-pointer hover:scale-110">
              +
            </label>
            <input type="file" name="upload" id="upload" className="hidden" />
            <input type="text" className="w-full pl-2 text-md rounded-md bg-transparent shadow-custom focus:outline-none" placeholder="Enter your Message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} />
            <img src="assets/send.png" id="send" className="w-10 h-10 text-xl cursor-pointer" onClick={() => user && user.id && send_message(user?.id, message)} />
          </div>
        </div>
        <div
          id="userDetails"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${user?.config.chatDetails === true && isGroup === false ? "" : "hidden"
            }`}
        >
          <div id="head" className="flex flex-row gap-2 mb-4">
            <div
              id="session_user"
              className="flex flex-row items-center gap-2 text-xl font-bold"
            >
              <img src={userDetails?.avatar} className="w-16 rounded-full" />
              {userDetails?.name}
            </div>
          </div>

          <div id="status" className="flex flex-col mb-4">
            <span className="font-semibold">Status: </span>
            <span className="text-green-500 rounded-md">Online</span>
          </div>

          <div id="biography" className="flex flex-col mb-4 min-h-[10%]">
            <span className="font-semibold">Bio: </span>
            <span className="rounded-md h-full">{userDetails?.bio}</span>
          </div>

          <div id="otherDetails" className="flex flex-col min-h-[50%]">
            <span className="font-semibold">Other Details: </span>
            <span className="rounded-md h-full">
              <p>Message Score: {userDetails?.messagescore}</p>
              <p>Member since: {userDetails?.createdAt}</p>
            </span>
          </div>
        </div>

        <div
          id="groupDetails"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${user?.config.chatDetails && isGroup === true ? "" : "hidden"
            }`}
        >
          <div id="head" className="flex flex-row gap-2 mb-4">
            <div
              id="groupMembers"
              className="flex flex-row items-center gap-2 text-xl font-bold"
            >
              {groupDetails?.name}
            </div>
          </div>

          <div id="members" className="flex flex-col mb-4">
            <span className="font-semibold">Members: </span>
            {groupDetails?.members.map((member: any, index) => (
              <div
                key={index}
                id="groupMembers"
                className="flex flex-row items-center gap-2 mb-2 text-md font-semibold"
              >
                <img src={member.avatar} className="w-10 rounded-full" />
                {member.name}
              </div>
            ))}
          </div>

          <div id="description" className="flex flex-col mb-4 min-h-[10%]">
            <span className="font-semibold">Group Description: </span>
            <span className="rounded-md h-full">
              {groupDetails?.description}
            </span>
          </div>

          <div id="otherDetails" className="flex flex-col min-h-[30%]">
            <span className="font-semibold">Other Details: </span>
            <span className="rounded-md h-full">
              <p>Message Score: {groupDetails?.messages}</p>
              <p>Created At: {groupDetails?.createdAt}</p>
            </span>
          </div>
        </div>
      </div>
    </div >
  );
}
