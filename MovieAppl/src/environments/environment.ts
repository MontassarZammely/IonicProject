
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
  production: false,
  apiKey: "AIzaSyD3VrYoa0pWtbc41Teu-s0EIcdsaxPsFEw",
  authDomain: "appmovie-552d1.firebaseapp.com",
  projectId: "appmovie-552d1",
  storageBucket: "appmovie-552d1.appspot.com",
  messagingSenderId: "645205111927",
  appId: "1:645205111927:web:0a58fda767feaf171c0272",
};

// Initialize Firebase
const app = initializeApp(environment);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

