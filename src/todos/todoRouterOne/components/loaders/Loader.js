import { PacmanLoader } from "react-spinners";

const Loader = ({ loading, size = 50 }) => {
  return (
    <div style={{
      // width:'100vw',
      // height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <PacmanLoader
        color="orange"
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
