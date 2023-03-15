import './index.css'
import {Routes, Route} from "react-router-dom";
import {Basket, ForgotPassword, Main, OneProduct, Shop} from "./components";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'shop'} element={<Shop/>}/>
            <Route path={'one-product'} element={<OneProduct/>}/>
            <Route path={'basket'} element={<Basket/>}/>
            <Route path={'forgot-pass'} element={<ForgotPassword/>}/>
        </Routes>
    );
}

export default App;
