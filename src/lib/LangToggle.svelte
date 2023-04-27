<script lang="ts">
  export let lang: string;
  function switch_lang() {
    if (lang === "jap") {
      lang = "eng";
    } else {
      lang = "jap";
    }
  }
</script>

<div>
  <button class="default-button" on:click={switch_lang}>{#if lang == "jap"}English{:else}日本語{/if}</button>
</div>
