"use client"
import { useState } from "react";
import { textaccent } from "@/app/layout";
import { env } from "@/env";

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
                <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl mb-2">{`Maybe comming soon ;)`}</p>
                </div>
                <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl mb-2">Change notification sound</p>
                </div>
                <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl mb-2">Mute notifications for a certain period</p>
                </div>
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
                <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl">Data usage</p>
                </div>
                <div id="clearCache" className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl">Clear cache</p>
                    <p className={`${textaccent} mb-2`}>Clearing the cache clears all data stored in your browser associated with our CHIRP <br /> service, including that we log you out.</p>
                    <p className={`${textaccent} font-semibold`}>In this process we will clear:</p>
                    <ul className={`${textaccent} mb-4`}>
                        <li>- chaches</li>
                        <li>- cookies</li>
                        <li>- session Storage</li>
                    </ul>
                    <button className="p-2 rounded-md shadow-custom">Clear Cache</button>
                </div>
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
    }
}

export function getPage(key: string): () => JSX.Element {
    if (key in settingPage) {
        return settingPage[key];
    } else {
        // Return a default function that returns a fallback JSX element
        return () => <div>Page not found</div>;
    }
}

export function HelpSupportFunc() {
    const [showForm, setShowForm] = useState(false)
    const [label, setLabel] = useState("issue")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function handleReport() {
        fetch('https://api.github.com/repos/qwerty084/LF8/issues', {
            method: 'POST',
            headers: {
                'Authorization': `${env.GIT_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: 'title',
                body: 'Issue description',
                labels: label
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <form id="form" className={`flex flex-col mt-4  w-[50%] ${showForm ? "" : "hidden"}`} onSubmit={handleReport}>
                <p className={`text-sm ${textaccent} mb-4`}>! Reports are submitted as an issue by default if something important broke please select "Report as a Bug"</p>
                <input type="text" className="bg-transparent p-2 shadow-custom rounded-md focus:outline-none mb-2" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" placeholder="Enter a Title" />
                <input type="text" className="bg-transparent p-2 shadow-custom rounded-md focus:outline-none mb-2" value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" placeholder="Describe the issue or bug" />
                <div className="flex gap-4 mb-2">
                    {env.GIT_LABELS.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${label === item ? "" : "hover:scale-105"} ${label === item ? textaccent : ""}`} disabled={label === item} onClick={() => setLabel(item)}>{item}</button>
                    ))}
                </div>
                <button type="submit" className="p-2 rounded-md shadow-custom">Report your {label}</button>
            </form>
            <button className={`p-2 rounded-md shadow-custom ${showForm ? "hidden" : ""}`} onClick={() => setShowForm(true)}>Report a problem</button>
        </div>

    )
}

export function DataStorageFunc() {

}

export function PrivacyFunc() {
    const privacyLevels = [{ displayName: "every one", level: 1 }, { displayName: "just my friends", level: 2 }, { displayName: "no one", level: 3 }]
    const [meetInviteLevel, setMeetInviteLevel] = useState<number>(1)
    const [inviteLevel, setInviteLevel] = useState<number>(1)

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Block user</p>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Who can see you</p>
                <div className="flex gap-2">
                    {privacyLevels.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${inviteLevel === item.level ? "" : "hover:scale-105"} ${inviteLevel === item.level ? textaccent : ""}`} disabled={inviteLevel === item.level} onClick={() => setInviteLevel(item.level)}>{item.displayName}</button>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Who can invite you to a meet</p>
                <div className="flex gap-2">
                    {privacyLevels.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${meetInviteLevel === item.level ? "" : "hover:scale-105"} ${meetInviteLevel === item.level ? textaccent : ""}`} disabled={meetInviteLevel === item.level} onClick={() => setMeetInviteLevel(item.level)}>{item.displayName}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function ChatSettingsFunc() {
    const themes = ["light", "dark"]
    const [selectedTheme, setSelectedTheme] = useState<string>("dark")

    const [chatDetails, setChatDetails] = useState<boolean>(true)

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Change CHIRP themes</p>
                <div className="flex gap-2">
                    {themes.map((item, index) => (
                        <button key={index} className={`bg-transparent p-2 rounded-md shadow-custom ${selectedTheme === item ? "" : "hover:scale-105"} ${selectedTheme === item ? textaccent : ""}`} disabled={selectedTheme === item} onClick={() => setSelectedTheme(item)}>{item}</button>
                    ))}
                </div>
            </div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <p className="text-xl mb-2">Show Chat or Group details</p>
                <button className={`bg-transparent p-2 rounded-md shadow-custom ${chatDetails ? "" : textaccent}`} onClick={() => setChatDetails(!chatDetails)}>{chatDetails ? "enabled" : "disabled"}</button>
            </div>
        </div>
    )
}

export function NotificationFunc() {

}

export function AccountFunc() {
    const [readOnly, setReadOnly] = useState(true)
    const [saving, setSaving] = useState(false)

    function handleClick() {
        if(readOnly) {
            setReadOnly(false)
        } else {
            setSaving(true);
            //Timeout simulates the saving process (time till we get a 200 OK back)
            setTimeout(() => {
                console.log("save data");
                setReadOnly(true);
                setSaving(false);
            }, 2000); 
        }
        
    }

    return (
        <div>
            <div className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-xl mb-2">Account Informations</p>
                    <img src={saving? "assets/save-disabled.png" : readOnly? "assets/edit.png" : "assets/save.png"} alt="" className="m-1 w-5 h-5 cursor-pointer" onClick={handleClick}/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <input type="text" className="bg-transparent p-2 w-2/5 mr-2 rounded-md shadow-custom focus:outline-none flex-shrink-0" placeholder="Display Name" readOnly={readOnly} />
                        <input type="text" className="bg-transparent p-2 rounded-md shadow-custom focus:outline-none flex-grow" placeholder="email" readOnly={readOnly} />
                    </div>
                    <input type="text" className="bg-transparent p-2 w-2/5 rounded-md shadow-custom focus:outline-none" placeholder="status" readOnly={readOnly} />
                    <textarea className="bg-transparent p-2 h-20 rounded-md shadow-custom focus:outline-none" placeholder="Bio" readOnly={readOnly}></textarea>
                </div>
            </div>
        </div>
    )
}