import { Carousel, Container, Col, Row } from "react-bootstrap";
import { UserNavbar } from "./UserNavbar";
import "../styles/home.css"


export function UserPanel() {
    return (
        <>
        <UserNavbar />
        <Container>
            <aside>
                
            <Row>
            
                <Col xs={12} md={6} className="order-md-1 order-2"> 
                    <Carousel variant="light">
                        <Carousel.Item>
                            <img className="d-block w-100" src="photo1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="photo2.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col xs={12} md={6} className="order-md-2 order-1">
                    <h3 id="about">O nás</h3>
                    <p>ahoj aho jahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj ahoj </p>
                </Col>
            </Row>
            </aside>
            <aside>
            <Row>
                <div>
                    <h3>Přijďte si nás poslechnout</h3>
                </div>
            </Row>
            </aside>
        </Container>
        </>
    )
}