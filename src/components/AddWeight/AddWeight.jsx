import CalendarInput from "../CalenderInput/CalenderInput";
import "./AddWeight.scss";
import { baseUrl } from "../../helper";
import NumericInput from "../NumericInput/NumericInput";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";

function AddWeight({ setAddWeight, setTrySubmit }) {
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState(null);
  const today = new Date();

  const handleCancel = () => {
    setAddWeight(false);
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${baseUrl}/weight/add`,
        { weight },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      sessionStorage.setItem("weightToday", weight);
      setTrySubmit(true);
      setAddWeight(false);
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("weightToday")) {
      setWeight(sessionStorage.getItem("weightToday"));
    }
  }, []);

  return (
    <section className="add">
      {error &&
        (error.includes("already") ? (
          <Modal
            needAllButtons={false}
            buttonText="Back"
            handleClick={() => setAddWeight(false)}
          >
            {error}
          </Modal>
        ) : (
          <Modal
            handleCancel={() => setAddWeight(false)}
            buttonText="Back"
            handleClick={() => setError(null)}
          >
            {error}
          </Modal>
        ))}
      <div className="add__content">
        <div className="add__buttons">
          <button className="add__button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="add__button" onClick={handleSave}>
            Save
          </button>
        </div>
        <form className="add_form">
          <CalendarInput today={today} />
          <NumericInput
            value={weight}
            setValue={setWeight}
            label="Today's Weight"
          />
        </form>
      </div>
    </section>
  );
}

export default AddWeight;
