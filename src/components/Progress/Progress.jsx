import "./Progress.scss";
import axios from "axios";
import Modal from "../Modal/Modal";
import LineGraph from "../LineGraph/LineGraph";
import { baseUrl } from "../../helper";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getTodayDate } from "../../helper";
import AddWeight from "../AddWeight/AddWeight";

function Progress() {
  // const [user, setUser] = useState(null);
  const [trySubmit, setTrySubmit] = useState(false);
  const [error, setError] = useState(false);
  const [allWeights, setAllWeights] = useState(null);
  const [past30daysWeights, setPast30daysWeights] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("last7days");
  const [pastWeekWeights, setPastWeekWeights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const [addWeight, setAddWeight] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fetchUser = axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const fetchAllWeights = axios.get(`${baseUrl}/weight/all`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const fetchPast30daysWeights = axios.get(`${baseUrl}/weight/past30days`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const fetchPast7daysWeights = axios.get(`${baseUrl}/weight/past7days`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      const [
        userResponse,
        allWeightsResponse,
        past30daysWeightsResponse,
        past7daysWeightsResponse,
      ] = await Promise.all([
        fetchUser,
        fetchAllWeights,
        fetchPast30daysWeights,
        fetchPast7daysWeights,
      ]);

      if (
        userResponse?.data &&
        !allWeightsResponse?.data[
          allWeightsResponse.data.length - 1
        ]?.date.includes(getTodayDate())
      ) {
        setNotification(true);
      }

      setAllWeights(allWeightsResponse.data);
      setPast30daysWeights(past30daysWeightsResponse.data);
      setPastWeekWeights(past7daysWeightsResponse.data);
    } catch (error) {
      setError(error.response?.data || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trySubmit]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="progress">
      {error && (
        <Modal
          handleClick={() =>
            navigate(
              error.toLowerCase().includes("profile")
                ? "/initialSetup"
                : "/login"
            )
          }
          buttonText={
            error.toLowerCase().includes("profile") ? "Setup profile" : "Login"
          }
          handleCancel={() => navigate("/")}
        >
          {` ${
            error.toLowerCase().includes("profile")
              ? "Opps! It seems like you haven't set up your initial profile yet"
              : error.toLowerCase().includes("required") ||
                error.toLowerCase().includes("user")
              ? "Opps! It seems like you haven't logged in yet"
              : error
          }`}
        </Modal>
      )}
      {notification && (
        <Modal
          buttonText="Record"
          handleClick={() => {
            setAddWeight(true);
            setNotification(false);
          }}
          handleCancel={() => {
            setNotification(false);
          }}
        >
          Want to record today's weight?
        </Modal>
      )}

      <section className="summary">
        <div className="summary__item">
          <h2 className="summary__value">
            {allWeights?.length ? allWeights[allWeights.length - 1].weight : 0}
            &nbsp; lb
          </h2>
          <div className="summary__info">current</div>
        </div>
        <div className="summary__item">
          <h2 className="summary__value">
            {pastWeekWeights?.length
              ? (() => {
                  const difference = (
                    pastWeekWeights[pastWeekWeights.length - 1].weight -
                    pastWeekWeights[0].weight
                  ).toFixed(2);
                  return difference > 0 ? `+${difference}` : difference;
                })()
              : 0}
            &nbsp; lb
          </h2>
          <div className="summary__info">Last 7 days</div>
        </div>
        <div className="summary__item">
          <h2 className="summary__value">
            {allWeights?.length
              ? (() => {
                  const difference = (
                    allWeights[allWeights.length - 1].weight -
                    allWeights[0].weight
                  ).toFixed(2);
                  return difference > 0 ? `+${difference}` : difference;
                })()
              : 0}
            &nbsp; lb
          </h2>
          <div className="summary__info">All time</div>
        </div>
      </section>
      <div className="chart-wrapper">
        <section className="chart-container">
          <LineGraph
            weights={
              selectedPeriod === "last7days"
                ? pastWeekWeights
                : selectedPeriod === "last30days"
                ? past30daysWeights
                : allWeights
            }
            selectedPeriod={selectedPeriod}
          />
          <div className="chart-container__buttons">
            <button
              className={`chart-container__button ${
                selectedPeriod === "last7days"
                  ? "chart-container__button--active"
                  : ""
              }`}
              onClick={() => handlePeriodChange("last7days")}
            >
              Last 7 days
            </button>
            <button
              className={`chart-container__button ${
                selectedPeriod === "last30days"
                  ? "chart-container__button--active"
                  : ""
              }`}
              onClick={() => handlePeriodChange("last30days")}
            >
              Last 30 days
            </button>
            <button
              className={`chart-container__button ${
                selectedPeriod === "alltime"
                  ? "chart-container__button--active"
                  : ""
              }`}
              onClick={() => handlePeriodChange("alltime")}
            >
              All time
            </button>
          </div>
        </section>
      </div>
      <button
        className="progress__button"
        onClick={() => {
          setAddWeight(true);
          setNotification(false);
        }}
      >
        + Add weight
      </button>
      {addWeight && (
        <AddWeight setAddWeight={setAddWeight} setTrySubmit={setTrySubmit} />
      )}
    </div>
  );
}

export default Progress;
