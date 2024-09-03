/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import contatoService from "../../services/ContatoService";
import { Form, Alert, Button, Col, Modal, Pagination, Row, Table, Spinner, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IContato as iData } from "../../interfaces/ContatoInterface";

const INITIAL = {
    id: 0,
    nome: "",
    cpf_cnpj: "",
    endereco: "",
    numero: "",
    cep: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    email: "",
    telefone: "",
    celular: "",
    ativo: true,
}


const ContatoIndex: React.FC = () => {

    const [datas, setDatas] = useState<iData[]>([]);
    const [showModal, setShowModal] = useState(false); 
    const [showSpinner, setShowSpinner] = useState(true);
    const [selected, setSelected] = useState<iData>(INITIAL);
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [search, setSearch] = useState('');
    // const [field, setField] = useState('');
    // const [direction, setDirection] = useState('');
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [previousPage, setPreviousPage] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const searchFilter = (page: string | null = null) => {

        setShowSpinner(true);
        contatoService.getAll(search, page).then( response => {
            setDatas(response.results);
            changePage(response, page);
            setShowSpinner(false);
            
        }).catch(err => {
            setShowSpinner(false);
        });

    }

    const changePage = (response: any, page: string | null = null) => {
        setNextPage(response?.next?.split('?')[1]);
        setPreviousPage(response?.previous?.split('?')[1]);
        if (!response?.previous?.split('?')[1]) {
            if (response?.previous) {
                setPreviousPage('page=1');
            }
        }
        setCurrentPage(page?.includes('page=') ? parseInt(page.split('page=')[1]) : 1);
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
        setSelected(INITIAL);
    }

    const handleDelete = (id: number) => {
         
        contatoService.delete(id).then( res => {
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
        <Card.Title className="text-center">Lista de Contatos</Card.Title>
        </Card.Header>
        <Card.Body>
   
            
            <Table striped bordered hover className="caption-top">
                <caption style={{padding: '0', margin: '0'}}>
                    <Row>
                        <Col sm="auto">
                            <Form.Group className="mb-3  " controlId="descricao">
                                <Link to="/contato/create" title="Adicionar" className="btn btn-primary rounded-pill">
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
                <th>Nome</th>
                <th style={{ width: '13rem' }}>CPF/CNPJ</th>
                <th style={{ width: '13rem' }}>Celular</th>
                <th className="text-center" style={{ width: '5rem' }}>Ativo?</th>

            </tr>
        </thead>
        <tbody className="table-group-divider">
            {datas.map((data) => (
                <tr key={data.id}>
                    <td className="text-center">
                        <Link className="text-primary" to={`/contato/${data.id}`}>
                            <FontAwesomeIcon icon={faPencil} />
                        </Link>
                        <button type="button" onClick={() => handleOpenModal(data)} 
                            className="text-danger ms-2" 
                            style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </td>
                    <td>{data.nome}</td>
                    <td>{data.cpf_cnpj}</td>
                    <td>{data.celular}</td>
                    <td className="text-center">
                        <FontAwesomeIcon className={data.ativo ? 'text-success': 'text-danger'} icon={data.ativo ? faCheck: faXmark} />
                    </td>
                    
                </tr>
            ))}                           
        </tbody>
    </Table>
        
    <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(previousPage)} disabled={!previousPage} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(nextPage)} disabled={!nextPage} />
    </Pagination>
        </Card.Body>
    </Card>
       
    
    
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Remover</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Confirma a remoção <strong>{selected?.nome}</strong>?</p>
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


export default ContatoIndex;