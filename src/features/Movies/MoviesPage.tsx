import MovieCard from "./MovieCard";

import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { fetchMovies } from "./moviesSlice";
import { AuthContext, anonymousUser } from "../../AuthContext";

function MoviesPage() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map((m) => (
            <Grid item key={m.id} xs={12} sm={6} md={4}>
              <MovieCard
                key={m.id}
                id={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                image={m.image}
                enableUserActions={loggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MoviesPage;
