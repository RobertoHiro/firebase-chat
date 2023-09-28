var firebaseConfig = {

  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Diga seu nome");