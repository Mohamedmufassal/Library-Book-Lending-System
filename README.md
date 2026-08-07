# Library Book Lending System

## Overview

A MERN Stack web application to manage books, members and book lending for a small library.

## Features

- User Authentication
- Book Management
- Member Management
- Issue Books
- Return Books
- Dashboard
- JWT Authentication
- MongoDB Atlas Integration

## Tech Stack

- React
- Node.js
- Express.js
- MongoDB
- Bootstrap

## Installation

### Clone Repository
```bash
git clone <repository-url>
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=mongodb+srv://libraryAdmin:Library12345@cluster0.e6zu1lz.mongodb.net/?appName=Cluster0
JWT_SECRET=librarybooklendingsecret123
```