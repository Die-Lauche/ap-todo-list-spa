<template>
    <transition name="modal-fade">
        <div class="modal-backdrop" @click="close">
            <div class="modal">
              <header class="modal-header">
                  <slot name="header">
                    This is the default tile!
                  </slot>
              </header>
              <section class="modal-body">
                  <slot name="body">
                    I'm the default body!
                  </slot>
              </section>
              <footer class="modal-footer">
                  <slot name="footer">
                    I'm the default footer!
                  </slot>
              </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'modal',

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    justify-content: center;
  }

  .modal-footer {
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
