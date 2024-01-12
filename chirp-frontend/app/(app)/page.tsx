"use client";
import React, { useState, useEffect, useRef } from "react";
import { emptyChat } from "../../components/loading.component";
import { session } from "@/components/auth.component";
import {
  testcontacts,
  testgroups,
  testchat,
} from "../../components/testdata.component";
import { textaccent } from "@/components/components.layout";
import { CreateChat } from "@/components/chat.component";
import { io } from "socket.io-client";
import { env } from "@/env";
import Cookies from "js-cookie";

type Members = {
  id: number;
  name: string;
  avatar: string;
};

interface GroupType {
  id: number;
  name: string;
  avatar: string;
  members: Members[];
  description: string;
}

interface ContactType {
  chatId: number;
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
}

interface chatType {
  senderId: number;
  message: string;
  createdAt: string;
}

interface messageStorage {
  Id: number;
  messages: message[];
}

interface message {
  senderId: number;
  message: string;
  createdAt: string;
}

/**
 * Default export of the Home page component.
 * Renders the home page.
 */
export default function Home() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);

  const [chat, setChat] = useState<chatType[] | null>();
  const [messageStorage, setMessageStorage] = useState<messageStorage[]>([]);

  const [message, setMessage] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails>();
  const [groupDetails, setGroupDetails] = useState<GroupType>();

  const [createChat, setCreateChat] = useState<string | null>(null);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const defaultUser: userDetails = {
    id: 0,
    name: "",
    avatar: "",
    status: "",
    bio: "",
  };

  const defaultGroup = {
    id: 0,
    name: "",
    avatar: "",
    members: [],
    description: "",
  };

  async function get_groups_and_chats() {
    let url = `${env.API_URL}/groups/${session.user.data?.id}/users`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    });
    const data = await response.json();

    let groups: GroupType[] = [];
    let contacts: ContactType[] = [];

    data.forEach((item: any) => {
      if (item.isGroupChat !== true) {
        const contact_user = item.members.find(
          (member: any) => member.id !== session.user.data?.id,
        );

        const constact_data: ContactType = {
          chatId: item.id,
          id: contact_user.id,
          name: contact_user.username,
          avatar: contact_user.avatar,
        };
        contacts.push(constact_data);
      } else {
        groups.push(item);
      }
    });

    setGroups(groups);
    setContacts(contacts);
    console.log(groups);

    return { groups, contacts }
  }

  function joinRoom(roomId: string) {
    const socket = io(env.WS_URL);
    // Join a WebSocket Room
    socket.emit("joinRoom", roomId);

    // Add an event listener for this room
    socket.on(roomId, ({ roomId, userId, message }) => {
      console.log({ roomId, userId, message });
      // Create a new message object
      const newMessage = {
        senderId: userId,
        message: message,
        createdAt: new Date().toISOString(),
      };

      // Find the room in the message storage
      const roomIndex = messageStorage.findIndex((room) => room.Id === roomId);

      if (roomIndex !== -1) {
        // If the room exists, add the new message to it
        setMessageStorage((prevMessageStorage) => {
          const updatedMessageStorage = [...prevMessageStorage];
          updatedMessageStorage[roomIndex].messages.push(newMessage);
          return updatedMessageStorage;
        });
      } else {
        // If the room doesn't exist, create a new room with the new message
        setMessageStorage((prevMessageStorage) => [
          ...prevMessageStorage,
          { Id: roomId, messages: [newMessage] },
        ]);
      }
      setChat((prevChat) =>
          prevChat ? [...prevChat, newMessage] : [newMessage]);
    });
  }


  async function loadChat(id: number) {
    const existingConversation = messageStorage.find(
      (conversation) => conversation.Id === id,
    );
    if (existingConversation) {
      console.log("load messages from messageStorage");
      setChat(existingConversation.messages);
    } else {
      console.log("load messges from backend");
      //get all messages of the chat from backend ==> setChat(messages)
      let url = `${env.API_URL}/message/${id}/groups`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth")}`,
        },
      });

      const data = await response.json();

      const messageStorageItem = {
        Id: id,
        messages: data,
      };

      setMessageStorage([...messageStorage, messageStorageItem]);
      setChat(messageStorageItem.messages);
    }
  }

  function select_group(id: number) {
    if (id === groupDetails?.id) {
      setIsGroup(null);
      setChat(null);
      setSelectedChat(null);
      setCreateChat(null);
      setGroupDetails(defaultGroup);
    } else {
      setCreateChat(null);
      //get data from groups.find(by)
      const group = groups.find((group) => group.id === id);
      if (group) {
        setGroupDetails({
          id: group.id,
          name: group.name,
          avatar: group.avatar,
          members: group.members,
          description: group.description,
        });
      }
      setIsGroup(true);
      setSelectedChat(id);
      loadChat(id);
    }
  }

  async function select_chat(chatId: number, senderId: any) {
    if (chatId === selectedChat) {
      setIsGroup(null);
      setChat(null);
      setSelectedChat(null);
      setCreateChat(null);
      setUserDetails(defaultUser);
    } else {
      setCreateChat(null);

      // Fetch user data from backend
      let url = `${env.API_URL}/users/${senderId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth")}`,
        },
      });
      const data = await response.json();

      // Set user details
      setUserDetails({
        id: senderId,
        name: data.username,
        avatar: data.image.filePath, // Use the filePath from the image object for the avatar
        status: data.status,
        bio: data.bio,
      });

      setCreateChat(null);
      setIsGroup(false);
      setSelectedChat(chatId);
      loadChat(chatId);
      console.log(chatId);
    }
  }

  function handleCreateChat(type: string | null) {
    setCreateChat(type);
    setIsGroup(null);
    setChat(null);
    setSelectedChat(null);
  }

  {
    /* Use senderId only for local messages. the backend should get the sender id of an verifyed JWT to secure the right id */
  }
  function send_message(senderId: number, message: string) {
    if (message === "") {
      return;
    }
    const socket = io(env.WS_URL);

    // Create a new message object
    const newMessage = {
      senderId: session.user.data?.id || 0,
      message: message,
      createdAt: new Date().toISOString(),
    };

    // Emit the new message to the server
    socket.emit("newMessage", { room: selectedChat, ...newMessage });

    // Add the new message to the chat
    setChat((prevChat) =>
      prevChat ? [...prevChat, newMessage] : [newMessage],
    );
    setMessage("");
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the addition of a new line in the text field (optional)
      if (session.user.data?.id && message) {
        send_message(session.user.data.id, message);
      }

    }
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Hi")
    get_groups_and_chats();

      session.user.data?.groups.forEach((groupId) => {
        joinRoom(groupId);
        console.log(groupId);
      });
  }, [joinRoom]);


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
              src={"https://localhost" + group.avatar}
              alt={group.name}
              className={`flex items-center justify-center w-14 rounded-num-full transition-border-radius duration-100 ease-in-out transform hover:rounded-num-2xl ${selectedChat === group.id ? "rounded-num-2xl" : ""
                }`}
            />
          </div>
        ))}
        <div
          onClick={() => handleCreateChat("group")}
          className="w-full flex justify-center cursor-pointer py-1 mt-4 hover:scale-105"
        >
          <img
            src="/assets/create.png"
            alt="Create"
            className="flex items-center justify-center w-14 rounded-num-full transition-border-radius duration-100 ease-in-out transform hover:rounded-num-2xl"
          />
        </div>
        <div className="flex items-end justify-center h-full mb-4">
          <img
            src="/assets/settings.png"
            alt=""
            className="w-12 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
            onClick={() => (window.location.href = "/settings")}
          />
        </div>
      </div>
      {/* Contact Map Function */}
      <div className="flex flex-col justify-items-start w-1/6">
        <div
          onClick={() => handleCreateChat("contact")}
          className={
            "flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none justify-center"
          }
        >
          <p className="flex items-center text-xl">Add a Friend</p>
        </div>
        {contacts.map((contact: any) => (
          <div
            key={contact.id}
            onClick={() => select_chat(contact.chatId, contact.id)}
            className={`flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none ${selectedChat === contact.id ? "rounded-r-none shadow-md" : ""
              }`}
          >
            <img
              alt="avatar"
              src={"https://localhost" + contact.avatar}
              className="flex items-center w-10 h-10 rounded-full"
            />
            <p className="flex items-center text-xl">{contact.name}</p>
          </div>
        ))}
      </div>
      {/* Chat div with input controls */}
      <div className="flex flex-grow justify-between shadow-custom">
        {createChat === null ? (
          <div className="flex flex-col w-[100%] h-[100%] mx-4">
            <div
              id="chatMessages"
              className="h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100"
            >
              {!chat
                ? emptyChat()
                : chat?.map((item, index) =>
                  item.senderId === session.user.data?.id ? (
                    <div
                      key={index}
                      className="flex justify-end items-center mt-2"
                    >
                      <p className="flex pl-2 py-1 items-center rounded-full  shadow-custom">
                        {item.message}
                        <img
                          src={"https://localhost" + session.user.data.avatar}
                          alt="avatar"
                          className="rounded-full ml-2 w-10 h-10"
                        />
                      </p>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex justify-start items-center mt-2"
                    >
                      <p className="flex pr-2 py-1 items-center rounded-full  shadow-custom">
                        <img
                          alt="avatar"
                          src={
                            "https://localhost" +
                            (isGroup
                              ? groupDetails?.members.find(
                                (member) => member.id === item.senderId,
                              )?.avatar
                              : userDetails?.avatar)
                          }
                          className="rounded-full mr-2 w-10 h-10"
                        />
                        {item.message}
                      </p>
                    </div>
                  ),
                )}
              <div ref={messagesEndRef} />
            </div>
            <div
              id="controlls"
              className={`flex rounded-md mt-8 mb-4 gap-4 ${!chat ? "hidden" : ""
                }`}
            >
              <label
                htmlFor="upload"
                className="flex items-center justify-center text-5xl transition duration-300 cursor-pointer hover:scale-110"
              >
                +
              </label>
              <input type="file" name="upload" id="upload" className="hidden" />
              <input
                type="text"
                className="w-full pl-2 text-md rounded-md bg-transparent shadow-custom focus:outline-none"
                placeholder="Enter your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <img
                alt="avatar"
                src="assets/send.png"
                id="send"
                className="w-10 h-10 text-xl cursor-pointer"
                onClick={() =>
                  session.user.data &&
                  session.user.data.id &&
                  send_message(session.user.data?.id, message)
                }
              />
            </div>
          </div>
        ) : (
          <CreateChat chatType={createChat} />
        )}
        <div
          id="userDetails"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${session.config.data?.chat?.details === true && isGroup === false
            ? ""
            : "hidden"
            }`}
        >
          <div id="head" className="flex flex-row gap-2 mb-4">
            <div
              id="session_user"
              className="flex flex-row items-center gap-2 text-xl font-bold"
            >
              <img
                alt="avatar"
                src={"https://localhost" + userDetails?.avatar}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col">
                <p>{userDetails?.name}</p>
                <p className={`text-xs ${textaccent}`}>{userDetails?.id}</p>
              </div>
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
        </div>

        <div
          id="groupDetails"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${session.config.data?.chat?.details && isGroup === true
            ? ""
            : "hidden"
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
                <img
                  alt="avatar"
                  src={"https://localhost" + member.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <p>{member.username}</p>
                  <p className={`text-xs ${textaccent}`}>{member.id}</p>
                </div>
              </div>
            ))}
          </div>
          <div id="description" className="flex flex-col mb-4 min-h-[10%]">
            <span className="font-semibold">Group Description: </span>
            <span className="rounded-md h-full">
              {groupDetails?.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
