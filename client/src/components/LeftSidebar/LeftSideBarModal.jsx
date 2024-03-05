import React, { useContext } from "react";
import Globe from '../../assets/Globe.svg'
import { ModalContext } from "../../hoc/ModalContext";
import "./LeftSideBarModal.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const LeftSideBarModal = () => {
  const { isModalOpen, closeModal } = useContext(ModalContext);

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
            <div className="left-sidebar1">
                
            <span style={{display:"flex", justifyContent:"end", marginTop:"10px"}}>
                <FontAwesomeIcon icon={faClose} style={{color:"black", width:'25px', height:"25px"}} onClick={closeModal} />
            </span>
              <nav className="side-nav1">
                <NavLink
                  to="/"
                  className="side-nav-links1"
                  activeClassName="active"
                >
                  <p onClick={closeModal}>Home</p>
                </NavLink>
                <div className="side-nav-div1">
                  <div>
                    <p>PUBLIC</p>
                  </div>
                  <NavLink to="/Questions" className="side-nav-links1" onClick={closeModal}>
                    <img src={Globe} alt="Globe" />
                    <p style={{ paddingLeft: "10px" }}>Questions</p>
                  </NavLink>
                  <NavLink
                    to="/Tags"
                    className="side-nav-links1"
                    activeClassName="active"
                    style={{ paddingLeft: "40px" }}
                    onClick={closeModal}
                  >
                    <p>Tags</p>
                  </NavLink>
                  <NavLink
                    to="/Users"
                    className="side-nav-links1"
                    activeClassName="active"
                    style={{ paddingLeft: "40px" }}
                    onClick={closeModal}
                  >
                    <p>Users</p>
                  </NavLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSideBarModal;
