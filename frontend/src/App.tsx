import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BookList from "./BookList";
import CookieConsent from "react-cookie-consent";
import Fingerprint from "./fingerprint";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BookList />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        style={{ background: "#2B373B", zIndex: 9999 }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default App;
