<template>
    <h1>Balance</h1>
    <div v-for="debt in debts" :key="debt.id" class="mb-2">
        <span>{{ debt.attributes.from }} owes: </span>
        
        <span>{{ debt.attributes.to }}</span>
        <span v-if="debt.attributes.amount < 0" class="text-red-500">{{ debt.attributes.amount }}</span>
        <span v-else class="text-green-500">{{ debt.attributes.amount }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            debts: {
                type: Object,
                default: null,
            }
        }
    }
</script>