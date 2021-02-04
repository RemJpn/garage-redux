import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Aside from '../components/aside';

import { fetchCar } from '../actions';
import { deleteCar } from '../actions';

class CarShow extends Component {
  componentDidMount() {
    if (!this.props.car) {
      console.log('no car!');
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleClick = () => {
    this.props.deleteCar(this.props.match.params.id,
      (car) => {
        this.props.history.push('/'); // Navigate after submit
        return car;
      });
  }

  render() {
    if (!this.props.car) {
      return (
        <div className="view-container">
          <Aside garage={this.props.garage}>
            <Link to={`/cars/new`}>
              Add a car
            </Link>
          </Aside>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="view-container">
        <Aside garage={this.props.garage}>
          <Link to={`/cars/new`}>
            Add a car
          </Link>
        </Aside>
        <div className="car-container">
          <div className="car-card">
            <div className="car-picture"></div>
            <div className="car-details">
              <span>{this.props.car.brand} - {this.props.car.model}</span>
              <ul>
                <li><strong>Owner:</strong> {this.props.car.owner}</li>
              </ul>
              <span className="plate">{this.props.car.plate}</span>
            </div>
            <button className="delete" onClick={this.handleClick}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  return {
    garage: state.garage,
    car: state.cars.find(c => c.id === idFromUrl)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow);
