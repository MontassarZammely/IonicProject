import { Component } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, deleteDoc } from '@angular/fire/firestore';

interface Movie {
  title: string;
  genre: string;
  year: number;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone : false
})
export class MoviesPage {
  movieTitle: string = '';
  movieGenre: string = '';
  movieYear: number | null = null;
  playlist: Movie[] = [];

  constructor(private firestore: Firestore) {}

  async addMovie() {
    if (!this.movieTitle || !this.movieGenre || !this.movieYear) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const moviesCollection = collection(this.firestore, 'movies');
      const newMovie: Movie = {
        title: this.movieTitle,
        genre: this.movieGenre,
        year: this.movieYear,
      };
      await addDoc(moviesCollection, newMovie);
      this.playlist.push(newMovie);
      this.movieTitle = '';
      this.movieGenre = '';
      this.movieYear = null;
      alert('Film ajouté avec succès à la playlist!');
    } catch (error) {
      console.error('Erreur lors de l’ajout du film :', error);
    }
  }

  async loadMoviesFromFirebase() {
    try {
      const moviesCollection = collection(this.firestore, 'movies');
      const moviesSnapshot = await getDocs(moviesCollection);
      this.playlist = moviesSnapshot.docs.map((doc) => {
        const data = doc.data() as Movie; // Explicit type casting
        return {
          title: data['title'],
          genre: data['genre'],
          year: data['year'],
        };
      });
    } catch (error) {
      console.error('Erreur lors du chargement des films :', error);
    }
  }

  async removeMovie(index: number) {
    try {
      const movie = this.playlist[index];
      const moviesCollection = collection(this.firestore, 'movies');
      const moviesSnapshot = await getDocs(moviesCollection);
      const docToDelete = moviesSnapshot.docs.find(
        (doc) =>
          doc.data()['title'] === movie.title &&
          doc.data()['genre'] === movie.genre &&
          doc.data()['year'] === movie.year
      );

      if (docToDelete) {
        await deleteDoc(doc(this.firestore, 'movies', docToDelete.id));
        this.playlist.splice(index, 1);
        alert('Film supprimé avec succès!');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du film :', error);
    }
  }

  ngOnInit() {
    this.loadMoviesFromFirebase();
  }
}

 // <--------------- FI SOURET ME EL FIREBASE MAHABECH YEKHDEM ESTA3MEL HEDHI STATIC ------------->


 
// import { Component, OnInit } from '@angular/core';

// interface Movie {
//   title: string;
//   genre: string;
//   year: number;
// }

// @Component({
//   selector: 'app-movies',
//   templateUrl: './movies.page.html',
//   styleUrls: ['./movies.page.scss'],
//   standalone: false
// })
// export class MoviesPage implements OnInit {
//   movieTitle: string = '';
//   movieGenre: string = '';
//   movieYear: number | null = null;
//   playlist: Movie[] = [];

//   constructor() {}

//   ngOnInit() {
//     this.loadMovies();
//   }

//   loadMovies() {
//     this.playlist = [
//       { title: 'Inception', genre: 'Science Fiction', year: 2010 },
//       { title: 'The Dark Knight', genre: 'Action', year: 2008 },
//       { title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
//       { title: 'Titanic', genre: 'Romance', year: 1997 },
//       { title: 'The Matrix', genre: 'Action', year: 1999 },
//       { title: 'Forrest Gump', genre: 'Drama', year: 1994 },
//       { title: 'The Godfather', genre: 'Crime', year: 1972 },
//       { title: 'Pulp Fiction', genre: 'Crime', year: 1994 },
//       { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994 },
//       { title: 'Gladiator', genre: 'Action', year: 2000 }
//     ];
//   }

//   addMovie() {
//     if (!this.movieTitle || !this.movieGenre || !this.movieYear) {
//       alert('Veuillez remplir tous les champs.');
//       return;
//     }

//     const newMovie: Movie = {
//       title: this.movieTitle,
//       genre: this.movieGenre,
//       year: this.movieYear,
//     };

//     this.playlist.push(newMovie);
//     this.movieTitle = '';
//     this.movieGenre = '';
//     this.movieYear = null;
//     alert('Film ajouté avec succès à la playlist!');
//   }

//   removeMovie(index: number) {
//     this.playlist.splice(index, 1);
//     alert('Film supprimé avec succès!');
//   }
// }

