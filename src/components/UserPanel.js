import { Carousel, Container, Col, Row } from "react-bootstrap";
import { Calender } from "../pages/Calender";
import { UserNavbar } from "./UserNavbar";


export function UserPanel() {
    return (
        <>
        <UserNavbar />
        <Container variant="dark">
            <Row>
                <Col className="col-5">
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <img className="d-block w-100" src="logo192.png" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="logo192.png" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="logo192.png" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className="col-5">
                    <h3 id="about">O nás</h3>
                    <p>jooooooooooooooooooooooooooooooooooooo
                        oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                        ooooooooooooooooooooooooooooooooooooooooooo
                        ooooooooooooooooooooooooo
                        ooooooooooooooooooooooooooooooooooooooooo</p>
                </Col>
            </Row>
            <Row>
                <h3>Přijďte si nás poslechnout</h3>
            </Row>
        </Container>
        </>
    )
}