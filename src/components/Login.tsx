import React, { useState, useContext} from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (authContext) {
            await authContext.login(username, password);
        }
    }

    return (
        <div style={{ alignItems: 'center', backgroundColor: '#e9ecef', 'display': 'flex',  flexDirection: 'column', 'height': '100vh', justifyContent: 'center' }}>
        
        <Container >
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="usernameid">
                                    <Form.Label>Usuário:</Form.Label>
                                    <Form.Control type="text" placeholder="Usuário" 
                                        value={username} onChange={(e) => setUsername(e.target.value)}
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="passwordid">
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Entrar
                                </Button>
                            </Form>
                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        </div>
    );
}

export default Login;