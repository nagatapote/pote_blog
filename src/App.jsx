import Router from "./Router";
import { Header, Footer } from "components/index";
import "assets/global.css";
import "assets/style.css";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};
