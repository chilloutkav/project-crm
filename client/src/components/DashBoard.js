import DealsContainer from "./DealsContainer";
import "../styles/dashboard.css";

const DashBoard = ({ user }) => {
  return (
    <>
      <h1 id="welcome-msg">Hello {user.first_name}</h1>

      <DealsContainer user={user} />
    </>
  );
};

export default DashBoard;
