import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import  Login  from "./components/Login";
import Home  from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Conta from "./pages/conta";
import FormConta from "./pages/conta/form";
import Layout from "./pages/Layout";
import FormaPagamenoIndex from "./pages/formapagamento";
import FormPagto from "./pages/formapagamento/form";
import NotFound from "./pages/Notfound";
import ContatoIndex from "./pages/contato";
import ContatoForm from "./pages/contato/form";
import ReceberIndex from "./pages/receber";
import ReceberForm from "./pages/receber/form";


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
                    <FormPagto />
                  </Layout>
                } />

              <Route path="/formapagamento/create" element={
                  <Layout>
                    <FormPagto />
                  </Layout>
                } />


              <Route path="/contatos" element={
                  <Layout>
                    <ContatoIndex />
                  </Layout>
                } />

              <Route path="/contato/:id" element={
                  <Layout>
                    <ContatoForm />
                  </Layout>
                } />

              <Route path="/contato/create" element={
                  <Layout>
                    <ContatoForm />
                  </Layout>
                } />


              <Route path="/recebers" element={
                  <Layout>
                    <ReceberIndex />
                  </Layout>
                } />

              <Route path="/receber/:id" element={
                  <Layout>
                    <ReceberForm />
                  </Layout>
                } />

              <Route path="/receber/create" element={
                  <Layout>
                    <ReceberForm />
                  </Layout>
                } />

            </Route>
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </AuthProvider>
      </Router>
    

  );
}

export default App;
