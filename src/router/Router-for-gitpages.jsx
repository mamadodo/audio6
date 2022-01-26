import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Top } from "../components/Top";
import { Program } from "../components/Program";
import { Episode } from "../components/Episode";
import { episodes } from "../components/episodes";


export const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
          <Route path="/" element={ <Top /> } component={Top} />
          <Route path="radiohistory">
            <Route index element={ <Program /> } />
            <Route path=":id" element={ <Episode /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

