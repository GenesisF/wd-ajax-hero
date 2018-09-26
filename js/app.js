(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  const input = document.querySelector('#search');

  document.querySelector('form').addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    const val = input.value.trim();

    if(val === ''){
      return;
    }
    
    fetch(`https://omdb-api.now.sh/?s=${encodeURIComponent(val)}`,{method:"GET"})
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const results = data.Search;

        movies.splice(0, movies.length, ...results.map(result => ({
          id: result.imdbID,
          poster: result.Poster === 'N/A' ? 'https://place-hold.it/300x445' : result.Poster,
          title: result.Title,
          year: result.Year
        })));

        renderMovies();

      })
      .catch(err => console.error(err));


  });

})();
