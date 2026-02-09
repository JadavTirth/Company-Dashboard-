import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, ListGroup } from "react-bootstrap";
import NavbarFixed from "../components/Navbar";
import API from "../api";

function Dashboard() {

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load all notes
  const loadNotes = async () => {
    try {
      const res = await API.get("/api/notes/");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Add note
  const addNote = async (e) => {
    e.preventDefault();

    if (!note.trim()) return;

    try {
      await API.post("/api/notes/", { text: note });
      setNote("");
      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavbarFixed />

      <div style={{ minHeight: "100vh", background: "#0b0f19" }}>
        <Container className="pt-4">

          <Card
            className="text-white border-0"
            style={{ backgroundColor: "#111827", minHeight: "75vh" }}
          >
            <Card.Body
              className="d-flex flex-column"
              style={{ minHeight: "75vh" }}
            >

              <h4 className="fw-bold mb-3">Notes Board</h4>

              {/* Notes list */}
              <div style={{ overflowY: "auto", flex: 1 }}>

                <ListGroup variant="flush">

                  {notes.length === 0 && (
                    <div className="text-white-50 text-center mt-4">
                      No notes yet
                    </div>
                  )}

                  {notes.map((n) => (
                    <ListGroup.Item
                      key={n._id}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        background: "transparent",
                        color: "white",
                        borderColor: "#1f2933"
                      }}
                    >
                      <span>{n.text}</span>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteNote(n._id)}
                      >
                        Delete
                      </Button>
                    </ListGroup.Item>
                  ))}

                </ListGroup>
              </div>

              {/* Bottom input */}
              <Form
                onSubmit={addNote}
                className="d-flex gap-2 mt-3"
              >
                <Form.Control
                  placeholder="Write your note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  
                />

                <Button type="submit" variant="success">
                  Add
                </Button>
              </Form>

            </Card.Body>
          </Card>

        </Container>
      </div>
    </>
  );
}

export default Dashboard;
