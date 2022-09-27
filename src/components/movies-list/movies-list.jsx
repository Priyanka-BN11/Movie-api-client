import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter};
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if(visibilityFilter !== "") {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }
    if(!movies) return <div className="main-view"/>;
    return (<>
    <Col md={12} style={{ margin: '0.2em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map((m) => (
      <Col lg={4} md={3}  sm={12} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
    </>);
}
MoviesList.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        filter: PropTypes.func,
      })
    ),
    visibilityFilter: PropTypes.string,
  };
export default connect(mapStateToProps)(MoviesList);