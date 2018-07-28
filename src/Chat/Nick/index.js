import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './style.module.css';

const Nick = ({ nick }) => (
  <div className={style.nick}>chatting with <b>{nick}</b></div>
);

Nick.propTypes = {
  nick: PropTypes.string,
};

Nick.defaultProps = {
  nick: 'unknown',
};

const mapState = ({ other }) => ({ nick: other });

export default connect(mapState)(Nick);
