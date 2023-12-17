"use client";
import React, { useEffect, useState } from "react";

interface GroupType {
  [x: string]: any;
  id: number;
  name: string;
  pfp: string;
}

interface ContactType {
  id: number;
  name: string;
  pfp: string;
}
export default function MeetAndGreet() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [chat, setChat] = useState();

  function get_groups() {
    setGroups([
      { id: 1, name: "Group 1", pfp: "assets/test_pfp.png" },
      { id: 2, name: "Group 2", pfp: "assets/test_pfp.png" },
      { id: 3, name: "Group 3", pfp: "assets/test_pfp.png" },
    ]);
  }
  function get_contacts() {
    setContacts([
      { id: 1, name: "Luca Helms", pfp: "assets/test_pfp.png" },
      { id: 2, name: "Luca Helms", pfp: "assets/test_pfp.png" },
      { id: 3, name: "Luca Helms", pfp: "assets/test_pfp.png" },
      { id: 4, name: "Luca Helms", pfp: "assets/test_pfp.png" },
    ]);
  }
  function get_chat(contact_id: number) {
    return contact_id;
  }

  useEffect(() => {
    get_groups();
    get_contacts();
  }, []);
  return (
    <div id="body" className="flex flex-row flex-grow">
      <div className="flex flex-col w-24 h-full shadow-custom">
        {groups.map((group: any) => (
          <div
            key={group.id}
            className="w-full flex justify-center cursor-pointer py-1 mt-4"
          >
            <img
              src={group.pfp}
              alt={group.name}
              className="flex items-center justify-center w-14 rounded-full transition duration-700 ease-in-out hover:rounded-2xl"
            />
          </div>
        ))}
        <div className="flex items-end justify-center h-full mb-4">
          settings
        </div>
      </div>

      <div className="flex flex-col justify-items-start w-1/6">
        {contacts.map((contact: any) => (
          <div
            key={contact.id}
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
          chat
        </div>
      </div>
    </div>
  );
}
