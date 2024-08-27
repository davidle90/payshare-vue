<template>
  <div class="text-white">
    <h1 class="text-center">Welcome, {{ userName}}!</h1>
    <div class="mb-5">
      <div>You pay to: </div>
      <div v-for="myDebts in debtsIOwe" :key="myDebts.id">
        <span v-if="myDebts.attributes.amount !== 0">
          {{  myDebts.attributes.to }} : {{  myDebts.attributes.amount }}
        </span>
      </div>
    </div>

    <div class="mb-5">
      <div>They owe you:</div>
      <div v-for="debtsToMe in debtsOwedToMe" :key="debtsToMe.id">
        <span v-if="debtsToMe.attributes.amount !== 0">
         {{  debtsToMe.attributes.from }} : {{  debtsToMe.attributes.amount }}
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
        debtsIOwe: [],
        debtsOwedToMe: [],
      }
    },
    async created() {
      try {
        const response = await getUserData();    
        this.userName = response.data.attributes.name;
        this.debtsIOwe = response.data.includes.debtsIOwe;
        this.debtsOwedToMe = response.data.includes.debtsOwedToMe;
        
      } catch (error) {
        
      }
    }
  }

</script>
