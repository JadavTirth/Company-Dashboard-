import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

function NavbarFixed() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(90deg, #0f172a, #111827, #0b1220)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.6)"
      }}
      variant="dark"
    >
      <Container fluid>

        {/* Left brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "700",
            letterSpacing: "0.5px",
            background: "linear-gradient(90deg,#22d3ee,#6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Campus Admin
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">

          {/* Right side menu */}
          <Nav className="ms-auto gap-2">

            <Nav.Link
              as={NavLink}
              to="/dashboard"
              className="px-3"
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/internList"
              className="px-3"
            >
              Interns
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/event"
              className="px-3"
            >
              Events
            </Nav.Link>

            
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarFixed;
