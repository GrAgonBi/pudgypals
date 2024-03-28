import "./InitialSetup.scss";
import NumericInput from "../../components/NumericInput/NumericInput";
import { useEffect, useState } from "react";
import logo from "../../assets/logos/logo-cat.png";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { baseUrl } from "../../helper";

function InitialSetup() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [error, setError] = useState(false);
  const [initialWeight, setInitialWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [initialDate, setInitialDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [next, setNext] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await axios.get(`${baseUrl}/auth/account`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      // console.log(result.data);
      if (sessionStorage.getItem("initialWeight")) {
        setInitialWeight(sessionStorage.getItem("initialWeight"));
      }
      if (sessionStorage.getItem("height")) {
        setHeight(sessionStorage.getItem("height"));
      }
      if (sessionStorage.getItem("initialDate")) {
        setInitialDate(sessionStorage.getItem("initialDate"));
      }
      if (sessionStorage.getItem("targetWeight")) {
        setTargetWeight(sessionStorage.getItem("targetWeight"));
      }
      if (sessionStorage.getItem("targetDate")) {
        setTargetDate(sessionStorage.getItem("targetDate"));
      }
    } catch (error) {
      setFailedAuth(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    console.log(initialWeight, height, initialDate, targetWeight, targetDate);
    try {
      await axios.post(
        `${baseUrl}/user`,
        { initialWeight, height, initialDate, targetWeight, targetDate },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      navigate("/user/rogress");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setShowModal(false);
    }
  };

  return (
    <>
      {failedAuth && (
        <Modal
          handleClick={() => {
            navigate("/login");
          }}
          buttonText="Back to Login"
          handleCancel={() => {
            navigate("/");
          }}
        >
          Opps! It seems like you haven't logged in yet
        </Modal>
      )}
      {error && (
        <Modal
          needAllButtons={false}
          buttonText={
            error.toLowerCase().includes("profile") ? "Move on" : "Back"
          }
          handleClick={
            error.toLowerCase().includes("profile")
              ? () => navigate("/user/progress")
              : () => setError(null)
          }
        >
          {error}
        </Modal>
      )}
      <section className="setup">
        <div className={`setup__title ${next ? "setup__title--target" : ""}`}>
          <div className="setup__logo">
            <img className="setup__logo-image" src={logo} alt="logo" />
          </div>
          <h1> {next ? "Set up your goal" : " Put in your initial record"}</h1>
        </div>
        <form className="setup__form">
          {next ? (
            <div className="setup__target">
              <NumericInput
                value={targetWeight}
                setValue={setTargetWeight}
                label="Target Weight"
              />
              <div className="setup__date">
                <h2 className="setup__date-title">Ending Date</h2>
                <input
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="setup__date-input"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <button
                type="button"
                className="setup__button"
                onClick={() => {
                  sessionStorage.setItem("targetWeight", targetWeight);
                  sessionStorage.setItem("targetDate", targetDate);
                  setNext(false);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="setup__button setup__button--finish"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Finish
              </button>
            </div>
          ) : (
            <div className="setup__initial">
              <NumericInput
                value={height}
                setValue={setHeight}
                label="Height"
              />
              <NumericInput
                value={initialWeight}
                setValue={setInitialWeight}
                label="Initial Weight"
              />
              <div className="setup__date">
                <h2 className="setup__date-title">Starting Date</h2>
                <input
                  value={initialDate}
                  onChange={(e) => setInitialDate(e.target.value)}
                  className="setup__date-input"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <button
                type="button"
                className="setup__button"
                onClick={() => {
                  sessionStorage.setItem("initialWeight", initialWeight);
                  sessionStorage.setItem("initialDate", initialDate);
                  sessionStorage.setItem("height", height);
                  setNext(true);
                }}
              >
                Continue
              </button>
            </div>
          )}
        </form>
        {showModal && (
          <Modal
            handleCancel={() => setShowModal(false)}
            handleClick={handleSubmit}
            buttonText="Submit"
          >
            Once submitted, Only goal is editable. <br />
            NO changes can be made to any other initial records
          </Modal>
        )}
      </section>
    </>
  );
}

export default InitialSetup;
