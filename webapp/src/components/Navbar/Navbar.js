import { useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ user }) => {

  const [active, setActive] = useState(false);

  return (
    <div className="navbar">
      <h2>
        <Link to="/home">Find your recipe</Link>
      </h2>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/my">My recipes</NavLink>
      </nav>
      <div className="navbar__profile">
        <Link to="/profile">{user.name}</Link>
      </div>
      <div className={`navbar__navMobile${active ? "--active" : ""}`}>
        {/* <div className="navbar__navMobile--active__links1"> */}
          <Link to="/home">Home</Link>
          <Link to="/my">My recipes</Link>
        {/* </div> */}
        <Link to="/profile">{user.name}</Link>
      </div>
      <div onClick={() => {
        setActive(!active)
        console.log(active)
        }}>
        <img src="/icons/burger-icon-dawg.png" alt="burger"/>
      </div>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Navbar);
