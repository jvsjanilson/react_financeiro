/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect}  from "react";
import { Alert, Button, Col, Modal, Row, Spinner, Table, Form, Pagination, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faPencil, faSortAmountUp, faSortAmountDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import contaService from "../../services/ContaService";
import { iConta as iData } from "../../interfaces/ContaInterface";

const initial = {
    id: 0,
    descricao: '',
    numero_conta: '',
    numero_agencia: '',
    numero_banco: '',
    saldo: 0
}

const Conta: React.FC = () => {

    const [datas, setDatas] = useState<iData[]>([]);
    const [showModal, setShowModal] = useState(false); 
    const [showSpinner, setShowSpinner] = useState(true);
    const [selected, setSelected] = useState<iData>(initial);
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
            setDatas(response.results);
            changePage(response, page);
            setShowSpinner(false);
            
        }).catch(err => {
            setShowSpinner(false);
        });
        
    }

    const handlePageChange = (page: string | null = null) => {
        searchFilter(page)
    }

    // const orderBy = (pField: string, pDirection: string) => {
    //     console.log('todo: implementar ordenação');
    // }

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
             setDatas(datas.filter( data => data.id !== id));
            setShowModal(false);
            
        }).catch(err => {
            const error400 = [403,400]

            if (error400.includes(err.response.status)) {
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
               

        <Card>
            <Card.Header>
            <Card.Title className="text-center">Lista de Contas</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover className="caption-top">
                <caption style={{padding: '0', margin: '0'}}>
                        <Row>
                            <Col sm="auto">
                                <Form.Group className="mb-3" controlId="descricao">
                                    <Link to="/contas/create" title="Adicionar" className="btn btn-primary rounded-pill">
                                        <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> 
                                    </Link>
                                </Form.Group>
                            </Col>

                            <Col sm="4">
                                <Form.Group className="mb-3" controlId="descricao">
                                    <div className="input-group mb-3">
                                        <input type="search" className="form-control" 
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
                    <tbody className="table-group-divider">
                        {datas.map((data) => (
                            <tr key={data.id}>
                                <td className="text-center">
                                    <Link className="text-primary" to={`/contas/${data.id}`}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Link>
                                    <button type="button" onClick={() => handleOpenModal(data)} 
                                        className="text-danger ms-2" 
                                        style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td>
                                <td>{data.descricao}</td>
                                <td>{data.numero_conta}</td>
                                <td>{data.numero_agencia}</td>
                                <td>{data.numero_banco}</td>
                                <td className="text-end">
                                    { parseFloat(data.saldo.toString()).toLocaleString('pt-BR', 
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
                
            </Card.Body>


        </Card>

            
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