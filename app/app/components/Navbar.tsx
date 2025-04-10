import { useState } from "react";
import { authClient } from "../lib/auth-client";
import Logo from "./Logo";
import UserPopup from "./UserPopup";

const Navbar = ({ ...props }) => {
  const user = authClient.useSession().data?.user;
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="navbar" {...props}>
      <div className="logo-container">
        <Logo />
      </div>
      <div className="user-circle" onClick={togglePopup}>
        {user && user.name ? user.name[0].toUpperCase() : "U"}
      </div>
      {showPopup && <UserPopup onClose={togglePopup} />}
    </div>
  );
};

export default Navbar;
