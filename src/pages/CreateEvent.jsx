import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarFixed from "../components/Navbar";
import Swal from "sweetalert2";
import API from "../api";

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    organizer: "",
    registrations: "",
    status: "active",
    image: "",
  });

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ==============================
  // HANDLE SUBMIT (BACKEND CONNECTED)
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/events", formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event created successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/event");
      });

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to create event",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarFixed />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #0b0f19 0%, #0e1324 100%)",
        }}
      >
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card
                className="text-white border-0 p-4"
                style={{
                  backgroundColor: "#111827",
                  borderRadius: "18px",
                }}
              >
                <Card.Body>
                  <h4 className="mb-4 fw-bold">
                    Create Event
                  </h4>

                  <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                      <Form.Control
                        placeholder="Event Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        placeholder="Venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        placeholder="Organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Max Registrations"
                        name="registrations"
                        value={formData.registrations}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="current">Current</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        background:
                          "linear-gradient(90deg,#6366f1,#22d3ee)",
                        border: "none",
                        width: "100%",
                        fontWeight: "600",
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        "Save Event 🚀"
                      )}
                    </Button>

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

export default CreateEvent;
