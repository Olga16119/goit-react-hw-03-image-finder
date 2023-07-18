import PropTypes from 'prop-types'
import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'


function ImageGallery({images}) {
   return (<ul className={css.gallery}>
       {images.map(({ id, webformatURL, largeImageURL }) => {
           return (
               <ImageGalleryItem
              key={id}
              url={webformatURL}
              largeUrl={largeImageURL}

            />
           )


       })}
        </ul>)

}
    
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};


export default ImageGallery