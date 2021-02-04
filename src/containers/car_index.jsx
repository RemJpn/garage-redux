import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Aside from '../components/aside';
import { fetchCars } from '../actions';

class CarIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }

  renderCar = (car) => {
    return (
      <Link to={`/cars/${car.id}`} key={car.id}>
        <div className="car-smallad">
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {car.owner}</li>
            </ul>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="view-container">
        <Aside garage={this.props.garage}>
          <Link to={`/cars/new`}>
            Add a car
          </Link>
        </Aside>
        <div className="list-container">
          { this.props.cars.map(this.renderCar) }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
    cars: state.cars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarIndex);
