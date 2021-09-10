<template>
  <div id="app">
    <MainNote />
    <NoteDetails />
  </div>
</template>

<script>
import MainNote from './components/mainNote.vue';
import NoteDetails from './components/noteDetails.vue';

export default {
  name: 'App',
  components: {
    MainNote,
    NoteDetails,
  },
};
</script>
