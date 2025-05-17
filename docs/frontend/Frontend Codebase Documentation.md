# UNiTEC Frontend Codebase Documentation

Welcome to the documentation for the UNiTEC frontend!  
This guide provides an overview of the main components, hooks, types, and styles, with references to their TSDoc annotations for clarity and maintainability.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Main Application Entry](#main-application-entry)
- [UI Components](#ui-components)
- [Session & Registration Components](#session--registration-components)
- [Feed & Job Offers](#feed--job-offers)
- [Hooks](#hooks)
- [Types](#types)
- [Styles](#styles)
- [Conventions](#conventions)

---

## Project Structure

```
src/
  components/
    App.tsx
    feed/
    offers/
    session/
    UI/
  global/
  hooks/
  styles/
  types/
main.tsx
```

---

## Main Application Entry

### [`App.tsx`](../../src/components/App.tsx)

```tsx
/**
 * @file App.tsx
 * @description The main entry point of the application, responsible for routing and session management.
 * It initializes the app, sets up Axios interceptors, and defines the routes for the application.
 * @date May 11, 2025
 * @Author: Haziel Magallanes
 */
```

- **Purpose:** Handles routing, session management, and Axios configuration.
- **Key Features:**
  - Reads session cookies to determine login state.
  - Sets up routes for login, registration, password reset, and the main feed.
  - Configures Axios for API communication.

---

## UI Components

### [`UI/Label.tsx`](../../src/components/UI/Label.tsx)

```tsx
/**
 * @file Label.tsx
 * @description A reusable React component for displaying a styled label with optional delete functionality.
 * Converts width and height from Figma units to responsive pixels based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Props:** `text`, `width`, `height`, `style`, `className`, `onDelete`
- **Usage:** For displaying tags or labels with optional removal.

---

### [`UI/LabelsContainer.tsx`](../../src/components/UI/LabelsContainer.tsx)

```tsx
/**
 * @file LabelsContainer.tsx
 * @description A reusable React component for displaying a styled label with optional delete functionality.
 * Converts width and height from Figma units to responsive pixels based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Purpose:** Groups multiple labels together in a styled container.

---

### [`UI/LabelsSelection.tsx`](../../src/components/UI/LabelsSelection.tsx)

```tsx
/**
 * @file LabelsSelection.tsx
 * @description A reusable React component for selecting languages and labels with checkboxes in a responsive layout.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Purpose:** Allows users to select languages and labels with checkboxes.

---

### [`UI/Notification.tsx`](../../src/components/UI/Notification.tsx)

```tsx
/**
 * @file Notification.tsx
 * @description A reusable React component for displaying notification messages in a responsive box.
 * Converts width from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */
```

- **Purpose:** Displays notifications with read/unread indicators.

---

### [`UI/JobOffer.tsx`](../../src/components/UI/JobOffer.tsx)

```tsx
/**
 * @component
 * @returns {JSX.Element} A styled window displaying the job offer with author info and overflow handling.
 * @example
 * <JobOffer authorId={1} title="Frontend Developer" description="Join our team!" width={300} height={200} />
 * @author Haziel Magallanes
 */
```

- **Purpose:** Shows job offer details, author info, and handles content overflow.

---

### [`UI/TextBox.tsx`](../../src/components/UI/TextBox.tsx)

```tsx
/**
 * @file TextBox.tsx
 * @description A reusable React component for creating responsive text areas in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Purpose:** For multi-line text input in forms.

---

### [`UI/SelectionField.tsx`](../../src/components/UI/SelectionField.tsx)

```tsx
/**
 * @file SelectionField.tsx
 * @description A reusable React component for creating responsive select dropdowns.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Purpose:** For dropdown selection in forms.

---

## Session & Registration Components

### [`session/RegisterUser.tsx`](../../src/components/session/RegisterUser.tsx)

```tsx
/**
 * @file RegisterUser.tsx
 * @description A reusable React component for rendering a responsive student registration form.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

- **Purpose:** Student registration form with validation and responsive design.

---

### [`session/RegisterEnterprise.tsx`](../../src/components/session/RegisterEnterprise.tsx)

```tsx
/**
 * @component
 * @returns {JSX.Element} A styled window containing the enterprise registration form.
 * @example
 * <RegisterEnterprise />
 * @author Daviel Díaz Gonzáles
 */
```

- **Purpose:** Enterprise registration form.

---

## Feed & Job Offers

### [`feed/FeedBox.tsx`](../../src/components/feed/FeedBox.tsx)

```tsx
/**
 * @component
 * @returns {JSX.Element} A responsive feed layout with job offers, notifications, and navigation bar.
 * @example
 * <FeedBox />
 * @author Haziel Magallanes
 */
```

- **Purpose:** Main feed displaying job offers and notifications.

---

## Hooks

### [`hooks/responsive/useWindowSize.tsx`](../../src/hooks/responsive/useWindowSize.tsx)

```tsx
/**
 * Custom React hook that tracks the current window size and triggers a re-render
 * of the component whenever the window is resized. Useful for implementing
 * responsive layouts that depend on the viewport dimensions.
 * @returns An object containing the current `width` and `height` of the window.
 * @example
 * const windowSize = useWindowSize();
 * @Author Haziel Magallanes
 */
```

- **Purpose:** Provides responsive layout support.

---

## Types

### [`types/JobOffer.ts`](../../src/types/JobOffer.ts)

```ts
/**
 * @file JobOffer.ts
 * @description Type definition for a job offer object as returned by the backend API.
 * Includes all attributes present in the job offer response.
 * @author Haziel Magallanes
 * @date May 17, 2025
 */
```

- **Purpose:** Type definition for job offers.

---

### [`types/notification.ts`](../../src/types/notification.ts)

```ts
/**
 * @file notification.ts
 * @description Type definition for Notification objects used in the application.
 * Represents the structure of a notification as received from the backend.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */
```

- **Purpose:** Type definition for notifications.

---

### [`types/Response.ts`](../../src/types/Response.ts)

```ts
/**
 * @file Response.ts
 * @description Type definitions for standard API responses used throughout the application.
 * Provides a generic interface for typed backend responses, including status, message, and optional data.
 * Used by components such as Notification.tsx to ensure type safety when handling API data.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */
```

- **Purpose:** Type definition for API responses.

---

## Styles

### [`styles/globals.css`](../../src/styles/globals.css)

```css
/**
 * @file globals.css
 * @description Global stylesheet for UNITEC application. Defines CSS variables, resets, and base styles for consistent appearance across the app.
 * Includes color palette, font settings, and link styles.
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

---

### [`styles/index.css`](../../src/styles/index.css)

```css
/**
 * @file index.css
 * @description Main stylesheet for the UNiTEC application. Provides responsive, accessible, and visually consistent styles for all UI components.
 * Includes global variables, typography, layout, form elements, navigation, job offers, notifications, and utility classes.
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
```

---

## Conventions

- **TSDoc Tags Used:**  
  `@file`, `@description`, `@date`, `@author`,  
  `@component`, `@returns`, `@example`, `@property`, `@template`, `@extends`

- **Authoring:**  
  All major files and components are annotated with author and date for traceability.

- **Responsiveness:**  
  Most UI components use Figma coordinate translation for responsive design.

---

## Example Usage

```tsx
import App from './components/App';

function Main() {
  return <App />;
}
```

---

For further details, refer to the TSDoc comments in each file or explore the codebase directly.

---