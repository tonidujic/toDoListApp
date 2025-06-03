# ToDo App with Authentication

A simple ToDo application with user authentication features, built with vanilla JavaScript, HTML, and CSS.

## Features

- User registration (Sign Up)
- User login (Sign In)
- Sign out functionality
- Task management: add and delete tasks
- UI visibility control: Only logged-in users can see the task list and user list
- Data persistence using `localStorage`
- Responsive and user-friendly interface

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- No backend required; uses `localStorage` for data storage

### How to run

1. Clone or download the repository
2. Open `index.html` in your browser
3. Use the Sign Up form to create a new user or log in with existing credentials
4. After login, you can add tasks and see the user list
5. Use the Sign Out button to log out

## Project Structure

- `index.html` — main HTML file
- `style.css` — styles for the app
- `todoApp.js` — task management logic
- `listingInformation.js` — user data and authentication helpers

## How It Works

- When the app loads, only the login and signup forms are visible.
- Upon successful login, the app shows the task list and user list sections.
- Sign Out button logs the user out, clears the current user session, and returns to the login/signup screen.
- Tasks and users are saved in `localStorage`, so data persists between page reloads.

## Future Improvements

- Connect to a backend API for real user management and persistent storage
- Improve form validations and error handling
- Add password encryption for security

## License

This project is open source and free to use.

---

If you have any questions or suggestions, feel free to open an issue or contact me!
