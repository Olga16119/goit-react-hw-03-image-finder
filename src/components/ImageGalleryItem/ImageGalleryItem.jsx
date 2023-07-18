import { Component } from "react";
import PropTypes from 'prop-types'
import css from './ImageGalleryItem.module.css'
import { Modal } from "components/Modal/Modal";

class ImageGalleryItem extends Component{
 state = {
    isModalOpen: false,
    };
    
      toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

    render() {
         const { url,largeUrl } = this.props;
    return ( <li className={css.galleryItem}>
        <img
          onClick={this.toggleModal}
          className={css.imageGalleryItem}
          src={url}
          alt='this is a search element'
        />
        {this.state.isModalOpen && (
          <Modal onClose={this.toggleModal} src={largeUrl} alt= 'this is a search element'/>
        )}
      </li>)
}
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};

export default ImageGalleryItem