import { useState, useRef } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserNavbar } from "../components/UserNavbar";
import { useAuth } from "../contexts/authContext";

export function SignIn() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { signIn, user } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);
        try {
            setError('');
            await signIn(emailRef.current.value, passwordRef.current.value);
            window.location.href = '/'
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
                <h2 className="text-center md-4">Přihlášení</h2>
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
                    <Link to="/forgotPassword">Zapomenuté heslo</Link>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Přihlásit se</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">Nemáš účet? zaregistruj se <Link to="/register">tady</Link></div>
        </>
        )
}