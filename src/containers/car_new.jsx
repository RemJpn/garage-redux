import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createCar } from '../actions';

import Aside from '../components/aside';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <input
          className="form-control"
          type={type}
          {...input}
        />
        {touched
          && ((error && <span>{error}</span>)
            || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

class CarNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }


  render() {
    return (
      <div className="view-container">
        <Aside />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Brand"
            name="brand"
            type="text"
            component={renderField}
          />
          <Field
            label="Model"
            name="model"
            type="text"
            component={renderField}
          />
          <Field
            label="Owner"
            name="owner"
            type="text"
            component={renderField}
          />
          <Field
            label="Plate"
            name="plate"
            type="text"
            component={renderField}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
          >
            Add car
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
  };
}

const validate = (values) => {
  const errors = {};
  if (!values.brand) errors.brand = 'Required';
  if (!values.model) errors.model = 'Required';
  if (!values.owner) errors.owner = 'Required';
  if (!values.plate) {
    errors.plate = 'Required';
  } else if (!/[A-Z]*/.test(values.plate)) {
    errors.plate = 'Should be all caps and no special characters';
  }

  return errors;
}

export default reduxForm({ form: 'newCarForm', validate })(
  connect(mapStateToProps, { createCar })(CarNew));
