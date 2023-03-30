import { Navbar as NavbarBS, Nav, Button, Container } from "react-bootstrap"
import { useAuth } from "../contexts/authContext"

export function UserNavbar() {
    const { user, logOut } = useAuth()
    return (
        <>
        <NavbarBS collapseOnSelect expand="sm" bg="light" variant="light">
                <Container>


                <NavbarBS.Brand href="/">CM-Kuráž</NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBS.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/#about">O nás</Nav.Link>
                    <Nav.Link href="/#calender">Kalendář akcí</Nav.Link>
                    <Nav.Link href="/#kontakt">Kontakt</Nav.Link>
                </Nav>
                {user ?
                    <Button variant="outline-success" className="mr-2" block="true" onClick={() => {logOut()
                        window.location.href="/"}}>Odhlásit se</Button>
                        :
                        <Button variant="outline-success" className="mr-2" block="true" onClick={() => {
                            window.location.href = "/login"
                        }}>Přihlásit se</Button>
                    }   
                </NavbarBS.Collapse>
                </Container>
                
    </NavbarBS>
        </>
    )
}