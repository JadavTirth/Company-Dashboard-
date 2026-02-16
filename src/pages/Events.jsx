import React, { useState, useEffect } from "react";
import API from "../api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css";

function Event() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==============================
  // FETCH EVENTS FROM BACKEND
  // ==============================
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/events");
      setEvents(res.data.data); // backend response
      setLoading(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ==============================
  // DELETE EVENT
  // ==============================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/events/${id}`);
      fetchEvents(); // refresh after delete
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  // ==============================
  // FILTER LOGIC
  // ==============================
  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.status === filter);

  // ==============================
  // STATUS BADGE
  // ==============================
  const getBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "current":
        return <Badge bg="warning" text="dark">Current</Badge>;
      case "completed":
        return <Badge bg="secondary">Completed</Badge>;
      default:
        return null;
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
        <Container fluid className="py-4 px-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-white fw-bold mb-1">
                Events & Activities
              </h4>
              <small style={{ color: "#9ca3af" }}>
                Manage campus events
              </small>
            </div>

            <Button
              style={{
                background:
                  "linear-gradient(90deg,#6366f1,#22d3ee)",
                border: "none",
              }}
              onClick={() => navigate("/create-event")}
            >
              + Create Event
            </Button>
          </div>

          {/* FILTER TOGGLE */}
          <div className="mb-4">
            <ToggleButtonGroup
              type="radio"
              name="status"
              value={filter}
              onChange={(val) => setFilter(val)}
            >
              <ToggleButton value="all" variant="outline-light">
                All
              </ToggleButton>
              <ToggleButton value="active" variant="outline-success">
                Active
              </ToggleButton>
              <ToggleButton value="current" variant="outline-warning">
                Current
              </ToggleButton>
              <ToggleButton value="completed" variant="outline-secondary">
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center text-white">
              <Spinner animation="border" />
            </div>
          )}

          {/* EVENT CARDS */}
          <Row>
            {!loading && filteredEvents.length === 0 && (
              <h6 className="text-white text-center">
                No Events Found
              </h6>
            )}

            {filteredEvents.map((event) => (
              <Col md={4} key={event._id} className="mb-4">
                <Card
                  className="border-0 text-white"
                  style={{
                    backgroundColor: "#111827",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,.45)",
                  }}
                >
                  {/* IMAGE */}
                  {event.image && (
                    <div
                      style={{
                        height: "160px",
                        backgroundImage: `url(${event.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  <Card.Body>
                    <h6 className="fw-bold mb-2">
                      {event.title}
                    </h6>

                    <p className="mb-1">
                      📅 {new Date(event.date).toLocaleDateString()} | 📍{" "}
                      {event.venue}
                    </p>

                    <p className="mb-1">
                      👨‍🏫 {event.organizer}
                    </p>

                    <p className="mb-2">
                      👥 {event.registrations} Registered
                    </p>

                    <div className="mb-3">
                      {getBadge(event.status)}
                    </div>

                    <div className="d-flex justify-content-between">
                      <Button size="sm" variant="outline-info">
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() =>
                          navigate(`/edit-event/${event._id}`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() =>
                          handleDelete(event._id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        </Container>
      </div>
    </>
  );
}

export default Event;
