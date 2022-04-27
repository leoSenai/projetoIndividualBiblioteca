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
                                        <NavDropdown.Item href="/livro">Livros</NavDropdown.Item>
                                        <NavDropdown.Item href="/usuario">Usuários</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/emprestimo">Empréstimos</Nav.Link>
                                    <Nav.Link href="/multa">Multas</Nav.Link>
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