import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css";

function Dashboard() {
  return (
    <>
      <NavbarFixed />

      {/* Page Background */}
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0f19" }}>
        <Container fluid className="py-4 px-4">

          <h4 className="text-white mb-4 fw-bold">
            Intern & Events Dashboard
          </h4>

          {/* Top Stats Cards */}
          <Row className="mb-4">

            <Col md={3}>
              <Card className="text-white border-0 mb-3" style={{ backgroundColor: "#111827" }}>
                <Card.Body>
                  <small className="text-white-50">Total Interns</small>
                  <h3 className="fw-bold mt-2">42</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-white border-0 mb-3" style={{ backgroundColor: "#111827" }}>
                <Card.Body>
                  <small className="text-white-50">Active Interns</small>
                  <h3 className="fw-bold mt-2">28</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-white border-0 mb-3" style={{ backgroundColor: "#111827" }}>
                <Card.Body>
                  <small className="text-white-50">Upcoming Events</small>
                  <h3 className="fw-bold mt-2">5</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-white border-0 mb-3" style={{ backgroundColor: "#111827" }}>
                <Card.Body>
                  <small className="text-white-50">System Status</small>
                  <h5 className="fw-bold mt-2 text-success">Online</h5>
                </Card.Body>
              </Card>
            </Col>

          </Row>

          {/* Main Section */}
          <Row>

            {/* Recent Intern Activities */}
            <Col md={8}>
              <Card className="text-white border-0 mb-4" style={{ backgroundColor: "#111827" }}>
                <Card.Body>

                  <h6 className="fw-bold mb-3">
                    Recent Intern Activities
                  </h6>

                  <Table
                    responsive
                    bordered
                    className="align-middle mb-0 table-dark-transparent"
                  >
                    <thead>
                      <tr>
                        <th>Intern ID</th>
                        <th>Name</th>
                        <th>Event</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>INT-101</td>
                        <td>Rahul Patel</td>
                        <td>Tech Workshop</td>
                        <td className="text-success">Assigned</td>
                      </tr>
                      <tr>
                        <td>INT-108</td>
                        <td>Neha Shah</td>
                        <td>Campus Drive</td>
                        <td className="text-success">Present</td>
                      </tr>
                      <tr>
                        <td>INT-112</td>
                        <td>Aman Joshi</td>
                        <td>Hackathon</td>
                        <td className="text-warning">Pending</td>
                      </tr>
                    </tbody>
                  </Table>

                </Card.Body>
              </Card>
            </Col>

            {/* Quick Actions */}
            <Col md={4}>
              <Card className="text-white border-0" style={{ backgroundColor: "#111827" }}>
                <Card.Body>

                  <h6 className="fw-bold mb-3">
                    Quick Actions
                  </h6>

                  <div className="d-grid gap-2">
                    <Button variant="outline-light">
                      Add Intern
                    </Button>
                    <Button variant="outline-light">
                      Create Event
                    </Button>
                    <Button variant="outline-light">
                      View Intern List
                    </Button>
                  </div>

                </Card.Body>
              </Card>
            </Col>

          </Row>

        </Container>
      </div>
    </>
  );
}

export default Dashboard;
