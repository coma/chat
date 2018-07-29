import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './style.module.css';

const Countdown = ({ seconds }) => !!seconds && <div className={style.countdown}>{seconds}</div>;

Countdown.propTypes = {
  seconds: PropTypes.number,
};

Countdown.defaultProps = {
  seconds: 0,
};

const mapState = ({ countdown }) => ({ seconds: countdown });

export default connect(mapState)(Countdown);
