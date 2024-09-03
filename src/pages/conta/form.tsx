import React, {useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import contaService from "../../services/ContaService";
import { useNavigate, useParams } from "react-router-dom";
import { iConta as iData } from "../../interfaces/ContaInterface";


const initialConta = {
    id: 0,
    descricao: '',
    numero_conta: '',
    numero_agencia: '',
    numero_banco: '',
    saldo: 0
}

const initialFieldsError = {
  descricao: [], 
  numero_conta: [], 
  numero_agencia: [],
  numero_banco: [],
  saldo: [], 
}

const FormConta: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{id: string}>();
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [errors, setErrors] = useState(initialFieldsError);
    const [conta, setConta] = useState<iData>(initialConta)

    useEffect(() => {
        
        if (id) {
            contaService.get(id).then( data => {
                setConta(data)
            }).catch(err => {
                navigate('/contas');
            })
        }
    }, [id])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (id) {
            contaService.update(id, conta).then( data => {
                navigate('/contas')
            }).catch(err => {
                if (err.response.status === 400) {
                    setErrors(err.response.data)
                }
                if (err.response.status === 403) {
                    setShowError(true)
                    setShowMessageError(err.response.data.detail)
                }
                navigate(`/contas/${id}`)
            })
            return;
        } else {
            contaService.create(conta).then( data => {
                navigate('/contas')
            }).catch(err => {
                if (err.response.status === 400) {
                    setErrors(err.response.data)
                }
                if (err.response.status === 403) {
                    setShowError(true)
                    setShowMessageError(err.response.data.detail)
                }
                navigate("/contas/create")
            })
        }
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        
        setConta((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                <span>{showMessageError}</span>
            </Alert>

            <Form onSubmit={handleSubmit} noValidate>
                <Card>
                    <Card.Header>
                        <Card.Title className="text-center">Formulário de Conta</Card.Title>
                       
                    </Card.Header>

                    <Card.Body>
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="descricao">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control maxLength={60} name="descricao" value={conta.descricao} 
                                            type="text" onChange={handleChange} autoFocus />

                                        {errors.descricao  && (
                                            <ul className="errorfield">
                                                {errors.descricao.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="numero_conta">
                                        <Form.Label>Número Conta</Form.Label>
                                        <Form.Control maxLength={10} name="numero_conta" value={conta.numero_conta} 
                                            type="text" onChange={handleChange} />
                                        {errors.numero_conta && (
                                            <ul className="errorfield">
                                                {errors.numero_conta.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}

                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="numero_banco">
                                        <Form.Label>Número Banco</Form.Label>
                                        <Form.Control maxLength={3} name="numero_banco" value={conta.numero_banco} type="text" onChange={handleChange}/>
                                        {errors.numero_banco && (
                                            <ul className="errorfield">
                                                {errors.numero_banco.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}

                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="numero_agencia">
                                        <Form.Label>Número Agencia</Form.Label>
                                        <Form.Control maxLength={7} name="numero_agencia" value={conta.numero_agencia} type="text" onChange={handleChange} />
                                        {errors.numero_agencia && (
                                            <ul className="errorfield">
                                                {errors.numero_agencia.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={2}>
                                <Form.Group className="mb-3" controlId="saldo">
                                    <Form.Label>Saldo</Form.Label>
                                    <Form.Control name="saldo" type="number" value={conta.saldo} onChange={handleChange} />
                                    {errors.saldo && (
                                            <ul className="errorfield">
                                                {errors.saldo.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                </Form.Group>
                                </Col>
                            </Row>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant={id ? 'success': 'primary'} type="submit"><FontAwesomeIcon icon={faSave} /> {id ? 'Salvar': 'Criar' }</Button>
                    <Link to="/contas" className="btn btn-secondary ms-1"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    );
}

export default FormConta;
