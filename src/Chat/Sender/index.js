import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { send } from '../../store/actions';
import style from './style.module.css';

class Sender extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  onSend(event) {
    event.preventDefault();
    this.props.send(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <form
        className={style.sender}
        onSubmit={this.onSend}
      >
        <input
          type="text"
          placeholder="write here..."
          value={text}
          onChange={this.onTextChange}
        />
        <button
          type="submit"
          disabled={text.trim() === ''}
        >send</button>
      </form>
    );
  }
}

Sender.propTypes = {
  send: PropTypes.func.isRequired,
};

const actions = { send };

export default connect(null, actions)(Sender);
