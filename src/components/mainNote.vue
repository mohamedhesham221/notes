<template>
  <div class="note">
    <img src="../assets/logo.png" alt="logo" class="logo"/>

      <form class="form" @submit.prevent="addNote" v-if="showForm">
        <span class="thumbtack" @click="madePinned" :class="{isPinned : pinned}">
          <font-awesome-icon :icon="['fas', 'thumbtack']" class="pinned-icon"/>
          </span>
        <label for="title">Title</label>
          <input type="text" name="title" class="title" placeholder="Note's title" v-model="title">
        <label for="content">Content</label>
          <textarea placeholder="Note's content . . ." class="content" cols="15" rows="5"
          v-model="content"></textarea>
        <label for="link"><font-awesome-icon :icon="['fas', 'link']"/></label>
          <input type="text" class="link" v-model="link" placeholder="example:http://www.google.com">
            <br>
        <label for="image"><font-awesome-icon :icon="['fas', 'file-image']"/>
        <span class="img-src">{{ !img? "no image chosen": img }}</span>
        </label>
          <input type="file" @change="previewImg" accept="image/*" name="image" id="image">
        <input type="submit" class="submit" value="Create">
      </form>
      <form class="form" v-else @click="showForm = true">
        <input type="text" placeholder="Type a note" class="input-interface">
      </form>
      <div class="notes">
        <p class="note-head" v-if="notes.length > 0">Pinned</p>
                <div class="notes-container">
          <div class="notes-item"
            v-for="(note, index) in notes.filter((x) => x.pinnedNote)"
            :key="index">
            <div class="expand" @click="setEvt(); openData(note)">
              <font-awesome-icon :icon="['fas', 'expand']"/>
            </div>
                <div class="icons">
                  <span :class="{isPinned : note.pinnedNote}">
                <font-awesome-icon :icon="['fas', 'thumbtack']"
                      @click="note.pinnedNote = !note.pinnedNote; saveNotes();"/>
                  </span>
                <font-awesome-icon :icon="['fas', 'trash-alt']"
                      @click="note.deletedNote = true; removeElement(); saveNotes();"/>
              </div>
            <p class="note-title">{{ note.titleNote }}</p>
            <p class="note-content">{{ note.contentNote | minChars | removeN }}</p>
            <a :href="note.linkNote" target="_blank">{{ note.linkNote }}</a>
            <img v-if="note.imgNote.length > 0" :src="note.imgNote" alt="image" />
          </div>
        </div>

        <p class="note-head" v-if="notes.length > 0">Others</p>
        <div class="notes-container">
          <div class="notes-item"
              v-for="(note, index) in notes.filter((x) => !x.pinnedNote)"
              :key="index" >
              <div class="expand" @click="setEvt(); openData(note)">
                <font-awesome-icon :icon="['fas', 'expand']"/>
              </div>
              <div class="icons">
                <font-awesome-icon :icon="['fas', 'thumbtack']"
                    @click="note.pinnedNote = !note.pinnedNote; saveNotes();"/>
                <font-awesome-icon :icon="['fas', 'trash-alt']"
                    @click="note.deletedNote = true; removeElement(); saveNotes();"/>
              </div>
            <p class="note-title" v-if="note.titleNote.length > 0">{{ note.titleNote }}</p>
            <p class="note-content" v-if="note.contentNote.length > 0">
                {{ note.contentNote | minChars | removeN }}</p>
            <a :href="note.linkNote" target="_blank" v-if="note.linkNote.length > 0">
                {{ note.linkNote }}</a>
            <img v-if="note.imgNote.length > 0" :src="note.imgNote" alt="image" />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Bus from '../main';

export default {
  name: 'note',
  data() {
    return {
      title: '',
      content: '',
      link: '',
      img: '',
      pinned: false,
      notes: [],
      showForm: false,
      showDetails: false,
      details: '',
    };
  },
  methods: {
    previewImg(evt) {
      // refer to an input element
      const input = evt.target;
      // check if file exist before attempting
      if (input.files && input.files[0]) {
        // create new reader to read image and convert to base65 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // read image and set its data
          this.img = e.target.result;
        };
        // read file as url(base65 format)
        reader.readAsDataURL(input.files[0]);
      }
      // reset evt.target value to make on change event handler do it again
      input.value = '';
    },
    addNote() {
      this.notes.push({
        titleNote: this.title,
        contentNote: this.content,
        linkNote: this.link,
        imgNote: this.img,
        pinnedNote: this.pinned,
        deletedNote: false,
      });
      this.resetInputs();
      this.saveNotes();
    },
    resetInputs() {
      this.title = '';
      this.content = '';
      this.link = '';
      this.img = '';
      this.pinned = false;
    },
    madePinned() {
      this.pinned = !this.pinned;
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    setEvt() {
      this.showDetails = true;
      Bus.$emit('show-details', this.showDetails);
    },
    openData(data) {
      this.details = data;
      Bus.$emit('details', this.details);
    },
    removeElement() {
      this.notes = this.notes.filter((e) => !e.deletedNote);
    },
  },
  created() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
    // eslint-disable-next-line no-return-assign
    Bus.$on('show-details', (el) => this.showDetails = el);
  },
  filters: {
    MinChars(el) {
      return `${el.substring(0, 100)} . . . . .`;
    },
    removeN(el) {
      return el.replace('/\n/g', ' ');
    },
  },
};
</script>
