import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import AllPresents from "./pages/AllPresents";
import AlreadyApplied from "./pages/AlreadyApplied";
import ApplicantHome from "./pages/ApplicantHome";
<<<<<<< HEAD
import ApplicantComplete from "./pages/ApplicantComplete";
import CardWriter from "./pages/CardWriter";
import ThumbnailSelection from "./pages/ThumbnailSelection";
import UpdateMyInfo from "./pages/UpdateProfile";
=======
import Apply from "./pages/Apply";
import ApplyCompletedGuest from "./pages/ApplyCompletedGuest";
import ApplyGuest from "./pages/ApplyGuest";
>>>>>>> develop
import CardDesigner from "./pages/CardDesigner";
import CardFlipEx from "./pages/CardFlipEx";
import CardWriter from "./pages/CardWriter";
import Carousel1 from "./pages/Carousel1";
import DraftList from "./pages/DraftList";
import CarouselEx from "./pages/ExCarousel";
import FontList from "./pages/FontList";
import Home from "./pages/Home";
import Html2CanvasEx from "./pages/Html2CanvasEx";
import ImageList from "./pages/ImageList";
import Inquiry from "./pages/Inquiry";
import ReceiverAdder from "./pages/ReceiverAdder";
<<<<<<< HEAD
import BackgroundSelection from "./pages/BackgroundSelection";
=======
import ReceiverList from "./pages/ReceiverList";
import UpdateMyInfo from "./pages/UpdateMyInfo";
import YearlyPresents from "./pages/YearlyPresents";
import PrivateRouter from "./PrivateRouter";
>>>>>>> develop

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
<<<<<<< HEAD
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
            <ApplicantComplete />
          </Route>
          <Route path="/background" exact>
            <ThumbnailSelection />
          </Route>
          <Route path="/add-receiver" exact>
            <ReceiverAdder />
          </Route>
          <Route path="/design-list" exact>
            <BackgroundSelection />
          </Route>
=======
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
          <Route path="/kk" exact component={Html2CanvasEx} />
          <Route path="/hh" exact component={CardFlipEx} />
>>>>>>> develop
        </Switch>
      </Container>
    </>
  );
}

export default Router;
