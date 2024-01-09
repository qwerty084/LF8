import { env } from "@/env";
import Cookies from "js-cookie";
import { SetStateAction, useEffect, useState } from "react";

type Group = {
    id: number;
    groupName: string
}

export function CreateChat({ chatType }: { chatType: string | null }) {
    return chatType === "group" ? <CreateGroup /> : <CreateContact />;
}

function CreateGroup() {
    const [groupName, setGroupName] = useState<string>()
    const [groupDescription, setGroupDescription] = useState<string>()
    const [groupMembers, setGroupMembers] = useState<string>()

    const [searchInput, setSearchInput] = useState<string>()
    const [availableGroups, setAvaiableGroups] = useState<Group[]>([{ id: 0, groupName: "No Groups avaiable" }])
    const [searchResults, setSearchResults] = useState<Group[]>([]);


    const handleChange = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        if (searchInput) {
            const results = availableGroups.filter(group =>
                group.groupName.toLowerCase().includes(searchInput.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [searchInput]);

    async function get_groups() {
        let url = `${env.API_URL}/groups`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("auth")}`,
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            const groups = data['hydra:member'].map((group: { id: any; groupName: any; }) => ({
                id: group.id,
                groupName: group.groupName
            }));
            console.log(groups)
            setAvaiableGroups(groups)
        }
    }

    useEffect(() => {
        get_groups();
    }, [])

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
                    {(searchInput ? searchResults : availableGroups).map((item, index) => (
                        <div key={index} className="flex justify-center">{item.groupName}</div>
                    ))}
                    </div>
                </div>
                <div className="w-3/4 shadow-custom"></div>
            </div>
        </div>
    )
}

function CreateContact() {
    const [userId, setUserId] = useState<number>()
    const [personalDescription, setPersonalDescription] = useState<string>()


    return (
        <div className="w-full h-full">
            <div className="flex justify-center">
                Add a Friend to your list
            </div>
        </div>
    )


}
