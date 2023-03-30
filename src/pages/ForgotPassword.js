import { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext"

export function ForgotPassword() {
    const { passwordReset } = useAuth();
    const emailRef = useRef()

    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const handleSubmit = async (e) => {
        e.preventDefault(e);
        setLoading(true);
        try {
          const sent = await passwordReset(emailRef.current.value);
          if (sent === true) {
            setSuccess(true);
          } else {
            setError(sent);
          }
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      };
    
    return(
        <>
        <br /><br />
        <Card>
            <Card.Body>
                <h2 className="text-center md-4">Zapomenuté heslo</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success === true && <Alert variant="success">Zkontrolujte E-mail. Nebo se <Link to="/login">přihlašte</Link></Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Odeslat email</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">Na E-mail Vám přijde potvrzovací kod</div>
        </>
    )
}