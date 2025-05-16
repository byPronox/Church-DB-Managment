# Church Database Management System

Welcome to the **Church Database Management System**, a web application designed to help manage catechizing records for a church. This project combines a modern frontend built with React and a robust backend powered by Flask, with SQL Server as the database.

<p align="center">
  <img src="./cliente/src/assets/images/PHOTO_MAIN.png" width="400"/>
</p>

---

## Features

- **User-Friendly Interface**: A clean and intuitive UI for managing catechizing records.
- **Dynamic Frontend**: Built with React for a responsive and interactive experience.
- **Powerful Backend**: Flask-based RESTful API for efficient data handling.
- **Database Integration**: SQL Server for secure and reliable data storage.
- **Cross-Origin Support**: Enabled CORS for seamless communication between frontend and backend.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigation between pages.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Flask**: For creating the RESTful API.
- **Flask-CORS**: For handling cross-origin requests.
- **PyODBC**: For connecting to the SQL Server database.

### Database
- **SQL Server**: For storing and managing catechizing records.

---

## Installation and Setup

### Backend (Flask)

1. Navigate to the `servidor` directory:
   ```bash
   cd servidor
   ```

2. Install the required dependencies:
   ```bash
   pip install flask flask-cors pyodbc
   ```

3. Start the Flask server:
   ```bash
   python run.py
   ```

### Frontend (React)

1. Navigate to the `cliente` directory:
   ```bash
   cd cliente
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

---

## Project Structure

```
Iglesia/
├── cliente/          # React frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.js
│   │   │   └── App.css
│   │   ├── Components/
│   │   │   └── NavBar/
│   │   │       ├── Navbar.jsx
│   │   │       └── Navbar.css
│   │   ├── Pages/
│   │   │   ├── Inicio.jsx
│   │   │   ├── ReglasNegocio.jsx
│   │   │   ├── Procedimientos/
│   │   │   │   ├── RegistrarCatequizando.jsx
│   │   │   │   ├── InscribirCatequizando.jsx
│   │   │   │   └── (otros procedimientos)
│   │   ├── index.js
│   │   └── index.css
├── servidor/         # Flask backend
│   ├── app/
│   │   ├── db.py
│   │   ├── models/
│   │   │   └── catequizando.py
│   │   └── routes/
│   │       └── catequizando.py
│   └── run.py
└── README.md         # Documentation
```

---

## How to Use

1. Start both the backend and frontend servers.
2. Open your browser and go to: [http://localhost:3000](http://localhost:3000)
3. Use the navigation bar to:
   - View the **Inicio** page with a welcome message.
   - Access the **Reglas del Negocio** page to understand the business rules.
   - Access the **Procedimientos** page to interact with the stored procedures.
4. Fill out the forms to register or manage catechizing records. The data will be securely stored in the SQL Server database.

---

## Stored Procedures

The system integrates the following stored procedures:

1. **Registrar Catequizando**: Registers a new catechizing record.
2. **Inscribir Catequizando**: Enrolls a catechizing record in a catechesis level.
3. **Registrar Asistencia**: Records attendance for a catechizing record.
4. **Registrar Evaluación**: Records an evaluation for a catechizing record.
5. **Emitir Certificado**: Issues a certificate for a catechizing record.
6. **Asignar Sacramento**: Assigns a sacrament to a catechizing record.
7. **Verificar Aprobación**: Checks if a catechizing record meets the requirements for approval.

---

## Contributing

Contributions are welcome! If you'd like to contribute, feel free to fork this repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

Developed with ❤️ by **byPronox**
