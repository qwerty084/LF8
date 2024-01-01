"use client"
import { useState } from "react"
import { getPage } from "@/components/settings.component"
import Cookies from "js-cookie"

export default function Settings() {
    const topics = [
        { key: "account", displayName: "Account Settings" },
        { key: "notification", displayName: "Notifications" },
        { key: "chatSettings", displayName: "Chat Settings" },
        { key: "privacy", displayName: "Privacy" },
        { key: "dataStorage", displayName: "Data & Storage Settings" },
        { key: "helpSupport", displayName: "Help & Support" }
    ]
    const [selectedSetting, setSelectedSetting] = useState("privacy")

    const [showForm, setShowForm] = useState(false)

    function logout() {
        Cookies.remove("auth")
        window.location.href = "/login"
    }

    return (
        <div id="body" className="flex flex-row flex-grow">
            <div className="flex flex-col w-24 h-full shadow-custom">
                <div className="flex items-end justify-center h-full mb-4">
                </div>
            </div>
            <div className="flex flex-col justify-items-start w-1/6">
                <div className="flex flex-row w-full px-2 py-1 mb-4 gap-2 mt-4 cursor-default" >
                    <p className="flex justify-center w-full text-xl">Settings</p>
                </div>
                {topics.map((item, index) => (
                    <div key={index} className={`flex flex-row justify-between px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none ${selectedSetting === item.key ? "shadow-md" : ""}`} onClick={() => setSelectedSetting(item.key)}>
                        {item.displayName} <p className={`mr-4  ${selectedSetting === item.key ? "" : "hidden"}`}>{'-->'}</p>
                    </div>
                ))}
                <div className={`flex flex-row justify-between px-2 py-1 gap-2 mt-4 ml-4 cursor-pointer rounded-md transition duration-300 hover:shadow-md hover:rounded-r-none`} onClick={() => logout()}>
                        Logout
                    </div>
            </div>
            <div className="flex flex-grow justify-between shadow-custom">
                <div id="settings-body" className="p-4 w-full">
                {getPage(selectedSetting)()}
                </div>
            </div>
        </div>
    )
}