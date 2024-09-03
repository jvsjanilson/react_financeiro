import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import pagarService from "../../services/PagarService";
import { faArrowLeft, faUndo } from "@fortawesome/free-solid-svg-icons";


const initial = {
    documento: "",
    valor: 0,
    data_pagamento: "",
}


const PagarEstorno: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [data, setData] = useState(initial);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        pagarService.estornar(id).then(response => {
            console.log(response)
            navigate('/pagars')

        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
      pagarService.get(id).then(response => {
            setData({
                documento: response.documento,
                valor: response.valor,
                data_pagamento: response.data_pagamento
            });
        }).catch(err => {
            console.log(err)
        })
    }, [id])

    return (
        <div className="container d-flex justify-content-center mt-4">
            <Form onSubmit={handleSubmit}>
            <Card>
                    <Card.Header>
                        <Card.Title className="text-center">Estorno de título a pagar</Card.Title>
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
                                    <input type="date" value={data.data_pagamento} name="data_pagamento" readOnly
                                        id="data_pagamento" className="form-control"  />
                                        
                                </div>
                            </div>
                        </div>

                    </Card.Body>
                    <Card.Footer>
                        <button type="submit" className="btn btn-danger me-2"><FontAwesomeIcon icon={faUndo}/> Estornar</button>
                        <Link to="/pagars" className="btn btn-secondary"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}


export default PagarEstorno;