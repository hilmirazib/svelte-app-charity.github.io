<script>
    // import {onMount, onDestroy, beforeUpdate, afterUpdate} from 'svelte';
    import Header from "../components/Header.svelte";
    import CharityList from "../components/CharityList.svelte";
    import Loader from "../components/Loader.svelte";
    import Welcome from "../components/Welcome.svelte";
    import Promo from "../components/Promo.svelte";
    import Footer from "../components/Footer.svelte";

    // import {charities} from "../data/charities";
    let data = getData();
    async function getData(){
        const res = await fetch('https://charity-api-bwa.herokuapp.com/charities');
        const data = await res.json();
        if(res.ok){
            return data;
        }else{
            throw new Error(data);
        }
    }
    // onMount(async function(){
    //     const res = await fetch('https://charity-api-bwa.herokuapp.com/charities');
    //     charities = await res.json();
    // });
    

   
    // onMount(() => {
    //     console.log('mounted');
    // });
    // onDestroy(() => {
    //     console.log('destroyed');
    // });
    // beforeUpdate(() => {
    //     console.log('before update');
    // });
    // afterUpdate(() => {
    //     console.log('after update');
    // });
</script>

<Header />
<Welcome />
{#await data}
<Loader/>
{:then charities}
<CharityList {charities}/>
{/await}
<Promo />
<Footer />

