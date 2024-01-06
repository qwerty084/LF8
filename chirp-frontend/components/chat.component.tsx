import { useState } from "react";
import { io } from "socket.io-client";

export function CreateChat({ chatType } : { chatType: string | null }) {
    return chatType === "group" ? createGroup() : createContact();
}

function createGroup() {
    const [groupName, setGroupName] = useState<string>()
    const [groupDescription, setGroupDescription] = useState<string>()
    const [groupMembers, setGroupMembers] = useState<string>()
    const [] = useState<string>()
    const [] = useState<string>()

    return(
        <div className="w-full h-full">
            <div className="flex justify-center">Create a Group</div>
        </div>
    )
}

function createContact() {
    const [userId, setUserId] = useState<number>()
    const [personalDescription, setPersonalDescription] = useState<string>()

    function joinRoom(roomId: string) {
        const socket = io('http://localhost:3003')
        socket.emit('joinRoom', roomId)
    }

    return(
        <div className="w-full h-full">
            <div className="flex justify-center">
            Add a Friend to your list

            <button className="ml-20" onClick={() => joinRoom("1")}>Join a Room</button>
            </div>
        </div>
    )


}
