import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import './TabList.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/Data/propz/listingShape';
import Podcasts from '../InfoDisplay/Podcasts/Podcasts';
import Tutorials from '../InfoDisplay/Tutorials/Tutorials';
import Blogs from '../InfoDisplay/Blogs/Blogs';
import Resources from '../InfoDisplay/Resources/Resources';

class TabList extends Component {
  static propType = {
    tutorials: PropTypes.arrayOf(tabDataShape),
    resources: PropTypes.arrayOf(tabDataShape),
    blogs: PropTypes.arrayOf(tabDataShape),
    podcasts: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      tutorials,
      podcasts,
      blogs,
      resources,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    return (
      <div className="tabs mt-3 p-4">
        <Nav tabs>
          <NavItem className="navItem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Resources
            </NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Blogs
            </NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Podcasts
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Tutorials
              tutorials={tutorials}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
              updateSingleIsCompleted={updateSingleIsCompleted}
            />
          </TabPane>
          <TabPane tabId="2">
            <Resources
              resources={resources}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
              updateSingleIsCompleted={updateSingleIsCompleted}
            />
          </TabPane>
          <TabPane tabId="3">
            <Blogs
              blogs={blogs}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
              updateSingleIsCompleted={updateSingleIsCompleted}
            />
          </TabPane>
          <TabPane tabId="4">
            <Podcasts
              podcasts={podcasts}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
              updateSingleIsCompleted={updateSingleIsCompleted}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default TabList;
