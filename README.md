# Decentralized Blogging Platform

This project is a decentralized blogging platform with a frontend built using Next.js and a backend powered by Node.js and Express. The platform allows users to connect their wallets, post blogs, and view them dynamically.

---

## Features
- **Frontend:**
  - Built with Next.js and React.
  - User-friendly interface to create and view blogs.
  - Wallet integration using Web3.
- **Backend:**
  - Node.js API with Express.
  - Endpoints for creating and fetching blog posts.
  - Temporary in-memory storage for blog data.

---

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Navigate to the Folders

#### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the frontend in your browser at:
   ```
   http://localhost:3000
   ```

#### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The backend will run at:
   ```
   http://localhost:5000
   ```

---

## API Documentation

### GET /blogs
**Description:** Fetch all blog posts.

**Response:**
- `200 OK`: Returns an array of blog posts.

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "My First Blog",
    "content": "This is the content of the blog.",
    "walletAddress": "0x123456789abcdef"
  }
]
```

---

### POST /blogs
**Description:** Add a new blog post.

**Request Body:**
```json
{
  "title": "My Blog Title",
  "content": "The blog content goes here.",
  "walletAddress": "0xYourWalletAddress"
}
```

**Response:**
- `201 Created`: Blog post added successfully.
- `400 Bad Request`: If required fields are missing.

**Example Response:**
```json
{
  "id": 1,
  "title": "My Blog Title",
  "content": "The blog content goes here.",
  "walletAddress": "0xYourWalletAddress"
}
```

---

## Notes
- Data is stored in memory and will be lost when the server restarts.
- Ensure the frontend communicates with the backend using the correct `http://localhost:5000` URL.



