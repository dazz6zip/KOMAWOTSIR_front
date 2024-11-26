import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./pages/Coin";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormMaker from "./pages/FormMaker";
import styled from "styled-components";
import Home1 from "./pages/Home1";
import ApplicantHome from "./pages/ApplicantHome";
import ApplicantDone from "./pages/ApplicantDone";
import CardWriter from "./pages/CardWriter";
import BackgroundList from "./pages/BackgroundList";
import UpdateMyInfo from "./pages/UpdateMyInfo";
import CardDesigner from "./pages/CardDesigner";
import Apply1 from "./pages/Apply1";
import Apply2 from "./pages/Apply2";
import ReceiverAdder from "./pages/ReceiverAdder";
import DesignList from "./pages/DesignList";
import ReceiverList from "./pages/ReceiverList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 85vh;
  font-family: "Apple SD Gothic Neo", sans-serif;
  padding: 15px 10px 25px 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 40px;
  }

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`;

function Router() {
  return (
    <>
      <Header />
      <hr />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/1" exact>
            <Home1 />
          </Route>
          <Route path="/create-form">
            <FormMaker />
          </Route>
          <Route path="/write">
            <CardWriter />
          </Route>
          <Route path="/design" exact>
            <CardDesigner />
          </Route>
          <Route path="/update-info">
            <UpdateMyInfo />
          </Route>
          <Route path="/apply" exact>
            <ApplicantHome />
          </Route>
          <Route path="/apply1" exact>
            <Apply1 />
          </Route>
          <Route path="/apply2" exact>
            <Apply2 />
          </Route>
          <Route path="/apply/done" exact>
            <ApplicantDone />
          </Route>
          <Route path="/background" exact>
            <BackgroundList />
          </Route>
          <Route path="/add-receiver" exact>
            <ReceiverAdder />
          </Route>
          <Route path="/receiver-list" exact>
            <ReceiverList />
          </Route>
          <Route path="/design-list" exact>
            <DesignList />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Router;
