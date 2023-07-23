import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;
  
    return (
      <div>
        <ul className={css.ImageGallery}>
          {images.map(({  id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id:PropTypes.number.isRequired
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageGallery;
