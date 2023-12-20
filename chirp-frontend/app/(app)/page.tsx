"use client";
import React, { useState, useEffect } from "react";
import { emptyChat } from "../../components/loading.component";
import { KeyObject } from "crypto";

type Members = {
  id: number;
  name: string;
  pfp: string;
};

interface GroupType {
  id: number;
  name: string;
  pfp: string;
}

interface ContactType {
  id: number;
  name: string;
  pfp: string;
}

interface userDetails {
  id: number;
  name: string;
  pfp: string;
  status: string;
  bio: string;

  //other details
  messagescore: number;
  createdAt: string;
}

interface groupDetails {
  id: number;
  name: string;
  pfp: string;
  members: Members[];
  description: string;

  //group details
  messages: number;
  createdAt: string;
}

interface nullable {
  value: boolean | null;
}

interface chatType {
  messages: [];
}

export default function Home() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);

  const [chat, setChat] = useState<chatType | null>();
  const [isGroup, setIsGroup] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails>();
  const [groupDetails, setGroupDetails] = useState<groupDetails>();

  function get_groups_and_chats() {
    setGroups([
      { id: 1, name: "Group 1", pfp: "assets/group_red.png" },
      { id: 2, name: "Group 2", pfp: "assets/group_purple.png" },
      { id: 3, name: "Group 3", pfp: "assets/group_green.png" },
    ]);
    setContacts([
      { id: 1, name: "Luca Helms", pfp: "assets/pfp.JPG" },
      { id: 2, name: "Filip", pfp: "assets/pfp5.JPG" },
      { id: 3, name: "Hendrik", pfp: "assets/pfp6.JPG" },
      { id: 4, name: "Jasmin", pfp: "assets/pfp4.webp" },
    ]);
  }

  function get_chat(contact_id: number) {
    return contact_id;
  }

  function select_group(id: any) {
    if(id === groupDetails?.id) {
        setIsGroup(null)
        setGroupDetails(undefined)
    } else {
      //fetch groupchat data
      setGroupDetails({
        id: id,
        name: "Group one",
        pfp: "assets/pfp5.JPG",
        members: [
          { id: 1, name: "Luca Helms", pfp: "assets/pfp.JPG" },
          { id: 2, name: "Filip", pfp: "assets/pfp5.JPG" },
          { id: 3, name: "Hendrik", pfp: "assets/pfp6.JPG" },
          { id: 4, name: "Jasmin", pfp: "assets/pfp4.webp" },
        ],
        description: "First Test Group",
        messages: 122,
        createdAt: "2023-12-17",
      });
      setIsGroup(true);
    }
  }

  function select_chat(id: any) {
    if(id === userDetails?.id) {
      setIsGroup(null)
      setUserDetails(undefined)
    } else {
      //fetch user data
      setUserDetails({
        id: 1,
        name: "Filip",
        pfp: "assets/pfp5.JPG",
        status: "hey i use Chirp",
        bio: "JUNGE bin ich dumm...",
        messagescore: 12,
        createdAt: "2023-12-17",
      });
      setIsGroup(false);
    }
  }

  useEffect(() => {
    get_groups_and_chats();
  }, []);

  return (
    <div id="body" className="flex flex-row flex-grow">
      <div className="flex flex-col w-24 h-full shadow-custom">
        {groups.map((group: any) => (
          <div
            key={group.id}
            onClick={() => select_group(group.id)}
            className="w-full flex justify-center cursor-pointer py-1 mt-4"
          >
            <img
              src={group.pfp}
              alt={group.name}
              className="flex items-center justify-center w-14 rounded-num-full transition-border-radius duration-100 ease-in-out transform hover:rounded-num-2xl"
            />
          </div>
        ))}
        <div className="flex items-end justify-center h-full mb-4">
          <img src="/assets/settings.png" alt="" className="w-12 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"/>
        </div>
      </div>

      <div className="flex flex-col justify-items-start w-1/6">
        {contacts.map((contact: any) => (
          <div
            key={contact.id}
            onClick={() => select_chat(contact.id)}
            className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none"
          >
            <img
              src={contact.pfp}
              className="flex items-center w-14 rounded-full"
            />
            <p className="flex items-center text-xl">{contact.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-grow justify-between shadow-custom">
        <div id="chat" className="p-4 w-full">
          {chat ? "chat" : emptyChat()}
        </div>
        <div
          id="userDetails"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${
            isGroup === false ? "" : "hidden"
          }`}
        >
          <div id="head" className="flex flex-row gap-2 mb-4">
            <div
              id="session_user"
              className="flex flex-row items-center gap-2 text-xl font-bold"
            >
              <img src={userDetails?.pfp} className="w-16 rounded-full" />
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
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${
            isGroup === true ? "" : "hidden"
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
            {groupDetails?.members.map((member: any) => (
              <div
                id="groupMembers"
                className="flex flex-row items-center gap-2 mb-2 text-md font-semibold"
              >
                <img src={member.pfp} className="w-10 rounded-full" />
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
    </div>
  );
}
