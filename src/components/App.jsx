import React, { useState, useEffect } from 'react';
import { fetchPhotosWithQuery } from './services/api';
import SearchBar from './Searchbar/SearchBar';
// import ImageGallery from './ImageGallery/ImageGallery';
import { ImageGallery } from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import{ Loader} from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchedPhotos = await fetchPhotosWithQuery(searchValue, page);

        setPhotos(prevPhotos => [
          ...prevPhotos,
          ...fetchedPhotos.map(photo => ({
            id: photo.id,
            webformatURL: photo.webformatURL,
            largeImageURL: photo.largeImageURL,
            tags: photo.tags,
          })),
        ]);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue !== '' && page > 1) {
      fetchData();
    }
  }, [searchValue, page]);

  const handleSearchValue = value => {
    setPhotos([]);
    setSearchValue(value);
    setPage(1);
  };

  const handleButtonVisibility = () => {
    if (photos.length < 12) return 'none';
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const handleModal = imageAddress => {
    setModal(imageAddress);
  };

  const handleCloseModal = () => {
    setModal('');
  };

  const passImgToModal = () => {
    return modal;
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchValue} />
      <ImageGallery photos={photos} imageAddress={handleModal} />
      {isLoading && <Loader />}
      <div className="ButtonContainer" style={{ display: handleButtonVisibility() }}>
        {!isLoading && <Button onClick={handleLoadMore} />}
      </div>
      {modal !== '' && <Modal imageAddress={passImgToModal()} onClick={handleCloseModal} />}
      
    </>
  );
};

export default App;






// kod bez hooks
// import { Component } from 'react';
// import { fetchPhotosWithQuery } from './services/api';
// import { Searchbar } from './SearchBar/SearchBar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';


// export class App extends Component {
//   state = {
//     photos: [],
//     searchValue: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     modal: '',
//   };

//   async componentDidUpdate(prevState, prevProps) {
//     if (
//       this.state.searchValue !== prevProps.searchValue ||
//       this.state.page !== prevProps.page
//     ) {
//       try {
//         this.setState({ isLoading: true });

//         const photos = await fetchPhotosWithQuery(
//           this.state.searchValue,
//           this.state.page
//         );

//         photos.map(photo => {
//           return this.setState(prevState => ({
//             photos: [
//               ...prevState.photos,
//               {
//                 id: photo.id,
//                 webformatURL: photo.webformatURL,
//                 largeImageURL: photo.largeImageURL,
//                 tags: photo.tags,
//               },
//             ],
//           }));
//         });
//       } catch (error) {
//         this.setState({ error });
//         console.log(this.state.error);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   searchValue = e => this.setState({ photos: [], searchValue: e });

//   showPhotos = () => {
//     const { photos } = this.state;
//     return photos;
//   };

//   handleButtonVisibility = () => {
//     if (this.state.photos.length < 12) return 'none';
//   };

//   loadMore = e => {
//     if (e) {
//       this.setState({ page: this.state.page + 1 });

//       setTimeout(() => {
//         window.scrollTo({
//           top: document.body.scrollHeight,
//           behavior: 'smooth',
//         });
//       }, 500);
//     }
//   };

//   handleModal = imageAddress => this.setState({ modal: imageAddress });

//   modalClose = e => this.setState({ modal: e });

//   passImgToModal = () => this.state.modal;

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.searchValue} />
//         <ImageGallery
//           photos={this.showPhotos()}
//           imageAddress={this.handleModal}
//         />
//         {this.state.isLoading && <Loader />}
//         <div
//           className="ButtonContainer"
//           style={{ display: this.handleButtonVisibility() }}
//         >
//           {!this.state.isLoading && <Button onClick={this.loadMore} />}
//         </div>
//         {this.state.modal !== '' && (
//           <Modal
//             imageAddress={this.passImgToModal()}
//             onClick={this.modalClose}
//           />
//         )}
//       </>
//     );
//   }
// }