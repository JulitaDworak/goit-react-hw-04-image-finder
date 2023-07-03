import React, { useState, useCallback } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      onSubmit(name);

      setName('');
    },
    [onSubmit, name]
  );

  const handleChange = useCallback(e => {
    const { value } = e.currentTarget;
    setName(value);
  }, []);

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={name}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;



// kod bez HOOKa
// import { Component } from 'react';
// import css from './Searchbar.module.css';
// import PropTypes from 'prop-types';

// export class Searchbar extends Component {
//   state = {
//     name: '',
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { name } = this.state;

//     this.props.onSubmit(name);

//     this.setState({ name: '' });
//   };

//   handleChange = e => {
//     const { value } = e.currentTarget;
//     this.setState({ name: value });
//   };

//   render() {
//     const { name } = this.state;

//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//             value={name}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };