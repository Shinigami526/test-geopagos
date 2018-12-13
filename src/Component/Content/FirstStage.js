import React, { Component } from "react";
import { validate } from "../Validate/valid";
import _ from "lodash";

class FirstStage extends Component {
  state = {
    fullName: "",
    cuil: "",
    errors: {}
  };

  componentWillMount() {
    const { fullName, cuil } = this.props.state;

    this.setState({
      fullName: fullName
    });
    this._handleCuilChange({ target: { value: cuil || "" } });
  }

  _handleCuilChange = e => {
    const cuil = this._onlyNumber(e.target.value);
    let mask = cuil;

    if (cuil.length === 12) {
      return false;
    }

    if (cuil.length > 2) {
      mask = cuil.replace(/(\d{2})/, "$1-");
    }

    if (cuil.length > 10) {
      mask = cuil.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3");
    }

    this.setState({
      cuil: mask
    });
  };

  _resetError = name => {
    let error = {};
    error[name] = null;

    this.setState({ errors: Object.assign({}, this.state.errors, error) });
  };

  _onlyNumber = str => {
    return str.replace(/\D+/g, "");
  };

  _submit = () => {
    const fields = {
      fullName: this.state.fullName,
      cuil: this._onlyNumber(this.state.cuil)
    };

    const invalid = validate(fields, {
      fullName: {
        presence: {
          allowEmpty: false,
          message: "^Ingrese nombre completo."
        },
        length: {
          minimum: 2,
          message: "^El nombre es muy corto."
        }
      },
      cuil: {
        presence: {
          allowEmpty: false,
          message: "^Ingrese número de cuil."
        },
        length: {
          minimum: 11,
          message: "^El número de cuil debe ser de 11 digitos."
        }
      }
    });

    if (!_.isEmpty(invalid)) {
      this.setState({ errors: invalid });
    } else {
      this.setState({ errors: {} });
      this.props.updateHandler({
        fields: fields,
        step: 1
      });
    }
  };

  render() {
    const { fullName, cuil, errors } = this.state;
    return (
      <form>
        <div
          className={`form-group ${
            !_.isEmpty(errors["fullName"]) ? "is-invalid" : ""
          }`}
        >
          <label className="text-primary">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullName"
            placeholder="Nombre completo"
            value={fullName}
            onChange={e => this.setState({ fullName: e.target.value })}
            onFocus={() => this._resetError("fullName")}
          />
          <div className="invalid-feedback">{errors["fullName"]}</div>
        </div>
        <div
          className={`form-group pb-5 ${
            !_.isEmpty(errors["cuil"]) ? "is-invalid" : ""
          }`}
        >
          <label className="text-primary">N de CUIL</label>
          <input
            type="text"
            className="form-control"
            id="cuil"
            placeholder="Ej: 23-45678901-2"
            value={cuil}
            onChange={this._handleCuilChange}
            onFocus={() => this._resetError("cuil")}
          />
          <div className="invalid-feedback">{errors["cuil"]}</div>
        </div>
        <div className="mt-5 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary col-sm-6"
            onClick={this._submit}
          >
            Siguiente
          </button>
        </div>
      </form>
    );
  }
}

export default FirstStage;
