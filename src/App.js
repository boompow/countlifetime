import "./style/App.css";
import "./style/PageComponent.css";
import Header from "./components/page-components/Header";
import Footer from "./components/page-components/Footer";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { Route, Routes, Navigate } from "react-router";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import ForgotPassword from "./authentication/ForgotPassword";
import useDataContext from "./hooks/useDataContext";
import NewPassword from "./authentication/NewPassword";
import ConfirmCode from "./authentication/ConfirmCode";
import ProfilePage from "./authentication/ProfilePage";
import LoadingAnimation from "./components/LoadingAnimation";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const { loggedin, userId } = useDataContext();

  //to reset password
  const resetId = localStorage.getItem("resetID");
  const resetCode = localStorage.getItem("resetCode");

  return (
    <>
      <Header />
      <Signup />
      <Login />
      <LoadingAnimation />
      <canvas
        style={{ display: "none" }}
        // style={{ display: showCard ? "flex" : "none" }}
        id="completeConfetti"
      />
      <Routes>
        {/*  Both Public and Private Routes */}
        <Route
          index
          element={
            loggedin ? <Navigate to={`/user/${userId}`} /> : <LandingPage />
          }
        />
        <Route
          path={`/user/${userId}`}
          element={!loggedin ? <Navigate to={"/"} /> : <LandingPage />}
        />
        <Route
          path="/counter"
          element={
            loggedin ? (
              <Navigate to={`/counter/user/${userId}`} />
            ) : !loggedin && localStorage.getItem("not_logged") ? (
              <Main />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path={`/counter/user/${userId}`}
          element={!loggedin ? <Navigate to={`/counter`} /> : <Main />}
        />

        {/* Private Routes */}
        <Route path={`/profile/user/${userId}`} element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />

        {/* Public Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-code" element={<ConfirmCode />} />
        <Route path="/policy.html" element={<PrivacyPolicy />} />

        {/* available only when password reset email is sent and not available for logged in user */}
        <Route
          path={`/reset-password/user/${resetId}/${resetCode}`}
          element={
            resetCode && !loggedin ? <NewPassword /> : <Navigate to="*" />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
