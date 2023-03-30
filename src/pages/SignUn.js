import { useState, useRef } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserNavbar } from "../components/UserNavbar";
import { useAuth } from "../contexts/authContext";

export function SignUp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { signUp, user } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Hesla se neshodují");
        }

        try {
            setError('');
            signUp(emailRef.current.value, passwordRef.current.value)
            .catch((error) => {
                setError(error.message)
            })
            
            window.location.href = "/"
        } catch (error){
            setError(error.message)
            console.log(error)
        }
        setLoading(false);


    }
    
    return(
        <>
        <UserNavbar />
        <br /><br />
        <Card>
            <Card.Body>
                <h2 className="text-center md-4">Registrace</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Heslo:</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Heslo znovu:</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Zaregistrovat se</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">Už máš účet? Přihlaš sa <Link to="/login">tady</Link></div>
        </>
        )
}