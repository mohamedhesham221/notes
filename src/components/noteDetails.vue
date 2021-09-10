<template>
  <div class="note-detail" :class="{isVisible : showDetails}">
    <div class="details">
    <button @click="setEvt">Close</button>
    <p class="title">{{ details.titleNote }}</p>
    <p class="content" >{{ details.contentNote }}</p>
    <a class="link" :href="details.linkNote" target="_blank" v-if="details.linkNote.length > 0">
      {{ details.linkNote }}</a>
    <img class="img" :src="details.imgNote" alt="image" v-if="details.imgNote.length > 0">
    </div>
  </div>
</template>
<script>
import Bus from '../main';

export default {
  name: 'note-details',
  data() {
    return {
      showDetails: '',
      details: {
        titleNote: 'empty',
        contentNote: 'empty',
        linkNote: 'empty',
        imgNote: 'empty',
      },
    };
  },
  methods: {
    setEvt() {
      this.showDetails = false;
      Bus.$emit('show-details', this.showDetails);
    },
  },
  created() {
    // eslint-disable-next-line no-return-assign
    Bus.$on('show-details', (el) => this.showDetails = el);
    // eslint-disable-next-line no-return-assign
    Bus.$on('details', (el) => this.details = el);
  },
};
</script>
