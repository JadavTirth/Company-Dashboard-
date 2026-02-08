import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarFixed from "../components/Navbar";
import "./dashboard.css";
import axios from "axios";

function InternList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  // Column visibility state
  const [cols, setCols] = useState({
    firstName: true,
    lastName: true,
    college: true,
    university: true,
    address: false,
    phone: true,
    email: false,
    project: true,
    field: true,
    status: true
  });

  const toggleCol = (name) => {
    setCols({ ...cols, [name]: !cols[name] });
  };

  // Load Interns
  const loadInterns = () => {
    axios
      .get("http://localhost:8000/api/website/enquiry/list")
      .then((res) => {
        if (res.data.status) {
          // To ensure new entries are at the bottom:
          // If your API returns new items first, use .reverse()
          // If your API returns old items first, just use res.data.data
          setList(res.data.data); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadInterns();
  }, []);

  // Search filter (Newest entries stay at the bottom of the filtered list)
  const filtered = list.filter(i =>
    (i.firstName + " " + i.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Intern record will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/website/enquiry/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Intern removed successfully.", "success");
            loadInterns();
          })
          .catch(() => {
            Swal.fire("Error", "Delete failed", "error");
          });
      }
    });
  };

  // Calculate dynamic colSpan for the "No data found" row
  const activeColsCount = Object.values(cols).filter(Boolean).length + 2; // +2 for # and Action

  return (
    <>
      <NavbarFixed />

      <div style={{ minHeight: "100vh", backgroundColor: "#0b0f19" }}>
        <Container fluid className="py-4 px-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-white fw-bold mb-0">Intern List</h4>
            <Button variant="outline-light" onClick={() => navigate("/intern-add")}>
              Add Intern
            </Button>
          </div>

          {/* Search */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>

          {/* Column select toggles */}
          <Row className="mb-3">
            <Col className="text-white small">
              {Object.keys(cols).map((key) => (
                <Form.Check 
                  key={key}
                  inline 
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
                  checked={cols[key]}
                  onChange={() => toggleCol(key)} 
                />
              ))}
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col>
              <Card className="text-white border-0" style={{ backgroundColor: "#111827" }}>
                <Card.Body>
                  <Table responsive bordered className="align-middle mb-0 table-transparent text-white">
                    <thead>
                      <tr>
                        <th>#</th>
                        {cols.firstName && <th>First name</th>}
                        {cols.lastName && <th>Last name</th>}
                        {cols.college && <th>College</th>}
                        {cols.university && <th>University</th>}
                        {cols.address && <th>Address</th>}
                        {cols.phone && <th>Phone</th>}
                        {cols.email && <th>Email</th>}
                        {cols.project && <th>Project</th>}
                        {cols.field && <th>Field</th>}
                        {cols.status && <th>Status</th>}
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((i, index) => (
                        <tr key={i._id || index}>
                          {/* index + 1 ensures numbering goes 1, 2, 3... down to the bottom */}
                          <td>{index + 1}</td>
                          {cols.firstName && <td>{i.firstName}</td>}
                          {cols.lastName && <td>{i.lastName}</td>}
                          {cols.college && <td>{i.college}</td>}
                          {cols.university && <td>{i.university}</td>}
                          {cols.address && <td>{i.address}</td>}
                          {cols.phone && <td>{i.phone}</td>}
                          {cols.email && <td>{i.email}</td>}
                          {cols.project && <td>{i.project}</td>}
                          {cols.field && <td>{i.field}</td>}
                          {cols.status && (
                            <td className={i.status === "Active" ? "text-success" : "text-warning"}>
                              {i.status}
                            </td>
                          )}
                          <td>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(i._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={activeColsCount} className="text-center text-white-50">
                            No data found
                          </td>
                        </tr>
                      )}
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

export default InternList;
