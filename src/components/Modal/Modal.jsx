import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  state = {
    data: this.props.data,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }
  onClose = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { data } = this.props;
    const { largeImageURL, tags } = data || {};
    return (
      <div onClick={this.onClose} className={css.backdrop}>
        <div className={css.modal}>
          <button
            className={css.buttonClose}
            type="button"
            onClick={this.onClose}
          ></button>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
