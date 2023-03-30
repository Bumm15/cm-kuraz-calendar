import { Container } from "react-bootstrap";
import { Calender } from "../../pages/Calender";
import { NavbarAdmin } from "./NavbarAdmin";

export function AdminPanel() {
    return (<>
    <NavbarAdmin />
    <Container>
    <Calender />
    </Container>
    </>)
}