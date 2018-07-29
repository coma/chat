import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './style.module.css';

const className = ({ isMine, isAThought, isFaded, isHighlighted }) => classNames({
  [style.right]: isMine,
  [style.left]: !isMine,
  [style.thought]: isAThought,
  [style.faded]: isFaded,
  [style.highlight]: isHighlighted,
});

class Messages extends Component {
  constructor(props) {
    super(props);
    this.root = createRef();
    this.scrollTop = 0;
  }

  getSnapshotBeforeUpdate(prevProps) {
    const isAtTheBottom = this.root.current.scrollTop === this.scrollTop;
    const moreMessages = prevProps.messages.length < this.props.messages.length;
    const lastOneIsMine = this.props.messages.length && this.props.messages[this.props.messages.length - 1].isMine;

    return isAtTheBottom || (moreMessages && lastOneIsMine);
  }

  /* eslint-disable no-unused-vars */
  componentDidUpdate(prevProps, prevState, autoScroll) {
    this.scrollTop = this.root.current.scrollHeight - this.root.current.clientHeight;
    if (autoScroll) {
      this.root.current.scrollTop = this.scrollTop;
    }
  }

  render() {
    return (
      <ul className={style.messages} ref={this.root}>
        {this.props.messages.map(message => (
          <li key={message.id} className={className(message)}>
            <div>{message.text}</div>
          </li>
        ))}
      </ul>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    isAThought: PropTypes.bool.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    isFaded: PropTypes.bool,
  })).isRequired,
};

const mapState = ({ messages }) => ({ messages });

export default connect(mapState)(Messages);
