"use client"
import { useState } from "react";
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
            <h1 className="text-2xl">Account</h1>
            <p>Manage your account settings</p>
        </div>)
    },
    notification: () => {
        return (
            <div>
                <h1 className="text-2xl">notification</h1>
                <p>Change notification sound</p>
                <p>Mute notifications for a certain period</p>
            </div>
        )
    },
    chatSettings: () => {
        return (
            <div>
                <h1 className="text-2xl">chat Settings</h1>
                <p>Change chat colors and themes</p>
                <p>Enable or disable chat heads</p>
            </div>
        )
    },
    privacy: () => {
        return (
            <div>
                <h1 className="text-2xl">privacy</h1>
                <p>Block users</p>
                <p>Who can see your stories</p>
                <p>Who can contact you</p>
            </div>
        )
    },
    dataStorage: () => {
        return (
            <div>
                <h1 className="text-2xl">Data & Storage</h1>
                <p>Manage data usage</p>
                <p>Clear cache</p>
            </div>
        )
    },
    helpSupport: () => {
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
                    labels: ['bug', 'ui']
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
        }

        return (
            <div>
                <h1 className="text-2xl mb-12">Help & Support</h1>
                <div id="faq" className="shadow-custom mb-8 w-[50%] p-2 rounded-md">
                    <p className="text-xl">FAQs</p>
                    <span>get more informations about Chirp </span><a href="https://github.com/qwerty084/LF8" className="text-blue-500" target="blank">here</a>
                </div>

                <div id="problems" className="shadow-custom w-[50%] p-2 rounded-md">
                    <p className="text-xl mb-4">Report a problem directly into our GitHub Repository</p>
                    <span className="text-sm mb-4">! Reports are submitted as an issue by default if something important broke select "Report as a Bug"</span>
                    <ReportForm />

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

export function ReportForm() {
    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            <form id="form" className={`flex flex-col mt-4 mb-8 w-[50%] ${showForm ? "" : "hidden"}`}>
                <input type="text" className="bg-transparent focus:outline-none mb-2" name="title" id="title" placeholder="Enter a Title" />
                <input type="text" className="bg-transparent focus:outline-none mb-2" name="description" id="description" placeholder="Describe your issue/bug" />
                <div>
                    <input type="checkbox" className="bg-transparent focus:outline-none mb-2" name="bug or Issue" id="bug" />
                    <label htmlFor="bug"> Report as a Bug?</label>
                </div>
                <button type="submit"></button>
            </form>
            <button className="p-2 rounded-md border-2" onClick={() => setShowForm(true) }>Report Bug or Issue</button>
        </div>

    )
}