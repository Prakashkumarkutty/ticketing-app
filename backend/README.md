# Backend API - Ticketing System
A robust and scalable ticketing system backend API built with **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM**, featuring comprehensive validation and secure data handling.

##  Deployment
This API is deployed on **Render**.  
[Live API](https://ticketing-app-eb7h.onrender.com/)  

---

## Tech Stack
- **Node.js** – JavaScript runtime environment
- **Express.js** – Fast, unopinionated web framework
- **PostgreSQL** – Advanced open-source relational database
- **Sequelize ORM** – Promise-based Node.js ORM for SQL databases
- **Joi** – Schema validation library for JavaScript


---

## Features
- RESTful API architecture
- Comprehensive ticket management (CRUD operations)
- Input validation using Joi schemas
- Database relationships and migrations
- CORS configuration

## Screenshots

### API Testing (Postman)

![Ticket Creation](./screenshots/api-create-ticket.png)
*Creating a new ticket via API*

### Database Schema
![Database Schema](./screenshots/database-schema.png)
*PostgreSQL database structure*

---

##  Project Structure
```
backend/
│── config/              # Database and app configuration
│   ├── database.js      # Sequelize database configuration
│── controllers/         # Route controllers and business logic
│   ├── ticketController.js
│── models/              # Sequelize model definitions
│   ├── ticket.models.js
│── routes/              # API route definitions
│   ├── ticket.route.js
│── validators/          # Joi validation schemas
│   └── ticket.validator.js
│
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

---

##  Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Prakashkumarkutty/ticketing-app.git
cd backend
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ticketing_system
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_URL=postgresql://username:password@localhost:5432/ticketing_system


```

### 4. Database Setup

#### Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ticketing_system;

# Create user (optional)
CREATE USER your_db_user WITH ENCRYPTED PASSWORD 'your_db_password';
GRANT ALL PRIVILEGES ON DATABASE ticketing_system TO your_db_user;
```


The API will be available at `http://localhost:5000`

### 6. Build for Production
```bash
npm run build
npm start
```

### 7. Run Tests
```bash
npm test
```

---

## 🔗 API Endpoints

### Tickets
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tickets` | Get all tickets | Yes |
| POST | `/api/tickets` | Create new ticket | Yes |
| PUT | `/api/tickets/:id` | Update ticket | Yes |



---

##  Request/Response Examples

### Create Ticket
```bash
POST /api/tickets
Content-Type: application/json

{
  "title": "Bug in login form",
  "description": "Users cannot login with valid credentials",
  "priority": "high",
}
```

### Response
```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "id": 1,
    "title": "Bug in login form",
    "description": "Users cannot login with valid credentials",
    "priority": "high",    
    "status": "open",    
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  }
}
```

---

##  Validation Schemas

### Ticket Validation (Joi)
```javascript
const ticketSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  status: Joi.string().valid('open', 'in-progress', 'closed').optional()
});
```

---

##  Database Models

### Ticket Model
```javascript
{
  id: UUID (Primary Key),
  title: STRING,
  description: TEXT,
  priority: ENUM('low', 'medium', 'high', 'urgent'),
  status: ENUM('open', 'in-progress',  'closed'),  
  created_at: DATE,
  updated_at: DATE
}
```

---

##  Deployment on Render

### Quick Deploy
1. Push your code to a GitHub repository
2. Connect your GitHub account to Render
3. Create a new Web Service
4. Configure environment variables:
   - Add all variables from your `.env` file
   - Set `NODE_ENV=production`
   - Configure PostgreSQL database URL
5. Deploy!

### Database Setup on Render
1. Create a PostgreSQL database on Render
2. Copy the database URL to your environment variables
3. Run migrations after deployment:
   ```bash
   npx sequelize-cli db:migrate --env production
   ```

### Build Command
```bash
npm install && npx sequelize-cli db:migrate --env production
```

### Start Command
```bash
npm start
```

---

##  Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon