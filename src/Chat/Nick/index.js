import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './style.module.css';

const Nick = ({ nick, isTyping }) => isTyping
  ? <div className={style.nick}><b>{nick}</b> is typing</div>
  : <div className={style.nick}>chatting with <b>{nick}</b></div>;

Nick.propTypes = {
  nick: PropTypes.string,
  isTyping: PropTypes.bool,
};

Nick.defaultProps = {
  nick: 'unknown',
  isTyping: false,
};

const mapState = ({ other, isTyping }) => ({ nick: other, isTyping });

export default connect(mapState)(Nick);
