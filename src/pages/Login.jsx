import React, { useState } from "react";
import { Card, Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";

function LoginAlt() {
  const [enrollment, setEnrollment] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enrollment || !pw) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email: enrollment,
        password: pw,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email / Enrollment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      value={enrollment}
                      onChange={(e) => setEnrollment(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Contact admin if you face issues
                  </small>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginAlt;
