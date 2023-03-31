import React, { useState, useRef } from "react"
import { Alert, Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import "../styles/event-dot.css"

import { useDB } from "../contexts/firebaseContext";

import Bin from "../svg/rubbish-bin.svg";
import Pen from "../svg/pen.svg"
import { RemoveEventModal } from "../components/admin/RemoveEventModal";
import { EditEvent } from "../components/admin/EditEvent";
/* TODO: Add alert for error ;)  */


export function Calender() {
    const { 
        removeEventByID, 
        writeToDatabase,
        events
    } = useDB()

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState(false);

    const [objName, setObjName] = useState("")
    const [ID, setID] = useState("")

    const [success, setSuccess] = useState(false);

    // modal for add event
    const [show, setShow] = useState(false)
    const [showRemove, setShowRemove] = useState(false)

    // edit event vars
    const [edit, setEdit] = useState(false);

    // form refs
    const nameRef = useRef();
    const placeRef = useRef();
    const dateRef = useRef();
    const timeSinceRef = useRef();
    const timeToRef = useRef()

    const tileContent = ({ date }) => {
        const eventDates = events.map((event) => new Date(event.date.split(".").reverse().join("-")));
        const match = eventDates.find((eventDate) => eventDate.toDateString() === date.toDateString());

        return match ? <div className="event-dot"></div> : null;
    };

    const getEventsForDate = () => {
        if (!selectedDate) {
            return []
    }
        const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const [month, day, year] = formatter.format(selectedDate).split('/');
        const selectedDateString = `${day}.${month}.${year}`;
        return events.filter((event) => event.date === selectedDateString);
    } 

    const handleChange = (date) => {
        setSelectedDate(date)
    }

    const handleRemoveShow = (name, id) => {
        setShowRemove(true)
        setObjName(name)
        setID(id)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(false)
        try {
            await writeToDatabase(nameRef.current.value, 
                placeRef.current.value, 
                dateRef.current.value, 
                timeSinceRef.current.value, 
                timeToRef.current.value)
        } catch (e) {
            setError(e)
        }
        setSuccess(() => {
            setSuccess(true)
            window.setTimeout(() => {
                setSuccess(false)
            }, 3000)
        })
        setShow(false)
    }

    return (
    <>
    {error && <Alert variant="danger">{error}</Alert>}
    <RemoveEventModal name={objName} id={ID} callback={removeEventByID} show={showRemove} showCallback={() => setShowRemove(!showRemove)}/>
    {success && <Alert variant="success">Akce byla úspěšně přidána!</Alert>}
    <Row className="justify-content-md-center">
    <Col md="auto">
        <div>
            <h1>Kalendář</h1>
            <Calendar value={selectedDate} onChange={ 
                handleChange} tileContent={tileContent} />
            <Button style={{marginTop: "20px"}} onClick={() => setShow(!show)}>Přidat akci</Button>
        </div>
    </Col>
    <Col md="auto">
    <div style={{ width: "30rem"}}>
        <h1>Víc info</h1>
            <Stack gap={3}>
            {edit ? getEventsForDate().map((event) =>(
                <EditEvent key={event.id} events={event} callback={() => setEdit(false)}/>
            ))
            :
            getEventsForDate().map((event) => (
                <div className="event" key={event.id}>
                    <h4>{event.name}</h4>
                    <span className="text-muted">{event.date}</span>
                    <p><b>místo:</b> {event.place} <br /><b>čas:</b> {event.time}</p>
                    <div className="buttons">
                        <Button onClick={() => handleRemoveShow(event.name, event.id)} className="button1 btn-sm" variant="danger"><img alt="removeBtn" style={{ width: "1rem", height: "1rem" }} src={Bin} /></Button>
                        <Button
                            onClick={() => setEdit(!edit)} 
                            className="button2 btn-sm btn-outline-secondary"><img alt="editBtn" style={{ width: "1rem", height: "1rem" }} src={Pen} /></Button>
                    </div>
                </div>
            ))
            }
        </Stack>
        {
    }
    </div>
    </Col>
    </Row>
    <br />


    {/* Add event modal */}
    <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header>
            <Modal.Title>Přidání akce</Modal.Title>
            <p className="text-muted">* - povinná pole</p>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Název*</Form.Label>
                        <Form.Control type="text" ref={nameRef}  placeholder="Zadej název.." required />
                    </Form.Group>
                    <Form.Group id="place">
                        <Form.Label>Místo*</Form.Label>
                        <Form.Control type="text" ref={placeRef} placeholder="Zadej místo.." required />
                    </Form.Group>
                    <Form.Group id="date">
                        <Form.Label>Datum*</Form.Label>
                        <Form.Control type="date" ref={dateRef} placeholder="Zadej datum.." required />
                    </Form.Group>
                    
                        <Form.Group id="time">
                            <Form.Label>Čas (od-do)</Form.Label>
                            <Row>
                                <Col>
                                    <Row>
                                    <Col>
                                        <p>Od:</p>
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" ref={timeSinceRef} placeholder="Zadej čas.." />
                                    </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p>Do:</p>
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" ref={timeToRef} placeholder="Zadej čas.." />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form.Group>
                    <Button disabled={success} className="w-100 mt-4" type="submit">Přidat akci</Button>
                </Form>
        </Modal.Body>
    </Modal>
    </>
  );



    /*

    const [data, setData] = useState([]); 
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sendingData, setSendingData] = useState(false);
    const [success, setSuccess] = useState(false);

    //modal
    const [show, setShow] = useState(false)
    const [objName, setObjName] = useState("")
    const [ID, setID] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = (name, id) => {
        setShow(true)
        setObjName(name)
        setID(id)
    }

    //form refs
    const nameRef = useRef();
    const placeRef = useRef();
    const dateRef = useRef();
    const timeSinceRef = useRef();
    const timeToRef = useRef()

    //request data table
    const requestData = () => {
        setError(false)
        setLoading(true)
        try {
            onValue(ref(db), snapshot => {
                const data = snapshot.val()
                // sort data if are some
                if(data !== null){
                    const sortedData = _.sortBy(data, item => {
                        return new Date(item.date.split(".").reverse().join("-")).getTime()
                    })
                    setData(Object.values(sortedData))
                } else {
                    setData([])
                }
            })
        } catch (error) {
            setError(true)
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        requestData()
    }, [])

    //adding data to json
    const writeToDatabase = (e) => {
        e.preventDefault();
        setSuccess(false)
        setErrMsg(false)
        const uuid = uid()

        var betterDate = dateRef.current.value.split("-").reverse().join(".");
        
        // checking if data have multiple time values
        if (timeSinceRef.current.value == "" && timeToRef.current.value == "") {
            var time = "Neznámý"
        } else if (timeSinceRef.current.value !== "" && timeToRef.current.value !== "" ) {
            var time = timeSinceRef.current.value + " - " + timeToRef.current.value;
        } else {
            var time = timeSinceRef.current.value
        }


        const formData = {
            id: uuid,
            name: nameRef.current.value,
            place: placeRef.current.value,
            date: betterDate,
            time: time
        }
        try {
            set(ref(db, `/${uuid}`), formData)
        } catch(err) {
            console.log(err)
            setErrMsg(true)
        }
        setSuccess(true)

        nameRef.current.value = ""
        placeRef.current.value = ""
        dateRef.current.value = ""
        timeSinceRef.current.value = ""
        timeToRef.current.value = ""

    }

    //CIMBÁLKA JE NEJLEPŠÍ <333333

    //remove data and reload the page
    const removeFromAkceByName = (id) => {
        setSendingData(true)
        setError(false)
        try {
            remove(ref(db, `/${id}`))
            setSendingData(false)
        } catch (error) {
            console.log(error)
            setError(true)
        }
        setShow(false)
        requestData()

    }
    
    return(
        <>
            <br></br>
            <h1 className="d-flex justify-content-center">Kalendář Akcí:</h1>
            {error &&
            <Alert variant="danger">
            <Alert.Heading>Chybička se vloudila...</Alert.Heading>
            <p>Zkus restartovat stránku a zkus to znovu </p>
            <p>pokud se bude problém vyskytovat i nadále, kontaktuj mě</p>
          </Alert>}
          {data !== [] ?
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Místo</th>
                        <th>Datum</th>
                        <th>Čas</th>
                        <th width="2rem">Odstranit</th>
                    </tr>
                </thead>
                <tbody>
                
                {data.map((akce, index) => (<AkceRow key={index} {...akce} callback={handleShow}/>))}
                </tbody>
            </Table>: <p>Nic tu není</p>
}

            {loading ? 
                <p>Načítání dat</p>
            :
                <p className="text-muted "><small>Pokud data po odstranění nezmizí, restartuj stránku</small></p>}
            <br />
            <div className="d-flex mx-auto col-md-6 mb-4">
            <Card style={{width: "50rem"}}>
            {success &&
            <Alert variant="success">Povedlo se!</Alert>}

            {errMsg &&
            <Alert variant="danger">Akce se nepodařila přidat</Alert>}
            <Card.Body>
                <h2 className="text-center">Přidání akce:</h2>
                <p className="text-muted"><small>* - povinná pole</small></p>
                <Form onSubmit={writeToDatabase}>
                    <Form.Group id="name">
                        <Form.Label>Název*</Form.Label>
                        <Form.Control type="text" ref={nameRef}  placeholder="Zadej název.." required />
                    </Form.Group>
                    <Form.Group id="place">
                        <Form.Label>Místo*</Form.Label>
                        <Form.Control type="text" ref={placeRef} placeholder="Zadej místo.." required />
                    </Form.Group>
                    <Form.Group id="date">
                        <Form.Label>Datum*</Form.Label>
                        <Form.Control type="date" ref={dateRef} placeholder="Zadej datum.." required />
                    </Form.Group>
                    
                        <Form.Group id="time">
                            <Form.Label>Čas (od-do)</Form.Label>
                            <Row>
                                <Col>
                                    <Row>
                                    <Col>
                                        <p>Od:</p>
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" ref={timeSinceRef} placeholder="Zadej čas.." />
                                    </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p>Do:</p>
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" ref={timeToRef} placeholder="Zadej čas.." />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form.Group>
                    <Button disabled={sendingData} className="w-100 mt-4" type="submit">Přidat akci</Button>
                </Form>
            </Card.Body>
         </Card>
         
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Smazání akce</Modal.Title>
                </Modal.Header>
                <Modal.Body>Opravdu chceš akci s názvem {objName} smazat?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Zrušit
                </Button>
                <Button variant="danger" onClick={()=>removeFromAkceByName(ID)}>
                    Smazat
                </Button>
                </Modal.Footer>
      </Modal>
        </>
    )
    */
}