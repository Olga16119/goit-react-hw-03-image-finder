import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import searchImages from 'api_pixabay/searchImages';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    showButton: false,
    showModal: false,
    modalValue: {},
    isLoading: false,
    totalImages: 0,
    imageName: 'initialImage',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isloading: true });

      const { hits, total } = searchImages(
        this.state.imageName,
        this.state.page
      );
      if (!total) {
        return alert(`Sorry, nothing was found for your request`);
      }
      this.setState(({ images }) => ({
        images: [...images, ...hits],
        isloading: false,
      }));
    }
  }

  onClickLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  toggleModal = modalValue => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalValue,
    }));
  };

  searchHandler = imageName => {
    this.setState({ imageName, images: [], showButton: true, page: 1 });
  };

  render() {
    const { images, isloading, showModal, modalValue, showButton } = this.state;

    return (
      <>
        {showModal && (
          <Modal
            onClick={this.toggleModal}
            data={modalValue}
            onClose={this.toggleModal}
          />
        )}
        {isloading && <Loader />}

        <Searchbar onSubmit={this.searchHandler} />
        <ImageGallery
          images={images}
          isloading={isloading}
          onClick={this.toggleModal}
          showButton={this.onClickLoadMore}
        />
        {showButton && <Button onClick={this.onClickLoadMore} />}
      </>
    );
  }
}
