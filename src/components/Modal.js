import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const Modal = ({ open, setOpen }) => {
  return ReactDOM.createPortal(
    <CSSTransition in={open} timeout={500} classNames="zoom" unmountOnExit>
      {(status) => (
        <div
          className="modal fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="overlay absolute inset-0 bg-black bg-opacity-70 cursor-pointer"></div>
          <div className="content bg-white z-10 max-h-[100%] rounded-lg p-5">
            <div className="w-[290px] text-center"></div>
          </div>
        </div>
      )}
    </CSSTransition>,
    document.querySelector("body")
  );
};

export default Modal;
