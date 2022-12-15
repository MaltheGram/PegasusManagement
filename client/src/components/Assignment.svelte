<script>
    import {Overlay} from "svelte-materialify";
    import AssignmentDetails from "./AssignmentDetails.svelte";
    export let array;
    export let title = ""
    let active = false
    const handleOverlay = () => {
        active = !active
    }

    export const test = (e) => {
        console.log(e.target.id);
    }

</script>
<div class="flex-column">
    <div class="row-item">
        <h4>{title}</h4>
        {#each array as value}
            <div on:click={handleOverlay} id={value._id} class="description">
                <p>{value.status}</p>
                <p>{value.name}</p>
                <p>{value._id}</p>
            </div>
        {/each}
    </div>
    <Overlay
            {active}
            color="black"
            on:click={handleOverlay}
            opacity="0.20"
    >
        <!-- TODO: Insert Assignment details here. Create new component for that-->
        <AssignmentDetails
                id={123}
        />
    </Overlay>
</div>

<style lang="scss">
  h4 {
    font-size: 1.25em;
    text-transform: capitalize;
  }

  .flex-column {
    text-align: center;
    background-color: rgba(10, 100, 255, 0.55);
    width: 15%;
    height: 100%;
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
  }
</style>
