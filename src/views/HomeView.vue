<template>
  <div class="text-white">
    <h1 class="text-center">Welcome, {{ userName}}!</h1>
    <div class="mb-5">
      <div>Balance: </div>
      <div v-for="myDebts in debts" :key="myDebts.id">
        <div v-if="myDebts.attributes.amount !== 0">
          {{  myDebts.attributes.to }} owes you <span class="text-green-600">{{  myDebts.attributes.amount }}</span> Group: {{  myDebts.attributes.group }}
        </div>
      </div>
    </div>

    <div class="mb-5">
      <div>They owe you:</div>
      <div v-for="debtsToMe in debtsOwedToMe" :key="debtsToMe.id">
        <span v-if="debtsToMe.attributes.amount !== 0">
         {{  debtsToMe.attributes.from }} owes you <span class="text-green-600">{{  debtsToMe.attributes.amount }}</span> Group: {{  debtsToMe.attributes.group }}
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  import { getUserData } from '@/api/payshare-api';

  export default {
    data() {
      return {
        userName: [],
        debts: [],
        // debtsOwedToMe: [],
      }
    },
    async created() {
      try {
        const response = await getUserData();    
        this.userName = response.data.attributes.name;
        this.debts = response.data.includes.debtsIOwe;
        this.debtsOwedToMe = response.data.includes.debtsOwedToMe;

        
        // total per user;

        
      } catch (error) {
        
      }
    }
  }

</script>
