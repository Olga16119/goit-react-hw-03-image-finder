import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseEscape);
  }
  onCloseEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div onClick={this.onCloseBackdrop} className={css.backdrop}>
        <div className={css.modal}>
          <button
            className={css.buttonClose}
            type="button"
            onClick={this.onCloseBackdrop}
          ></button>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};