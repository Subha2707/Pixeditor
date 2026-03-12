# 🚀 FileConverter Pro

A modern **MERN Stack web application** that allows users to **convert and compress images instantly** with a clean UI and powerful backend processing.

Built with **React, Node.js, Express, and MongoDB**, this project provides fast, secure, and efficient file processing directly from your browser.

---

# 🌐 Features

### 🔄 Image Conversion

Convert images into multiple formats:

* PNG
* JPG
* JPEG
* WEBP
* PDF

---

### 🗜 Image Compression

Reduce image size using:

* Adjustable **quality percentage**
* **Target size (KB)** compression
* Smart optimization using **Sharp**

---

### 📜 Conversion History

Track all your previous conversions including:

* Original filename
* Converted format
* Conversion records stored in MongoDB

---

### 👤 Authentication System

Secure login system with:

* User registration
* JWT authentication
* Protected API routes

---

### 🎨 Modern UI

* Responsive design
* Gradient animated background
* Drag & drop file upload
* Image preview before conversion
* Before/After compression comparison

---

# 🛠 Tech Stack

## Frontend

* React
* React Router
* Axios
* React Icons
* CSS (Glassmorphism UI)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* Sharp
* JWT Authentication

---

# 📂 Project Structure

```
FileConverter-Pro
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │── pages  
│   │   │   ├── About.jsx
│   │   │   ├── Compress.jsx
│   │   │   ├── Converter.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │   └── main.jsx
│
├── server
│   ├── controllers
│   │   └── convertController.js
│   │
│   ├── routes
│   │   ├── convert.js
│   │   ├── auth.js
│   │   └── history.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Conversion.js
│   │
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/fileconverter-pro.git
cd fileconverter-pro
```

---

## 2️⃣ Install Backend Dependencies

```
cd server
npm install
```

Create `.env`

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run server:

```
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 3️⃣ Install Frontend Dependencies

```
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📸 Screenshots

## Converter

Upload an image and convert into multiple formats.

## Compression

Reduce image size with adjustable quality.

## About Page

Project description, features, and conversion history.

*(Add screenshots later for better GitHub presentation)*

---

# 🔒 Security Features

* JWT authentication
* Protected API routes
* Environment variable protection
* Secure file handling

---

# 🚀 Future Improvements

Planned features:

* File drag-drop progress animation
* Download history files
* Cloud storage integration
* Batch image conversion
* Dark/Light mode toggle
* File size analytics dashboard

---

# 👨‍💻 Author

**Subhadip Dey**

* GitHub: https://github.com/Subha2707
* LinkedIn: https://www.linkedin.com/in/subhadip-dey-7019632b7/

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the repository

---
