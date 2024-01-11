"use client";
import React, { useEffect, useState } from "react";
import { testmeets } from "@/components/testdata.component";
import MapComponent from "@/components/meet.component";
import { fromAddress } from "react-geocode";

interface MeetingType {
  id: number;
  name: string;
  description: string;
  participants: number[]; //user ids
  adress: string;
  datetime: string;
}

export default function MeetAndGreet() {
  const [marker, setMarker] = useState({ id: 0, lat: 1, lng: 1 });
  const defaultMeet = {
    id: 0,
    name: "",
    description: "",
    participants: [],
    adress: "",
    datetime: "",
  };

  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [meeting, setMeeting] = useState<MeetingType>(defaultMeet);
  const [createMeet, setCreateMeet] = useState<boolean | null>(null);

  function get_meets() {
    setMeetings(testmeets);
  }

  async function select_meet(id: number) {
    if (id === meeting?.id) {
      setMeeting(defaultMeet);
      setCreateMeet(null);
      setMarker({ id: 0, lat: 1, lng: 1 });
    } else {
      const selectedMeeting = meetings.find((meet) => meet.id === id);
      if (selectedMeeting) {
        setMeeting(selectedMeeting);
        const meetAdress = selectedMeeting.adress;
        if (meetAdress && meetAdress.length > 0) {
          fromAddress(meetAdress, "AIzaSyDusDtZyAnRDAOfUUnqb4gObtbz9z74_sg")
            .then(({ results }) => {
              const { lat, lng } = results[0].geometry.location;
              console.log(lat, lng);
              setNewCoordinates({ lat, lng });

              // Add the new marker to the markers state
              setMarker({ id: 1, lat, lng });
            })
            .catch(console.error);
        }
        setCreateMeet(false);
      }
    }
  }

  function select_create_meet() {
    if (createMeet === true) {
      setMeeting(defaultMeet);
      setCreateMeet(null);
    } else {
      setMeeting(defaultMeet);
      setCreateMeet(true);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof MeetingType,
  ) => {
    if (field === "participants") {
      const participantIds = e.target.value.split(",").map(Number);
      setMeeting({
        ...meeting,
        [field]: participantIds,
      });
    } else {
      setMeeting({
        ...meeting,
        [field]: e.target.value,
      });
    }
  };

  useEffect(() => {
    get_meets();
  }, []);

  const [newCoordinates, setNewCoordinates] = useState({
    lat: 53.75345,
    lng: 9.93953,
  });

  return (
    <div id="body" className="flex flex-row flex-grow">
      <div className="flex flex-col w-24 h-full shadow-custom">
        <div className="flex items-end justify-center h-full mb-4">
          <img
            src="/assets/settings.png"
            alt=""
            className="w-12 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
            onClick={() => (window.location.href = "/settings")}
          />
        </div>
      </div>

      <div className="flex flex-col justify-items-start w-1/6">
        <div
          className="flex flex-row px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none"
          onClick={() => select_create_meet()}
        >
          <p className="flex items-center text-xl underline">
            Create Meet & Greet
          </p>
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
            <MapComponent
              coordinates={newCoordinates}
              title={meeting.name}
              markerId={marker.id}
            />
          </div>
        </div>

        <div
          id="createMeet"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${
            createMeet === true ? "" : "hidden"
          }`}
        >
          <div id="meet_name" className="flex flex-col mb-4">
            <span className="font-semibold">Meet Name</span>
            <input
              type="text"
              placeholder="Meeting Name"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
              value={meeting.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>

          <div id="meet_description" className="flex flex-col mb-4">
            <span className="font-semibold">Description</span>
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
              value={meeting.description}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>
          <div id="meet_participants" className="flex flex-col mb-4">
            <span className="font-semibold">Participants</span>
            <input
              type="number"
              placeholder=""
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
              value={meeting.participants.join(",")}
              onChange={(e) => handleInputChange(e, "participants")}
            />
          </div>
          <div id="meet_adress" className="flex flex-col mb-4">
            <span className="font-semibold">Adress to Meet</span>
            <input
              type="text"
              placeholder="test 123, 25451"
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
              value={meeting.adress}
              onChange={(e) => handleInputChange(e, "adress")}
            />
          </div>
          <div id="meet_datetime" className="flex flex-col mb-4">
            <span className="font-semibold">Date and Time</span>
            <input
              type="datetime-local"
              placeholder=""
              className="w-full p-2 focus:outline-none shadow-xl text-xl bg-transparent"
              value={meeting.datetime}
              onChange={(e) => handleInputChange(e, "datetime")}
            />
          </div>
        </div>

        <div
          id="showMeet"
          className={`flex flex-col w-1/4 h-full p-4 shadow-[0_25px_50px_-12px_rgba(0,203,162,0.25)] ${
            createMeet === false ? "" : "hidden"
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
