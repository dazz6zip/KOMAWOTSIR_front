import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import AllPresents from "./pages/AllPresents";
import AlreadyApplied from "./pages/AlreadyApplied";
import ApplicantHome from "./pages/ApplicantHome";
import Apply from "./pages/Apply";
import ApplyCompletedGuest from "./pages/ApplyCompletedGuest";
import ApplyGuest from "./pages/ApplyGuest";
import CardDesigner from "./pages/CardDesigner";
import CardWriter from "./pages/CardWriter";
import DraftList from "./pages/DraftList";
import FontList from "./pages/FontList";
import Home from "./pages/Home";
import ImageList from "./pages/ImageList";
import Inquiry from "./pages/Inquiry";
import ReceiverAdder from "./pages/ReceiverAdder";
import ReceiverList from "./pages/ReceiverList";
import UpdateMyInfo from "./pages/UpdateProfile";
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
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/apply/to/:link" exact component={ApplicantHome} />
          <Route path="/apply/done" exact component={ApplyCompletedGuest} />
          <Route path="/apply/guest" exact component={ApplyGuest} />
          <PrivateRouter path="/create-form" component={Inquiry} />
          <PrivateRouter path="/write" component={CardWriter} />
          <PrivateRouter path="/design" exact component={CardDesigner} />
          <PrivateRouter path="/update-info" component={UpdateMyInfo} />
          <PrivateRouter path="/apply" exact component={Apply} />
          <PrivateRouter path="/background" exact component={ImageList} />
          <PrivateRouter path="/add-receiver" exact component={ReceiverAdder} />
          <PrivateRouter path="/receiver-list" exact component={ReceiverList} />
          <PrivateRouter path="/yearly-presents" component={YearlyPresents} />
          <PrivateRouter path="/all-presents" component={AllPresents} />
          <PrivateRouter path="/draft" component={DraftList} />
          <PrivateRouter path="/font-list" component={FontList} />
          <PrivateRouter path="/already" component={AlreadyApplied} />
        </Switch>
      </Container>
    </>
  );
}

export default Router;
