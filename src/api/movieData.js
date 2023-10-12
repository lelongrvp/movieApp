import axios from "axios";
import { apiKey } from "../constants";

const baseUrl = "https://api.themoviedb.org/3";
const trendingUrl = `${baseUrl}/trending/movie/week?api_key=${apiKey}`;
const upcomingUrl = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedUrl = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}`;

const movieDetailUrl = (id) => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsUrl = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesUrl = (id) =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailUrl = (id) => `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesUrl = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = "../../assets/images/fallbackPoster.png";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingUrl);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingUrl);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedUrl);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailUrl(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsUrl(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesUrl(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailUrl(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesUrl(id));
};

export const searchMovies = (params) => {
  return apiCall(searchUrl, params);
};
