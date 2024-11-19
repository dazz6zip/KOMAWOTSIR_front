import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./routes/Coin";
import Home from "./routes/Home";
import Header from "./routes/Header";
import Footer from "./routes/Footer";
import FormMaker from "./routes/FormMaker";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 85vh;
  font-family: "Apple SD Gothic Neo", sans-serif;
  padding: 30px 10px 40px 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 40px;
  }

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`;

function Router(){
    return(
        <BrowserRouter>
            <Header />
            <Container>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/create-form">
                    <FormMaker />
                </Route>
            </Switch>
            </Container>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;