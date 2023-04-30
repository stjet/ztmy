<script lang="ts">
  //exports
  export let title: string;
  export let slug: string;
  export let subtitle: string;
  export let thumbnail_url: string;
  export let show: boolean;
</script>

<article class="{ show ? 'concert' : 'concert hide'}">
  <h2 class="concert-title"><a href={"concert/"+slug}>{title}</a></h2>
  <span>{subtitle}</span>
</article>

<style>
  .concert-title {
    margin-bottom: 10px;
  }

  .concert-title a {
    text-decoration: none;
  }

  .concert-title a:hover {
    text-decoration: underline;
  }

  :is(.hide) {
    display: none;
  }
</style>
