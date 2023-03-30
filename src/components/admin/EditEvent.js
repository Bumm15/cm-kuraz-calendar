import { Button, Form } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useDB } from "../../contexts/firebaseContext";

export function EditEvent({ events, callback }) {
    const [date, setDate] = useState(events.date.split(".").reverse().join("-"));
    const [name, setName] = useState(events.name)
    const [place, setPlace] = useState(events.place)
    const [timeSince, setTimeSince] = useState("")
    const [timeTo, setTimeTo] = useState("")

    const { updateDatabaseNode } = useDB()

    useEffect(() => {
        if (events.time === "Neznámý") {
            setTimeSince("")
            setTimeTo("")
        } else if (events.time.length > 5) {
            const [since, to] = events.time.split(" - ");
            setTimeSince(since)
            setTimeTo(to)
        } else {
            setTimeSince(events.time)
        }
    }, [])

    const dateRef = useRef()
    const nameRef = useRef()
    const placeRef = useRef()
    const timeSinceRef = useRef()
    const timeToRef = useRef()

    function handleUpdate(e) {
        e.preventDefault(e)

        updateDatabaseNode(
            events.id,
            nameRef.current?.value,
            dateRef.current?.value,
            placeRef.current?.value,
            timeSinceRef.current?.value,
            timeToRef.current?.value
        )

        callback()
    }

    return(
        <div className="event"> 
            <Form onSubmit={handleUpdate}>
            <Form.Group className="d-inline-flex justify-content-between w-100">
                    <Form.Label style={{ paddingTop: ".5rem", paddingRight: "1rem"}}>Název:</Form.Label>
                    <Form.Control className="w-75" ref={nameRef} onChange={() => {
                        setName(nameRef.current?.value)
                    }} type="text" value={name} />
                </Form.Group>
                <Form.Group className="d-inline-flex justify-content-between w-100">
                    <Form.Label style={{ paddingTop: ".5rem", paddingRight: ".7rem"}}>Datum:</Form.Label>
                    <Form.Control className="w-75" ref={dateRef} onChange={() => {
                        setDate(dateRef.current?.value)
                    }} type="date" value={date} />
                </Form.Group>
                <Form.Group className="d-inline-flex justify-content-between w-100">
                    <Form.Label style={{ paddingTop: ".5rem", paddingRight: "1.2rem"}}>Místo:</Form.Label>
                    <Form.Control className="w-75" ref={placeRef} onChange={() => {
                        setPlace(placeRef.current?.value)
                    }} type="text" value={place} />
                </Form.Group>
                <br />
                <span className="w-100">Čas:</span>
                <br />
                <Form.Group className="d-inline-flex justify-content-between w-100">
                    <Form.Label style={{ paddingTop: ".5rem", paddingRight: "1.2rem"}}>Od:</Form.Label>
                    <Form.Control className="w-75" ref={timeSinceRef} onChange={() => {
                        setTimeSince(timeSinceRef.current?.value)
                    }} type="time" value={timeSince} />
                </Form.Group>
                <Form.Group className="d-inline-flex justify-content-between w-100">
                    <Form.Label style={{ paddingTop: ".5rem", paddingRight: "1.2rem"}}>Od:</Form.Label>
                    <Form.Control className="w-75" ref={timeToRef} onChange={() => {
                        setTimeTo(timeToRef.current?.value)
                    }} type="time" value={timeTo} />
                </Form.Group>
                <br />
                <Button type="submit" variant="primary" className="w-100">Potvrdit změny</Button>
            </Form>
        </div>
    )
}