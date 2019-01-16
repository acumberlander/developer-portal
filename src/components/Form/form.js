import React from 'react';
import './Form.scss';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import authRequests from '../../Helpers/Data/authRequests';
import tabDataRequests from '../../Helpers/Data/tabDataRequests';

const defaultTabItem = {
  name: '',
  url: '',
  uid: '',
  isCompleted: false,
};

class TabForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
    tabType: PropTypes.string,
  }

  state = {
    newTabItem: defaultTabItem,
    tabType: false,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempTabItem = { ...this.state.newTabItem };
    tempTabItem[name] = e.target.value;
    this.setState({ newTabItem: tempTabItem });
  }

  setTabTypeState = (e) => {
    const newTabType = e.target.value;
    this.setState({ tabType: newTabType });
  };

  tabTypeChange = e => this.setTabTypeState(e)

  nameChange = e => this.formFieldStringState('name', e)

  linkChange = e => this.formFieldStringState('url', e)

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, isEditing } = this.props;
    if (isEditing) {
      const { tabType } = this.props;
      const myTabItem = { ...this.state.newTabItem };
      myTabItem.uid = authRequests.getCurrentUid();
      onSubmit(myTabItem, tabType);
      this.setState({ newTabItem: defaultTabItem, tabType: false });
    } else {
      const { tabType } = this.state;
      const myTabItem = { ...this.state.newTabItem };
      myTabItem.uid = authRequests.getCurrentUid();
      onSubmit(myTabItem, tabType);
      this.setState({ newTabItem: defaultTabItem, tabType: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId, tabType } = this.props;
    if (prevProps !== this.props && isEditing) {
      tabDataRequests.getSingleTabItem(editId, tabType)
        .then((tabItem) => {
          this.setState({ newTabItem: tabItem.data });
        })
        .catch((error) => {
          console.error('error on componentDidUpdate', error);
        });
    }
  }

  render() {
    const { newTabItem, tabType } = this.state;
    return (
      <div className="form p-4">
      <Form onSubmit={this.formSubmit}>
      <div className="row">
      <div className="col-8">
        <FormGroup>
          <div className="d-flex flex-nowrap">
          <Label className="name-label" for="name">Name:</Label>
          <Input
            type="text"
            name="form-name"
            id="name"
            placeholder="add name"
            value={newTabItem.name}
            onChange= {this.nameChange}
          />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="d-flex flex-nowrap">
          <Label className="link-label" for="link">Link:</Label>
          <Input
            type="text"
            name="form-link"
            id="link"
            placeholder="add url link"
            value={newTabItem.url}
            onChange= {this.linkChange}
          />
          </div>
        </FormGroup>
        </div>
        <div className="col-2">
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="form-radio"
                checked={ tabType === 'tutorials' }
                value="tutorials"
                onChange={ this.tabTypeChange }
              />{' '}
              Tutorial
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="form-radio"
                value="resources"
                onClick={ this.tabTypeChange }
              />{' '}
              Resource
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="form-radio"
                value="blogs"
                onClick={ this.tabTypeChange }
              />{' '}
              Blog
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="form-radio"
                value="podcasts"
                onClick={ this.tabTypeChange }
              />{' '}
              Podcast
            </Label>
          </FormGroup>
        </FormGroup>
        </div>
        <div className="col-2">
        <Button className="btn btn-dark">Save</Button>
        </div>
        </div>
      </Form>
      </div>
    );
  }
}

export default TabForm;
