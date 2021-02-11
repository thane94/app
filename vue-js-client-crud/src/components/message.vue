<template>

    <p v-if="errors.length">
    <b>Please fill the following fields:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

<div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" v-model="firstName"  placeholder="Enter your name">
  </div>

  <div class="form-group">
    <label for="lastName">Last name</label>
    <input type="text" class="form-control" v-model="lastName" placeholder="Enter your last name">
  </div>

    <div class="form-group">
    <label for="message">Type Your message</label>
    <textarea class="form-control" v-model="message" rows="3"></textarea>
  </div>

  <div class="form-group form-check" v-for="number in numbers" :key="number">
    <input type="checkbox" :value="number.Broj" v-model="checkedNumbers">
    <label class="form-check-label" >{{number.Broj}}</label>
  </div>
    <button type="submit" class="btn btn-primary" v-on:click="alert" @click="checkFields; sendMessage">Send message</button>
</div>
</template>

<script>
  import http from "../http-common.js";
  import userServices from "../services/userServices.js";
  export default {
    data()
    {
      return {
        errors: [],
        firstName: null,
        lastName: null,
        message: null,
        numbers: "",
        checkedNumbers: [],
        success: 'You have submitted form successfully'
      }; 
    },
    methods:
    {
      async sendMessage()
      {
        await http.post("/message", {firstName: this.firstName, lastName: this.lastName, message: this.message, numbers: this.checkedNumbers});
        this.$data.firstName = "",
        this.$data.lastName = "",
        this.$data.checkedNumbers = [],
        this.$data.message = "";

      },

      alert() {
          alert(this.success)
          if(event)
            alert(event.target.tagName)
        },

      retrieveNumbers() {
        userServices.getNumbers().then(response => {
          this.numbers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },

    checkFields() {
      if(this.name && this.age) return true;
      this.errors = [];
      if(!this.name) this.errors.push("Name required.");
      if(!this.age) this.errors.push("Age required.");
    },

    },
    created() {
      this.retrieveNumbers();
    }
  }

</script>