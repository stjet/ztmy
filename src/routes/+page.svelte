<div id="main-container">
  <h1 id="zutomayo-eng"></h1>
</div>

<style>
  #main-container {
    width: 60%;
    margin: auto;
    margin-top: 25vh;
    text-align: center;
  }

  @keyframes slidedown {
    0% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    20% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    80% {
      transform: translate(0px, 50px);
      opacity: 0;
    }
    100% {
      transform: translate(0px, 50px);
      opacity: 0;
    }
   }

  #zutomayo-eng {
    animation-name: slidedown;
    animation-duration: 3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }

  @keyframes changecontent {
    0% {
      content: "ZUTOMAYO";
    }
    24% {
      content: "ZUTOMAYO";
    }
    25% {
      content: "ずっと真夜中でいいのに";
    }
    75% {
      content: "ずっと真夜中でいいのに";
    }
    76% {
      content: "ZUTOMAYO";
    }
    100% {
      content: "ZUTOMAYO";
    }
   }

  #zutomayo-eng::after {
    content: "ZUTOMAYO";
    animation-name: changecontent;
    animation-duration: 12s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(1, jump-none);
  }
</style>
