import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className=''>
        <h1>404 Not Found</h1>
        <Link className="btn btn-primary text-center" to={"/"}>Ir para home</Link>
      </div>
      
    </div>
    </>
  )
};


export default NotFound;