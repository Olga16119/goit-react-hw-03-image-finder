import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import searchImages from 'api_pixabay/searchImages';
import Modal from '../Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    loadMore: false,
    showModal: false,
    modalValue: {},
    isLoading: false,
    totalImages: 0,
    imageName: 'initialImage',
    name: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isloading: true });

      const { hits, total } = await searchImages(
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

  onClickLoadMore = async () => {
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

  searchHandler = async imageName => {
    this.setState({ imageName, images: [], loadMore: true, page: 1 });

    const { hits } = await searchImages(imageName, 1);

    this.setState({
      images: hits,
      isloading: false,
      page: 1,
      loadMore: true,
      imageName,
    });
  };

  render() {
    const { images, isloading, showModal, modalValue, loadMore } = this.state;

    return (
      <>
        <div className={css.App}>
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
            loadMore={this.onClickLoadMore}
          />
          {loadMore && <Button onClick={this.onClickLoadMore} />}
        </div>
      </>
    );
  }
}
