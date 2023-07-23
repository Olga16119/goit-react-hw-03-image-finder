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

      const responce = await searchImages(
        this.state.imageName,
        this.state.page
      );
      const totalPage = Math.ceil(responce.totalHits / 12);
  
      if (!responce.hits.length) {
        this.setState({ loadMore: false });
        return alert(`Sorry, nothing was found for your request`);
      }
      if (this.state.page === 1 && responce.hits.length) {
        console.log(` ${responce.totalHits} image(s) have been found`);
      }
      if (this.state.page === totalPage) {
        console.log('All images for this request are already available');
        this.setState({ loadMore: false });
      }

      this.setState(({ images }) => ({
        images: [...images, ...responce.hits],
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
    if (this.state.imageName === imageName) {
      return alert(`You have already made a query for this word`)
    }
    this.setState({ imageName: imageName.toLowerCase(), images: [], loadMore: true, page: 1 });
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
          <Searchbar onSubmit={this.searchHandler} />

          {!images || images.length === 0 ? (
            <p>Start searching for images</p>
          ) : (
            <ImageGallery
              images={images}
              isloading={isloading}
              onClick={this.toggleModal}
              loadMore={this.onClickLoadMore}
            />
          )}

          {isloading && <Loader />}
          {loadMore && <Button onClick={this.onClickLoadMore} />}
        </div>
      </>
    );
  }
}
