# WhatsApp Dashboard REST API

## 📌 Project Overview
This is a REST API for managing captions and user authentication in a WhatsApp dashboard. The API allows users to register, log in, and manage captions with various filtering options.

## 🛠️ Technologies Used
- **Node.js** with **Express.js** for backend development
- **Sequelize** ORM for database management
- **PostgreSQL** as the database 
- **JWT (JSON Web Tokens)** for authentication
- **bcrypt.js** for password hashing
- **dotenv** for environment variable management

## 🚀 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/frankymelero/whatsapp-dashboard-rest-api.git
cd whatsapp-dashboard-rest-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Rename .env.example file to `.env`, and fill same with the required information.

Or create a `.env` file in the root directory and add the following:
```
PORT=desired_port
DB_URL=your_pg_connection_url
JWT_SECRET=your_secret
```

### 4️⃣ Start the Server
```bash
npm run dev
```

The API will be running on `http://localhost:3000` (or your configured port in `.env`).

---

## 📖 API Documentation
### 🔑 Authentication Endpoints
#### 1️⃣ Register a new user
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

#### 2️⃣ Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "your_jwt_token_here"
}
```

---

### 📝 Caption Endpoints
All requests to caption routes require authentication using a JWT token in the `Authorization` header.

#### 1️⃣ Add a Caption
**POST** `/api/captions/add`

**Request Body:**
```json
{
  "url": "https://example.com/video",
  "title": "Sample Caption",
  "urltype": "video"
}
```

**Response:**
```json
{
  "id": 1,
  "url": "https://example.com/video",
  "title": "Sample Caption",
  "urltype": "video"
}
```

#### 2️⃣ Get All Captions
**GET** `/api/captions/`

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://example.com/video",
    "title": "Sample Caption",
    "urltype": "video"
  }
]
```

#### 3️⃣ Get Captions by URL Type
**GET** `/api/captions/urltype/:urltype`

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://example.com/video",
    "title": "Sample Caption",
    "urltype": "video"
  }
]
```

#### 4️⃣ Get Most Recent Captions
**GET** `/api/captions/recent?startDate=2025-03-01&endDate=2025-03-09`

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://example.com/video",
    "title": "Sample Caption",
    "urltype": "video",
    "sharedDate": "2025-03-09T00:00:00.000Z"
  }
]
```

#### 5️⃣ Update a Caption
**PUT** `/api/captions/:id`

**Request Body:**
```json
{
  "title": "Updated Caption Title"
}
```

**Response:**
```json
{
  "message": "Caption updated successfully"
}
```

#### 6️⃣ Delete a Caption
**DELETE** `/api/captions/:id`

**Response:**
```json
{
  "message": "Caption deleted successfully"
}
```

---

## 🔐 Authentication Middleware
All **caption** endpoints require authentication via a Bearer token in the `Authorization` header.

Example:
```
Authorization: Bearer your_jwt_token_here
```

---

## 📜 License
## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---


