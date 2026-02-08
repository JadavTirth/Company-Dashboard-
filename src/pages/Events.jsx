import React from "react";
import { Container, Row, Col, Card, Table, Button, Badge } from "react-bootstrap";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css"; // ✅ same css file

function Event() {
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
        <Container fluid className="py-4 px-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-white fw-bold mb-1">Events & Activities</h4>
              <small style={{ color: "#9ca3af" }}>
                Manage campus events, registrations and schedules
              </small>
            </div>

            <Button
              style={{
                background: "linear-gradient(90deg,#6366f1,#22d3ee)",
                border: "none",
              }}
            >
              + Create Event
            </Button>
          </div>

          {/* Summary cards */}
          <Row className="mb-4">
            {/* cards same as your code */}
            {/* ...unchanged... */}
          </Row>

          {/* Main Event Table */}
          <Row>
            <Col>
              <Card
                className="border-0 text-white"
                style={{
                  backgroundColor: "#111827",
                  boxShadow: "0 10px 25px rgba(0,0,0,.45)",
                }}
              >
                <Card.Body>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">
                      Event Management
                    </h6>

                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-light">
                        Export
                      </Button>
                      <Button size="sm" variant="outline-light">
                        Filter
                      </Button>
                    </div>
                  </div>

                  {/* ✅ FIXED TABLE */}
                  <Table
                    responsive
                    bordered
                    className="align-middle mb-0 table-transparent "
                  >
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Venue / Mode</th>
                        <th>Organizer</th>
                        <th>Registrations</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Cyber Security Awareness Workshop</td>
                        <td>Technical</td>
                        <td>12 Mar 2026</td>
                        <td>Seminar Hall – A</td>
                        <td>Computer Dept.</td>
                        <td>86</td>
                        <td>
                          <Badge bg="success">Upcoming</Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-info">
                            View
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td>Web Development Bootcamp</td>
                        <td>Technical</td>
                        <td>18 Mar 2026</td>
                        <td>Online</td>
                        <td>IT Dept.</td>
                        <td>142</td>
                        <td>
                          <Badge bg="success">Upcoming</Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-info">
                            View
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td>TechFest 2026</td>
                        <td>Festival</td>
                        <td>02 Feb 2026</td>
                        <td>Main Ground</td>
                        <td>Student Council</td>
                        <td>310</td>
                        <td>
                          <Badge bg="secondary">Completed</Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-light">
                            Report
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td>Placement Preparation Seminar</td>
                        <td>Career</td>
                        <td>28 Jan 2026</td>
                        <td>Auditorium</td>
                        <td>T&amp;P Cell</td>
                        <td>94</td>
                        <td>
                          <Badge bg="warning" text="dark">Scheduled</Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-info">
                            View
                          </Button>
                        </td>
                      </tr>

                    </tbody>
                  </Table>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
}

export default Event;
