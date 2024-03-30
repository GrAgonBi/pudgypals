import { useEffect, useState } from "react";
import "./Profile.scss";
import { baseUrl } from "../../helper";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router";
import ProgressBar from "../ProgressBar/ProgressBar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const userResponse = await axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const weightResponse = await axios.get(`${baseUrl}/weight/all`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      console.log(userResponse.data, weightResponse.data);
      setUser(userResponse.data);
    } catch (e) {
      setError(e.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="profile">
      {error && (
        <Modal
          needAllButtons={false}
          buttonText={
            error.toLowerCase().includes("profile") ? "Setup Profile" : "Login"
          }
          handleClick={() =>
            navigate(
              error.toLowerCase().includes("profile")
                ? "/initialSetup"
                : "/login"
            )
          }
        >
          {` ${
            error.toLowerCase().includes("profile")
              ? "Opps! It seems like you haven't set up your initial profile yet"
              : "Please login first 😀"
          }`}
        </Modal>
      )}
      {!error && (
        <>
          <ProgressBar />
          <button className="profile__button">Reset Goal</button>
          <section className="profile__info-container">
            <h2 className="profile__info-title">Account Info</h2>
            <div className="profile__info">
              <div className="profile__info-item">
                <label className="profile__info-label">username</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.username}
                />
              </div>
              <div className="profile__info-item">
                <label className="profile__info-label">email</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.email}
                />
              </div>

              <div className="profile__info-item">
                <label className="profile__info-label">height:</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.height}
                />
                <p className="profile__info-unit">cm</p>
              </div>

              <div className="profile__info-item">
                <label className="profile__info-label">initial weight:</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.initialWeight}
                />
                <p className="profile__info-unit">lb</p>
              </div>
              <div className="profile__info-item">
                <label className="profile__info-label">starting date:</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.initialDate}
                />
              </div>
              <div className="profile__info-item">
                <label className="profile__info-label">ending date:</label>
                <input
                  className="profile__info-content"
                  disabled={true}
                  value={user.targetDate}
                />
              </div>
            </div>
          </section>
          <button className="profile__button">Delete Account</button>
        </>
      )}
    </div>
  );
}

export default Profile;
