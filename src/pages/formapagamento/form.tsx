import React, {useState, useEffect } from "react";
import { Form, Row, Col, Alert, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import formaService from "../../services/FormaService";

interface iFormaPagto {
    descricao: string;
    codigo: string;
    ativo: boolean;
}

const initialFormaPagto = {
    descricao: '',
    codigo: '',
    ativo: true
}

const initialFieldsError = {
    descricao: [], 
    codigo: [],
  }

const FormPagto: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{id: string}>();
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [errors, setErrors] = useState(initialFieldsError);
    const [forma, setForma] = useState<iFormaPagto>(initialFormaPagto);
    
    useEffect(() => {
        if  (id) {
            formaService.get(id).then( data => {
                setForma(data)
            }).catch(err => {
                navigate('/formapagamentos');
            })
        }

    }, [id]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (id) {
            formaService.update(id, forma).then( data => {
                navigate('/formapagamentos')
            }).catch(err => {
                if (err.response.status === 400) {
                    setErrors(err.response.data);
                } else {
                    setShowError(true);
                    setShowMessageError('Erro desconhecido');
                }
            })
        } else {
            formaService.create(forma).then( data => {
                navigate('/formapagamentos')
            }).catch(err => {
                if (err.response.status === 400) {
                    setErrors(err.response.data);
                } else {
                    setShowError(true);
                    setShowMessageError('Erro desconhecido');
                }
            })
        }
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setForma({...forma, [name]: value});
    }

    return (
        <div>
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                <span>{showMessageError}</span>
            </Alert>
            <Form onSubmit={handleSubmit} noValidate>
                <Card>
                    <Card.Header>
                        <Button variant={id ? 'success': 'primary'} type="submit"><FontAwesomeIcon icon={faSave} /> {id ? 'Salvar': 'Criar' }</Button>
                        <Link to="/formapagamentos" className="btn btn-secondary ms-1"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Header>

                    <Card.Body>
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="codigo">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control name="codigo" value={forma.codigo} 
                                            type="text" onChange={handleChange} maxLength={3} />
                                        {errors.codigo && (
                                            <ul className="errorfield">
                                                {errors.codigo.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Col md>
                                    <Form.Group className="mb-3" controlId="descricao">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control name="descricao" value={forma.descricao} 
                                            type="text" onChange={handleChange} maxLength={60} />

                                        {errors.descricao && (
                                            <ul className="errorfield">
                                                {errors.descricao.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>
                                </Col>
                                

                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="ativo">
                                        <Form.Check type="checkbox" 
                                            name="ativo" 
                                            label="Ativo?" checked={forma.ativo} 
                                            onChange={(e) => setForma({...forma, ativo: e.target.checked})} />
                                    </Form.Group>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </Form>
        </div>
    );
}

export default FormPagto;