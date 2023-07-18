import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import searchImages  from 'api_pixabay/searchImages';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    showButton: false,
    isLoading:false,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state
    const { prevValue, prevPage } = prevState
    if (value !== prevValue || page !== prevPage) {
      this.getImages()
    }
  }

    async searchHandler() {
    const { value, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await searchImages(value, page);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async getImages() {
    const responce = await this.searchHandler()
    const data = responce.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
      webformatURL,
      largeImageURL,
    }))
    const totalHits = responce.totalHits
    const totalPages = Math.ceil(totalHits / 12)
    if (!responce.hits.length) {
      alert('Nothing was found for your request.')
    }
       if (this.state.page === totalPages) {
      console.log('These are all available images for this request');
    }

     this.setState(prevState => ({
      images: [...prevState.images, ...data],
      showButton: this.state.page < totalPages,
    }));
  }

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearch = (value) => {
    this.setState({value, page:1, image:[]})
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery images={this.state.images} />
        {this.state.showButton && <Button onClick={this.onClickLoadMore} />}
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}
