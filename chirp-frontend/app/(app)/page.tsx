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

export default function Home() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [chat, setChat] = useState();

  function get_groups() {
    setGroups([
      { id: 1, name: "Group 1", pfp: "assets/group_red.png" },
      { id: 2, name: "Group 2", pfp: "assets/group_purple.png" },
      { id: 3, name: "Group 3", pfp: "assets/group_green.png" },
    ]);
  }
  function get_contacts() {
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

  useEffect(() => {
    get_groups();
    get_contacts();
  }, []);

  return (
    <div id="body" className="flex flex-row flex-grow">
      <div className="w-24 border-r-2 border-gray-500">
        {groups.map((group: any) => (
          <div key={group.id} className="w-full flex justify-center cursor-pointer transition duration-700 ease-in-out py-1 mt-4">
            <img
              src={group.pfp}
              alt={group.name}
              className="flex items-center justify-center w-14 rounded-full hover:rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-items-start w-1/4 border-r-2 border-gray-500">
        {contacts.map((item: any) => (
          <div key={item.id} className="flex flex-row px-2 py-1 gap-2 mt-4 mx-4 cursor-pointer rounded-md hover:shadow-md">
            <img src={item.pfp} className="flex items-center w-14 rounded-full" />
            <p className="flex items-center text-xl">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex pr-2 w-3/4 gap-4 border-gray-500">
        <div id="modules" className="p-4">
          chat
        </div>
      </div>
    </div>
  );
}
