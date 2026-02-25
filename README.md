## Notes Project

An easy-to-run **full-stack notes application** built with a **React + Vite** frontend and a **Node.js + Express + MongoDB** backend.  
This project is designed to be beginner-friendly: you can clone it, install dependencies, and start creating notes in just a few steps.

---

### Why this project is useful

- **Practice full‑stack development**: See how a frontend and backend talk to each other.
- **Learn REST APIs**: Understand how routes like `GET /api/notes` or `POST /api/notes` work.
- **Work with a real database**: Store notes in MongoDB using Mongoose models.
- **Understand rate limiting**: See how Upstash Redis is used to protect APIs from abuse.

---

### Demo flow (what the app does)

- **Open the app** in your browser.
- **Create a new note** with a title and content.
- **See your notes listed** on the page.
- **Edit or delete** any existing note.
- All actions go through the **Express API**, which talks to **MongoDB** to save your data.

---

### Tech Stack

- **Frontend**
  - React (with `StrictMode`)
  - Vite (development server & build tool)
  - React Router (for navigation)
  - React Hot Toast (for success/error popups)
  - Tailwind CSS + DaisyUI (for styling and components)

- **Backend**
  - Node.js + Express
  - Mongoose (MongoDB ODM)
  - dotenv (environment variables)
  - CORS
  - Custom middleware (rate limiter)

- **Services**
  - MongoDB (stores notes)
  - Upstash Redis (rate limiting)

---

### Project Structure (high level)

```text
Notes Project/
  backend/
    src/
      server.js           # Express app entry point
      config/
        db.js             # MongoDB connection
        upstash.js        # Upstash Redis rate limit config
      middleware/
        rateLimiter.js    # Rate limiting middleware
      routes/
        notesRoutes.js    # Notes API routes
      controllers/        # (Handles logic for each route)
      models/             # (Mongoose schemas for notes)

  frontend/
    src/
      main.jsx            # React entry, BrowserRouter, Toaster
      App.jsx             # Main app layout & routes
      components/         # Reusable UI pieces
      lib/axios.js        # Preconfigured Axios instance
    index.css             # Tailwind / global styles
```

> **Tip for beginners**: You don’t need to understand every folder on day one.  
> Start by running the project, then slowly open files like `server.js`, `notesRoutes.js`, and `App.jsx` to see how things connect.

---

### 1. Prerequisites (before you start)

- **Node.js** (LTS version recommended) and **npm** installed.
- A **MongoDB connection string**:
  - You can use a local MongoDB instance (e.g. `mongodb://127.0.0.1:27017/notes_db`)  
  - Or a hosted service like MongoDB Atlas.
- (Optional but recommended) an **Upstash Redis** URL and token for production‑ready rate limiting.

If you are just testing locally and don’t want to set up Upstash yet, you can:
- Keep the rate limiter but use test credentials, or
- Temporarily disable the rate limiter middleware in `server.js` (for learning only, not for production).

---

### 2. How to clone and open the project

1. **Clone the repository** (or download the ZIP):

   ```bash
   git clone <your-repo-url> "Notes Project"
   cd "Notes Project"
   ```

2. You now have two main folders inside:
   - `backend/`
   - `frontend/`

You will run **two terminals**: one for the backend API, one for the frontend UI.

---

### 3. Backend – Step‑by‑step setup

1. **Install backend dependencies**:

   ```bash
   cd backend
   npm install
   ```

2. **Create a `.env` file** inside the `backend/` folder.  
   This file is **not** committed to git and should stay private.

   Example `.env`:

   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/notes_db
   PORT=5001

   # Optional but used for rate limiting with Upstash
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

   NODE_ENV=development
   ```

   - **MONGO_URI**: where your MongoDB server lives.
   - **PORT**: the port for the backend (default `5001`).
   - **NODE_ENV**:
     - `development` → enables CORS for `http://localhost:5173`.
     - `production` → backend will serve the built frontend.

3. **Run the backend in development mode**:

   ```bash
   npm run dev
   ```

   If everything works, you should see a message like:

   - `MONGODB CONNECTED SUCCESSFULLY!`
   - `Server started on PORT: 5001`

4. **Test the backend quickly** (optional but helpful for beginners):

   - Open your browser and go to: `http://localhost:5001/api/notes`
   - Or use a tool like Postman / Thunder Client.

   You should get either an empty list of notes or some JSON output.

---

### 4. Frontend – Step‑by‑step setup

1. Open a **new terminal** (keep the backend running), then:

   ```bash
   cd frontend
   npm install
   ```

2. **Run the frontend dev server**:

   ```bash
   npm run dev
   ```

3. Vite will show you a URL like:

   - `http://localhost:5173`

4. Open that URL in your browser.  
   When you create/update/delete notes, the frontend will call the backend at `http://localhost:5001/api/notes`.

> **If you see CORS errors**:  
> Make sure `NODE_ENV` in your backend `.env` is **not** set to `"production"` while you’re developing locally.

---

### 5. How it works (high level)

- **`backend/src/server.js`**
  - Creates an Express app.
  - Connects to MongoDB via `connectDB()` from `config/db.js`.
  - Adds JSON parsing middleware and the rate limiting middleware.
  - Mounts `notesRoutes` at `/api/notes`.
  - In production, serves the built React app from `frontend/dist`.

- **`backend/src/routes/notesRoutes.js`**
  - Defines routes:
    - `GET /` → get all notes
    - `GET /:id` → get a note by ID
    - `POST /` → create a new note
    - `PUT /:id` → update a note
    - `DELETE /:id` → delete a note
  - Each route calls a controller function in `controllers/notesController.js`.

- **`backend/src/middleware/rateLimiter.js`**
  - Uses Upstash to limit how many requests can be made in a time window.
  - If too many requests are made, the API returns **429 Too Many Requests** with a friendly message.

- **`frontend/src/main.jsx`**
  - Renders the React app into the `root` element.
  - Wraps the app in `BrowserRouter` (for routing) and `Toaster` (for toasts).

- **`frontend/src/lib/axios.js`**
  - Typically contains a preconfigured Axios instance that points to the backend base URL.

---

### 6. Running in production (single server)

In production, the backend can serve the built frontend. Basic flow:

1. **Build the frontend**:

   ```bash
   cd frontend
   npm install      # if not already done
   npm run build
   ```

   This creates a `dist/` folder inside `frontend/`.

2. **Configure the backend for production**:

   - In `backend/.env`, set:

     ```bash
     NODE_ENV=production
     PORT=5001   # or another port if you prefer
     ```

3. **Start the backend**:

   ```bash
   cd backend
   npm install      # if not already done
   npm start
   ```

4. Now visit:

   - `http://localhost:5001` → you should see the React app served directly by Express.

---

### 7. API Reference (for testing with Postman/Thunder Client)

Base URL (development):

- `http://localhost:5001/api/notes`

**Routes:**

- **GET** `/api/notes`
  - Returns a list of all notes.

- **GET** `/api/notes/:id`
  - Returns a single note by its MongoDB ID.

- **POST** `/api/notes`
  - Creates a new note.
  - Example JSON body:

    ```json
    {
      "title": "First note",
      "content": "This is my first note"
    }
    ```

- **PUT** `/api/notes/:id`
  - Updates an existing note.

- **DELETE** `/api/notes/:id`
  - Deletes the note with the given ID.

> **Remember**: Because of rate limiting, making too many requests quickly can return a `429` response.

---

### 8. Common npm scripts

In the **backend** (`backend/package.json`):

- `npm run dev` – start the server with live reload (development).
- `npm start` – start the server for production.

In the **frontend** (`frontend/package.json`):

- `npm run dev` – run the React app in dev mode.
- `npm run build` – create a production build.
- `npm run preview` – preview the production build locally.

---

### 9. Tips for beginners

- Don’t try to understand *everything* at once.
- Start the frontend and backend, then:
  - Open the browser DevTools (`F12`), go to **Network**, and watch the requests to `/api/notes`.
  - Open files like `server.js` and `App.jsx` side by side to see how a button click becomes an API call.
- Make small changes (like editing text or console logs), then refresh and observe what changes.

---

### 10. Contributing / Customizing

- **Change the UI**: Edit React components under `frontend/src/components`.
- **Add fields to notes**: Update the Mongoose model in `backend/src/models`, the controllers, and the frontend forms.
- **Adjust rate limiting**: Modify the configuration in `backend/src/config/upstash.js`.

Feel free to fork this project, experiment, and use it as a base for your own ideas.

