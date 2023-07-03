

import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ imageAddress, onClick }) => {
  const modalClose = e => {
    if (e.key === 'Escape' || e.type === 'click') {
      onClick('');
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      modalClose(e);
    };

    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={modalClose}>
      <div className={css.Modal}>
        <img src={imageAddress} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageAddress: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;


// zapis bez HOOKS
// import { Component } from 'react';
// import css from './Modal.module.css';
// import PropTypes from 'prop-types';

// export class Modal extends Component {
//   modalClose = e => {
//     if (e.key === 'Escape' || e.type === 'click') {
//       this.props.onClick('');
//     }
//   };

//   componentDidMount() {
//     document.addEventListener('keydown', this.modalClose, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.modalClose, false);
//   }

//   render() {
//     const { imageAddress } = this.props;

//     return (
//       <div className={css.Overlay} onClick={this.modalClose}>
//         <div className={css.Modal}>
//           <img src={imageAddress} alt="modal" />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   imageAddress: PropTypes.string,
//   modalClose: PropTypes.func,
// };

