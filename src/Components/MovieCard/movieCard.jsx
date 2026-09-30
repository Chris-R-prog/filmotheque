import "./movieCard.css";

function MovieCard({ title, overview }) {
  return (
    <article className="movie-card">
      <h3>{title}</h3>
      <p>{overview}</p>
    </article>
  );
}

export default MovieCard;
