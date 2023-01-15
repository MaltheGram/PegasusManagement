<script>

    import io from "socket.io-client";
    import {BASE_URL} from "../stores/globals.js";
    let messages = []
    let message
    let now = new Date().toLocaleString("en-GB")

    let socket
    socket = io($BASE_URL)

    const sendMessage = () => {
        socket.emit("new message", message)

    }
    socket.on("new message", data => {
        messages = [...messages, data.data]
    })


</script>

<div class="container">
    <form on:submit|preventDefault>
        <label for="message">Message</label>
        <textarea bind:value={message} id="message" name="message" rows="5"></textarea>

        <button on:click={sendMessage} type="submit">Send message</button>
    </form>
    <div class="chatbox">
        <ul>
            {#each messages as msg}
                <li>{msg.dataMessage}
                    Time: {msg.timestamp}</li>

            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
  @import "../styles/forms.css";

  .chatbox {
    width: 100%;

    li {
      background-color: #cccccc;
      padding: 2.25em;
      border-radius: 5px;

      margin-bottom: 5px;
      max-width: 100%;
      word-break: break-word;

      list-style: none;

      &:nth-child(even) {
        background-color: grey;
      }
    }

  }


</style>
