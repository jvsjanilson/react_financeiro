import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect} from "react";
import { Container, Col, Row, Table, Form, Button } from "react-bootstrap";
import fluxoCaixaService from "../../services/FluxoCaixaService";


const FluxoIndex: React.FC = () => {

    useEffect(() => {
        fluxoCaixaService.getFluxoCaixa("2024-01-01", "2024-12-31").then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

  return (
    <Container>
        <Row className="text-center">
            <Col>
            <h1>Fluxo de Caixa</h1>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={2}>
            
                <Form.Group controlId="formBasicEmail">
                <Form.Label>De:</Form.Label>
                <Form.Control type="date" />
                </Form.Group>
            
            </Col>
            <Col md={2}>
            
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Até:</Form.Label>
                <Form.Control type="date" />
                </Form.Group>
            
            </Col>
            <Col md={2}>
            
                <Button variant={'primary'} type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Saldo</th>
                </tr>
                </thead>
                <tbody  className="table-group-divider">
                <tr>
                    <td>01/01/2021</td>
                    <td>Salário</td>
                    <td>R$ 1.000,00</td>
                    <td>R$ 1.000,00</td>
                </tr>
                <tr>
                    <td>02/01/2021</td>
                    <td>Aluguel</td>
                    <td>R$ 500,00</td>
                    <td>R$ 500,00</td>
                </tr>
                </tbody>
            </Table>
            </Col>
        </Row>

    </Container>
  );
};


export default FluxoIndex;