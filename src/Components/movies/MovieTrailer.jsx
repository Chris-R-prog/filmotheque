import "./movieTrailer.css";

// Sélectionne la meilleure bande-annonce YouTube disponible.
function MovieTrailer({ videos = [], title }) {
  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ??
    videos.find((video) => video.site === "YouTube");

  if (!trailer) {
    return (
      <p className="movie-trailer__empty">Aucune bande annonce disponible.</p>
    );
  }

  const origin = encodeURIComponent(window.location.origin);
  const embedUrl = `https://www.youtube.com/embed/${trailer.key}?rel=0&playsinline=1&origin=${origin}`;

  return (
    <section className="movie-trailer">
      <h3>Bande-annonce</h3>

      <iframe
        key={trailer.key}
        src={embedUrl}
        title={`Bande-annonce de ${title}`}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </section>
  );
}

export default MovieTrailer;
