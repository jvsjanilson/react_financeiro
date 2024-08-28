import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import  Login  from "./components/Login";
import Home  from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Conta from "./pages/conta";
import FormConta from "./pages/conta/form";
import Layout from "./pages/Layout";
import { Index as FormaPagamenoIndex } from "./pages/formapagamento";
import { Form as FormaPagamentoForm } from "./pages/formapagamento/form";



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
              <Route path="/contas" element={
                  <Layout>
                    <Conta />
                  </Layout>
                } />

              <Route path="/contas/create" element={
                  <Layout>
                    <FormConta />
                  </Layout>
                } />
                <Route path="/contas/:id" element={
                  <Layout>
                    <FormConta />
                  </Layout>
                } />

              <Route path="/formapagamentos" element={
                  <Layout>
                    <FormaPagamenoIndex />
                  </Layout>
                } />

              <Route path="/formapagamento/:id" element={
                  <Layout>
                    <FormaPagamentoForm />
                  </Layout>
                } />

              <Route path="/formapagamento/create" element={
                  <Layout>
                    <FormaPagamentoForm />
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
