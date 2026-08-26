import { useState } from 'react'

type Tab = {
  id: string
  label: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextTab = activeTab

    if (event.key === 'ArrowRight') {
      nextTab = (activeTab + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextTab = (activeTab - 1 + tabs.length) % tabs.length
    } else {
      return
    }

    event.preventDefault()
    setActiveTab(nextTab)

    const nextButton = document.getElementById(`tab-${tabs[nextTab].id}`)
    nextButton?.focus()
  }

  const activePanel = tabs[activeTab]

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Content tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={handleKeyDown}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${activePanel.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activePanel.id}`}
        tabIndex={0}
      >
        {activePanel.content}
      </div>
    </div>
  )
}