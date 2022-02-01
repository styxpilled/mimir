<script lang="ts">
  import { onMount } from 'svelte'
  import browser from 'webextension-polyfill';
  let counter = 0

  onMount(() => {
    const u = setInterval(() => {
      counter = counter + 1
    }, 1000)

    return () => {
      clearInterval(u)
    }
  })
  const openOptions = () =>  {
    browser.runtime.openOptionsPage().then();
  };

</script>

<h1>Welcome to SvelteKit {counter}</h1>
<button on:click="{openOptions}">Open Options</button>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>