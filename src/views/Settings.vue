<template>
  <div id="settings">
<div id="container">
    <h3>Settings</h3>
     
       <div class="admin-details">
  
  <div class="admin-profile">
    <div class="admin-image">
      
<div class="userProfile">
<img :src="userProfile" alt="profile-pic" class="profilepic" v-if="userProfile == userProfile">
<font-awesome-icon class="userIcon" v-else  icon="circle-user" />
  <label class="camera" @click="updateProfile">
    <font-awesome-icon  icon="camera" />
  </label>
</div>
 <div class="wrapper">
   <div class="name">
        <span>Names:</span>
        <p>{{userInfor}}</p>
        <font-awesome-icon icon="pencil" />
        </div>
      <div class="job-position">
        <span>PhoneNumber</span>
        <p>{{userPhone}}</p>
        <font-awesome-icon icon="pencil" />
        </div>
      <div class="email">
        <span>Email:</span>
        <p>{{userEmail}}</p>
        <font-awesome-icon icon="pencil" />
        </div>
      <div class="vehicle-registration">
        <span>Customer ID:</span>
        <p>{{userId}}</p>
        <p></p>
       </div>
 </div>
 
    </div>
  </div>

</div>
</div>
<div id="profile-pic-update" v-if="profileUpdate">

<div class="top-element">
    <h3 class="top-heading">Update Profile Picture</h3>
    <button @click="closeUpdate" class="times-btn">X</button>

</div>
<div v-if="imageUrl=='' ">
    <div class="btns">
        <button @click="pickFile"><i class="fas fa-plus"></i>Upload Photo</button>
 <input type="file" style="display:none;" @change="onFileSelected" ref="fileInput">
        
    </div>
</div>
<div class="onPicLoad" v-else>

    <img :src="imageUrl">
<div class="manouver-btns">
<button @click="cancelPhoto">Cancel</button>
<button @click="savePhoto">Save</button>    
</div>


</div>

</div>
  </div>
</template>

<script>
import{ app, db, auth, firebaseConfig, user, signOut, collection, onAuthStateChanged, getDocs, getStorage, ref, uploadBytes, getDownloadURL, setDoc, doc,  serverTimestamp, addDoc,updateDoc } from '@/firebase.js'

export default {
data() {
  return {
    profilePic: '',
    image: '',
    imageUrl: '',
    profileUpdate:false,
    name:'',
    profilePic:'',
    currentUserId:'',
    email:'',
    currentUser:'',
    phoneNumber:''
  }
},
methods: {
   homePage:function(){
this.$router.push('/HomePage');
  },
    pickFile:function(){
          if(this.lists= true){
         this.$refs.fileInput.click()   
          }
    
      },
onFileSelected:function(event){
const files = event.target.files;
let filename = files[0].name;
const fileReader = new FileReader();

console.log(files);
fileReader.addEventListener('load', () =>{
  
  this.imageUrl = fileReader.result;
 console.log(this.imageUrl);
  console.log(filename);
 
})
fileReader.readAsDataURL(files[0]);
this.image = files[0];
console.log(this.image);
      },
      cancelPhoto(){
    this.imageUrl = "";
    const picUpdate = document.querySelector('#profile-pic-update');
 picUpdate.classList="";
},
savePhoto:function(){
    const storage = getStorage();
const storageRef = ref(storage, 'images/' + this.image.name);

const metadata = {
  contentType: this.image.type,
  size:this.image.size,
  name:this.image.name,
  type:this.image.type,
};

// Upload the file and metadata
const uploadTask = uploadBytes(storageRef,this.image, metadata).then(()=>{
 getDownloadURL(storageRef).then((url)=>{
     const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send(); 
  
const user = auth.currentUser;
    // setDoc(doc(db, "created-post", user.uid)
   updateDoc(doc(db, "userDetails", user.uid ), { 
  url:url,
       });
      
  })

})
       this.profileUpdate= false;
const app = document.querySelector('#container');
         app.classList="" ;
         this.imageUrl="";

        },
updateProfile:function(){
this.profileUpdate= true;
const app = document.querySelector('#container');
         app.classList="active" 
},
closeUpdate:function(){
    this.profileUpdate= false;
const app = document.querySelector('#container');
         app.classList="" ;
         this.imageUrl="";
},

},

 computed:{
  userInfor(){
     return this.$store.state.userName    
   },
   userId(){
return this.$store.state.userId
   },
   userEmail(){
return this.$store.state.userEmail
   },
   userPhone(){
return this.$store.state.userPhoneNumber
   },
    userProfile(){
return this.$store.state.userProfile
   }
 }
}
</script>

<style scoped>
#settings{
  display: flex;
  flex-direction: column;
  padding: 16px 0;
   background: #f0f2f5;
   height: 100vh;
}
#profile-pic-update{
    background: #fff;
    border-radius: 5px;
    position: fixed;
    z-index: 1;
    top: 5%;
    left: 25%;
    box-shadow: 3px 3px 5px #9d9ea0, 3px 3px 5px #9d9ea0 ;
    width: 50vw;
}
#profile-pic-update.on{
    top: 5%;
}
#container{
    display: flex;
    flex-direction: column;
    width: 50vw;
    position: relative;
    margin:0 auto;
}
#container.active{
  opacity: 0.15;
    pointer-events: none;
    user-select: none;
    transition: 1s;
    position: fixed;
}
.btns{
    display: flex;
    gap: 20px;
    padding: 10px 20px ;
     font-size: 15px;
     justify-content: center;
}
.btns button:first-child{
    border: none;
    color:#1b74E4;
    background: #d7e4f5;
    border-radius: 5px;
    cursor: pointer;
   padding: 10px 20px;
   width: calc(100% - 40%);
   font-weight: 600;
}
.btns button:first-child:hover{
   background: #cfdff3; 
}
.btns button:last-child{
    border: none;
    border-radius: 5px;
    cursor: pointer;
     width: calc(100% - 40%);
     font-weight: 600;
}
.camera{
    position: absolute;
    z-index: 1;
    margin-left: 120px;
    margin-top: 50px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px #c4c5c5,2px 2px #eeeff0;
    cursor: pointer;
}
.times-btn{
    cursor: pointer;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.top-element{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 0.5px solid #e1e1e2;
}
.top-heading{
    margin: 0 auto;
}
.onPicLoad{
    display: flex;
    flex-direction: column;
    padding: 10px 20px ;
}
.onPicLoad input{
   padding: 10px 20px;
   width: calc(100% - 10%);
 margin: 0 auto;
 border-radius: 5px;
border: 0.5px solid #bfc0c2;
}
.onPicLoad input:focus{
outline-color: #1b74E4;
}
.onPicLoad img{
    width: 200px ;
    height: 200px;
    border-radius: 50%;
    margin: auto;
    margin-top: 20px;
}
.onPicLoad p{
    color:#65676b;
}
.manouver-btns{
    display: flex;
    gap: 10px;
    padding: 10px 20px;
    justify-content: flex-end;
    border-top:0.5px solid #e5e6e7 ;
}
.manouver-btns button:first-child{
    border: none;
    background: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    padding: 10px 30px;
}
.manouver-btns button:first-child:hover{
    background: #f6f8fa;
}
.manouver-btns button:last-child{
    border: none;
   color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    background: #1b74E4;
    border-radius: 5px;
    padding: 10px 30px;
}

.wrapper span{
  color: #65676b;
}
.name, .job-position, .email, .vehicle-registration{
display: flex;
gap: 10px;
padding: 10px;
justify-content: space-between;
font-size: 14px;
}
.icon{
  display: inline-flex;
  padding:0px 16px;
}
.admin-details{
  padding: 16px;
}
.profilepic{
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.admin-profile{
  background-color: #fff;
 box-shadow:  3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 padding: 20px 0px;
 margin:0 auto;
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 128px; 
}
.userProfile{
  width:132px;
  height: 132px;
  border-radius: 50%;
  margin: 0 auto;
background-color:#ceced1;
display:flex;
justify-content:center;
align-items: center;
}
.btn button{
 border: none;
 background-color: #216FD8;
 color: #fff;
 padding: 10px 30px;
 border-radius: 5px;
 cursor: pointer;
}
.wrapper{
   padding: 10px 16px;
}
</style>