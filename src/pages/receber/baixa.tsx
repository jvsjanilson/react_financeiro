import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useEffect} from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";


const initialFieldsError = {
    data_pagamento: [],
}

const FormBaixa: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(initialFieldsError);

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/recebers');
    }

    useEffect(() => {
        console.log('id', id);
    }, [id])


    return (
        <div className="container d-flex justify-content-center mt-4">

            <Form onSubmit={formSubmit}>
                <Card className="p-1">
                    <Card.Header>
                        <h4>Baixa Receber</h4>
                    </Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Documento</label>
                                    <input type="text" readOnly className="form-control" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Valor</label>
                                    <input type="text" readOnly className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Data Pagamento</label>
                                    <input type="date" className="form-control" />
                                    {errors?.data_pagamento && (
                                            <ul className="errorfield">
                                                {errors.data_pagamento.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                </div>
                            </div>
                        </div>

                    </Card.Body>
                    <Card.Footer>
                        <button type="submit" className="btn btn-success me-2">Baixar</button>
                        <Link to="/recebers" className="btn btn-secondary"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Footer>
                </Card>
            </Form>
                

        
            
        </div>
    )
}

export default FormBaixa;