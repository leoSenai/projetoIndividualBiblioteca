import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
const Menu = () => {
    return (
        <>
            <Navbar variant="dark" bg="dark" expand="lg" >
                <Container fluid>
                            <Navbar.Toggle aria-controls="navbar-dark-example" />
                            <Navbar.Collapse id="navbar-dark-example">
                                <Nav className="m-auto">
                                    <Navbar.Brand href="/dash">Home</Navbar.Brand>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Cadastros"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/crianca">Crianças</NavDropdown.Item>
                                        <NavDropdown.Item href="/livros">Livros</NavDropdown.Item>
                                        <NavDropdown.Item href="/usuarios">Usuários</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Emprestimos"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/livros">Consultar</NavDropdown.Item>
                                        <NavDropdown.Item href="/crianca">Emprestar</NavDropdown.Item>
                                        <NavDropdown.Item href="/usuarios">Renovar</NavDropdown.Item>
                                        <NavDropdown.Item href="/usuarios">Devolver</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Multas"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/livros">Consultar</NavDropdown.Item>
                                        <NavDropdown.Item href="/crianca">Aplicar</NavDropdown.Item>
                                        <NavDropdown.Item href="/usuarios">Quitar</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Relatórios"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/livros">Livros</NavDropdown.Item>
                                        <NavDropdown.Item href="/crianca">Multas</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}

export default Menu