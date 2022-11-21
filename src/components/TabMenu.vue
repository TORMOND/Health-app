<template>
  <div id="menu"> 
          <ul>
             <li>Home</li>
             <li @click="aboutPage">About</li>
        <li @click="activateMedicationForm">Medication</li>
        <li @click="openAppointment">Appointment</li>
        <li @click="settingsPage">Settings</li>
        <li @click="logout">Logout</li>
            
          </ul>
  </div>
</template>

<script>
export default {
methods: {
  activateMedicationForm:function(){
this.$emit('activateMedicationForm')
  },
  openAppointment:function(){
this.$emit('openAppointment')
  },
  aboutPage:function(){
    this.$emit('aboutPage')
  },

  logout:function(){
    this.$emit('logout')
  },
   settingsPage:function(){
    this.$emit('settingsPage')
  }
},
}
</script>

<style scoped>
.closer{
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
padding: 2px 30px;
}
.cancel{
  font-size: 24px ;
}
#menu li{
  padding: 15px 16px;
  display: flex;
  gap: 10px;
cursor: pointer;
justify-content: center;
}

</style>