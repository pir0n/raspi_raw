import React, { useState, useEffect, useRef } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import './App.css';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import axios from 'axios';



const GetTicketButton = (props) => {
  const price = props.event.price;
  const language = props.language;
  const [modalShowPaid, setModalShowPaid] = React.useState(false);





  if (language === "uk") {
    if (price === "0") {
      return <>
        <Button variant="primary" className="btn btn-success mr-4 " onClick={() => setModalShowPaid(true)}>Get tickets for free</Button>

        <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} />


      </>
    }
    else {
      return <Button variant="primary" className="btn btn-success mr-4" onClick={() => setModalShowPaid(true)} >Get tickets</Button>
      // <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} />
    }
  }

  else if (language === "pl") {
    if (price === "0") {
      return <><Button variant="primary" className="btn btn-success mr-4" onClick={() => setModalShowPaid(true)}>Dostań bilety za darmo</Button>

        <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} /> </>
    }
    else {
      return <Button variant="primary" className="btn btn-success mr-4" onClick={() => setModalShowPaid(true)} >Zdobądź bilety</Button>
      //   <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} />
    }
  }
  else if (language === "it") {
    if (price === "0") {
      return <> <Button variant="primary" className="btn btn-success mr-4" onClick={() => setModalShowPaid(true)}>Ottieni biglietti gratis</Button>

        <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} /> </>
    }
    else {
      return <Button variant="primary" className="btn btn-success mr-4" onClick={() => setModalShowPaid(true)} >Ottieni i biglietti</Button>
      // <MydModalWithGridPaid show={modalShowPaid} lang={language} onHide={() => setModalShowPaid(false)} />
    }
  }
}



function MydModalWithGridPaid(props) {
  const lang = props.lang;
  const price = props.price;
  const timeslots = props.timeslots;
  const maxavailabletickets = props.maxavailableticket;

  const [submitAPI, setSubmitAPI] = useState([{ email: " ", time_slot: " ", number_of_tickets: " " }])

//PUT METHOD PART 
  function UpdateSubmit() {
    setSubmitAPI({ email: "test ", time_slot: "test", number_of_tickets: "tests " });
  }
  useEffect(() => {
    const fetchData = async () => {
      //const json_submitAPI = await JSON.stringify(submitAPI)
      const result = await axios.put('http://localhost:3001/Submit', submitAPI);
    };
    fetchData();
  }, [submitAPI]);

  //keyboard const PART 
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [showkeyboard, setShowkeyboard] = useState(false);


  const onChange = input => {
    setInput(input);

    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    if (button === "{enter}") {
      setShowkeyboard(false)
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const onClickshow = () => {
    setShowkeyboard(true)

  }


  if (price === "0") {

  }
  else {

  }

  return (
    <Modal  {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

      <Container fluid>

        <Form>
          <Form.Group className="pt-2 mt=4" controlId="exampleForm.ControlInput1">
            <Form.Label>Email </Form.Label>
            <Form.Control value={input} inputRef={r => (keyboard.current = r)} type="email" placeholder="name@example.com" onClick={() => onClickshow()} />
            {showkeyboard === true && <Keyboard
              keyboardRef={r => (keyboard.current = r)}
              layoutName={layout}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />}



            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">

            {lang === "uk" && <Form.Label> Number of Tickets:</Form.Label>}
            {lang === "pl" && <Form.Label> Ilość biletów:</Form.Label>}
            {lang === "it" && <Form.Label> Numero di biglietti:</Form.Label>}


            <Form.Control as="select">

              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">

            {lang === "uk" && <Form.Label> Time slot:</Form.Label>}
            {lang === "pl" && <Form.Label> Przedział czasu:</Form.Label>}
            {lang === "it" && <Form.Label> Fascia oraria:</Form.Label>}

            <Form.Control as="select" >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

        </Form>

        <Modal.Footer>
          {lang === "uk" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Close</Button>}
          {lang === "pl" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Zamknij</Button>}
          {lang === "it" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Chiudere</Button>}

          {lang === "uk" && <Button variant="primary" className="btn btn-primary mt-2" onClick={() => UpdateSubmit()}>Submit</Button>}
          {lang === "pl" && <Button variant="primary" className="btn btn-primary mt-2" onClick={props.onHide}>Zatwierdź</Button>}
          {lang === "it" && <Button variant="primary" className="btn btn-primary mt-2" onClick={props.onHide}>Invia</Button>}

        </Modal.Footer></Container>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  const lang = props.language;
  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="container"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.event.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.event.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {lang === "uk" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Close</Button>}
        {lang === "pl" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Zamknij</Button>}
        {lang === "it" && <Button variant="danger" className="btn btn-danger mt-2" onClick={props.onHide}>Chiudere</Button>}
      </Modal.Footer>

    </Modal>
  );
}


const EventItem = (props) => {

  let { event } = props;
  let { language } = props;
  const [modalShow, setModalShow] = React.useState(false);




  return (

    <Col xs={8} sm={8} md={5} lg={4} xl={3}>
      <Card style={{ width: '18rem' }} className="mb-2 box-shadow">


        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={event.patch_img}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={event.patch_img2}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={event.patch_img3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>


        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>
            {event.description}
          </Card.Text>
          <Container fluid="md">
            <GetTicketButton event={event} language={language} />
            {language === "uk" && <Button variant="warning" className="btn btn-success mt-2" onClick={() => setModalShow(true)}>Read more</Button>}
            {language === "pl" && <Button variant="warning" className="btn btn-success mt-2" onClick={() => setModalShow(true)}>Czytaj więcej</Button>}
            {language === "it" && <Button variant="warning" className="btn btn-success mt-2" onClick={() => setModalShow(true)}>Leggi di più</Button>}
          </Container>
          <MyVerticallyCenteredModal
            event={event}
            show={modalShow}
            language={language}
            onHide={() => setModalShow(false)} />
        </Card.Body>
      </Card>
    </Col>
  );
}
export { EventItem };