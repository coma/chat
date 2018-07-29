import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { send, indicateTyping } from '../../store/actions';
import emoji from './emoji';
import style from './style.module.css';

class Sender extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onTextChange(event) {
    const text = emoji(event.target.value);
    this.setState({ text });
    this.props.indicateTyping(text !== '');
  }

  onSend(event) {
    event.preventDefault();
    this.setState({ text: '' });
    this.props.send(this.state.text);
    this.props.indicateTyping(false);
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
  indicateTyping: PropTypes.func.isRequired,
};

const actions = { send, indicateTyping };

export default connect(null, actions)(Sender);
