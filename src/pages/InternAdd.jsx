import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css";
import Swal from "sweetalert2";
import API from "../api"

function InternAdd() {

    console.log("API URL =>", import.meta.env.VITE_API_URL);

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
                            <Card className="text-white border-0 p-4 modern-card">
                                <Card.Body>
                                    <h4 className="mb-4 fw-bold">Add Intern</h4>

                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-4">

                                            {/* PERSONAL INFO */}
                                            <div className="section-title">PERSONAL INFORMATION</div>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="First name"
                                                    name="firstName"
                                                    value={form.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="Last name"
                                                    name="lastName"
                                                    value={form.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control
                                                    type="email"
                                                    className="modern-input"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control
                                                    type="tel"
                                                    className="modern-input"
                                                    placeholder="Phone (10 digits)"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>

                                            <Col md={12}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    className="modern-input"
                                                    placeholder="Full Address"
                                                    name="address"
                                                    value={form.address}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            {/* ACADEMIC INFO */}
                                            <div className="section-title">ACADEMIC DETAILS</div>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="College"
                                                    name="college"
                                                    value={form.college}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="University"
                                                    name="university"
                                                    value={form.university}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            {/* INTERNSHIP INFO */}
                                            <div className="section-title">INTERNSHIP DETAILS</div>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="Project"
                                                    name="project"
                                                    value={form.project}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Control
                                                    className="modern-input"
                                                    placeholder="Field of Internship"
                                                    name="field"
                                                    value={form.field}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Select
                                                    className="modern-input"
                                                    name="status"
                                                    value={form.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Completed">Completed</option>
                                                </Form.Select>
                                            </Col>

                                            {/* Buttons */}
                                            <Col md={12} className="d-flex gap-3 mt-3">
                                                <Button type="submit" className="gradient-btn">
                                                    Save Intern 🚀
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline-light"
                                                    onClick={() => navigate(-1)}
                                                >
                                                    Cancel
                                                </Button>
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
