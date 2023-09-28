require("dotenv").config()

var firebaseConfig = {
    apiKey: `${process.env.env_variable.firebaseConfig.apiKey}`,
    authDomain: `${process.env.env_variable.firebaseConfig.authDomain}`,
    databaseURL: `${process.env.env_variable.firebaseConfig.databaseURL}`,
    projectId: `${process.env.env_variable.firebaseConfig.projectId}`,
    storageBucket: `${process.env.env_variable.firebaseConfig.storageBucket}`,
    messagingSenderId: `${process.env.env_variable.firebaseConfig.messagingSenderId}`,
    appId: `${process.env.env_variable.firebaseConfig.appId}`,
    measurementId: `${process.env.env_variable.firebaseConfig.measurementId}`
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Diga seu nome");

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});