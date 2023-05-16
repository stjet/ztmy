<script lang="ts">
  //imports
  import { SearchOptions } from '$lib/types.ts';

  //exports
  export let query: string = "";
  export let query_type: SearchOptions = SearchOptions.AllQuery;

  //handle changing query type
  let type_value = "all-query";

  function select_change(_e: Event) {
    if (type_value === "all-query") {
      query_type = SearchOptions.AllQuery;
    } else if (type_value === "title-query") {
      query_type = SearchOptions.TitleQuery;
    } else if (type_value === "album-query") {
      query_type = SearchOptions.AlbumQuery;
    } else if (type_value === "newest-sort") {
      query_type = SearchOptions.NewestSort;
    } else if (type_value === "oldest-sort") {
      query_type = SearchOptions.OldestSort;
    } else if (type_value === "shortest-sort") {
      query_type = SearchOptions.ShortestSort;
    } else if (type_value === "longest-sort") {
      query_type = SearchOptions.LongestSort;
    }
  }
</script>

<div id="song-search">
  <input type="text" placeholder="Search here..." bind:value={query}/>
  <select bind:value={type_value} on:change={select_change}>
    <option value="all-query">Search All</option>
    <option value="title-query">Title Search</option>
    <option value="album-query">Album Search</option>
    <option value="newest-sort">Sort Newest</option>
    <option value="oldest-sort">Sort Oldest</option>
    <option value="shortest-sort">Sort Shortest</option>
    <option value="longest-sort">Sort Longest</option>
  </select>
</div>

<style>
  #song-search {
    width: 45vw;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 3px;
    margin: auto;
  }

  input[type=text] {
    width: 74%;
    box-sizing: border-box;
    margin: 0;
    background-color: transparent;
    border: none;
    color: #c1bbbb;
    padding: 3px;
  }

  input:focus {
    color: #efefef;
  }

  select {
    width: 24%;
    box-sizing: border-box;
    margin: 0;
    background-color: transparent;
    border: none;
  }

  option {
    color: #1e1e1e;
  }

  @media screen and (max-width: 1000px) {
    #song-search {
      width: 70vw;
      margin: 0;
    }
  }
</style>
