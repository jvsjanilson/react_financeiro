import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Modal, Row, Spinner, Table, Form, Pagination, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faPencil, faUndo, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import pagarService from "../../services/PagarService";
import { iReceber as iData } from "../../interfaces/ReceberInterface";
import { formatDate, formatMoeda } from "../../utils/utils";

const initial  = {
    id: 0,
    documento: "",
    data_emissao: "",
    data_vencimento: "",
    data_pagamento: "",
    valor: 0,
    status: "",
    observacao: "",
    contato: 0,
    conta: 0,
    formapagamento: 0,
    ativo: false,
    conta_numero: "",
    contato_nome: "",
    formapagamento_descricao: "",
}

const PagarIndex: React.FC = () => {

    const [datas, setDatas] = useState<iData[]>([]);
    const [showModal, setShowModal] = useState(false); 
    const [showSpinner, setShowSpinner] = useState(true);
    const [selected, setSelected] = useState<iData>(initial);
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [search, setSearch] = useState('');
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);

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
        pagarService.getAll(search, page).then( response => {
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
         
        pagarService.delete(id).then( data => {
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
    useEffect(() => {
        searchFilter();
    }, [search]);

  return (
    <div>
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                <span>{showMessageError}</span>
            </Alert>
            <Card>
                <Card.Header>
                    <Card.Title className="text-center">Lista de Contas a pagar</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover className="caption-top">
                    <caption style={{padding: '0', margin: '0'}}>
                            <Row>
                                <Col sm="auto">
                                    <Form.Group className="mb-3" controlId="descricao">
                                        <Link to="/pagar/create" className="btn btn-primary  rounded-pill">
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
                                <th style={{ width: '6rem' }} className="text-center">Ações</th>
                                <th style={{ width: '10rem' }}>Documento</th>
                                <th>Nome Fornecedor</th>
                                <th>Forma Pagto</th>
                                <th>Data Emissão</th>
                                <th>Data Vencimento</th>
                                <th>Data Pagamento</th>
                                <th  className="text-end">Valor</th>
                                <th >Status</th>

                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {datas.map((data) => (
                                <tr key={data.id}>
                                    <td className="text-center">
                                        {data.status === "A" && (
                                            
                                        <>
                                            <Link className="text-primary" to={`/pagar/${data.id}`}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </Link>
                                            <button type="button" onClick={() => handleOpenModal(data)} 
                                                className="text-danger ms-2" 
                                                style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                            </button>

                                            <Link className="text-success ms-2" to={`/pagar/baixar/${data.id}`}>
                                                <FontAwesomeIcon icon={faMoneyBill} />
                                            </Link>
                                        </>
                                            
                                        )}
                                        {data.status === "P" && (
                                            <>
                                                <Link className="text-primary" to={`/pagar/estornar/${data.id}`}>
                                                    <FontAwesomeIcon icon={faUndo} />
                                                </Link>
                                            </>
                                        )}

                                        
                                    </td>
                                    <td>{data.documento}</td>
                                    <td>{data.contato_nome}</td>
                                    <td>{data.formapagamento_descricao}</td>
                                    <td>{formatDate(data.data_emissao)}</td>
                                    <td>{formatDate(data.data_vencimento)}</td>
                                    <td>{formatDate(data.data_pagamento)}</td>
                                    <td  className="text-end">{formatMoeda(data.valor)}</td>
                                    <td>{data.status === 'P' ? 'Pago': 'Aberto'}</td>

                                    
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
                    <p>Confirma a remoção <strong>{selected?.documento}</strong>?</p>
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
};

export default PagarIndex;