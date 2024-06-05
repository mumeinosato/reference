import React from "react"
import classnames from "classnames"

interface TabProps {
    tabs: {id:string; label: string}[];
    activeTab: string;
    onTabClick: (tabId: string) => void;
}

const Tab: React.FC<TabProps> = ({tabs, activeTab, onTabClick, children}) => {
    return(
        <div className="tab-container">
            <ul className="tab">
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <button
                            type="button"
                            className={classnames({"active-tab": tab.id === activeTab})}
                            onClick={() => {
                                onTabClick(tab.id)
                            }}
                            >
                                {tab.label}
                            </button>
                    </li>
                ))}
            </ul>
            <div className="tab-content">{children}</div>
        </div>
    )
}

export default Tab;