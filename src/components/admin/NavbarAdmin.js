import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { useAuth } from "../../contexts/authContext";

export function NavbarAdmin() {

    const {logOut} = useAuth()

    return(
        <>
        <NavbarBS collapseOnSelect expand="sm" bg="light" variant="light">
            <Container>

                <NavbarBS.Brand href="#home">CM-Kuráž</NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBS.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#1">Kalendář akcí</Nav.Link>
                    <Nav.Link href="#2">Úprava stránky</Nav.Link>
                    <Nav.Link href="#3">Oznámení</Nav.Link>
                </Nav>
                </NavbarBS.Collapse>
                <Nav className="ml-auto">

                <Button variant="outline-success" block="true" onClick={() => {logOut()
                    window.location.href="/"}}>Odhlásit se</Button>
                </Nav>
            </Container>
    </NavbarBS>
        </>)
}