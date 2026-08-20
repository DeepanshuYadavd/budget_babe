import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <div className="logo">Budget Baby</div>
      <nav>
        <div>
          <Link className="link" to="/">
            Dashboard
          </Link>
        </div>
        <div>
          <Link className="link" to="/budget">
            Budget
          </Link>
        </div>
        <div>
          <Link className="link" to="/create-budget">
            Create Budget
          </Link>
        </div>
      </nav>

      <div className="auth">
        <Link className="link" to="/signin">
          signin
        </Link>
        <Link className="link" to="/signup">
          signup
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
