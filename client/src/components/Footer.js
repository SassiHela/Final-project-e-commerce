import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          {/* padding y axe */}
          <Col className="text-center py-3">Copyright &copy; Hela Sassi</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
