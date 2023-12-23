"use client";
import React, { useEffect, useState } from "react";

interface MeetingType {
  id: number;
  name: string;
  description: string;
  participants: number[]; //user ids
  adress: string;
  datetime: string;
}

export default function MeetAndGreet() {
  const defaultMeet = {
    id: 0,
    name: "",
    description: "",
    participants: [],
    adress: "",
    datetime: "",
  }

  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [meeting, setMeeting] = useState<MeetingType>(defaultMeet);
  const [createMeet, setCreateMeet] = useState<boolean | null>(null)
  function get_meets() {
    setMeetings([
      {
        id: 1,
        name: "first meeting",
        description: "test",
        participants: [1, 2, 3],
        adress: "123-123",
        datetime: "2023-12-18",
      },
      {
        id: 2,
        name: "second meeting",
        description: "test",
        participants: [1, 2, 3],
        adress: "123-123",
        datetime: "2023-12-18",
      },
      {
        id: 3,
        name: "third meeting",
        description: "test",
        participants: [1, 2, 3],
        adress: "123-123",
        datetime: "2023-12-18",
      },
    ]);
  }

  function select_meet(id: number) {
    if (id === meeting?.id) {
      setMeeting(defaultMeet)
      setCreateMeet(null)
    } else {
      setMeeting({
        id: id,
        name: "first meeting",
        description: "test",
        participants: [1, 2, 3],
        adress: "123-123",
        datetime: "2023-12-18",
      })
      setCreateMeet(false)
    }
  }

  function select_create_meet() {
    if (createMeet === true) {
      setMeeting(defaultMeet)
      setCreateMeet(null)
    } else {
      setMeeting(defaultMeet)
      setCreateMeet(true)
    }
  }

  useEffect(() => {
    get_meets();
  }, []);

  return (
    <div id="body" className="flex flex-row flex-grow">
      <div className="flex flex-col w-24 h-full shadow-custom">
        <div className="flex items-end justify-center h-full mb-4">
          settings
        </div>
      </div>

      <div className="flex flex-col justify-items-start w-1/6">
        <div className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none" onClick={() => select_create_meet()}>
          <p className="flex items-center text-xl underline">Create Meet & Greet</p>
        </div>
        {meetings.map((meeting: any) => (
          <div
            key={meeting.id}
            className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none"
            onClick={() => select_meet(meeting.id)}
          >
            <p className="flex items-center text-xl">{meeting.name}</p>
            <p>{meeting.date}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-grow justify-between shadow-custom">
        <div id="chat" className="p-4 w-full">
          <div className="flex justify-center h-1/2">
            <iframe
              className="w-3/5 rounded-xl"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>


        <div
          id="createMeet"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${createMeet === true ? "" : "hidden"
            }`}
        >

          <div id="meet_name" className="flex flex-col mb-4">
            <span className="font-semibold">Meet Name</span>
            <input
              type="text"
              placeholder="Meet Name"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>

          <div id="meet_description" className="flex flex-col mb-4">
            <span className="font-semibold">Description</span>
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>
          <div id="meet_participants" className="flex flex-col mb-4">
            <span className="font-semibold"></span>
            <input
              type="text"
              placeholder="Participants"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>
          <div id="meet_adress" className="flex flex-col mb-4">
            <span className="font-semibold">Adress to Meet</span>
            <input
              type="text"
              placeholder="Meet-Street 123 a"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>
          <div id="meet_datetime" className="flex flex-col mb-4">
            <span className="font-semibold">Date and Time</span>
            <input
              type="datetime-local"
              placeholder="Date and Time"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>

        </div>

        <div
          id="showMeet"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${createMeet === false ? "" : "hidden"
            }`}
        >

          <div id="meet_name" className="flex flex-col mb-4">
            <span className="font-semibold">Meet Name:</span>
            <span className=" rounded-md">{meeting?.name}</span>
          </div>

          <div id="meet_description" className="flex flex-col mb-4">
            <span className="font-semibold">Description:</span>
            <span className=" rounded-md">{meeting?.description}</span>
          </div>
          <div id="meet_participants" className="flex flex-col mb-4">
            <span className="font-semibold">Participants:</span>
            <span className=" rounded-md">{meeting?.participants}</span>
          </div>
          <div id="meet_adress" className="flex flex-col mb-4">
            <span className="font-semibold">Adress to Meet:</span>
            <span className=" rounded-md">{meeting?.adress}</span>
          </div>
          <div id="meet_datetime" className="flex flex-col mb-4">
            <span className="font-semibold">Date and Time:</span>
            <span className=" rounded-md">{meeting?.datetime}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
