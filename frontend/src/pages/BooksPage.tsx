import CookieConsent from "react-cookie-consent";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
    <CartSummary />
      <div className="container mt-4">
          <WelcomeBand />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        style={{ background: "#2B373B", zIndex: 9999 }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      {/* <Fingerprint /> */}
    </>
  );
}
export default BooksPage;
