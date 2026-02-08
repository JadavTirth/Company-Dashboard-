import React, { useState } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import NavbarFixed from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function LoginAlt() {

  const [enrollment, setEnrollment] = useState("admin")
  const [pw, setpw] = useState("1234")


  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault()  // page reload hone se rokta hai.
    if (!enrollment || !pw) {
      alert("Fill all fields");
      return;


      
    }
    // ---- Demo login logic (replace later with API) ----
    if (enrollment === "admin" && pw === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid enrollment number or password");

    }
  }





  return (
    <>
      {/* <NavbarFixed /> */}

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#020617 0%, #0b1220 40%, #020617 100%)",
        }}
      >
        <Container
          fluid
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "90vh" }}
        >
          <Row
            className="w-100 justify-content-center"
            style={{ maxWidth: "950px" }}
          >

            {/* Left branding / info panel */}
            

            {/* Right login form */}
            <Col md={6} className="p-0">
              <Card
                className="border-0 text-white h-100"
                style={{
                  background: "rgba(17,24,39,0.85)",
                  backdropFilter: "blur(8px)",
                  borderTopRightRadius: "16px",
                  borderBottomRightRadius: "16px",
                  boxShadow: "0 20px 40px rgba(0,0,0,.6)"
                }}
              >
                <Card.Body className="p-4 p-md-5">

                  <div className="mb-4">
                    <h4 className="fw-bold mb-1">
                      Sign in
                    </h4>
                    <small style={{ color: "#9ca3af" }}>
                      Use your enrollment credentials
                    </small>
                  </div>

                  <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">
                        Enrollment Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. 220430107001"
                        className="bg-dark text-white border-secondary"
                        style={{ borderRadius: "10px" }}
                        value={enrollment}
                        onChange={(e) => setEnrollment(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="text-light">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        className="bg-dark text-white border-secondary"
                        style={{ borderRadius: "10px" }}
                        value={pw}
                        onChange={(e) => setpw(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 fw-semibold"
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px",
                        background:
                          "linear-gradient(90deg,#6366f1,#22d3ee)"
                      }}
                    >
                      Login
                    </Button>

                    <div
                      className="text-center mt-3"
                      style={{ fontSize: "14px", color: "#9ca3af" }}
                    >
                      Trouble logging in? Contact admin
                    </div>

                  </Form>

                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginAlt;
