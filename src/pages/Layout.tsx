import React from "react";
import NavigationBar from "../components/Navbar";
import { Container } from "react-bootstrap";

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <Container fluid>
            <NavigationBar />
            {children}
        </Container>
    );
}

export default Layout;