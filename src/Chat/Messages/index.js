import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './style.module.css';

const className = ({ isMine, isAThought }) => classNames({
  [style.right]: isMine,
  [style.left]: !isMine,
  [style.thought]: isAThought,
});

const Messages = ({ messages }) => (
  <ul className={style.messages}>
    {messages.map(message => (
      <li key={message.id} className={className(message)}>
        <div>{message.text}</div>
      </li>
    ))}
  </ul>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    isAThought: PropTypes.bool.isRequired,
  })).isRequired,
};

const mapState = ({ messages }) => ({ messages });

export default connect(mapState)(Messages);
