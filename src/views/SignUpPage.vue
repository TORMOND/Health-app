<template>
  <div id="signup-page">
   <div class="signup-section">
    <form class="signUp-form">
<input type="text" placeholder="Full Name" required v-model="names">
<input type="text" placeholder="Email" required v-model="mail">
<input type="telephone" placeholder="Phone Number" required v-model="phoneNumber">
<input type="password" placeholder="Password" required v-model="pass">
<input type="password" placeholder="confirm password" required v-model="pass2">

<p v-if="error" class="error">{{error}}</p>
<button @click.prevent="createAccount">SIGN UP</button>

<div class="signInPage">
<p>Already have an account</p>
<span @click="loginPage">Sign in</span>
</div>

</form>
   </div>



  </div>
</template>

<script>

import{ app, db, auth, user, createUserWithEmailAndPassword, setDoc, doc, collection, onAuthStateChanged  } from '@/firebase.js'

export default {
  name: 'SignUpPage',
  data() {
    return {
      mail:'',
      names:'',
      phoneNumber:'',
      pass: '',
      pass2: '', 
      error:''
    }
  },
  methods: {
   infor:function(){
 console.log(email.value);
  },
createAccount:function(){
  if(this.pass === this.pass2){
       console.log(this.names, this.pass, this.pass2)
  createUserWithEmailAndPassword(auth, this.mail, this.pass).then((userCredential) => {  
    const user = userCredential.user;
    setDoc(doc(db, "userDetails", user.uid), {
      email:this.mail,
      name: this.names,
      password:this.pass,
      phoneNumber:this.phoneNumber,
      id:user.uid,  
    });
 this.$router.push('/');

    });    
  }else{
    console.log("The passwords dont match:Please try again");
    this.error ="The passwords dont match:Please try again";
  }
},
loginPage:function(){
      this.$router.push('/');
      console.log("clicked to move to login page")
 }
},
  
}
</script>

<style>
#signup-page{
 background: url(/healthcare-digital-marketing-services.jpg)no-repeat center;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  width: 100%;
}
.signup-section{
   margin: auto;
   background-color: rgb(7, 0, 12);
   padding: 50px;
   width: 80vw;
   height:80vh;
   display:flex;
   border-radius: 5px;
}
.signUp-form{
  margin: auto;
  display:flex;
  flex-direction: column;
  gap:10px;
  
}
input{
  background-color: rgb(7, 0, 12);
  color:grey;
  border: 0.5px solid grey;
  padding: 8px 20px;
}
.error{
  color:red;
  font-size:14px;
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
.signInPage span{
color:aqua;
cursor:pointer;
}
.signInPage p{
color:grey;
}


</style>