import { faArrowLeft, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useEffect} from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import receberService from "../../services/ReceberService";


const initialFieldsError = {
    data_pagamento: [],
}

const initial = {
    documento: "",
    valor: 0,
}

const FormBaixa: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(initialFieldsError);
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [data, setData] = useState(initial);
    const [dataPagamento, setDataPagamento] = useState('');

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        receberService.baixar(id, {data_pagamento: dataPagamento}).then(response => {
            navigate('/recebers');
        }).catch(err => {
            if (err.response.status === 400) {
                setErrors(err.response.data);
            } else {
                setShowError(true);
                setShowMessageError('Erro desconhecido');
            }
        })
       
    }

    useEffect(() => {
        receberService.get(id).then(response => {
            setData({
                documento: response.documento,
                valor: response.valor,
            });
        }).catch(err => {
            if (err.response.status === 400) {
                setErrors(err.response.data);
            } else {
                setShowError(true);
                setShowMessageError('Erro desconhecido');
             }
        })
    }, [id])

    return (
        <div className="container d-flex justify-content-center mt-4">

            <Form onSubmit={formSubmit}>
                <Card >
                    <Card.Header>
                        <Card.Title className="text-center">Baixa de título a receber</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Documento</label>
                                    <input type="text" readOnly 
                                        className="form-control" 
                                        value={data.documento} 
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Valor</label>
                                    <input type="number" readOnly 
                                        className="form-control"
                                        value={data.valor}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label>Data Pagamento</label>
                                    <input type="date" value={dataPagamento} name="data_pagamento" id="data_pagamento" 
                                        onChange={(e) => setDataPagamento(e.target.value)} 
                                        className="form-control"  />
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
                        <button type="submit" className="btn btn-success me-2"><FontAwesomeIcon icon={faMoneyCheckDollar} /> Baixar</button>
                        <Link to="/recebers" className="btn btn-secondary"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Footer>
                </Card>
            </Form>
                

        
            
        </div>
    )
}

export default FormBaixa;