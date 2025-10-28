<template>
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect 
      x="0.5" 
      y="0.5" 
      width="55" 
      height="55" 
      rx="27.5" 
      fill="white" 
    />
    <rect 
      x="0.5" 
      y="0.5" 
      width="55" 
      height="55" 
      rx="27.5" 
      :stroke="strokeColor" 
    />
    <path
      d="M38.5017 25.688C38.5033 26.4023 38.3633 27.1097 38.0897 27.7695C37.8161 28.4293 37.4145 29.0282 36.9079 29.5318L28.5361 38.0274C28.4663 38.0983 28.3831 38.1545 28.2914 38.193C28.1996 38.2314 28.1012 38.2511 28.0017 38.2511C27.9022 38.2511 27.8038 38.2314 27.712 38.193C27.6203 38.1545 27.5371 38.0983 27.4673 38.0274L19.0954 29.5318C18.0748 28.5124 17.5009 27.1292 17.5 25.6867C17.4991 24.2441 18.0713 22.8603 19.0908 21.8396C20.1102 20.8189 21.4933 20.245 22.9359 20.2441C24.3784 20.2433 25.7623 20.8155 26.7829 21.8349L28.0017 22.974L29.2289 21.8312C29.9906 21.0733 30.9597 20.558 32.0139 20.3505C33.0682 20.143 34.1603 20.2524 35.1524 20.6651C36.1445 21.0777 36.9921 21.775 37.5882 22.669C38.1843 23.563 38.5022 24.6135 38.5017 25.688Z"
      :fill="iconColor"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  filled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ADB5BD'
  }
});

const iconColor = computed(() => props.color);
const strokeColor = computed(() => props.filled ? props.color : '#E9ECEF');
</script>