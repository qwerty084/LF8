import { env } from "@/env";
import Cookies from "js-cookie";
import { SetStateAction, useEffect, useState } from "react";
import { session } from "./auth.component";
import { func } from "prop-types";

type Group = {
    id: number;
    name: string;
    avatar: string;
};

type Contact = {
    userid: number;
    name: string;
    avatar: string;
};

export function CreateChat({ chatType }: { chatType: string | null }) {
    return chatType === "group" ? <CreateGroup /> : <CreateContact />;
}

/**
 * Creates a new group chat.
 *
 * This is a React component that renders the UI for creating a new
 * group chat. It would likely contain inputs for the group name,
 * description, avatar, and members. The component would handle submitting
 * the new group data to the server.
 */
function CreateGroup() {
    const [groupName, setGroupName] = useState<string>();
    const [groupDescription, setGroupDescription] = useState<string>();
    const [avatar, setAvatar] = useState<any>();

    const [searchInput, setSearchInput] = useState<string>();
    const [availableGroups, setAvaiableGroups] = useState<Group[]>([
        { id: 0, name: "No Groups avaiable", avatar: "" },
    ]);
    const [searchResults, setSearchResults] = useState<Group[]>([]);

    const handleChange = (event: {
        target: { value: SetStateAction<string | undefined> };
    }) => {
        setSearchInput(event.target.value);
    };

    /**
     * useEffect hook that filters the available groups based on the search input.
     * It sets the searchResults state to the filtered groups whenever the searchInput changes.
     */
    useEffect(() => {
        if (searchInput) {
            const results = availableGroups.filter((group) =>
                group.name.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchResults(results);
        }
    }, [searchInput, availableGroups]);

    async function get_groups() {
        let url = `${env.API_URL}/groups`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            const groups = data.map((group: { id: any; name: any; avatar: any }) => ({
                id: group.id,
                name: group.name,
                avatar: group.avatar,
            }));
            setAvaiableGroups(groups);
        }
    }

    async function uploadAvatar() {
        if (!avatar) {
            return 1;
        }

        let url = `${env.API_URL}/media_objects`;
        let formData = new FormData();
        formData.append("file", avatar);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
            body: formData,
        });

        if (response.ok) {
            let jsonResponse = await response.json();
            return `/api/media_objects/${jsonResponse.id}`;
        } else {
            console.error("Upload failed");
            return null;
        }
    }

    function joinGroup(groupId: number) {
        let url = `${env.API_URL}/users/${session.user.data?.id}`;

        // Map each group id to "/api/groups/id"
        let groups = session.user.data?.groups?.map((id) => `/api/groups/${id}`);

        groups?.push(`/api/groups/${groupId}`);

        const request_data = {
            groups: groups,
        };

        const response = fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
            body: JSON.stringify(request_data),
        });
    }

    async function create_group() {
        let url = `${env.API_URL}/groups`;

        // Added null check on avatarId
        let avatarId = await uploadAvatar();
        if (avatarId === null) {
            return;
        }

        const group_request_data = {
            name: groupName,
            avatar: avatarId,
            description: groupDescription,
            isGroupChat: true,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
            body: JSON.stringify(group_request_data),
        });

        let jsonResponse = await response.json();

        if (response.ok) {
            availableGroups.push(jsonResponse);

            let url = `${env.API_URL}/users/${session.user.data?.id}`;

            // Map each group id to "/api/groups/id"
            let groups = session.user.data?.groups?.map((id) => `/api/groups/${id}`);

            groups?.push(`/api/groups/${jsonResponse.id}`);

            const request_data = {
                groups: groups
            };

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                },
                body: JSON.stringify(request_data),
            });

            if (response.ok) {
                const token: string = Cookies.get("refresh_token") || "";
                session.user.refreshUser(token);
            }
        }
    }

    const handleUpload = async (event: any) => {
        const file = event.target.files[0];
        setAvatar(file);
    };

    useEffect(() => {
        get_groups();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="flex flex-row w-5/6 h-5/6 m-20 shadow-custom rounded-md">
                <div className="w-1/4 shadow-custom">
                    <div className="flex justify-center items-center h-24 ">
                        <input
                            type="text"
                            name="search"
                            className="w-5/6 h-1/2 bg-transparent shadow-md text-center rounded-md focus:outline-none"
                            placeholder="Search"
                            value={searchInput}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        {(searchInput ? searchResults : availableGroups).map(
                            (item, index) => (
                                <div key={index}>
                                    <div
                                        key={index}
                                        className="flex justify-between m-2 items-center"
                                    >
                                        <div className="flex">
                                            <img
                                                src={"https://localhost" + item.avatar}
                                                alt=""
                                                className="rounded-full w-5 h-5 mr-2"
                                            />
                                            {item.name}
                                        </div>
                                        {session.user.data?.groups.includes(item.id.toString())
                                            ? (
                                                <img
                                                    key={"img" + index}
                                                    src="/assets/check.png"
                                                    alt="Joined"
                                                    className="bg-transparent px-2 py-1 rounded-md shadow-custom w-1/6"
                                                />
                                            ) : (
                                                <button
                                                    key={"button" + index}
                                                    className="bg-transparent p-2 rounded-md shadow-custom hover:scale-105 w-1/6"
                                                    onClick={() => joinGroup(item.id)}
                                                >
                                                    Join
                                                </button>
                                            )}
                                    </div>
                                    <hr className="border-1 border-[#00cba2] mx-2" />
                                </div>
                            ),
                        )}
                    </div>
                </div>
                <div className="w-3/4 h-full shadow-custom p-2">
                    <h1 className="text-center text-xl mb-12">Create a Group</h1>
                    <div className="flex justify-between mb-4 mx-4">
                        <input
                            type="text"
                            className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom focus:outline-none flex-shrink-0"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />

                        <input
                            type="text"
                            className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom focus:outline-none flex-shrink-0"
                            placeholder="Group Description"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between mb-12 mx-4">
                        <input
                            type="file"
                            className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom focus:outline-none flex-shrink-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:${textColor} file:bg-transparent file:shadow-custom file:font-semibold"
                            placeholder="Group Name"
                            onChange={handleUpload}
                        />
                    </div>
                    <div className="mx-4">
                        <button
                            className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom hover:scale-105"
                            onClick={create_group}
                        >
                            Create Group
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );

}

function CreateContact() {
    const [searchInput, setSearchInput] = useState<string>();
    const [availableContacts, setAvailableContacts] = useState<Contact[]>([
        { userid: 0, name: "No Contacts avaiable", avatar: "" },
    ]);
    const [searchResults, setSearchResults] = useState<Contact[]>([]);

    const handleChange = (event: {
        target: { value: SetStateAction<string | undefined> };
    }) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        if (searchInput) {
            const results = availableContacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchResults(results);
        }
    }, [searchInput, availableContacts]);

    async function get_contacts() {
        let url = `${env.API_URL}/users`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            const contacts = data
                .filter((user: { id: number; username: string; avatar: string }) => user.id !== session.user.data?.id)
                .map((user: { id: number; username: string; avatar: string }) => ({
                    userid: user.id,
                    name: user.username,
                    avatar: user.avatar,
                }));
            setAvailableContacts(contacts);
        }
    }


    async function handleAddContact(contact: Contact) {
        let groupurl = `${env.API_URL}/groups`; 

        const group_request_data = {
            name: "",
            avatar: "/api/media_objects/12",
            description: "",
            isGroupChat: false
        };

        const response = await fetch(groupurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auth")}`,
            },
            body: JSON.stringify(group_request_data),
        });
        let jsonResponse = await response.json();
        if (response.status === 201) {
            let groupId = jsonResponse.id;
            let userurl = `${env.API_URL}/users/${session.user.data?.id}`;
            
            //Patch current user to add the group
            let groups = session.user.data?.groups?.map((id) => `/api/groups/${id}`);
            groups?.push(`/api/groups/${groupId}`);
            const user_request_data = {
                groups: groups
            }

            const user_response = await fetch(userurl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                },
                body: JSON.stringify(user_request_data),
            });
            if (response.ok) {
                const token: string = Cookies.get("refresh_token") || "";
                session.user.refreshUser(token);
            }

            //Patch other user u want to chat with
            let user_id = contact.userid;
            let user_url = `${env.API_URL}/users/${user_id}`;

            const request = await fetch(user_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                },
            });
            if (request.ok) {
                const user_data = await request.json();
                let groups2 = user_data.groups?.map((id: any) => `/api/groups/${id}`);
                groups2?.push(`/api/groups/${groupId}`);
                const user_request_data2 = {
                    groups: groups
                }
                const user_response = await fetch(user_url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${Cookies.get("auth")}`,
                    },
                    body: JSON.stringify(user_request_data2),
                });
            }
        

        }
    }

    useEffect(() => {
        get_contacts();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="flex flex-row w-5/6 h-5/6 m-20 shadow-custom rounded-md">
                <div className="w-1/3 shadow-custom">
                    <div className="flex justify-center items-center h-24 ">
                        <input
                            type="text"
                            name="search"
                            className="w-5/6 h-1/2 bg-transparent shadow-md text-center rounded-md focus:outline-none"
                            placeholder="Search"
                            value={searchInput}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        {(searchInput ? searchResults : availableContacts).map(
                            (item, index) => (
                                <div key={index}>
                                    <div
                                        key={index}
                                        className="flex justify-between m-2 items-center"
                                    >
                                        <div className="flex">
                                            <img
                                                src={"https://localhost" + item.avatar}
                                                alt=""
                                                className="rounded-full w-5 h-5 mr-2"
                                            />
                                            {item.name}
                                        </div>

                                        <button
                                            key={"button" + index}
                                            className="bg-transparent p-2 rounded-md shadow-custom hover:scale-105 w-1/6"
                                            onClick={() => handleAddContact(item)}
                                        >
                                            chat
                                        </button>
                                    </div>
                                    <hr className="border-1 border-[#00cba2] mx-2" />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
