import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css";
import Swal from "sweetalert2";
import API from "../api"

function InternAdd() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        college: "",
        university: "",
        phone: "",
        email: "", // Added Email field
        address: "", // Added Address field
        project: "",
        field: "",
        status: "Active"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            return Swal.fire("Invalid Email", "Please enter a valid email address", "error");
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(form.phone)) {
            return Swal.fire("Invalid Phone", "Please enter a valid 10-digit phone number", "error");
        }

        try {
            const res = await API.post(
                "/api/website/enquiry/add",
                form
            );

            if (res.data.status) {
                Swal.fire({
                    icon: "success",
                    title: "Saved!",
                    text: "Intern added successfully",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/internList");
                });
            }

        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while adding intern"
            });
        }
    };

    return (
        <>
            <NavbarFixed />
            <div style={{ minHeight: "100vh", backgroundColor: "#0b0f19" }}>
                <Container fluid className="py-4 px-4">
                    <Row className="justify-content-center">
                        <Col md={8} lg={7}>
                            <Card className="text-white border-0 p-3" style={{ backgroundColor: "#111827" }}>
                                <Card.Body>
                                    <h4 className="text-white mb-4 fw-bold">Add Intern</h4>
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Control placeholder="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control placeholder="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
                                            </Col>

                                            {/* Email Field */}
                                            <Col md={6}>
                                                <Form.Control type="email" placeholder="Email Address" name="email" value={form.email} onChange={handleChange} required />
                                            </Col>

                                            {/* Phone Field */}
                                            <Col md={6}>
                                                <Form.Control type="tel" placeholder="Phone (10 digits)" name="phone" value={form.phone} onChange={handleChange} required />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control placeholder="College" name="college" value={form.college} onChange={handleChange} />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control placeholder="University" name="university" value={form.university} onChange={handleChange} />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control placeholder="Project" name="project" value={form.project} onChange={handleChange} />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control placeholder="Field of internship" name="field" value={form.field} onChange={handleChange} />
                                            </Col>

                                            {/* Address Field */}
                                            <Col md={12}>
                                                <Form.Control as="textarea" rows={2} placeholder="Full Address" name="address" value={form.address} onChange={handleChange} />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Select name="status" value={form.status} onChange={handleChange}>
                                                    <option value="Active">Active</option>
                                                    <option value="Completed">Completed</option>
                                                </Form.Select>
                                            </Col>

                                            <Col md={12} className="d-flex gap-2">
                                                <Button type="submit" variant="outline-light">Save Intern</Button>
                                                <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                                            </Col>
                                        </Row>
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

export default InternAdd;
