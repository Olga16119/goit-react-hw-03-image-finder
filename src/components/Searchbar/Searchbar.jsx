import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleNameChange = e => {
    this.setState({ value: e.currentTarget.value });
  };
  onFormSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      alert('Please enter your search query');
      return;
    }

    this.props.onSubmit(this.state.value);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onFormSubmit}>
          <button type="submit" className="button">
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
