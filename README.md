# Note Calendar

A web application for managing daily notes in a calendar format. Users can easily edit notes for specific dates and view a monthly calendar to keep track of their notes.

**Live Demo:** [note-calendar.netlify.app](https://note-calendar.netlify.app/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites

- Node.js (version 20.11.0 or higher)
- A [Supabase](https://supabase.com/) account for backend and authentication

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/lizraeli  /note-calendar.git
   ```
2. Navigate to the project directory:
   ```bash
   cd note-calendar
   ```
3. Install dependencies for the frontend:
   ```bash
   npm install
   ```
4. Set up your Supabase backend and update your configuration in the `.env` file (example file can be found in `.env.example`).

## Usage

### Available Routes

- **Edit Notes for a Specific Date**
  - Route: `/day/YYYY-MM-DD`
  - Example: `/day/2023-10-19`

- **View Monthly Calendar**
  - Route: `/year/YYYY/month/MM`
  - Example: `/year/2023/month/10`

After setting up, run the application:
```bash
npm run dev
```
You can access the app at `http://localhost:5173`.

## Features

- Edit and save notes for each day
- View notes in a monthly calendar layout
- User authentication using Supabase
- Responsive design with CSS Modules
- Text editing with TipTap

## Technologies

- **Frontend:**
  - [Vite](https://vitejs.dev/) - Build tool
  - [TypeScript](https://www.typescriptlang.org/) - For static type checking
  - [React](https://reactjs.org/) - Frontend library
  - [SupabaseJS](https://supabase.com/docs/reference/javascript) - Client for connecting to Supabase
  - [TipTap](https://tiptap.dev/) - Rich text editor
  - [CSS Modules](https://github.com/css-modules/css-modules) - For modular and reusable styles
  - [PostCSS Preset Env](https://preset-env.cssdb.org/) - Converts modern CSS into something most browsers can understand

- **Backend:**
  - Supabase - Database and authentication service

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.