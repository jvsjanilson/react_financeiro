import React, {useState, useEffect } from "react";
import { Form, Row, Col, Alert, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import receberService from "../../services/ReceberService";
import contaService from "../../services/ContaService";
import contatoService from "../../services/ContatoService";
import formaService from "../../services/FormaService";
import { iReceber as iData } from "../../interfaces/ReceberInterface";
import { iConta } from "../../interfaces/ContaInterface";
import { IContato } from "../../interfaces/ContatoInterface";
import { IFormaPagamento } from "../../interfaces/FormaInterface";


const initial = {
  id: 0,
  documento: '',
  data_emissao: '',
  data_vencimento: '',
  data_pagamento: null,
  valor: 0,
  status: 'A',
  observacao: '',
  contato:  0,
  conta:  0,
  formapagamento: 0,
  ativo: false,
  conta_numero: '',
  contato_nome: '',
  formapagamento_descricao: '',
}

const initialFieldsError = {
  documento: [], 
  data_emissao: [],
  data_vencimento: [],
  valor: [],
  contato: [],
  conta: [],
  formapagamento: [],
}

const ReceberForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{id: string}>();
  const [showError, setShowError] = useState(false);
  const [showMessageError, setShowMessageError] = useState('');
  const [errors, setErrors] = useState(initialFieldsError);
  const [data, setData] = useState<iData>(initial);
  const [contas, setContas] = useState<iConta[]>([]);
  const [contatos, setContatos] = useState<IContato[]>([]);
  const [formas, setFormas] = useState<IFormaPagamento[]>([]);

  useEffect(() => {
    if  (id) {
      receberService.get(id).then( data => {
          setData(data)
        }).catch(err => {
            navigate('/recebers');
        })
    } else {
      initial.data_emissao = new Date().toISOString().split('T')[0];
      initial.data_vencimento = new Date().toISOString().split('T')[0];
      setData(initial);
    }

    contaService.getAllContas().then( data => {
      setContas(data);
      if (data.length > 0) {
        initial.conta = data[0].id;
      }
    }).catch(err => {
      console.log(err);
    });

    contatoService.getAllContatos().then( data => {
      setContatos(data);
      if (data.length > 0) {
        initial.contato = data[0].id;
      }
    }).catch(err => {
      console.log(err);
    });

    formaService.getAllFormaPagamentos().then( data => {
      setFormas(data);
      if (data.length > 0) {
        initial.formapagamento = data[0].id;
      }
    }).catch(err => {
      console.log(err);
    });


  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (id) {
      receberService.update(id, data).then( data => {
            navigate('/recebers')
        }).catch(err => {
            if (err.response.status === 400) {
                setErrors(err.response.data);
            } else {
                setShowError(true);
                setShowMessageError('Erro desconhecido');
            }
        })
    } else {
      receberService.create(data).then( data => {
            navigate('/recebers')
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
    setData({...data, [name]: value});
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
                  <Link to="/recebers" className="btn btn-secondary ms-1"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
              </Card.Header>

              <Card.Body>
                <Row>
                    <Col md>
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control name="documento" value={data.documento } autoFocus
                                type="text" onChange={handleChange} maxLength={20}  />
                            {errors.documento && (
                                <ul className="errorfield">
                                    {errors.documento.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" controlId="data_emissao">
                            <Form.Label>Data Emissao</Form.Label>
                            <Form.Control name="data_emissao" value={data.data_emissao} 
                                type="date" onChange={handleChange} />
                            {errors.data_emissao && (
                                <ul className="errorfield">
                                    {errors.data_emissao.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" controlId="data_vencimento">
                            <Form.Label>Data Vencimento</Form.Label>
                            <Form.Control name="data_vencimento" value={data.data_vencimento} 
                                type="date" onChange={handleChange} />
                            {errors.data_vencimento && (
                                <ul className="errorfield">
                                    {errors.data_vencimento.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                  <Col md={3}>
                        <Form.Group className="mb-3" controlId="conta">
                            <Form.Label>Conta</Form.Label>
                            <Form.Select name="conta" value={data.conta}  onChange={handleChange}>
                                {contas.map((conta: iConta) => (
                                    <option key={conta.id} value={conta.id}>{conta.descricao}</option>
                                ))}
                            </Form.Select>
                            {errors.conta && (
                                <ul className="errorfield">
                                    {errors.conta.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3" controlId="formapagamento">
                            <Form.Label>Forma de Pagamento</Form.Label>
                            <Form.Select name="formapagamento" value={data.formapagamento}  onChange={handleChange}>
                                {formas.map((forma: IFormaPagamento) => (
                                    <option key={forma.id} value={forma.id}>{forma.descricao}</option>
                                ))}
                            </Form.Select>
                            {errors.formapagamento && (
                                <ul className="errorfield">
                                    {errors.formapagamento.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="contato">
                            <Form.Label>Contatos</Form.Label>
                            <Form.Select name="contato" value={data.contato}  onChange={handleChange}>
                                {contatos.map((contato: IContato) => (
                                    <option key={contato.id} value={contato.id}>{contato.nome}</option>
                                ))}
                            </Form.Select>
                            {errors.contato && (
                                <ul className="errorfield">
                                    {errors.contato.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group className="mb-3" controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control name="valor" value={data.valor} 
                                type="number" onChange={handleChange} maxLength={20} />
                            {errors.valor && (
                                <ul className="errorfield">
                                    {errors.valor.map((error, index) => (
                                        <li key={index} className="text-danger">{error}</li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Col>
                    
                </Row>
                      
              </Card.Body>
          </Card>
      </Form>
    </div>
  );
};

export default ReceberForm;