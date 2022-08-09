<template>
  <div id="loginPage">
    <div class="login-section">
     <div class="signIn-form">
     <form>
       <input type="email" required placeholder="Email" v-model="email">
       <input type="password" required placeholder="password" v-model="password">
       <p class="error" v-if="errors">{{errors}}</p>
       <button @click.prevent="login">LOGIN</button>
       <span @click="recoverPassword" class="forgot-password">forgot Password ?</span>

<div class="create-acc">
       <p>Don't have an account?</p>
       <span @click="signUpPage">Sign up</span>
</div>
     </form>
   </div> 
    </div>
   
  </div>
</template>

<script>
import{ app, db, auth, firebaseConfig, user, signInWithEmailAndPassword, signOut, collection, onAuthStateChanged, getDocs } from '@/firebase.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      user: '',
      email: '',
      password: '',
      errors: '',
    }
  },
  methods: {
    login:function(){
        if(this.mail === "" && this.pass === ""){
console.log("Fill in required details");
 }else{
                 //  Sign in 
     signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
    // const user = userCredential.user;
      onAuthStateChanged(auth, user => {

          const querySnapshot = getDocs(collection(db, "userDetails"), {
});
 querySnapshot.then((collection) => {
  console.log(querySnapshot);
  console.log(collection);

}).catch(() => {
  console.log("Error getting document:");
 this.errors = "Incorrect Login details";

}); 

      console.log(user.email, user.uid);
      if(user.email==="victormonderu@gmail.com"){
this.$router.push('/AdminPage');

    }else if (user) {
            this.$router.push('/NavigationPage');
            console.log(user);
    } 
    else{
        // stop.this.$router.push('/Navigation')
        alert("error");
    }
      })
  });
 }
    },
    signUpPage:function(){
      this.$router.push('/SignUpPage');  
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#loginPage{
  background: url(/healthcare-digital-marketing-services.jpg)no-repeat center;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
}
.login-section{
    margin: auto;
   background-color: rgb(7, 0, 12);
   padding: 50px;
   width: 80vw;
   height:80vh;
   display:flex;
   border-radius: 5px;
}
.signIn-form{
  margin: auto;
}
form{
  display: flex;
  flex-direction: column;
  gap:10px;
}
input{
  background-color: rgb(7, 0, 12);
  color:grey;
  border: 0.5px solid grey;
  padding: 8px 20px;
}
input:focus{
  border: 0.5px solid aqua;
}
button{
  background-color: aqua;
  border: none;
  cursor: pointer;
  border-radius:32px;
  padding: 5px;
}
.create-acc p{
color:grey;
}
.create-acc span{
color:aqua;
cursor: pointer;
}
.forgot-password{
  color:aqua;
}
.error{
  color:red;
  font-size: 12px;
}

</style>
