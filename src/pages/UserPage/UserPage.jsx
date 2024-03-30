import "./UserPage.scss";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../helper";

function UserPage() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const result = await axios.get(`${baseUrl}/auth/account`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setUser(result.data.username);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="userPage">
      <Header
        user={user}
        text={location.pathname.includes("profile") ? "profile" : "progress"}
      />
      <Outlet setUser={setUser} />
      <Footer />
    </div>
  );
}

export default UserPage;
