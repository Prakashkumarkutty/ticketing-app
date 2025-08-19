import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { TicketProvider, useTickets } from './context/TicketContext';
import Login from './components/Login';
import CreateTicket from './components/Createticket';
import ViewTickets from './components/Viewticket';
import './App.css';
import './styles/styles.css';
function AppContent() {
  const [currentPage, setCurrentPage] = useState('login');
  const { user } = useTickets();

  if (!user) {
    return <Login setCurrentPage={setCurrentPage} />;
  }

  return (
    <>
      {/* <AppNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
      {currentPage === 'view' && <ViewTickets setCurrentPage={setCurrentPage} />}
      {currentPage === 'create' && <CreateTicket setCurrentPage={setCurrentPage} />}
    </>
  );
}

function App() {
  return (
    <TicketProvider>
      <div className="App">
        <AppContent />
      </div>
    </TicketProvider>
  );
}

export default App;