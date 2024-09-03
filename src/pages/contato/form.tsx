import React, {useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Alert, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { IContato as iData } from "../../interfaces/ContatoInterface";
import { useNavigate, useParams } from "react-router-dom";
import contatoService from "../../services/ContatoService";

const initial = {
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
};


const initialFieldsError = {
  nome: [],
  cpf_cnpj: [],
  endereco: [],
  numero: [],
  cep: [],
  complemento: [],    
  bairro: [],
  cidade: [],
  estado: [],
  email: [],
  telefone: [],
  celular: [],
}

const estados = [
  {id: 'AC', nome: 'Acre'},
  {id: 'AL', nome: 'Alagoas'},
  {id: 'AP', nome: 'Amapá'},
  {id: 'AM', nome: 'Amazonas'},
  {id: 'BA', nome: 'Bahia'},
  {id: 'CE', nome: 'Ceará'},
  {id: 'DF', nome: 'Distrito Federal'},
  {id: 'ES', nome: 'Espírito Santo'},
  {id: 'GO', nome: 'Goiás'},
  {id: 'MA', nome: 'Maranhão'},
  {id: 'MT', nome: 'Mato Grosso'},
  {id: 'MS', nome: 'Mato Grosso do Sul'},
  {id: 'MG', nome: 'Minas Gerais'},
  {id: 'PA', nome: 'Pará'},
  {id: 'PB', nome: 'Paraíba'},
  {id: 'PR', nome: 'Paraná'},
  {id: 'PE', nome: 'Pernambuco'},
  {id: 'PI', nome: 'Piauí'},
  {id: 'RJ', nome: 'Rio de Janeiro'},
  {id: 'RN', nome: 'Rio Grande do Norte'},
  {id: 'RS', nome: 'Rio Grande do Sul'},
  {id: 'RO', nome: 'Rondônia'},
  {id: 'RR', nome: 'Roraima'},
  {id: 'SC', nome: 'Santa Catarina'},
  {id: 'SP', nome: 'São Paulo'},
  {id: 'SE', nome: 'Sergipe'},
  {id: 'TO', nome: 'Tocantins'},
];



const ContatoForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [showError, setShowError] = useState(false);
  const [showMessageError, setShowMessageError] = useState('');
  const [errors, setErrors] = useState(initialFieldsError);
  const [contato, setContato] = useState<iData>(initial);

  useEffect(() => {
    if (id) {
      contatoService.get(id).then( data => {
        setContato(data);
      }).catch(err => {
        navigate('/contatos');
      });
    }
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (id) {
      contatoService.update(id, contato).then( data => {
        navigate('/contatos');
      }).catch(err => {
        if (err.response.status === 400) {
          setErrors(err.response.data);
        } else {
          setShowError(true);
          setShowMessageError('Erro desconhecido');
        }
      });
    } else {
      contatoService.create(contato).then( data => {
        navigate('/contatos');
      }).catch(err => {
        if (err.response.status === 400) {
          setErrors(err.response.data);
        } else {
          setShowError(true);
          setShowMessageError('Erro desconhecido');
        }
      });
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContato({...contato, [name]: value});
  }

  return (
    <div>
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                <span>{showMessageError}</span>
            </Alert>
            <Form onSubmit={handleSubmit} noValidate>
                <Card>
                    <Card.Header>
                        <Card.Title className="text-center">Formulário de Contato</Card.Title>
                        
                    </Card.Header>

                    <Card.Body>
                        <Row>
                            <Col md>
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control name="nome" value={contato.nome} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.nome && (
                                        <ul className="errorfield">
                                            {errors.nome.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="cpf_cnpj">
                                    <Form.Label>CPF/CNPJ</Form.Label>
                                    <Form.Control name="cpf_cnpj" value={contato.cpf_cnpj} 
                                        type="text" onChange={handleChange} maxLength={14} />

                                    {errors.cpf_cnpj && (
                                        <ul className="errorfield">
                                            {errors.cpf_cnpj.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="endereco">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control name="endereco" value={contato.endereco} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.endereco && (
                                        <ul className="errorfield">
                                            {errors.endereco.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="numero">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control name="numero" value={contato.numero} 
                                        type="text" onChange={handleChange} maxLength={10} />

                                    {errors.numero && (
                                        <ul className="errorfield">
                                            {errors.numero.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="cep">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control name="cep" value={contato.cep} 
                                        type="text" onChange={handleChange} maxLength={8} />

                                    {errors.cep && (
                                        <ul className="errorfield">
                                            {errors.cep.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="complemento">
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control name="complemento" value={contato.complemento} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.complemento && (
                                        <ul className="errorfield">
                                            {errors.endereco.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className="mb-3" controlId="bairro">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control name="bairro" value={contato.bairro} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.bairro && (
                                        <ul className="errorfield">
                                            {errors.bairro.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="cidade">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control name="cidade" value={contato.cidade} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.cidade && (
                                        <ul className="errorfield">
                                            {errors.cidade.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="estado">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select name="estado" value={contato.estado}
                                        onChange={handleChange}>
                                        <option value="">Selecione...</option>
                                        {estados.map((estado) => (
                                            <option key={estado.id} value={estado.id}>{estado.nome}</option>
                                        ))}
                                    </Form.Select>

                                    {errors.estado && (
                                        <ul className="errorfield">
                                            {errors.estado.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                        </Row>

                       

                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="celular">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control name="celular" value={contato.celular} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.celular && (
                                        <ul className="errorfield">
                                            {errors.celular.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="telefone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control name="telefone" value={contato.telefone} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.telefone && (
                                        <ul className="errorfield">
                                            {errors.telefone.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control name="email" value={contato.email} 
                                        type="text" onChange={handleChange} maxLength={60} />
                                    {errors.email && (
                                        <ul className="errorfield">
                                            {errors.email.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <Form.Group className="mb-3" controlId="ativo">
                                    <Form.Check type="checkbox" 
                                        name="ativo" 
                                        label="Ativo?" checked={contato.ativo} 
                                        onChange={(e) => setContato({...contato, ativo: e.target.checked})} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Card.Body>
                    <Card.Footer>
                        <Button variant={id ? 'success': 'primary'} type="submit">
                            <FontAwesomeIcon icon={faSave} /> {id ? 'Salvar': 'Criar' }
                        </Button>
                        <Link to="/contatos" className="btn btn-secondary ms-1"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
  );
};

export default ContatoForm;