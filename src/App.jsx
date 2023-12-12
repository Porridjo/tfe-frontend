import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from './Login/LoginPage';

function App() {

  return (
    <>
      <div className='width-max'>
        <LoginPage />
      </div>
    </>
  );
}

export default App;
