import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllPresents from "./pages/AllPresents";
import AlreadyApplied from "./pages/AlreadyApplied";
import ApplicantDone from "./pages/ApplicantDone";
import ApplicantHome from "./pages/ApplicantHome";
import Apply1 from "./pages/Apply1";
import ApplyWithoutLogin from "./pages/ApplyWithoutLogin";
import BackgroundList from "./pages/BackgroundList";
import CardDesigner from "./pages/CardDesigner";
import CardWriter from "./pages/CardWriter";
import Carousel1 from "./pages/Carousel1";
import DesignList from "./pages/DesignList";
import DraftList from "./pages/DraftList";
import CarouselEx from "./pages/ExCarousel";
import FontList from "./pages/FontList";
import FormMaker from "./pages/FormMaker";
import Home from "./pages/Home";
import Home1 from "./pages/Home1";
import ReceiverAdder from "./pages/ReceiverAdder";
import ReceiverList from "./pages/ReceiverList";
import UpdateMyInfo from "./pages/UpdateMyInfo";
import YearlyPresents from "./pages/YearlyPresents";

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
          <Route path="/apply/guest" exact>
            <ApplyWithoutLogin />
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
          <Route path="/yearly-presents">
            <YearlyPresents />
          </Route>
          <Route path="/all-presents">
            <AllPresents />
          </Route>
          <Route path="/carousel-test">
            <CarouselEx />
          </Route>
          <Route path="/carousel-test1">
            <Carousel1 />
          </Route>
          <Route path="/draft">
            <DraftList />
          </Route>
          <Route path="/font-list">
            <FontList />
          </Route>
          <Route path="/already">
            <AlreadyApplied />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Router;
