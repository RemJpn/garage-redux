import React from 'react';

const Aside = (props) => {
  return (
    <div className="aside">
      <div className="illustration" style={{ backgroundImage: `url(https://source.unsplash.com/500x500/?car)`}}></div>
      <h3>{props.garage}</h3>
      <p>blabla</p>
      {props.children}
    </div>
  );
};

export default Aside;
