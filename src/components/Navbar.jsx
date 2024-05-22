import React from "react";
import { CircleHelp } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <button>
          <CircleHelp className="nav-icon" />
        </button>
        <button>
          <BarChart2 className="nav-barChart" />
        </button>
        <button>
          <Settings className="nav-icon" />
        </button>
      </div>
      <div className="nav-middle">
        <h1>Wordle</h1>
      </div>
      <div className="nav-right">
        <button>
          <h3>Login</h3>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;