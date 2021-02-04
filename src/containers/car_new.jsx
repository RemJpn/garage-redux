import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createCar } from '../actions';

import Aside from '../components/aside';

class CarNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  presence = (value) => {
    return value ? undefined : 'Required';
  };

  plateFormer = (value) => {
    return value && !/[A-Z]*/.test(value) ? 'Should be all caps and no special characters' : undefined;
  };

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <div>
          <input
            className="form-control"
            type={field.type}
            {...field.input}
          />
          {field.touched
            && ((field.error && <span>{field.error}</span>)
              || (field.warning && <span>{field.warning}</span>))}
        </div>
      </div>
    );
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
            component={this.renderField}
            validate={this.presence}
          />
          <Field
            label="Model"
            name="model"
            type="text"
            component={this.renderField}
            validate={this.presence}
          />
          <Field
            label="Owner"
            name="owner"
            type="text"
            component={this.renderField}
            validate={this.presence}
          />
          <Field
            label="Plate"
            name="plate"
            type="text"
            component={this.renderField}
            validate={this.presence}
            warn={this.plateFormat}
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

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarNew));
