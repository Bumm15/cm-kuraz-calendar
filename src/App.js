import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { Calender } from './pages/Calender';
import { SignUp } from "./pages/SignUn";
import { AuthProvider } from "./contexts/authContext";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { DBProvider } from "./contexts/firebaseContext";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <DBProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/calendar" element={<Calender />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
      </DBProvider>
    </AuthProvider>
  );
}
/*
export const PrivateRoute = ({ children }) => {

}
*/
export default App;
