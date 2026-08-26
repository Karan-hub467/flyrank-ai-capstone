import { useState } from 'react'

type DisclosureProps = {
  title: string
  children: React.ReactNode
}

export function Disclosure({ title, children }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false)

  const panelId = `disclosure-panel-${title
    .toLowerCase()
    .replace(/\s+/g, '-')}`

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div id={panelId} role="region">
          {children}
        </div>
      )}
    </div>
  )
}