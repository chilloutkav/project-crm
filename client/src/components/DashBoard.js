import DealsContainer from "./DealsContainer";

const DashBoard = ({ user }) => {
  return (
    <>
      <h1>Hello {user.first_name}</h1>

      <DealsContainer user={user} />
    </>
  );
};

export default DashBoard;
