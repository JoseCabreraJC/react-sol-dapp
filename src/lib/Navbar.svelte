<script>
    export let address = '0x0'

    let src = 'src/bank.png'

</script>

<nav class="navbar navbar-dark fix-top shadow p-o">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0">
        <img {src} width='50' height='30' alt="small bank" class="d-inline-block align-top"> &nbsp; DAPP Yield farming (Decentralized Banking)
    </a>
    <ul class="nav-bar px-3">
        <li class="text-nowrap d-none nav-item d-sm-block">
            <small style="color:white"> Account Number: {address}</small>
        </li>
    </ul>
    
</nav>

<style>
    nav {
        background-color: black;
        height: 50px;
    }
</style>