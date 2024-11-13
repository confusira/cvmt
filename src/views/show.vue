<template>
    <div>
      <video controls width="500">
        <source :src="receivedData" type="video/mp4" />
      </video>
      <button @click="print">print</button>
    </div>
  </template>
  
<script>
export default {
    props: {
        receivedData: String
    },
};
</script>