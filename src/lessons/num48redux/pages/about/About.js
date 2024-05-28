import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrement, increment, incrementByAmount } from "../../redux/counter/counterSlice";
import { counterSelector } from "../../redux/counter/counterSelectors";

const About = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counterValue = useSelector(counterSelector);
  
  const handleIncriment = () => {
   dispatch(increment());
  };
  const handleDecriment = () => {
   dispatch(decrement());
  };
  const handleIncrementByAmount = (amount) => {
   dispatch(incrementByAmount(amount));
  };

  return (
    <>
      <h2>About</h2>
      <h4>Counter: {counterValue}</h4>
      <button onClick={handleIncriment}>Incriment</button>
      <button onClick={handleDecriment}>Decriment</button>
      <button onClick={() => handleIncrementByAmount(5)}>Incriment by amount</button>

      <br />
      <button onClick={() => navigate(-1)}>Повернутись назад</button>
    </>
  );
};

export default About;
