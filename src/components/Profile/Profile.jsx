import { useEffect, useState } from "react";
import "./Profile.scss";
import { baseUrl } from "../../helper";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router";
import ProgressBar from "../ProgressBar/ProgressBar";
import NumericInput from "../NumericInput/NumericInput";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState(null);
  const [changeGoal, setChangeGoal] = useState(false);
  const [goalDate, setGoalDate] = useState("");
  const [goalWeight, setGoalWeight] = useState(0);
  const [trySave, setTrySave] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [deleteAcc, setDeleteAcc] = useState(false);

  const fetchUser = async () => {
    try {
      const userResponse = await axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const weightResponse = await axios.get(`${baseUrl}/weight/all`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setUser(userResponse.data);
      setWeight(
        parseInt(weightResponse.data[weightResponse.data.length - 1].weight)
      );
    } catch (e) {
      setError(e?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${baseUrl}/user`,
        { targetWeight: goalWeight, targetDate: goalDate },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setChangeGoal(false);
      setTrySave(true);
    } catch (e) {
      setSaveError(e.response?.data);
    }
  };

  const handleCancel = () => {
    setSaveError(null);
    setChangeGoal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      navigate("/register");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [trySave]);

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
          <ProgressBar
            info={{
              weight,
              initial: parseInt(user.initialWeight),
              target: parseInt(user.targetWeight),
            }}
          />
          <button
            className="profile__button"
            onClick={() => {
              setChangeGoal(true);
            }}
          >
            Reset Goal
          </button>
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
          <button
            className="profile__button"
            onClick={() => {
              setDeleteAcc(true);
            }}
          >
            Delete Account
          </button>
        </>
      )}
      {changeGoal && (
        <>
          <Modal
            buttonText="Save"
            handleCancel={() => {
              setChangeGoal(false);
            }}
            handleClick={handleSave}
          >
            <div className="profile__goal">
              <div className="profile__goal-date">
                <h2 className="profile__goal-title">Ending date</h2>
                <input
                  type="date"
                  value={goalDate}
                  onChange={(e) => {
                    setGoalDate(e.target.value);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="profile__goal-weight">
                <NumericInput
                  label="Target weight"
                  value={goalWeight}
                  setValue={setGoalWeight}
                />
              </div>
            </div>
          </Modal>
          {saveError && (
            <Modal
              needAllButtons={saveError.includes("fields") ? true : false}
              buttonText="Back"
              handleCancel={handleCancel}
              handleClick={
                saveError.includes("fields")
                  ? () => setSaveError(null)
                  : handleCancel
              }
            >
              {saveError}
            </Modal>
          )}
        </>
      )}
      {deleteAcc && (
        <Modal
          buttonText="Delete"
          handleCancel={() => {
            setDeleteAcc(false);
          }}
          handleClick={handleDelete}
        >
          Sure to DELETE account and ALL your records?
        </Modal>
      )}
    </div>
  );
}

export default Profile;
