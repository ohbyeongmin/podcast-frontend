import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { LoggedInRouter } from "./routers/logged-in-router";
import { isloggedInVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";

function App() {
    const isLoggedIn = useReactiveVar(isloggedInVar);
    return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
