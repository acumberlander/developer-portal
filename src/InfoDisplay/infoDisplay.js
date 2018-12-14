import React from 'react';
import './infoDisplay.scss';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';


class InfoDisplay extends React.Component {
  render() {
    return (
      <div className="info-display">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className= {active: this.state.activeTab === '2'} 
              onClick={() => { this.toggle('2'); }}
            >
              Bio
            </NavLink>
          </NavItem>
        </Nav>
        <ListGroup>
          <h2>Info Display</h2>
          <ListGroupItem>Item 1</ListGroupItem>
          <ListGroupItem>Item 2</ListGroupItem>
          <ListGroupItem>...</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default InfoDisplay;
