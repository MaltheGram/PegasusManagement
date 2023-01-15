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
        console.log(messages)
    })

    /*   socket.on("connect", () => {
           console.log("A user entered the chat")
           socket.on("return message", data => {
               messages = data
           })
       })
       socket.on("disconnect", () => {
           console.log("A user disconnected the chat")
       })
       const sendMessage = () => {
           socket.emit("new message", message)
           //messages = [...messages, message]
           console.log(messages)
       }
     */


</script>


<label for="message">Message</label>
<input bind:value={message} id="message" name="message" type="text">

<button on:click={sendMessage} type="submit">Send message</button>

<div class="chatbox">
    <ul>
        {#each messages as msg}
            <li>{msg.dataMessage}
                Time: {msg.timestamp}</li>

        {/each}
    </ul>
</div>

<style lang="scss">
  .chatbox {
    width: 50%;


    li {
      background-color: #cccccc;
      padding: 2.25em;
      border-radius: 5px;

      margin-bottom: 5px;
      max-width: 100%;
      word-break: break-word;

      &:nth-child(even) {
        background-color: grey;
      }
    }

  }


</style>
