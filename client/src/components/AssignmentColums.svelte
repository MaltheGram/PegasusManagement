<script>
    import {Link} from "svelte-navigator";
    export let array;
    export let title


</script>
<div class="grid-column">
    <h2>{title}</h2>
    {#each array as value}
        <div class="description" draggable="false">
            <!--TODO: Make it draggable, on drag redifine status -->
            <p>{value.status}</p>
            <p>{value.name}</p>
            <p>{value._id}</p>
            <Link class="link-item" to="{value._id}">See more</Link>
        </div>
    {/each}
</div>

<style lang="scss">
  h2 {
    font-weight: lighter;
    text-transform: capitalize;
  }

  .grid-column {
    text-align: center;
    height: 100vh;

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
