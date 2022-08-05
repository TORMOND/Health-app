<template>
  <div id="homePage">

    <div id="modal" v-if="modal" >
    <div class="create">
        <h2> New staff</h2>
      <button @click="closeModal">X</button> 
    </div>
     
 <div class="text">
 <input placeholder="staff's Name" v-model="remarks" class="staff-input">
  <input placeholder="Staff Department" v-model="charges" class="price-input">
  <input type="number" v-model="phone" placeholder="Phone Number" class="price-input">
  </div>
  <div class="include">

      <div class="outline" style="overflow-y:auto" @click="pickFile">
          
<i class="fas fa-plus-square"></i>

<input type="file" style="display:none;" @change="onFileSelected" ref="fileInput">
<img :src="imageUrl"  style="overflow-y:auto">

<h3>Add photo</h3>

</div>

  </div>
  <div class="segment-2">

  <div class="enter">
      <button @click="upload">Post</button>
  </div>
</div>
</div>

 <div class="menu" @click="toggleMenu" >
      <div class="tab" >
          <ul>
             <li @click="openModal">
               <p v-if="lists" >Add New staff</p>
                <font-awesome-icon class="icons" icon="circle-plus" />
                </li>
             <li>
               <p v-if="lists" >Reports</p>
               </li>
             <li>
               <p v-if="lists" >Admins</p>
               </li>
             <li>
               <p v-if="lists" >Settings</p>
               <font-awesome-icon class="icons" icon="gear" />
               </li>
             <li>
               <p v-show="lists" >LogOut</p>
           <font-awesome-icon class="icons" icon="right-from-bracket" />
           </li>
          </ul>
         
    </div>

  </div>

  <div id="main-page"  @click="untoggle">
   
    <div class="top-section">
<nav class="nav-bar">
    <div class="wrap"></div>

 <div class="userProfile">
<img :src="profilePic" alt="profile-pic" class="profilepic" v-if="profilePic=this.profilePic">
<font-awesome-icon class="userIcon" v-else  icon="circle-user" />
</div>

</nav>

<div class="search-bar">
  <select class="staff-selector" >
<option>All staffs</option>
 <option v-for="staff in staffs" :key="staff">{{staff}}</option>
</select>

  <input type="text" placeholder="Search Customer" class="search-input">
  <button>
    <font-awesome-icon icon="magnifying-glass" />
  </button>
  
</div>
</div>
<div id="main-section">

<div class="staff-details">
  <div class="selections">
<button @click="appointments">Appointements</button>
<button @click="medicationOrders">Medication</button>
<button @click="allDoctors">Doctors</button>

  </div>
  <h2>{{heading}}</h2>
<div class="slot-titles">
  <h3>{{person}} ID</h3> 
  <h3>Name</h3>
  <h3>Phone</h3>
</div>
   
<div v-if="requestedAppointments">
  <div v-for="request in createdRequests" :key="request.id"  >
  
<div v-if="condition !== null" class="paid-slots" @click="selectUser(request.id)">
      <p>{{request.id}}</p>
      <p>{{request.name}}</p>
      <p>{{request.phoneNumber}}</p>
       <font-awesome-icon class="icons" icon="horizontal-elipsis " /> 
    </div>
</div>
</div>

<div v-if="requestedMedication">
<div v-for="medicine in medication" :key="medicine.id"  >
<div v-if="medicine !== null" class="paid-slots" @click="selectUser(medicine.id)">
      <p>{{medicine.id}}</p>
      <p>{{medicine.name}}</p>
      <p>{{medicine.phoneNumber}}</p>
       <font-awesome-icon class="icons" icon="horizontal-elipsis " /> 
    </div>
    </div>

</div>

<div v-if="requestedDoctors">
 <div v-for="doctor in doctors" :key="doctor.id" >

<div v-if="doctor !== null" class="paid-slots" @click="selectUser(doctor.id)">
      <p>{{doctor.id}}</p>
      <p>Dr {{doctor.name}}</p>
      <p>{{doctor.phoneNumber}}</p>
       <font-awesome-icon class="icons" icon="horizontal-elipsis " /> 
    </div>
    </div>
</div>
   

</div>

<div class="admin-details">
<!-- <div class="image"></div> -->
  
  <div class="admin-profile" v-if="selectedToOpen">
    <div class="admin-image" >
<img :src="profilePic" alt="profile-pic" class="profilepic-two" v-if="profilePic=this.profilePic">
<font-awesome-icon class="userIcon-two" v-else  icon="circle-user" />

       <p>Name : {{setName}}</p>
       <p>Email: {{setEmail}}</p>
       <!-- <p>Phone Number: {{user.phoneNumber}}</p> -->
       <p>Condition: {{setCondition}}</p>
       <!-- <p>Syptoms: {{user.setSymptoms}}</p> -->
       <p>medication-request: {{setMedication}}</p>
       <p>Prescription: {{setPrescription}}</p>

       <div class="selections-two">
<button @click="prescribe">Give Prescription</button>
<button @click="giveAppointment">Give Appointment</button>
  </div>

  <div class="medication-form" v-if="activity">
            <form class="form">
             <h2>{{activityHeading}}</h2>
             <input type="text" placeholder="Doctor's Name" v-model="doctorsName" class="Medication-Name">
             <input type="datetime-local" v-model="allocatedDate" v-if="activityHeading !== 'Prescription'  ">
            <div class="selection" v-if="activityHeading == 'Prescription'  " >
                <select name="Medication Type" id="Medication Type" v-model="medicationType" placeholder="Medication Type">
                <option>Medication Type</option>
                <option>Antibiotics</option>
                <option>PainKillers</option>
                <option>Preventive</option>
            </select>
            </div>
        <textarea placeholder="Prescription" v-model="Prescription"   v-if="activityHeading == 'Prescription'  "></textarea>
        <button class="submit" @click.prevent="submitOrder">Submit</button>        
            </form>
      
    </div>

   </div>
  </div>

</div>


</div>
</div>
 
  </div>
</template>


<script>
import{ app, db, auth, firebaseConfig, user, signOut, collection, onAuthStateChanged, getDocs, getStorage, ref, uploadBytes, getDownloadURL, setDoc, doc,  updateDoc ,  serverTimestamp, addDoc, query, where, orderBy, onSnapshot } from '@/firebase.js'

export default {
    data() {
        return {
          modal:false,
          imageUrl:'',
          image:'',
          listOne:false,
          remarks:'',
          lists:true,
          charges: '',
          num:'',
          profilePic: '',
          staffs: ['Doctors', 'Surgeons','Nurses','Pedeatricians', 'Dentists','Psycologists'],
          createdRequests: {},
          medication:{},
          doctors:{},
          requestedAppointments: true,
          requestedMedication: false,
          requestedDoctors: false,
          heading: 'Requested Appointments',
          person: 'Customer',
          phone: '',
          setUser:{}, 
          state: 'created-request',
          selectedToOpen: false,
          setName: '',
          setEmail:'',
          setPrescription:'',
          setMedication:'',
          setCondition:'',
          activityHeading:'Prescription',
          activity:false,
          allocatedDate: '',
          selectedUser: '',
          prescription:'',
          doctorsName:''
        }
    },
    methods: {
      submitOrder:function(){
          if(this.activityHeading == 'Prescription'){
          const washingtonRef = doc(db, "medication-request", this.selectedUser)
          updateDoc(washingtonRef, {
          prescription: this.prescription,
          doctor:this.doctorsName
           });
          }else{
          const washingtonRef = doc(db, "created-request", this.selectedUser)
          updateDoc(washingtonRef, {
          Appointment: this.allocatedDate,
          doctor:this.doctorsName
           });
          }
      },
       prescribe:function(){
       this.activity = true
       this.activityHeading ='Prescription'
    },
    giveAppointment:function(){
      this.activity = true
      this.activityHeading ='Appointment'
    },
     closeMedicationForm:function(){
       this.popup = false
       const container = document.querySelector('#main-page')
       container.classList = ""
    },
    submitMedicationOrder:function(){
      setDoc(doc(db, "medication-request", this.currentUserId), {
      name: this.name,
      email:this.email,
      phoneNumber:this.phoneNumber,
      id:this.currentUserId,  
      medicationName:this.medicationName,
      medicationType:this.medicationType,
      createdAt:serverTimestamp(),
      message:this.symptoms
    });
    },
      appointments:function(){
         this.requestedAppointments = true
         this.requestedDoctors =false
         this.requestedMedication = false
         this.heading ='Requested Appointments'
         this.person = "Customer"
         this.state = 'created-request'
         this.selectedToOpen = false
      },
     allDoctors:function(){
    this.requestedDoctors =true
    this.requestedMedication = false
    this.requestedAppointments = false
    this.heading ='Available Doctors'
    this.person = "Doctor's "
    this.state = 'Staff'
    this.selectedToOpen = false

  const doctor = collection(db, 'Staff')
const d = query(doctor, orderBy('createdAt', 'desc'))
onSnapshot(d, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{    
 this.doctors[doc.id] = {...doc.data(), id:doc.id}
 console.log(this.doctors)
    })  
})
      },
  medicationOrders:function(){
    this.requestedMedication = true
    this.requestedAppointments = false
    this.requestedDoctors =false
    this.heading ='Medication Requests'
    this.person = "Customer"
    this.state = 'medication-request'
    this.selectedToOpen = false

    const meds = collection(db, 'medication-request')
    const i = query(meds, orderBy('createdAt', 'desc'))
  onSnapshot(i, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
 this.medication[doc.id] = {...doc.data(), id:doc.id}
 console.log(this.medication)
    })  
})
      },
    fetchRequestedAppointments:function(){
const infor = collection(db, 'created-request')
const requests = query(infor, orderBy('createdAt', 'desc'))
onSnapshot(requests, (snapshot)=>{
    
    snapshot.docs.forEach((doc)=>{
 this.createdRequests[doc.id] = {...doc.data(), id:doc.id}
 console.log(this.createdRequests)
    })  
})
      },
      toggleMenu:function(){
        this.lists =true;
const menu = document.querySelector('.menu');
menu.style.left = "170px";
menu.style.transition = "2s";
      },
       untoggle:function(){   
const menu = document.querySelector('.menu');
menu.style.left = "-10px";
      },
      openModal:function(){
          this.modal=true
           const app = document.querySelector('#main-page')
         app.classList="active"   
      },
      closeModal:function(){
          this.modal= false
     const app = document.querySelector('#main-page')
         app.classList=""   
         this.videoUrl=null
         this.imageUrl= null
      },
    pickFile:function(){
          if(this.lists === true){
         this.$refs.fileInput.click()   
          } 
      },
    onFileSelected:function(event){
            console.log("file selected");
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
      upload:function(){
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
    //  console.log(url)
     const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send(); 
  
const user = auth.currentUser;

const colRef = collection(db,'Staff');
 
 addDoc(colRef, { 
    staffName:this.remarks,
    staffId:id,
     url:url,
     phoneNumber:this.phone,
    createdAt:serverTimestamp(),
    });
      
  })

})
this.modal=false
this.imageUrl = ''
this.image = ''
this.remarks = ''
           const app = document.querySelector('#main-page');
         app.classList="";   
},
selectUser:function(id){
this.user = {}
this.selectedUser = id
this.selectedToOpen = true
const userRef = collection(db, this.state);
const q = query(userRef, where("id", "==", id));
onSnapshot(q, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
          this.setUser[doc.id] = {...doc.data(), id:doc.id}
          this.setName= doc.data().name,
          this.setEmail= doc.data().email,
          this.setPrescription= doc.data().prescription,
          this.setMedication= doc.data().medicationName,
          this.setCondition= doc.data().message

          console.log(this.setUser)
    })
    
})
},

    },
    beforeMount(){
    this.fetchRequestedAppointments();
 },
}
</script>
<style scoped>

.medication{
    background-color:#151580;
    width:40vw;
    height:70vh;
    padding:24px;
    display:inline-flex;
    flex-direction: column;
}
.top-element{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 0.5px solid #e1e1e2;
}
.submit{
    cursor:pointer;
    border:none;
    padding:16px;
    margin-top:20px;
    width:60%;
    border-radius: 5px;
    color:#fff;
    background-color:rgb(4, 4, 48);
}
.top-heading{
    margin: 0 auto;
}
.times-btn{
    cursor: pointer;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.medication-form{
    background-color:rgb(41, 32, 173);
    border-radius:5px;
    padding:10px;
    width:60%;
}
.medication-form  input{
    background-color:rgb(229, 229, 240);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
     width:90% ;
     margin-top:15px;
}
.medication-form select{
    background-color:rgb(229, 229, 240);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
    width:98.8% ;
    margin:10px 0;
}
.medication-form textarea{
    background-color:rgb(229, 229, 240);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
    width:90% ;
    height:80px;
    outline:none;
}
form{
    margin-top:20px;
}
.lot{
    width: 500px;
    height: 500px;
}
#homePage{
  background: #f0e5ef;
  width: 100%;
  min-height:100vh;
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 28px; 
}
.userIcon-two{
  color: rgb(160, 158, 158);
   font-size: 128px; 
}
.menu{
  display: none;
}
.tab li{
  padding: 15px 16px;
  cursor: pointer;
}
.top-section{
 background: linear-gradient(-135deg, #f0e5ef, #3e56cc); 
}
.nav-bar{
display: flex;
justify-content: space-between;
padding:10px;
}
.profilepic{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.search-bar button{
  background: linear-gradient(-135deg, #7d2ce7, #6f6f72); 
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
input{
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
}
.payment-section{
  background: #ebe5f0;
  padding: 20px;
}
.staff-details{
  padding: 10px 5px ;
  /* background-color: rgb(235, 231, 231); */
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.paid-slots{
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #ceced1, 3px 3px 3px #ceced1;
  cursor: pointer;
  margin-top:10px;
}
.slot-titles{
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.staff-details span{
  font-size: 10px;
  color: #747177;
}
.staff-details p{
  font-weight: 700;
  font-size: 11px;
  border-radius: 5px;
}
.search-map{
  margin: 10px 0;
}
.search-map button{
  padding: 10px 100px;
  border-radius: 5px;
  border: 0.5px solid black;
  cursor:pointer;
}
.price-details{
  padding: 10px ;
  background-color: #fff;
  display: flex;
  justify-content:space-between;
  gap: 10px;
}
.price-details span{
  font-size: 12px;
  color: #747177;
}
.price-details p{
  font-weight: 700;
  font-size: 14px;
  border-radius: 5px;
}
.pay{
  margin-top: 15px;
  padding: 10px 80px;
  border-radius: 5px;
  border: none;
  background: rgb(7, 0, 12);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor:pointer;
}
.userProfile{
  width:32px;
  height: 32px;
  border-radius: 50%;
background-color:#ceced1;
display:flex;
justify-content:center;
align-items: center;
}
.admin-details{
  border-top: 0.5px solid grey;
  padding: 16px;
  display: none;
  /* background-color:#fff; */
}
.admin-image{
  display: flex;
  flex-direction:column;
  padding:10px;
}
.admin-image p{
  display:inline-flex;
  padding:10px;
}

.image{
background: url(/images-1.jpg)no-repeat center;
    height: 80vh;
    background-size: contain;
}
.staff-details h2{
  display:inline-flex;
   background: linear-gradient(-135deg, #c512b9, #4158d0); 
   -webkit-background-clip: text;
   -webkit-text-fill-color:transparent ;
} 
.selections{
  display:flex;
  gap:30px;
  top:0;
  position:sticky;
  padding: 5px 10px;
}
.selections-two{
   display:flex;
  gap:10px;
  padding: 5px 10px;
}
.selections-two button{
   border:none;
  border-radius:10px;
  color:blue;
  background-color:rgb(164, 164, 196);
  padding:10px 20px;
  cursor:pointer;
}
.selections button{
  border:none;
  border-radius:10px;
  color:blue;
  background-color:rgb(164, 164, 196);
  padding:10px 20px;
  cursor:pointer;
}
@media all and (min-width:500px){
    #homePage{
        position: relative;
    }
    #main-page.active{
    opacity: 0.15;
    pointer-events: none;
    user-select: none;
    transition: 1s;
    }
   .staff-details span{
  font-size: 12px;
  color: #747177;
}
.staff-details p{
  font-weight: 700;
  font-size: 14px;
  border-radius: 5px;
} 
.menu{
transition: 2s;
position: absolute;
background: #010620;
color: #f0e5ef;
height: 100%;
width: 250px;
margin-left: -180px;
display: block;
z-index: 1;
}
.tab li{
  display: flex;
  gap: 10px;
  transition: 2s;
  padding: 10px 10px;
}

.tab{
position:fixed;
background: #010620;
color: #f0e5ef;
height:100vh;
padding-top: 24px;
width:inherit;
}
.tab ul{
  height:100vh;
  display: flex;
flex-direction: column;
gap: 50px;
}
.tab p{
  width: 80%;
}
  .top-section{
 background: linear-gradient(-135deg, #7d2ce7, #010620); 
}
.input{
    margin: 0 auto;
  }
#main-section{
  display: grid;
  grid-auto-flow: column;
}
.admin-details{
   border: none;
   display: block;
}
.staff-selector{
  margin-right:20px ;
  padding:5px 10px;
  color:black;
  cursor: pointer;
}
.search-input{
  margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:500px;
}
.price-input{
 margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:90%;
}
.staff-details{
    padding-left: 80px;
}
.icons{
  font-size: 24px;
  cursor: pointer;
}
.admin-profile{
  background-color: #fff;
 box-shadow:  3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 padding: 20px 0px;
 
}
.btn button{
 border: none;
 background-color: #216FD8;
 color: #fff;
 padding: 10px 30px;
 border-radius: 5px;
 cursor: pointer;
}
#modal{
    position:fixed;
    background: #fff;
    top: 3%;
    left:35%;
    border-radius: 10px;
    padding: 16px;
    z-index: 1;
    box-shadow: 3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
    width: 29vw;
}
.staff-input{
  margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:90%;
}
.create{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
}
.create button{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border:none;
}
.text{
    padding:8px 16px 0;
}
.outline{
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    max-height: 300px;
    min-height: 200px;
    padding: 10px;
    cursor: pointer;
}
.outline:hover{
    background: #e4e6eb;
}
.outline button{
    width: 36px;
    height: 36px;
    background: #fff;
    border:0.5px solid #ceced1;
    border-radius: 50%; 
}
.include{
    border: 1px solid #65676b;
    border-radius: 10px;
    padding: 8px ;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.enter{
    padding: 16px 16px 0;
}
.enter button{
   background: #216FD8; 
   color: #fff;
   border-radius: 10px;
   width:calc(100% - 16px);
   display: flex;
   align-items: center;
   padding: 0 12px;
   justify-content: center;
   border: none;
   height: 36px;
   cursor:pointer;
}
.name{
  font-size: 16px;
  font-weight: 600;
}
.email{
  font-size: 12px;
  color: #65676b;
}
}

</style>