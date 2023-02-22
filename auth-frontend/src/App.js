import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// import Register from "./Register";
// import Login from "./Login";
import SignUp from "./SignUp";
import Login from "./Login";
import FreeComponent from "./FreeComponent";
import Home from "./Home";
import Chat from "./Chat";

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/free" element={<FreeComponent />} />
        <Route path="/home" element={
            <ProtectedRoutes children={<Home />}/>
          }
        />
        <Route path="/home" element={
            <ProtectedRoutes children={<Home />}/>
          }
        />
        <Route path="/chat" element={
            <ProtectedRoutes children={<Chat />}/>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;