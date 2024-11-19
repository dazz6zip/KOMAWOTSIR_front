import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./routes/Coin";
import Home from "./routes/Home";

function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;