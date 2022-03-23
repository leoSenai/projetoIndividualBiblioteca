const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08"
                aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center" id="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="emprestimos" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastros
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="emprestimos">
                            <li><a className="dropdown-item" href="./criancas.html">Crianças</a></li>
                            <li><a className="dropdown-item" href="#">Livros</a></li>
                            <li><a className="dropdown-item" href="#">Usuários</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="emprestimos" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Emprestimos
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="emprestimos">
                            <li><a className="dropdown-item" href="#">Consultar</a></li>
                            <li><a className="dropdown-item" href="#">Emprestar</a></li>
                            <li><a className="dropdown-item" href="#">Renovar</a></li>
                            <li><a className="dropdown-item" href="#">Devolver</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="emprestimos" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Multas
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="emprestimos">
                            <li><a className="dropdown-item" href="#">Consultar</a></li>
                            <li><a className="dropdown-item" href="#">Aplicar</a></li>
                            <li><a className="dropdown-item" href="#">Quitar</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="emprestimos" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Relatórios
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="emprestimos">
                            <li><a className="dropdown-item" href="#">Livros</a></li>
                            <li><a className="dropdown-item" href="#">Multas</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
  
  }
  
  export default Menu