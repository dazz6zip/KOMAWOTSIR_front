import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllPresents from "./pages/AllPresents";
import AlreadyApplied from "./pages/AlreadyApplied";
import Apply from "./pages/Apply";
import ApplicantDone from "./pages/ApplicantDone";
import ApplicantHome from "./pages/ApplicantHome";
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
import ReceiverAdder from "./pages/ReceiverAdder";
import ReceiverList from "./pages/ReceiverList";
import UpdateMyInfo from "./pages/UpdateMyInfo";
import YearlyPresents from "./pages/YearlyPresents";
import PrivateRouter from "./PrivateRouter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
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
          <Route path="/" exact component={Home} />
          <PrivateRouter path="/create-form" component={FormMaker} />
          <PrivateRouter path="/write" component={CardWriter} />
          <PrivateRouter path="/design" exact component={CardDesigner} />
          <PrivateRouter path="/update-info" component={UpdateMyInfo} />
          <PrivateRouter path="/apply" exact component={ApplicantHome} />
          <PrivateRouter path="/apply1" exact component={Apply} />
          <PrivateRouter
            path="/apply/guest"
            exact
            component={ApplyWithoutLogin}
          />
          <PrivateRouter path="/apply/done" exact component={ApplicantDone} />
          <PrivateRouter path="/background" exact component={BackgroundList} />
          <PrivateRouter path="/add-receiver" exact component={ReceiverAdder} />
          <PrivateRouter path="/receiver-list" exact component={ReceiverList} />
          <PrivateRouter path="/design-list" exact component={DesignList} />
          <PrivateRouter path="/yearly-presents" component={YearlyPresents} />
          <PrivateRouter path="/all-presents" component={AllPresents} />
          <PrivateRouter path="/carousel-test" component={CarouselEx} />
          <PrivateRouter path="/carousel-test1" component={Carousel1} />
          <PrivateRouter path="/draft" component={DraftList} />
          <PrivateRouter path="/font-list" component={FontList} />
          <PrivateRouter path="/already" component={AlreadyApplied} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Router;
