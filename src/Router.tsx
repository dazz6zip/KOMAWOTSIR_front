import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllPresents from "./pages/AllPresents";
import AlreadyApplied from "./pages/AlreadyApplied";
import ApplicantHome from "./pages/ApplicantHome";
import Apply from "./pages/Apply";
import ApplyCompletedGuest from "./pages/ApplyCompletedGuest";
import ApplyGuest from "./pages/ApplyGuest";
import ImageList from "./pages/ImageList";
import CardDesigner from "./pages/CardDesigner";
import CardWriter from "./pages/CardWriter";
import Carousel1 from "./pages/Carousel1";
import DraftList from "./pages/DraftList";
import CarouselEx from "./pages/ExCarousel";
import FontList from "./pages/FontList";
import Inquiry from "./pages/Inquiry";
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
          <PrivateRouter path="/create-form" component={Inquiry} />
          <PrivateRouter path="/write" component={CardWriter} />
          <PrivateRouter path="/design" exact component={CardDesigner} />
          <PrivateRouter path="/update-info" component={UpdateMyInfo} />
          <Route path="/apply/to/:link" exact component={ApplicantHome} />
          <PrivateRouter path="/apply1" exact component={Apply} />
          <Route path="/apply/guest" exact component={ApplyGuest} />
          <Route path="/apply/done" exact component={ApplyCompletedGuest} />
          <PrivateRouter path="/background" exact component={ImageList} />
          <PrivateRouter path="/add-receiver" exact component={ReceiverAdder} />
          <PrivateRouter path="/receiver-list" exact component={ReceiverList} />

          <PrivateRouter path="/yearly-presents" component={YearlyPresents} />
          <PrivateRouter path="/all-presents" component={AllPresents} />
          <PrivateRouter path="/carousel-test" component={CarouselEx} />
          <PrivateRouter path="/carousel-test1" component={Carousel1} />
          <PrivateRouter path="/draft" component={DraftList} />
          <PrivateRouter path="/font-list" component={FontList} />
          <PrivateRouter path="/already" component={AlreadyApplied} />
        </Switch>
      </Container>
    </>
  );
}

export default Router;
