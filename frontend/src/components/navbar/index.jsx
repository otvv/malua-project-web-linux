import React from "react";
import { Link } from "react-router-dom";

// dependencies
import "./styles.css";

// icons
import { GiPill } from "react-icons/gi";
import { HiDownload } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineAim, AiFillCloud } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import { GiBowieKnife, GiRadarDish } from "react-icons/gi";
import { RiCodeBoxLine } from "react-icons/ri";

function Navbar() {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg position-fixed w-100" style={{ zIndex: 1000 }}>
      <div className="logo pr-2">
        <GiPill size={23} />
      </div>
      <Link className="navbar-brand navbar-title" to="/">
        MALUA
        <span className="navbar-title-secondary ml-1">PROJECT</span>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="cloudDropdownMenu" data-toggle="dropdown">
              <span className="mr-1">
                <AiFillCloud className="mb-1" size={16} />
              </span>
              Cloud Config
            </Link>
            <div className="dropdown-menu" aria-labelledby="cloudDropdownMenu">
            
            <span className="pl-3 pt-1 cloud-dropdown-items">
                <AiOutlineAim className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/aim-assist">Aim-assist</Link>
              </span>

              <span className="pl-3 pt-1 cloud-dropdown-items">
                <FaEye className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/visuals">Visuals</Link>
              </span>

              <span className="pl-3 pt-1 cloud-dropdown-items">
                <IoIosOptions className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/misc">Misc</Link>
              </span>
              
              <span className="pl-3 pt-1 cloud-dropdown-items">
                <GiBowieKnife className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/skins">Skins</Link>
              </span>

              <span className="pl-3 pt-1 cloud-dropdown-items">
                <RiCodeBoxLine className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/scripting">Scripting</Link>
              </span>
              
              <span className="pl-3 pt-1 cloud-dropdown-items">
                <GiRadarDish className="mb-1" size={16} />
              <Link className="pl-3 dropdown-item mb-2" to="/radar">Radar</Link>
              </span>

            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link disabled" to="/download">
              <span className="mr-1">
                <HiDownload className="mb-1" size={16} />
              </span>
              Download Client
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link disabled" to="/settings">
              <span className="mr-1">
                <IoMdSettings className="mb-1" size={16} />
              </span>
              Settings
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
