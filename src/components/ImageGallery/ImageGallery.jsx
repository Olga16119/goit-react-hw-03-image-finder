import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;
    if (!images || images.length === 0) {
      return <p>Start searching for images</p>;
    }
    return (
      <div>
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
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
  images: PropTypes.array.isRequired,
  onclick: PropTypes.func
};

export default ImageGallery;
