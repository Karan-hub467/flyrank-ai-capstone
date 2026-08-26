# Accessibility Notes

## Handwritten Components vs shadcn/ui

After comparing my handwritten Modal and Tabs components with the generated shadcn/ui components, I found several differences.

### 1. Focus management

My handwritten modal manually manages focus and implements a basic focus trap. The shadcn Dialog provides more robust focus management, including handling focus when the dialog opens and restoring focus when it closes.

### 2. Keyboard interaction

My handwritten components implement the main keyboard interactions manually, such as Escape for closing the modal and Arrow keys for navigating tabs. The shadcn components provide more comprehensive keyboard behavior and interaction handling.

### 3. Accessibility relationships

The shadcn components automatically manage important ARIA relationships and states between triggers, content, and controls. My handwritten versions require these relationships to be implemented manually.

### 4. Edge cases

The generated shadcn components handle more edge cases around focus, interaction, and component lifecycle than my initial handwritten implementations.

## What I Learned

Building the components by hand helped me understand the accessibility requirements before using an open-code component library. Reading the generated shadcn source showed me how much accessibility behavior needs to be considered beyond simply adding ARIA attributes.