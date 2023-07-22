import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
      this.setState({ imageName: e.currentTarget.value });
    };
  
  onFormSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Please enter your search query');
      return;
    }
    console.log(this.state.imageName);
    
      this.props.onSubmit(this.state.imageName);
  
    
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span >Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
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
