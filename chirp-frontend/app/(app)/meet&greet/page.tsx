"use client";
import React, { useEffect, useState } from "react";

interface MeetingType {
  id: number;
  name: string;
  description: string;
  participants: number[]; //user ids
  cooridinates: string;
  date: string;
}

export default function MeetAndGreet() {
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [meeting, setMeeting] = useState<MeetingType>({
    id: 1,
    name: "first meeting",
    description: "test",
    participants: [1, 2, 3],
    cooridinates: "123-123",
    date: "2023-12-18",
  });

  function get_meets() {
    setMeetings([
      {
        id: 1,
        name: "first meeting",
        description: "test",
        participants: [1, 2, 3],
        cooridinates: "123-123",
        date: "2023-12-18",
      },
      {
        id: 2,
        name: "second meeting",
        description: "test",
        participants: [1, 2, 3],
        cooridinates: "123-123",
        date: "2023-12-18",
      },
      {
        id: 3,
        name: "third meeting",
        description: "test",
        participants: [1, 2, 3],
        cooridinates: "123-123",
        date: "2023-12-18",
      },
    ]);
  }

  function get_meeting(meeting_id: number) {
    setMeeting({});
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
        {meetings.map((meeting: any) => (
          <div
            key={meeting.id}
            className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none"
          >
            <p className="flex items-center text-xl">{meeting.name}</p>
            <p>{meeting.date}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-grow justify-between shadow-custom">
        <div id="chat" className="p-4 w-full">
          <div className="flex justify-evenly">
            <input
              type="text"
              placeholder="Meet Name"
              className="w-1/5 p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
            <input
              type="date"
              placeholder="Meet Date"
              className="w-1/5 p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>
          <div className="flex justify-evenly">
            <input
              type="text"
              placeholder="Participants"
              className="w-1/5 p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
            <input
              type="text"
              placeholder="Descriptions/Plans"
              className="w-1/5 p-2 focus:outline-none shadow-xl text-xl bg-transparent"
            />
          </div>
          <div className="flex justify-center h-1/2">
            <iframe
              className="w-3/5 rounded-xl"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
