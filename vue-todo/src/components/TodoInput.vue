<template>
 <div class="inputBox shadow">
   <input type="text" v-model="newTodoitem" v-on:keyup.enter="addTodo" />
   <span v-on:click="addTodo" class="addContainer">
     <i class="fas fa-plus addBtn"></i>
   </span>

   <Modal v-if="showModal" @close="showModal = false">
     <!--
   you can use custom content here to overwrite
   default content
 -->
     <h3 slot="header">
       경고!
       <i class="closeModalBtn fas fa-times" v-on:click="showModal=false"></i>
     </h3>
     <h5 slot="body">아무것도 입력하지 않으셨습니다.</h5>


   </Modal>
 </div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
  data() {
    return {
      newTodoitem: '',
      showModal: false,
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoitem !== '') {
        // this.$emit('addTodoItem', this.newTodoitem); // 이벤트를 발생시킨다.거 + 인자도 이렇게 같이 보낼 수 있다.
        const text = this.newTodoitem.trim();
        this.$store.commit('addOneItem', text);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoitem = '';
    }
  },
  components: { // TodoInput 아래 하위 component가 생성되는 것을 의미!
    Modal,
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>
