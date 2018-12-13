import React from "react";

const Footer = props => {
  return (
    <div className="mt-5 row">
      <div className="col-sm-6 mb-3">
        <button
          type="button"
          className="btn btn-primary outline btn-block"
          onClick={props.prevStep}
        >
          Atrás
        </button>
      </div>
      <div className="col-sm-6">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={props.submit}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Footer;
