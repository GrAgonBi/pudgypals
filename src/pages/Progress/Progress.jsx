import "./Progress.scss";
import LineGraph from "../../components/LineGraph/LineGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../helper";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router";

function Progress() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [allWeights, setAllWeights] = useState(null);
  const [past30daysWeights, setPast30daysWeights] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("last7days");
  const [pastWeekWeights, setPastWeekWeights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

      setUser(userResponse.data.username);
      setAllWeights(allWeightsResponse.data);
      setPast30daysWeights(past30daysWeightsResponse.data);
      setPastWeekWeights(past7daysWeightsResponse.data);
      // setLabel(past30daysWeights.map((entry) => formatDate(entry.date)));
    } catch (error) {
      setError(error.response?.data || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
          {`Opps! It seems like you haven't ${
            error.toLowerCase().includes("profile")
              ? "set up your initial profile yet"
              : "logged in yet"
          }`}
        </Modal>
      )}
      <Header user={user} />
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
              ? (
                  pastWeekWeights[pastWeekWeights.length - 1].weight -
                  pastWeekWeights[0].weight
                ).toFixed(2)
              : 0}
            &nbsp; lb
          </h2>
          <div className="summary__info">Last 7 days</div>
        </div>
        <div className="summary__item">
          <h2 className="summary__value">
            {allWeights?.length
              ? (
                  allWeights[allWeights.length - 1].weight -
                  allWeights[0].weight
                ).toFixed(2)
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
    </div>
  );
}

export default Progress;
