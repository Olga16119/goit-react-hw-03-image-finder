import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';



class Searchbar extends Component {
  state = {
    value: '',
  };

  onFormSubmit = event => {
      event.preventDefault();
      const searchQuery = event.target.query.value;
      const {onSubmit } = this.props;
      onSubmit(searchQuery);
      if (!searchQuery) {
          alert('Please enter your search query')
          return
      }

      this.setState({ value: searchQuery })
      this.resetForm()
    };
    
    resetForm = () => {
        this.setState({value:''})
    }
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
            placeholder="Search images and photos"
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
