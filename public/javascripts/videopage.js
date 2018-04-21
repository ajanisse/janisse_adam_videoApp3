var videoApp = {
  // non-view related things
  addComments(data){
    //Process the comment data and push them into vue
    data.forEach(review => videoApp.vm.reviews.push(review));
  },

  vm : new Vue ({
    delimiters : ["${","}"],
    el : "#movie",
    data : {
      reviews : [],

      numStars : 3,

      review : ""

    },
    methods : {
      addReview() {
        let movieId = document.querySelector('.movId').textContent;

        fetch('/api', {
          method: 'post',
          headers : {
            'Accept' : 'Application/json, text-plain, */*',
            'Content-type' : 'application/json'
          },
          body : JSON.stringify({
            id : movieId,
            stars : this.numStars,
            comment : this.review
          })
        })
        .then((resp) => resp.JSON())
        .then((data) => {
          console.log(data);
        })
        .catch(function(error){
          console.log(error);
        });
      }
    }
  })
}

videoApp.addComments(appData.movies);
