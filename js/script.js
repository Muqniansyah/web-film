// buat fungsi yang didalamnya menampung cara tampilkan json jadi objek dengan ajax lalu munculkan pada halaman web.
function searchMovie() {
  // untuk mengosongkan terlebih dahulu movie-list/ movie yang dicari
  $("#movie-list").html("");

  // pakai method ajax yaitu $.ajax() yang merupakan fungsi asli daripada $.getJSON()
  $.ajax({
    // parameter dari objeknya, yaitu : url, type/method, data kembalian, kirim data.
    // url tujuan
    url: "http://www.omdbapi.com",
    // type / method (get,post,put,delete)
    type: "get",
    // data kembalian (teks,json,jsonp,xml)
    dataType: "json",
    // data kiriman atau kirim data ke url tujuan (http://www.omdbapi.com)
    data: {
      // apikey
      apikey: "bbecf148",
      // data pencarian
      s: $("#search-input").val(), // jquery ambil id search-input lalu ambil nilai inputannya.
    },
    // callback function jika berhasil
    success: function (hasil) {
      // jika objek jsonnya responnya adalah True
      if (hasil.Response == "True") {
        // buat variabel movies untuk mengambil hasil objek json Search
        let movies = hasil.Search;

        //   arti kode : ambil semua elemen pada movies, lalu tiap elemen pada movies berikan fungsi
        $.each(movies, function (index, data) {
          // cari id movie-list lalu tambahkan diakhirnya dengan method .append() sebuah elemen baru yaitu : string html berbentuk card
          $("#movie-list").append(`
          <div class="col-md-4">
            <div class="card mb-3">
              <img src="${data.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                <a href="#" class="card-link">Card link</a>
              </div>
            </div>
          </div>
          `);
        });

        // untuk mengosongkan search-input setelah selesai mencari
        $("#search-input").val("");
      } else {
        // jquery cari id movie-list, lalu htmlnya kita isi dengan
        $("#movie-list").html(`<h1 class='text-center'>${hasil.Error}</h1>`);
      }
    },
  });
}

// event search-button diklik
$("#search-button").on("click", function () {
  // jalankan fungsi
  searchMovie();
});

// event search-input tekan enter
$("#search-input").on("keyup", function (event) {
  // jika kode key nya sama dengan 13 atau enter, maka
  if (event.keyCode === 13) {
    // jalankan fungsi
    searchMovie();
  }
});
