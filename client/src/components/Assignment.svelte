<script>
    import {Link} from "svelte-navigator";
    export let array;
    export let title


</script>
<div class="flex-column">
    <div class="row-item">
        <h4>{title}</h4>
        {#each array as value}
            <div id={value._id} class="description" draggable="false">
                <!--TODO: Make it draggable, on drag redifine status -->
                <p>{value.status}</p>
                <p>{value.name}</p>
                <p>{value._id}</p>
                <Link class="link-item" to="{value._id}">See more</Link>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
  h4 {
    font-size: 1.25em;
    text-transform: capitalize;
  }

  .flex-column {
    text-align: center;
    background-color: rgba(10, 100, 255, 0.55);
  }

  .description {
    border: 2px solid black;
    padding: 15%;
    margin: 5px;
    display: flex;
    flex-direction: column;

    p {
      text-transform: capitalize;
      overflow-wrap: break-word;
    }

    :global(.link-item) {
      text-decoration: none;
      color: inherit;
      padding: 0.25em 1em;
      background-color: green;
      border-radius: 15%;

      &:hover {
        text-decoration: underline;
        color: blue;
      }
    }
  }
</style>
