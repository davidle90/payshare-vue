<template>
    <div :class="[bgColor, 'py-5', 'text-white']">
        <navbar />
    </div>
</template>

<script setup>
    defineProps({
        bgColor: {
            type: String,
            default: 'bg-gray-800'
        }
    });
</script>