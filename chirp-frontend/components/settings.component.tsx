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
        return (
            <div>
                <h1 className="text-2xl">Help & Support</h1>
                <p>FAQs</p>
                <p>Report a problem directly into our GitHub Repository</p>
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