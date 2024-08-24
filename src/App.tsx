import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import  Login  from "./components/Login";
import Home  from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Conta from "./pages/conta";
import Layout from "./pages/Layout";


const App: React.FC = () => {
  return (
    
      <Router>
        <AuthProvider>
         
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <Layout>  
                  <Home />
                </Layout>
                } />
              <Route path="/conta" element={
                  <Layout>
                    <Conta />
                  </Layout>
                } />
            </Route>
            <Route path="*" element={<Login />} />
            
          </Routes>
        </AuthProvider>
      </Router>
    

  );
}

export default App;
