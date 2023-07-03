import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photos, imageAddress }) => {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => {
        const { id, webformatURL, tags, largeImageURL } = photo;
        return (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            imageAddress={imageAddress}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  imageAddress: PropTypes.func.isRequired,
};