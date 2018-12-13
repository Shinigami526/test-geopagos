import React, { Component } from "react";
import { validate } from "../Validate/valid";
import Footer from "../Footer/Footer";
import _ from "lodash";
import spinner from "../../assets/spinner-white.svg";

class ThirdStage extends Component {
  constructor(props) {
    super(props);
    const { email, password } = this.props.state;

    this.state = {
      email: email || "",
      password: password || "",
      showPassword: false,
      errors: {}
    };
  }

  _handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  _handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  _togglePassword(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      showPassword: value
    });
  }

  _resetError(name) {
    let error = {};
    error[name] = null;

    this.setState({ errors: Object.assign({}, this.state.errors, error) });
  }

  _prevStep() {
    this.props.updateHandler({ step: 1 });
  }

  _renderButtonContent() {
    if (this.props.pending) {
      return <img src={spinner} width="20" alt="spinner" />;
    } else {
      return "Finalizar";
    }
  }

  _submit(event) {
    const fields = {
      email: this.state.email,
      password: this.state.password
    };
    const invalid = validate(fields, {
      email: {
        presence: {
          allowEmpty: false,
          message: "^Ingrese email"
        },
        email: {
          message: "^Email inválido."
        }
      },
      password: {
        presence: {
          allowEmpty: false,
          message: "^Ingrese una contraseña"
        },
        length: {
          minimum: 8,
          message: "^Debe ser de al menos 8 caracteres."
        },
        format: {
          pattern: /^(?=.*\d).*$/,
          message: "^Debe incluir al menos un número."
        }
      }
    });

    if (!_.isEmpty(invalid)) {
      this.setState({ errors: invalid });
    } else {
      this.setState({ errors: {} });
      this.props.submitHandler(fields);
    }
  }

  render() {
    return (
      <form>
        <div
          className={`form-group ${
            !_.isEmpty(this.state.errors["email"]) ? "is-invalid" : ""
          }`}
        >
          <label for="email" className="text-primary">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresá tu dirección de correo"
            value={this.state.email}
            onChange={this._handleEmailChange.bind(this)}
            onFocus={this._resetError.bind(this, "email")}
          />
          <div className="invalid-feedback">{this.state.errors["email"]}</div>
        </div>
        <div
          className={`form-group ${
            !_.isEmpty(this.state.errors["password"]) ? "is-invalid" : ""
          }`}
        >
          <label for="password" className="text-primary">
            Contraseña
          </label>
          <input
            type={`${this.state.showPassword ? "text" : "password"}`}
            className="form-control"
            id="password"
            placeholder="Debe ser alfanumérica de al menos 8 caracteres"
            value={this.state.password}
            onChange={this._handlePasswordChange.bind(this)}
            onFocus={this._resetError.bind(this, "password")}
          />
          <div className="invalid-feedback">
            {this.state.errors["password"]}
          </div>
        </div>
        <div class="form-check pb-5 ">
          <input
            type="checkbox"
            class="form-check-input"
            id="showPassword"
            onClick={this._togglePassword.bind(this)}
          />
          <label class="form-check-label text-muted" for="showPassword">
            Mostrar contraseña
          </label>
        </div>

        <Footer
          prevStep={this._prevStep.bind(this)}
          submit={this._submit.bind(this)}
        />
      </form>
    );
  }
}

export default ThirdStage;
