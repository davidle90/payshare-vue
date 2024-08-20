<template>
    <div :class="[bgColor, 'py-5', 'text-center']">
        <span class="text-gray-50">Payshare 2024. Developed by David Le</span>
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