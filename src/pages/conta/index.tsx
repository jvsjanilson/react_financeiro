/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect}  from "react";
import {  Alert, Button, Card, Col, Modal, Row, Spinner, Table, Form, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faPencil, faSync, faSortDown, faSortAmountUp, faSortUp, faSortAmountDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import contaService from "../../services/ContaService";

interface PaginacaoDados {
    count: number;
    next: string;
    previous: string;
    results: iConta[];
}


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
    const [field, setField] = useState('');
    const [direction, setDirection] = useState('');
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);


    useEffect(() => {
        searchFilter();
    }, [search]);

    //criar um componente de paginação
    // const PaginationComponent: React.FC<{ currentPage: number, previous: string | null, next: string | null, onPageChange: (page: string | null) => void }> = ({ currentPage, previous, next, onPageChange }) => {
    //     return (
    //         <Pagination>
    //             <Pagination.Prev onClick={() => onPageChange(previous)} disabled={!previous} />
    //             <Pagination.Item active>{currentPage}</Pagination.Item>
    //             <Pagination.Next onClick={() => onPageChange(next)} disabled={!next} />
    //         </Pagination>
    //     );
    // }

    const changePage = (response: any, page: string | null = null) => {
        setNext(response?.next?.split('?')[1]);
        setPrevious(response?.previous?.split('?')[1]);
        if (!response?.previous?.split('?')[1]) {
            if (response?.previous) {
                setPrevious('page=1');
            }
        }
        setCurrentPage(page?.includes('page=') ? parseInt(page.split('page=')[1]) : 1);
    }

    const searchFilter = (page: string | null = null) => {
        setShowSpinner(true);
        contaService.getAll(search, page).then( response => {
            setContas(response.results);
            changePage(response, page);
            setShowSpinner(false);
            
        }).catch(err => {
            setShowSpinner(false);
        });
        
    }

    const handlePageChange = (page: string | null = null) => {
        searchFilter(page)
    }

    const orderBy = (pField: string, pDirection: string) => {
        console.log('todo: implementar ordenação');
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
         
        contaService.delete(id).then( data => {
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
                                <Link to="/contas/create" className="btn btn-primary">
                                    <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Adicionar
                                </Link>
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
                                </div>

                            </Form.Group>
                        </Col>
                        <Col>
                            <Spinner style={{ float: 'right' }} variant="success" hidden={!showSpinner} 
                                animation="border" role="status"/>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th style={{ width: '5rem' }} className="text-center">Ações</th>
                        
                        <th className="d-flex justify-content-between align-items-center">
                            <span>
                                <a style={{ textDecoration: 'none' }} 
                                    onClick={() => { 
                                        setDirection( direction === 'asc' ? 'desc': 'asc' ); setField('descricao')
                                        }
                                    }  
                                    href="#">Descrição</a>
                            </span>
                            <span className="d-flex " >
                                {direction && (<a className="text-end me-2" href="#" onClick={()=>setDirection('')} >
                                    <FontAwesomeIcon icon={faXmark} /></a>) 
                                }
                                {direction === 'asc' && field === 'descricao' && 
                                    (<a href="#"> <FontAwesomeIcon icon={faSortAmountDown}/> </a>) 
                                }
                                {direction === 'desc' && field === 'descricao' && 
                                    (<a href="#"><FontAwesomeIcon icon={faSortAmountUp} /></a>)
                                }
                            </span>
                        </th>
                      
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
                                <Link className="text-primary" to={`/contas/${conta.id}`}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                                <button type="button" onClick={() => handleOpenModal(conta)} 
                                    className="text-danger ms-2" 
                                    style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                            <td>{conta.descricao}</td>
                            <td>{conta.numero_conta}</td>
                            <td>{conta.numero_agencia}</td>
                            <td>{conta.numero_banco}</td>
                            <td className="text-end">
                                { parseFloat(conta.saldo.toString()).toLocaleString('pt-BR', 
                                    {currency: 'BRL', minimumFractionDigits:2}
                                    )
                                }
                            </td>
                        </tr>
                    ))}                           
                </tbody>
            </Table>
                
            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(previous)} disabled={!previous} />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(next)} disabled={!next} />
            </Pagination>
            
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