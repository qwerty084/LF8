"use client"
import React, { ChangeEvent, useEffect, useState } from "react";
import { session } from "@/components/auth.component";
import { getTheme } from "@/app/layout";
import { env } from "@/env";
import Cookies from "js-cookie";

const { bgColor, itemColor, textColor, textaccent } = getTheme();
const Octokit = require("@octokit/core").Octokit;

const octokit = new Octokit({
    auth: env.GIT_TOKEN
});

type SettingPageType = {
    account: () => JSX.Element;
    notification: () => JSX.Element;
    chatSettings: () => JSX.Element;
    privacy: () => JSX.Element;
    dataStorage: () => JSX.Element;
    helpSupport: () => JSX.Element;
    [key: string]: () => JSX.Element;
};

export const settingPage: SettingPageType = {
    account: () => {
        return (<div>
            <h1 className="text-2xl mb-8">Manage your account settings</h1>
            <AccountFunc />
        </div>)
    },
    notification: () => {
        return (
            <div>
                <h1 className="text-2xl mb-8">Notifications</h1>
                <NotificationFunc />
            </div>
        )
    },
    chatSettings: () => {
        return (
            <div>
                <h1 className="text-2xl mb-8">Chat Settings</h1>
                <ChatSettingsFunc />
            </div>
        )
    },
    privacy: () => {
        return (
            <div>
                <h1 className="text-2xl mb-8">Privacy</h1>
                <PrivacyFunc />
            </div>
        )
    },
    dataStorage: () => {
        return (
            <div>
                <h1 className="text-2xl mb-8">Data & Storage</h1>
                <DataStorageFunc />
            </div>
        )
    },
    helpSupport: () => {
        return (
            <div>
                <h1 className="text-2xl mb-8">Help & Support</h1>
                <div id="faq" className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl">FAQs</p>
                    <span>get more informations about Chirp </span><a href="https://github.com/qwerty084/LF8" className="text-blue-500" target="blank">here</a>
                </div>

                <div id="problems" className="shadow-custom w-[50%] p-2 rounded-md">
                    <p className="text-xl mb-2">Report a problem directly into our GitHub Repository</p>
                    <HelpSupportFunc />

                </div>
            </div>
        )
    },
}

export function getPage(key: string): () => JSX.Element {
    if (key in settingPage) {
        return settingPage[key];
    } else {
        // Return a default function that returns a fallback JSX element
        return () => <div>Page not found</div>;
    }
}

export function AccountFunc() {

    const [readOnly, setReadOnly] = useState(true)
    const [saving, setSaving] = useState(false)

    const [username, setUserName] = useState<string | undefined>(session.user.data?.username)
    const [email, setEmail] = useState<string | undefined>(session.user.data?.email)
    const [status, setStatus] = useState<string | undefined>(session.user.data?.status || undefined)
    const [bio, setBio] = useState<string | undefined>(session.user.data?.bio || undefined)
    const [avatar, setAvatar] = useState<any>()

    const [removeWarning, setRemoveWarning] = useState<number>(0)

    async function uploadavatar(file: any) {
        const formData = new FormData();
        formData.append('file', avatar);

        try {
            const response = await fetch('https://localhost/api/media_objects', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth")}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const idUrl = data['@id']; // This is your @id URL
                const idParts = idUrl.split('/');
                const id = idParts[idParts.length - 1]; // This is the last part of the @id URL
                console.log(id);
                return id;
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    async function handleEditOrSave() {
        let url = `${env.API_URL}/users/${session.user.data?.id}`;
        if (readOnly) {
            setReadOnly(false)
        } else {
            setSaving(true);
            setReadOnly(true);

            const request_data = {
                username: username,
                email: email,
                status: status,
                bio: bio,
            }
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",

                    Authorization: `Bearer ${Cookies.get("auth")}`,
                },
                body: JSON.stringify(request_data)
            });
            const data = await response.json();
            if (response.status === 200) {
                setSaving(false);
            } else {
                console.log(data)
            }
        }
    }

    const handleUpload = async (event: any) => {
        const file = event.target.files[0];
        setAvatar(file);
    };

    async function handleRemove() {
        switch (removeWarning) {
            case 0:
                setRemoveWarning(1);
                break;
            case 1:
                if (window.confirm("Warning alert")) {
                    setRemoveWarning(2);
                }
                break;
            case 2:
                let url = `${env.API_URL}/users/${session.user.data?.id}`;

                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${Cookies.get("auth")}`,
                    },
                });
                if (response.status === 204) {
                    console.log("User Removed Successfully");
                    Cookies.remove("auth");
                    localStorage.clear();
                    window.location.href = ("/login");
                } else {
                    console.log("an error occured");
                }
                break;
            default:
                console.log("Invalid removeWarning value");
        }
    }


    function logout() {
        Cookies.remove("auth")
        window.location.href = "/login"
    }


    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-xl mb-2">Account Informations</p>
                    <img src={saving ? "assets/save-disabled.png" : readOnly ? "assets/edit.png" : "assets/save.png"} alt="" className="m-1 w-5 h-5 cursor-pointer" onClick={handleEditOrSave} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex">
                        <input type="text" className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom focus:outline-none flex-shrink-0" placeholder="Display Name" readOnly={readOnly} value={username} onChange={(e) => setUserName(e.target.value)} />
                        <input type="text" className="bg-transparent p-2 rounded-md shadow-custom focus:outline-none flex-grow" placeholder="email" readOnly={readOnly} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <input type="text" className="bg-transparent p-2 w-2/5 rounded-md shadow-custom focus:outline-none" placeholder="status" readOnly={readOnly} value={status || ""} onChange={(e) => setStatus(e.target.value)} />
                    <div className="flex flex-row w-full gap-2">
                        <textarea className="bg-transparent w-2/5 p-2 h-21 rounded-md shadow-custom focus:outline-none resize-none" placeholder="Bio" readOnly={readOnly} value={bio || ""} onChange={(e) => setBio(e.target.value)}></textarea>
                        <div className="p-2 shadow-custom rounded-md">
                            <p className="mb-2">Upload a Avatar for your Profile</p>
                            <input type="file" className={`block w-full text-sm ${textColor} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:${textColor} file:bg-transparent file:shadow-custom file:font-semibold ${readOnly ? "" : "file:cursor-pointer"}`} readOnly={readOnly} disabled={readOnly} onChange={handleUpload} />                        </div>
                    </div>
                </div>
                <button className="bg-transparent p-2 rounded-md shadow-custom hover:scale-105" onClick={() => logout()}>Logout</button>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-xl mb-2">Account behaviour</p>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <p id="delete_warning" className={`${removeWarning === 1 ? "" : "hidden"}`}>Deleting your account will result in the deletion of all your account data, including personal information and preferences.
                        Please note that chat messages will remain unaffected. <br /> This action cannot be undone.</p>
                    <p id="cannow_delete_message" className={`${removeWarning === 2 ? "" : "hidden"}`}>Were sad to see a member of chirp going. <br /> But u can delete your account now with another click at the delete button</p>
                    <div className="flex justify-center">
                        <button className="bg-transparent w-5/6 duration-300 ease-in-out transform p-2 rounded-md shadow-custom hover:scale-105" onClick={() => handleRemove()}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function NotificationFunc() {
    const [notificationSound, setNotificationSound] = useState<string | undefined>(session.config.data?.notifications.sound)
    const [muteTime, setMuteTime] = useState<number | undefined>(session.config.data?.notifications.mute)

    function notificationSoundFunc(selectedSound: string) {
        session.config.modifyConfig("notifications", "sound", selectedSound)
        setNotificationSound(selectedSound)
    }

    function muteFunc(selectedMuteTime: number) {
        session.config.modifyConfig("notifications", "mute", selectedMuteTime)
        setMuteTime(selectedMuteTime)
    }

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Change notification sound</p>
                <div className="flex gap-2">
                    {env.NotificationSounds.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${notificationSound === item ? "" : "hover:scale-105"} ${notificationSound === item ? textaccent : ""}`} disabled={notificationSound === item} onClick={() => notificationSoundFunc(item)}>{item}</button>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Mute notifications</p>
                <div className="flex gap-2">
                    {env.MutePeriod.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${muteTime === item.key ? "" : "hover:scale-105"} ${muteTime === item.key ? textaccent : ""}`} disabled={muteTime === item.key} onClick={() => muteFunc(item.key)}>{item.displayName}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function ChatSettingsFunc() {
    const themes = ["light", "dark"]
    const [selectedTheme, setSelectedTheme] = useState<string | undefined>(session.config.data?.chat.theme)

    const [chatDetails, setChatDetails] = useState<boolean | undefined>(session.config.data?.chat.details)

    function themeFunc(theme: string) {
        session.config.modifyConfig("chat", "theme", theme)
        setSelectedTheme(theme)
    }

    function detailsFunc(details: boolean) {
        session.config.modifyConfig("chat", "details", details)
        setChatDetails(details)
    }

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Change CHIRP themes</p>
                <div className="flex gap-2">
                    {themes.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${selectedTheme === item ? "" : "hover:scale-105"} ${selectedTheme === item ? textaccent : ""}`} disabled={selectedTheme === item} onClick={() => themeFunc(item)}>{item}</button>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Show Chat or Group details</p>
                <button className={`bg-transparent p-2 rounded-md shadow-custom ${chatDetails ? "" : textaccent}`} onClick={() => detailsFunc(!chatDetails)}>{chatDetails ? "enabled" : "disabled"}</button>
            </div>
        </div>
    )
}

export function PrivacyFunc() {

    interface blockedUserType {
        userName: string;
        id: number;
    }

    const privacyLevels = [{ displayName: "every one", level: 1 }, { displayName: "just my friends", level: 2 }, { displayName: "no one", level: 3 }]
    const [meetInviteLevel, setMeetInviteLevel] = useState<number | undefined>(session.config.data?.privacy.meetInviteLevel)
    const [friendInviteLEvel, setFriendInviteLEvel] = useState<number | undefined>(session.config.data?.privacy.friendInviteLEvel)

    const [blockedUser, setBlockedUser] = useState<blockedUserType[]>([{ userName: "Currently no blocked user", id: 0 }])
    const [userError, setUserError] = useState<boolean>(false)
    const [userInput, setUserInput] = useState<number | undefined>(undefined)

    function meetInviteLevelFunc(level: number) {
        session.config.modifyConfig("privacy", "meetInviteLevel", level)
        setMeetInviteLevel(level)
    }

    function friendInviteLEvelFunc(level: number) {
        session.config.modifyConfig("privacy", "friendInviteLEvel", level)
        setFriendInviteLEvel(level)
    }

    async function handleBlockUser(userId: number) {
        let url = `${env.API_URL}/users/${userId}`
        if (userId !== 0) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("auth")}`,
                },
            });
            const data = await response.json();
            switch (response.status) {
                case 200:
                    if (blockedUser[0] && (blockedUser[0].id === 0 || blockedUser[0].id === undefined)) {
                        setBlockedUser([{ userName: data.username, id: userId }])
                    } else {
                        if (blockedUser.some(user => user.id === userId)) {
                            setBlockedUser([...blockedUser, { userName: data.username, id: userId }]);
                            //setUserError(true)
                            //console.log("already in blockedUser");
                        } else {
                            setUserError(false)
                            setBlockedUser([...blockedUser, { userName: data.username, id: userId }]);
                        }
                    }
                    break;
                case 404:
                    setUserError(true)
                    console.log("User Not found")
                    break;
            }
        }
    }

    function handleKeyPressed(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleBlockUser(userInput || 0)
        }
    }

    function handleRemoveBlock(id: number) {
        setBlockedUser(blockedUser.filter(user => user.id !== id));
    }

    useEffect(() => {
        //fetch blocked user list
    }, [])

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Block user</p>
                <p>Enter User Id to block</p>
                <div className={`flex w-1/2 bg-transparent shadow-custom rounded-md py-1 px-2 mb-8 mt-2 ${userError ? "border-2 border-red-500" : ""}`}>
                    <input type="number" className="flex flex-grow bg-transparent focus:outline-none" onKeyPress={handleKeyPressed} onChange={(e) => setUserInput(Number(e.target.value))} />
                    <img src="/assets/magnifying-glass.png" alt="search" className="w-6 h-6 cursor-pointer" onClick={() => handleBlockUser(userInput || 0)} />
                </div>
                <div id="blockedUserList" className="flex flex-wrap gap-2">
                    {blockedUser.map((item, index) => (
                        <div key={index} className="p-2 shadow-custom rounded-md">
                            {item.userName}
                            <button className={`ml-2 ${item.id === 0 ? "hidden" : ""} ${textColor} hover:text-red-500`} onClick={() => handleRemoveBlock(item.id)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Who can send you a friend request</p>
                <div className="flex gap-2">
                    {privacyLevels.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${friendInviteLEvel === item.level ? "" : "hover:scale-105"} ${friendInviteLEvel === item.level ? textaccent : ""}`} disabled={friendInviteLEvel === item.level} onClick={() => friendInviteLEvelFunc(item.level)}>{item.displayName}</button>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Who can invite you to a meet</p>
                <div className="flex gap-2">
                    {privacyLevels.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${meetInviteLevel === item.level ? "" : "hover:scale-105"} ${meetInviteLevel === item.level ? textaccent : ""}`} disabled={meetInviteLevel === item.level} onClick={() => meetInviteLevelFunc(item.level)}>{item.displayName}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function DataStorageFunc() {
    const [warningMessage, setWarningMessage] = useState(false)
    let cookieSize = document.cookie.length;
    let localStorageSize = JSON.stringify(localStorage).length;

    function handleClear(warningMessage: boolean) {
        if (warningMessage) {
            //remove local all data, logout, jump to login page
            console.log("clear cache")
            Cookies.remove("auth")
            localStorage.clear()
            setWarningMessage(false)
        } else {
            setWarningMessage(true)
        }
    }
    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Data usage</p>
                <div className="flex justify-between mb-2 mr-[50%] p-2 rounded-md shadow-custom">
                    <p>LocalStorage: </p>
                    {
                        localStorageSize > 1024 ?
                            <p>{(localStorageSize / 1024).toFixed(1)} kibibytes</p> : <p>{localStorageSize} bytes</p>
                    }
                </div>
                <div className="flex justify-between mr-[50%] p-2 rounded-md shadow-custom">
                    <p>Cookies: </p>
                    {
                        cookieSize > 1024 ?
                            <p>{(cookieSize / 1024).toFixed(1)} kibibytes</p> : <p>{cookieSize} bytes</p>
                    }
                </div>

            </div>
            <div id="clearCache" className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Clear cache</p>
                <div className={warningMessage ? "" : "hidden"}>
                    <p className={`${textaccent} mb-2`}>Clearing the cache clears all data stored in your browser associated with our CHIRP <br /> service, including that we log you out.</p>
                    <p className={`${textaccent} font-semibold`}>In this process we will clear:</p>
                    <ul className={`${textaccent} mb-4`}>
                        <li>- chaches</li>
                        <li>- cookies</li>
                        <li>- session Storage</li>
                    </ul>
                </div>
                <button className="p-2 rounded-md shadow-custom" onClick={() => handleClear(warningMessage)}>Clear Cache & Stored Data</button>
            </div>
        </div>
    )
}

export function HelpSupportFunc() {
    const [showForm, setShowForm] = useState(false)
    const [label, setLabel] = useState("issue")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const issueDescription = `<h1>Automated ${label} Report</h1> <p>${description}</p>`;

    async function handleReport() {
        event?.preventDefault();
        try {
            const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: 'luca-naujoks',
                repo: 'LF8',
                title: title,
                body: issueDescription,
                assignees: [
                    'luca-naujoks'
                ],
                labels: [
                    label
                ],
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            console.log(response);
            if(response.status === 201) {
                setTitle("")
                setDescription("")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div onClick={() => setShowForm(false)}>
            <form id="form" className={`flex flex-col mt-4  w-[50%] ${showForm ? "" : "hidden"}`} onSubmit={(e) => handleReport()} onClick={(e) => e.stopPropagation()}>
                <p className={`text-sm ${textaccent} mb-4`}>! Reports are submitted as an issue by default if something important broke please select &quot;Report as a Bug&quot;</p>
                <input type="text" className="bg-transparent p-2 shadow-custom rounded-md focus:outline-none mb-2" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" placeholder="Enter a Title" />
                <input type="text" className="bg-transparent p-2 shadow-custom rounded-md focus:outline-none mb-2" value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" placeholder="Describe the issue or bug" />
                <div className="flex gap-4 mb-2">
                    {env.GIT_LABELS.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${label === item ? "" : "hover:scale-105"} ${label === item ? textaccent : ""}`} disabled={label === item} onClick={() => setLabel(item)}>{item}</button>
                    ))}
                </div>
                <button type="submit" className="p-2 rounded-md shadow-custom">Report your {label}</button>
            </form>
            <button className={`p-2 rounded-md shadow-custom ${showForm ? "hidden" : ""}`} onClick={(e) => { e.stopPropagation(); setShowForm(true); }}>Report a problem</button>
        </div>

    )
}