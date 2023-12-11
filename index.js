// Code bon jusqu'à ligne 140 et de ligne 245 à la fin

//base de données: tableau en variables globales
let g_produits_db = [
{
    "nom":"Shampoing pêche",
    "marque":"Dior",
    "type":"shampoing",
    "magasins":[1,2,3,4],
    "favori":false,
    "id":1
},
{
    "nom":"Shampoing pomme",
    "marque":"Dior",
    "type":"shampoing",
    "magasins":[1,2,4],
    "favori":false,
    "id":2
},
{
    "nom":"Eau de roses carmin",
    "marque":"Fancy Beauty",
    "type":"eau de roses",
    "magasins":[2,4,5],
    "favori":false,
    "id":3
},
{
    "nom":"Eau de roses passion",
    "marque":"Fancy Beauty",
    "type":"eau de roses",
    "magasins":[1,3,5],
    "favori":false,
    "id":4
},
{
    "nom":"Eau de roses cerise",
    "marque":"Dior",
    "type":"eau de roses",
    "magasins":[2,3],
    "favori":false,
    "id":5
},
{
    "nom":"Parfum roses",
    "marque":"Yves Rocher",
    "type":"parfum",
    "magasins":[1,2,3,4,5],
    "favori":false,
    "id":6
},
{
    "nom":"Parfum fleurs des prés",
    "marque":"Yves Rocher",
    "type":"parfum",
    "magasins":[1,2,5],
    "favori":false,
    "id":7
},
{
    "nom":"Parfum carmen",
    "marque":"Fancy Beauty",
    "type":"parfum",
    "magasins":[3,4,5],
    "favori":false,
    "id":8
},
{
    "nom":"Parfum milady",
    "marque":"Fancy Beauty",
    "type":"parfum",
    "magasins":[1,3,4],
    "favori":false,
    "id":9
},
{
    "nom":"Parfum beauty",
    "marque":"Dior",
    "type":"parfum",
    "magasins":[4,5],
    "favori":false,
    "id":10
}
];

let g_magasins_db = [
{
    "nom":"Monoprix",
    "distance": 0.4,
    "favori":false,
    "id": 1
},
{
    "nom":"Yves Rocher",
    "distance": 12.2,
    "favori":false,
    "id": 2
},
{
    "nom":"Carrefour",
    "distance": 5.6,
    "favori":false,
    "id": 3
},
{
    "nom":"Multiprix",
    "distance": 7.3,
    "favori":false,
    "id": 4
},
{
    "nom":"Soft",
    "distance": 2.9,
    "favori":false,
    "id": 5
}
];

//Ajoute les produits où favori=true
let g_produits_clients = [];


let g_list_marque = [];
let g_list_type = [];


// fonctions get_list_ : obtenir les différents types et générations
function order_products() {
    var interim_marque_tab = [];
    for (let i=0; i<g_produits_db.length; i++) {
        interim_marque_tab.push(g_produits_db[i].marque);
    }
    // console.log(interim_gen_tab);
    g_list_marque = remove_duplicates_in_tab(interim_marque_tab);
    // remove_duplicates_in_tab renvoie un nouveau tableau (tab_no_duplicates)
    console.log(g_list_marque);
    show_list_marque();
    var interim_type_tab = [];
    for (let j=0; j<g_produits_db.length; j++) {
        //interim_marque_tab.push(g_produits_db[i].type);
    }
    g_list_type = remove_duplicates_in_tab(interim_type_tab);
    console.log(g_list_type);
    show_list_type();
}

function remove_duplicates_in_tab(p_tab){
    // permet de supprimer les doublons d'un tableau
    var tab_no_duplicates = p_tab.reduce(function (acc, value) {
        if (acc.indexOf(value) === -1) {
          acc.push(value);
        };
        return acc;
    }, []);
    // console.log(tab_no_duplicates);
    return tab_no_duplicates;
}

function recherche_produit() {

    $("#search_results_list").html("");

    let txt = document.getElementById('searchbar').value;
    txt = txt.toLowerCase();

    let liste = g_produits_db.filter((produit) => (produit["nom"].toLowerCase().includes(txt)));
    
    if(liste.length != 0) {

        liste.forEach((produit) => {
            
            fiche_produit("#search_results_list", produit);

        })

    }

}

function fiche_produit(balise, produit) {

    let txt_fav = "";

    if(produit.favori) {
        txt_fav = "Retirer des favoris";
    }
    else {
        txt_fav = "Ajouter aux favoris"
    }

    $(balise).append("<div class='fiche'><h2>" + produit.nom + "</h2><h1>Marque : " + produit.marque + "</h1><button id='fav_" + produit.id + "' onclick='favori(" + produit.id + ")'>" + txt_fav + "</button></div>")

}

function favori(id) {

    let liste = g_produits_db.filter((produit) => (produit.id == id));
    if(liste.length == 1) {

        let produit = liste[0];
        if(produit.favori) {
            produit.favori = false;
            $("#fav_" + id).html("Ajouter aux favoris");
        }
        else {
            produit.favori = true;
            $("#fav_" + id).html("Retirer des favoris");
        }

    }

}



// fonctions show_list_ : permettent d'afficher les listes et les pokémons correspondants
function show_list_marque() {
    // affiche une liste contenant toutes les générations de pokemon
    for (let i=0; i<g_list_marque.length; i++){
        let list_marque_elem = `<li onclick='show_poroduct_type(`+g_list_marque[i]+`)' 
        class='list_box'>` + g_list_marque[i] + `<ul id='` + g_list_marque[i]+ `'></ul></li>`;
        $('#list_gen').append(list_marque_elem);
    }
    // créer les différentes listes de pokemons
    for (let i=0; i<=g_list_marque.length; i++){
        //var list_gen_pokemons = g_list_pokemon.filter(e=>e.generation == g_list_marque[i]);
        // console.log(list_gen_pokemons);
        //for (let j=0; j<list_gen_pokemons.length; j++){
            //let pokemon_gen_elem = `<li onclick='show_pokemons_details(` + list_gen_pokemons[j].pokedexId + `)' 
            //class='pokemon_name'>` + list_gen_pokemons[j].name.fr + `</li>`;
            // Listes pokemons cachées par défaut
            //$('#generation_'+ g_list_marque[i]).append(pokemon_gen_elem).hide();
        //}
    }
}

function show_product_type(p_marque) {
    //affiche les noms des pokemons d'une génération précise
    for (let i=0; i<g_list_marque.length; i++){
        // ne garder affichée qu'une génération à la fois     
        if (g_list_marque[i] == p_marque) {
            $('#generation_' + g_list_marque[i]).slideToggle(750);
        } 
        else {
            $('#generation_' + g_list_marque[i]).slideUp(750);
        }
    }    
}

function show_list_type() {
    // affiche une liste contenant toutes les générations de pokemon
    for (let i=0; i<g_list_type.length; i++){
        let list_type_elem = `<li onclick='show_pokemons_in_list_type("`+ g_list_type[i] +`")' 
        class='list_box'>Type ` + g_list_type[i] + `<ul id='type_` + g_list_type[i]+ `'></ul></li>`;
        $('#list_type').append(list_type_elem);
    }
    // récupérer chaque type
    for (let i=0; i<g_list_type.length; i++){
        var list_type_pokemons = [];
        // pour chaque type, comparer chaque pokemon
        //for (let k=0; k<g_list_pokemon.length; k++){
            // pour chaque pokemon, récuérer chaque type
            //var pokemon_type_array = g_list_pokemon[k].types;
            // ajouter au tableau list_type_pokemons ceux correspondant à g_list_type[i]
            //var interim_list_type = pokemon_type_array.filter(e=>e.name == g_list_type[i]);
            //if (interim_list_type.length >= 1) {
                //list_type_pokemons.push(g_list_pokemon[k]);
            //}
        //}
        // console.log(list_type_pokemons);     
        for (let j=0; j<list_type_pokemons.length; j++){
            let pokemon_type_elem = `<li onclick='show_pokemons_details(` + list_type_pokemons[j].pokedexId + `)' 
            class='pokemon_name'>` + list_type_pokemons[j].name.fr + `</li>`;
            $('#type_'+ g_list_type[i]).append(pokemon_type_elem).hide();
        }
    }
}

function show_pokemons_in_list_type(p_type) {
    for (let i=0; i<g_list_type.length; i++){  
        if (g_list_type[i] == p_type) {
            $('#type_' + g_list_type[i]).slideToggle(750);
        } 
        else {
            $('#type_' + g_list_type[i]).slideUp(750);
        }
    }    
}








// fonctions show_pokemons_ : affichent les fiches d'un pokémon dans une div
function show_selling_shops(p_id) {
    var selling_shops = g_produits_db.filter((e)=>e.magasins.filter((x) => p_id ));
    console.log(selling_shops);
}






// fonctions : formulaire de recherche
$(document).ready(function(){
    $("#button_submit").click(function() {
        let search = document.querySelector('#searchbar').value;
        console.log(search);
        let search_tab = [];
        console.log(search_tab);
        const regex = new RegExp(search);
        search_tab = g_produits_db.filter((e)=> regex.test(e.nom));
        console.log(search_tab);
        let list_results=[];
        $('#search_results_list').html('');
        if (search_tab.length == 0) {
            list_results = `<li style='list-style-type:none;'>Aucun résultat correspondant à votre recherche n'a été trouvé</li>`;
            $('#search_results_list').append(list_results);
        }
        else {
            for (let i=0; i<search_tab.length; i++) {
                list_results = `<li onclick='show_selling_shops(` + search_tab[i].id + `)' 
                class='product_name'>` + search_tab[i].nom + `</li>`;
                $('#search_results_list').append(list_results);
            }
        }

        //éviter le rechargement de la page et de la console lors de la soumission du formulaire
        return false;
    });
});






// fonctions de navigation dans le menu
function display_sections(num) {
    if (num == 1) {
        $('#accueil').show();
        $('#produits').hide();
    }
    else if (num == 2) {
        $('#accueil').hide();
        $('#produits').show();
    }
}






// init functions : lancées au démarrage après la requête fetch
order_products();

display_sections(1);