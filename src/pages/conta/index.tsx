import React, {useState, useEffect}  from "react";
import {  Alert, Button, Card, Col, Modal, Row, Spinner, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faPencil, faSync } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import contaService from "../../services/ContaService";

interface iConta {
    id: number;
    descricao: string;
    numero_conta: string;
    numero_agencia: string;
    numero_banco: string;
    saldo: number;
}

const initial = {
    id: 0,
    descricao: '',
    numero_conta: '',
    numero_agencia: '',
    numero_banco: '',
    saldo: 0
}

const Conta: React.FC = () => {

    const [contas, setContas] = useState<iConta[]>([]);
    const [showModal, setShowModal] = useState(false); 
    const [showSpinner, setShowSpinner] = useState(true);
    const [selected, setSelected] = useState<iConta>(initial);
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [search, setSearch] = useState('');

    useEffect( () => {

        searchFilter();

        // contaService.getContas().then( data => {
        //     setContas(data);
        //     setShowSpinner(false);
        // }).catch(err => {
        //     setShowSpinner(false);
        // });
        
    }, [search]);


    const searchFilter = () => {
        if (search.length > 0) {
            contaService.getContas(search).then( data => {
                setContas(data);
                setShowSpinner(false);
            }).catch(err => {
                setShowSpinner(false);
            });
        } else {
            contaService.getContas("").then( data => {
                setContas(data);
                setShowSpinner(false);
            }).catch(err => {
                setShowSpinner(false);
            });
        }
    }



    const handleOpenModal = (conta: any) => {
        setSelected(conta);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelected(initial);
    }

    const handleDelete = (id: number) => {
         
        contaService.deleteConta(id).then( data => {
             const contasUpdated = contas.filter( conta => conta.id !== id);
            setContas(contasUpdated);
            setShowModal(false);
            
        }).catch(err => {
            if (err.response.status === 403) {
                setShowModal(false);
                setShowError(true)
                setShowMessageError(err.response.data.detail)
            }
        });
    }

    return (
        <div>
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                <span>{showMessageError}</span>
            </Alert>
               
            <Table striped bordered hover className="caption-top">
                <caption style={{paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
                    <Row>
                        <Col sm="auto">
                            <Form.Group className="mb-3" controlId="descricao">
                                <Link to="/contas/create" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Adicionar</Link>
                            </Form.Group>
                                
                        </Col>
                        <Col sm="auto">
                        <Form.Group className="mb-3" controlId="descricao">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" 
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    placeholder="Procurar" 
                                    aria-label="Procurar" 
                                    aria-describedby="button-addon2"/>
                                
                                <Button variant="secondary" onClick={() => {}}><FontAwesomeIcon icon={faSync} /></Button>
                            </div>

                        </Form.Group>
                        </Col>
                        <Col>
                            <Spinner style={{ float: 'right' }} variant="success" hidden={!showSpinner} animation="border" role="status"></Spinner>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th style={{ width: '5rem' }} className="text-center">Ações</th>
                        <th>Descrição</th>
                        <th>Número Conta</th>
                        <th>Número Agencia</th>
                        <th>Número Banco</th>
                        <th className="text-end">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {contas.map((conta) => (
                        <tr key={conta.id}>
                            <td className="text-center">
                                <Link className="text-primary" to={`/contas/${conta.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                <button type="button" onClick={() => handleOpenModal(conta)} className="text-danger ms-2" style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                            <td>{conta.descricao}</td>
                            <td>{conta.numero_conta}</td>
                            <td>{conta.numero_agencia}</td>
                            <td>{conta.numero_banco}</td>
                            <td className="text-end">{  parseFloat(conta.saldo.toString()).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits:2})}</td>
                        </tr>
                    ))}                           
                </tbody>
            </Table>
                
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirma a remoção <strong>{selected?.descricao}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(selected?.id)}>
                        Remover
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}


export default Conta;