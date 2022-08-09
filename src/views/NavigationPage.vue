<template>
  <div class="HomePage">
     <div id="popup" v-if="popup">
        <div class="medication">
        <div class="top-element">
            <h3 class="top-heading">MEDICATION</h3>
            <button @click="closeMedicationForm" class="times-btn">X</button>
        </div>

         <div class="selections">
              <button @click="orderMedication">Order Medication</button>
              <button @click="activate">Prescription</button>
              <button @click="makeAppointment">Appointment</button>
         </div>
            <div class="medication-form">
            <form class="form">
             <h2>Request Medication</h2>
             <input type="text" placeholder="Medication Name" v-model="medicationName" class="Medication-Name">
            <div class="selection">
                <select name="Medication Type" id="Medication Type" v-model="medicationType" placeholder="Medication Type">
                <option>Medication Type</option>
                <option>Antibiotics</option>
                <option>PainKillers</option>
                <option>Preventive</option>
            </select>
            </div>
        <textarea placeholder="Condition or Symptoms" v-model="symptoms"></textarea>
        <button class="sending" v-if="sending">Sending...</button> 
        <button class="submit" @click.prevent="submitMedicationOrder" v-else>Submit</button>        
            </form>
      
    </div>
     <div class="appointment" >
        <div v-if="appointmentDate == '' ">No Appointment </div>
        <div v-else>
         <p>Hello,{{name}} </p>
             <p>Your have an appointment with:{{doctor}} </p>
             <p>on {{appointmentDate}}</p>    
        </div>
            
           </div>
      
           <div class="prescription">
            <div v-if="prescriptionInfor == '' ">No Prescrition</div>
            <div v-else>
                <p>Hello,{{name}} </p>
            <p>Your current prescription is:</p>
            <p>{{prescriptionInfor}}</p>
            </div>
            
           </div>
           </div>
         
        </div> 

    <div id="container"> 
    <div class="nav-bar">
        <h2>Hospital</h2>
     <ul class="nav-list">
        <li>Home</li>
        <li @click="about">About</li>
        <li @click="activateMedicationForm">Medication</li>
        <li @click="openAppointment">Appointment</li>
        <li @click="settings">Settings</li>
        <li @click="signOut">Logout</li>
     </ul>
     <h6>{{name}}</h6>
     <div class="userProfile">
<img :src="profilePic" alt="profile-pic" class="profilepic" v-if="profilePic=this.profilePic">
<font-awesome-icon class="userIcon" v-else  icon="circle-user" />
     </div>
    </div>
    <div class="carousel">
  <carousel :slides="slides" :interval="10000" controls indicators></carousel>
    </div>
    <div class="services">
       <div class="service-action">
     <div class="guidance">
      <font-awesome-icon icon=" fa-hand-holding-medical" class="service-icons" />
      <div class="infor">
        <p>Guidance & Counselling</p>
        <span>+254 720080060</span>
      </div>
        
        </div>
     <div class="Ambulance">
        <font-awesome-icon icon=" fa-truck-medical" class="service-icons" />
        <div class="infor">
            <p> Ambulance</p>
            <span>+254 720080060</span>
        </div>
       
        </div>
     <div class="medicine">
        <font-awesome-icon icon=" fa-tablets" class="service-icons" />
        <div class="infor">
            <p>Medicine</p>
            <span>+254 720080060</span>
        </div>
        
        </div>
     <div class="dentist">
        <font-awesome-icon icon=" fa-tooth" class="service-icons" />
        <div class="infor">
            <p> Dentist</p>
            <span>+254 720080060</span>
        </div>
       
        </div>
        <div class="first-aid">
            <font-awesome-icon icon=" fa-suitcase-medical" class="service-icons" />
            <div class="infor">
                <p> First Aid</p>
                <span>+254 720080060</span>
            </div>
           
        </div>
       </div>
    </div>
    <div class="doctors">
   <h2 >OUR DOCTORS</h2>
      <div class="staff">
        <div class="doctor">
            <img src="doctor1.jpg" class="doctor-image">
            <div class="doctor-details">
                <h4 class="name">Dr Emmaculate</h4>
                <span class="role">Pedeatrician</span>
            </div>
        </div>
        <div class="doctor">
            <img src="doctor2.jpg" class="doctor-image">
            <div class="doctor-details">
                <h4 class="name">Dr John </h4>
                <span class="role">Dentist</span>
            </div>
        </div>
<div class="doctor">
            <img src="doctor3.jpg" class="doctor-image">
            <div class="doctor-details">
                <h4 class="name">Dr Jasmine</h4>
                <span class="role">Dentist</span>
            </div>
        </div>

        <div class="doctor">
            <img src="doctor4.jpg" class="doctor-image">
            <div class="doctor-details">
                <h4 class="name">Dr Sally</h4>
                <span class="role">Dentist</span>
            </div>
        </div>

        <div class="doctor">
            <img src="doctor5.jpeg" class="doctor-image">
            <div class="doctor-details">
                <h4 class="name">Dr Lucy</h4>
                <span class="role">Surgeon</span>
            </div>
        </div>


      </div>
    </div>
    <div class="more-infor">
    <div class="service-infor">
          <h2>SERVICES <font-awesome-icon icon=" fa-list-check" /></h2>
      <ul class="services-list">
        <li><font-awesome-icon icon="fa-check-to-slot" />Ambulance Care</li>
        <li><font-awesome-icon icon=" fa-check-to-slot" />Alergy & Immunology</li>
        <li><font-awesome-icon icon="fa-check-to-slot" />Cancer test & Treatment</li>
        <li><font-awesome-icon icon="fa-check-to-slot" /> Dentistry & Oral Surgery</li>
        <li><font-awesome-icon icon="fa-check-to-slot" /> Diabetes</li>
        <li><font-awesome-icon icon="fa-check-to-slot" />Emergency Services</li>
        <li><font-awesome-icon icon="fa-check-to-slot" />Heart - Cardiology</li>
        <li><font-awesome-icon icon="fa-check-to-slot" /> Infectious Diseases</li>
        <li><font-awesome-icon icon="fa-check-to-slot" />Surgery</li>
        <li><font-awesome-icon icon=" fa-check-to-slot" />Dermatology</li>
      
       <button class="btn">
        View more <font-awesome-icon icon=" fa-arrow-right" />
      </button>
      </ul>
     
    </div>
    <div class="consultation-form">
            <form action="">
             <h2>CONSULTATION</h2>
             <div class="names-input">
               <input type="text" placeholder="Name*">
              <input type="text" placeholder="Last Name*">  
             </div>
            <div class="user-details">
                <input type="number" placeholder="Phone">
                <input type="email" placeholder="Email">
            </div>
            <div class="selection">
                <select name="Select Department" id="" >
                <option>Select Department</option>
            </select>
            </div>
            
        <textarea placeholder="condition" v-model="condition"></textarea>
         <button class="sending" v-if="sending">Sending...</button> 
        <button class="submit" @click.prevent="submit" v-else>Submit</button>       
        
            </form>
    </div>
    </div>
    <About />

    <div class="footer">
        <p>@copyright : This project is owned by  KIPROTICH BETT</p>
    </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import About from './About.vue';
import{ app, db, auth, user, setDoc, doc, collection, onAuthStateChanged, query, where,  onSnapshot, serverTimestamp, signOut  } from '@/firebase.js'

export default {
 components: {
    Carousel, About
  },
  data() {
    return {
        slides: [ 'health-care.jpg','images6.png','healthcare-service.jpg'],
        profilePic: '',
        services: ['Ambulance Care', 'Alergy & Immunology', 'Cancer Test & Treatment', 'Dentistry'],
        condition:'',
        name: '',
        currentUserId:'',
        email:'',
        medicationName:'',
        medicationType:'',
        symptoms:'',
        popup:false,
        appoinmentInfor: '',
        prescription:'',
        doctor:'',
        appointmentDate:'',
        prescriptionInfor:'',
        sending: false
    }
  },
  methods: {
   activate:function(){
      const form = document.querySelector('.medication-form');
      form.style.display = "none"
      const prescription = document.querySelector('.prescription')
      prescription.style.display = "block"
      const appointment = document.querySelector('.appointment')
      appointment.style.display = "none"
   },
orderMedication:function(){
      const form = document.querySelector('.medication-form');
      form.style.display = "block"
      const prescription = document.querySelector('.prescription')
      prescription.style.display = "none"
      const appointment = document.querySelector('.appointment')
      appointment.style.display = "none"
   },
    makeAppointment:function(){
      const form = document.querySelector('.medication-form');
      form.style.display = "none"
      const prescription = document.querySelector('.prescription')
      prescription.style.display = "none"
      const appointment = document.querySelector('.appointment')
      appointment.style.display = "block"    
},
    closeMedicationForm:function(){
       this.popup = false
       const container = document.querySelector('#container')
       container.classList = ""
    },
    openAppointment:function(){
      this.popup = true
      const container = document.querySelector('#container')
      container.classList = "active"
      const form = document.querySelector('.medication-form');
      form.style.display = "none"
      const prescription = document.querySelector('.prescription')
      prescription.style.display = "none"
      const appointment = document.querySelector('.appointment')
      appointment.style.display = "block"

const userRef = collection(db, 'created-request');
const q = query(userRef, where("id", "==", this.currentUserId));
onSnapshot(q, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
          this.appointmentDate = doc.data().Appointment;
          this.doctor = doc.data().doctor;
          console.log(doc.data())
          console.log(this.appointmentDate)
    })
})
    },
    activateMedicationForm:function(){
       this.popup = true
       const container = document.querySelector('#container')
       container.classList = "active"
    },
    submitMedicationOrder:function(){
        this.sending = true
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
       this.sending = false
    },
    about:function(){
this.$router.push('/About')
    },
     settings:function(){
this.$router.push('/Settings')
    },
    submit:function(){
         this.sending = true
      setDoc(doc(db, "created-request", this.currentUserId), {
      name: this.name,
      email:this.email,
      phoneNumber:this.phoneNumber,
      id:this.currentUserId,  
      createdAt:serverTimestamp(),
      message:this.condition
    });
    this.sending = false
    this.name = ''
    this.condition = ''
    this.phoneNumber = ''

    },
    signOut:function(){
 signOut(auth).then(() => {
    this.$router.push('/')
  }).catch((error) => {
    console.log("An error occured while signing out:"+ error)
  });
},
fetchData:function(){
onAuthStateChanged(auth, (user) => {
  if (user) {
let currentUser = auth.currentUser
const userRef = collection(db, 'userDetails');
const q = query(userRef, where("email", "==", currentUser.email));
onSnapshot(q, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
          this.name = doc.data().name;
          this.profilePic = doc.data().url;      
          this.currentUserId = doc.data().id;  
          this.phoneNumber =doc.data().phoneNumber
          this.email = doc.data().email
    })
    var personName =  this.$store.state.userName = this.name
    var personId =  this.$store.state.userId = this.currentUserId
    var personPhone =  this.$store.state.userPhoneNumber = this.phoneNumber
    var personEmail =  this.$store.state.userEmail = this.email
    var profilePic = this.$store.state.userProfile = this.profilePic
    this.$store.commit('update', personName, personId, personPhone, personEmail, profilePic)
})
 } else {
   console.log("no user");
  }
});

},
  },
  //Mount
   beforeMount(){
    this.fetchData();

 },
}
</script>

<style scoped>
#container.active{
    opacity: 0.1;
    pointer-events: none;
    user-select: none;
    transition: 1s;
}
#popup{
    background-color: rgba(0, 0, 0, 0.5);
     position:fixed;
     height:100%;
     width:100vw;
     z-index:3;
     display:flex;
}
.selections{
  display:flex;
  gap:30px;
  top:0;
  padding: 5px 10px;
  justify-content: center;
}
.appointment{
    display:none;
   background-color: rgb(2, 2, 36);
   color:#fff;
   margin:auto;
   padding:10px;
   border-radius:5px;
}
.prescription{
    display:none;
    background-color: rgb(2, 2, 36);
   color:#fff;
   margin:auto;
   padding:10px;
   border-radius:5px;
}
.selections button{
  border:none;
  border-radius:10px;
  color:blue;
  background-color:rgb(164, 164, 196);
  padding:10px 20px;
  cursor:pointer;
}
.nav-bar{
    display:flex;
    padding:10px 24px;
    justify-content:space-between;
    align-items:center;
}
.nav-list{
    display:flex;
    gap:40px;
}
.nav-list li{
    list-style:none;
    cursor:pointer;
    font-weight:600;
}
.nav-list li:hover{
    color:aqua;
    transition:0.8s;
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 32px; 
}
.profilepic{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.userProfile{
  width:55px;
  height: 55px;
  border-radius: 50%;
  background-color:#ceced1;
  display:flex;
  justify-content:center;
  align-items: center;
}
.staff{
    display: flex;
    gap:20px;
     padding:10px 0;
}
.doctors{
    background-color:rgb(7, 7, 78);
    padding:80px 10px 10px 10px;
}
.doctors h2{
    color:#fff;
}
.doctor{
    display:flex;
    flex-direction:column;
    margin:0 auto;
    background-color: #fff;
    border-radius: 5px;
    overflow:hidden;
    width:15%;
}
.doctor-image{
    width:100%;
    height: 100px;
    object-fit:cover;
}
.doctor-details{
    padding:10px;
}
.service-action{
    margin-top:-60px;
    margin-left:13%;
    display: flex;
    position:absolute;
    z-index:1;
    background-color:#fff;
}
.service-icons{
    color:aqua;
    font-size:32px;
}
.guidance, .Ambulance, .medicine, .dentist, .first-aid {
    display:flex;
    flex-direction: column;
    width: 200px;
    height: 120px;
    border-left: 0.5px solid #ceced1;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    gap:20px
}
.infor span{
font-size: 12px;
color:rgb(143, 142, 142);
}
.infor span:hover{
    transition-duration: 1s;
    text-decoration:underline;
    color:rgb(77, 77, 219);
}
.more-infor{
    display:flex;
    gap:20px;
    justify-content: center;
    padding:16px 24px;
}
.services-list{
    display:inline-flex;
    flex-direction:column;
}
.services-list li{
    list-style:none;
    display:inline-flex;
    padding:10px;
}
.btn{
    padding: 10px;
    width:150px;
    cursor:pointer;
}
.consultation-form{
    background-color:blue;
    border-radius:5px;
    padding:10px;
    color:#fff;
    position:sticky;
}
.medication{
    background-color:#ceced1;
    width:60vw;
    height:70vh;
    padding:24px;
    margin:auto;
    display:flex;
    flex-direction: column;
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
.times-btn{
    cursor: pointer;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.medication-form{
    background-color:#fff;
    border-radius:5px;
    padding:10px;
    position:sticky;
     margin:auto;
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
.consultation-form  input{
    background-color:rgb(129, 129, 185);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
    color:#fff;
}
.names-input, .user-details{
    display:flex;
    gap:10px;
    padding:10px 0;
}
.consultation-form select{
    background-color:rgb(92, 92, 177);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
    color:#fff;
    width:98.8% ;
    margin:10px 0;
}
.consultation-form textarea{
    background-color:rgb(92, 92, 177);
    padding: 10px 16px;
    border-radius: 5px;
    border:none;
    color:#fff;
    width:90% ;
    height:80px;
    outline:none;
}
textarea:focus{
    outline-color: none;
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
.sending{
    cursor:pointer;
    border:none;
    padding:16px;
    margin-top:20px;
    width:60%;
    border-radius: 5px;
    color:#fff;
    background-color:rgb(58, 58, 134);
}
.footer{
    color:#fff;
    background-color:rgb(4, 4, 48);
    padding:16px;
}
</style>