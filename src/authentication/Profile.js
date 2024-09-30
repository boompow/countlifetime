import React from "react";
import useDataContext from "../hooks/useDataContext";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, loggedIn, userId } = useDataContext();
  const username = userData.username;
  return (
    <button
      className="profileTitle"
      title="Profile"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/profile/user/${userId}`);
      }}
    >
      <div>
        <CgProfile />
      </div>
      {loggedIn && username.length > 10
        ? `${username.slice(0, 10)}...`
        : username}
    </button>
  );
};

export default Profile;
