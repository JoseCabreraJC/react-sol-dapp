<script>
  import { onMount } from 'svelte';
  import Web3 from 'web3'
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import Navbar from './lib/Navbar.svelte'

  let address = '0x12312312'

  onMount( async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
  })

  function loadWeb3() {
    if (window.etherum) {
      window.web3 = new Web3(window.etherum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('No etherum browser detected. Check out metamask')
    }
    }
  function async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts()
    console.log(account)
  }
</script>

<main>
  <Navbar {address}/>
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello world!</h1>

  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
