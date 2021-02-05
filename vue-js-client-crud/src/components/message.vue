<template>

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
    <input type="checkbox" :value="number" v-model="checkedNumbers">
    <label class="form-check-label" >{{number}}</label>
  </div>
  <button type="submit" class="btn btn-primary" @click="sendMessage">Send message</button>
</div>
</template>

<script>
  import http from "../http-common.js";
  import userServices from "../services/userServices.js";
  export default {
    data()
    {
      return {
        firstName: null,
        lastName: null,
        message: null,
        numbers: "",
        checkedNumbers: [],
      }; 
    },
    methods:
    {
      async sendMessage()
      {
        await http.post("/message", {firstName: this.firstName, lastName: this.lastName, message: this.message, numbers: this.checkedNumbers});
      },

      retrieveNumbers() {
        userServices.getNumbers().then(response => {
          this.numbers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }

    },
    created() {
      this.retrieveNumbers();
    }
  }

</script>