<div class="modal-background"></div>

<div class="modal">
    <slot></slot>
</div>

<style lang="scss">
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 5em;
    border-radius: 0.2em;
    background: white;
  }

  button {
    display: block;
    margin: 2em;
  }
</style>
