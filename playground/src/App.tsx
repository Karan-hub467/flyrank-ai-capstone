import { useState } from 'react'
import { Modal } from './Modal'
import { Tabs } from './Tabs'
import { Disclosure } from './Disclosure'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <p>This is the overview tab.</p>,
    },
    {
      id: 'details',
      label: 'Details',
      content: <p>Here are the details.</p>,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: <p>Here are the reviews.</p>,
    },
  ]

  return (
    <main>
      <h1>Accessible Components Playground</h1>

      <section>
        <h2>Modal Dialog</h2>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <p>This modal can be closed with Escape.</p>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </Modal>
      </section>

      <section>
        <h2>Tabs</h2>
        <Tabs tabs={tabs} />
      </section>

      <section>
        <h2>Disclosure</h2>
        <Disclosure title="More Information">
          <p>This content can be expanded and collapsed.</p>
        </Disclosure>
      </section>
    </main>
  )
}

export default App