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

let coeur_plein = '<svg xmlns="http://www.w3.org/2000/svg" id="i-heart" viewBox="0 0 32 32" fill="red" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" id="id_101" style="stroke: rgb(255, 0, 0);"/></svg>';
let coeur = '<svg xmlns="http://www.w3.org/2000/svg" id="i-heart" viewBox="0 0 32 32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" id="id_101" style="stroke: rgb(255, 0, 0);"/></svg>';

//Ajoute les produits où favori=true
let g_produits_clients = [];


let g_list_marque = [];
let g_list_marque_id = [];
let g_list_type = [];
let g_list_type_id = [];

var wage = document.getElementById("searchbar");
wage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        recherche_produit();
    }
});


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
    g_list_marque_id = g_list_marque.map(e => e.replace(/ /g, '_'));
    console.log(g_list_marque_id);

    var interim_type_tab = [];
    for (let j=0; j<g_produits_db.length; j++) {
        interim_type_tab.push(g_produits_db[j].type);
    }
    g_list_type = remove_duplicates_in_tab(interim_type_tab);
    console.log(g_list_type);
    g_list_type_id = g_list_type.map(e => e.replace(/ /g, '_'));
    console.log(g_list_type_id);
    show_list_marque();
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
        txt_fav = coeur_plein;
    }
    else {
        txt_fav = coeur;
    }

    // ajouter une fonction pour afficher les différents magasins quand une div fiche est cliquée
    $(balise).append("<div class='fiche'><p onclick='liste_magasins(" + produit.id + ")'>" + produit.nom + "</p><p onclick='liste_magasins(" + produit.id + ")'>Marque : " + produit.marque + "</p><div class='div_fav' id='fav_" + produit.id + "' onclick='favori(" + produit.id + ")'>" + txt_fav + "</div></div>")

}

function fiche_magasin(balise, magasin) {

    let txt_fav = "";

    if(magasin.favori) {
        txt_fav = coeur_plein;
    }
    else {
        txt_fav = coeur;
    }

    // ajouter une fonction pour afficher les différents magasins quand une div fiche est cliquée
    $(balise).append("<div class='fiche'><p>" + magasin.nom + "</p><p>" + magasin.distance + " km</p><div class='div_fav' id='fav_" + magasin.id + "' onclick='favori(" + magasin.id + ", false)'>" + txt_fav + "</div></div>")

}

function compareMagasin(a, b) {
    if(a.distance > b.distance) {
      return 1;
    }
    else if(a.distance < b.distance) {
      return -1
    }
    return 0;
}

function liste_magasins(id) {

    display_sections(1);

    $("#search_results_list").html("");

    let liste = g_produits_db.filter((produit) => (produit.id == id));

    if(liste.length == 1) {

        let produit = liste[0];

        fiche_produit("#search_results_list", produit);

        $("#search_results_list").append("<h3>Magasins proches</h3>")

        let liste_magasins = g_magasins_db.filter((magasin) => (produit.magasins.includes(magasin.id)));

        if(liste_magasins.length > 0) {

            liste_magasins.sort(compareMagasin);

            liste_magasins.forEach((magasin) => {
                fiche_magasin("#search_results_list", magasin);
            })

        }
        else {

            $("#search_results_list").append("Aucun magasin enregistré possède ce produit");

        }

    }

}

function showSucces() {

    $("#accueil").addClass("");

}

function favori(id, isProduit = true) {

    let liste;
    if(isProduit) {
        liste = g_produits_db.filter((produit) => (produit.id == id));
    }
    else {
        liste = g_magasins_db.filter((magasin) => (magasin.id == id));
    }
    if(liste.length == 1) {

        let produit = liste[0];
        if(produit.favori) {
            produit.favori = false;
            $("#fav_" + id).html(coeur);
        }
        else {
            produit.favori = true;
            $("#fav_" + id).html(coeur_plein);
        }

    }
    liste_fav();

}

function liste_fav() {

    $("#list_produit_fav").html("");
    let liste = g_produits_db.filter((produit) => (produit.favori));
    if(liste.length > 0) {

        liste.forEach((produit) => {

            fiche_produit("#list_produit_fav", produit);

        })

    }

    let liste_m = g_magasins_db.filter((magasin) => (magasin.favori));
    if(liste_m.length > 0) {

        liste_m.forEach((magasin) => {

            fiche_magasin("#list_produit_fav", magasin);

        })

    }

}

// fonctions show_list_ : permettent d'afficher les listes et les pokémons correspondants
function show_list_marque() {
    // affiche une liste contenant toutes les générations de pokemon
    for (let i=0; i<g_list_marque.length; i++){
        let list_marque_elem = `<li onclick='show_list_type("` + g_list_marque_id[i] + `")' 
        class='list_box'>` + g_list_marque[i] + `<ul id='` + g_list_marque_id[i] + `'></ul></li>`;
        $('#list_marques').append(list_marque_elem);
    }
    // créer les différentes listes de pokemons
    for (let i=0; i<g_list_marque.length; i++){
        var all_types_in_marque = g_produits_db.filter(e=>e.marque == g_list_marque[i]);
        var interim_tab = [];
        for (let h=0; h<all_types_in_marque.length; h++){
            interim_tab.push(all_types_in_marque[h].type);
        }
        var tab_types_in_marque = remove_duplicates_in_tab(interim_tab);
        for (let j=0; j<tab_types_in_marque.length; j++){
            let marque_type_elem = `<li onclick='show_products_in_type("` + tab_types_in_marque[j] + `", "` + g_list_marque[i] + `", "` + tab_types_in_marque[j].replace(/ /g, '_') + `", "` + g_list_marque_id[i] + `")' 
            class='marque_product_type'>` + tab_types_in_marque[j] + `
            <ul id='products_` + tab_types_in_marque[j].replace(/ /g, '_') + `_` + g_list_marque_id[i] + `'>
            </ul></li>`;
            $('#'+ g_list_marque_id[i]).append(marque_type_elem).hide();
        }
    }
}

function show_list_type(p_marque) {
    for (let i=0; i<g_list_marque.length; i++){
    
        if (g_list_marque_id[i] == p_marque) {
            $('#' + g_list_marque_id[i]).show();
        } 
        else {
            $('#' + g_list_marque_id[i]).hide();
        }
    }    
}

function show_products_in_type(p_type, p_marque, p_id_type, p_id_marque) {
    var all_products_in_type = g_produits_db.filter(e => e.type == p_type && e.marque == p_marque);
    console.log(all_products_in_type);
    for (let i=0; i<all_products_in_type.length; i++){
        let product_in_type = `<li onclick=' fiche_produit("#search_results_list", all_products_in_type[i])' 
        class='products>` + all_products_in_type[i].nom + `</li>`;
        console.log(product_in_type);
        let id_cible ='#products_' + p_id_type + '_' + p_id_marque;
        $(id_cible).show();
        $(id_cible).append(product_in_type);
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
        $('#mon_compte').hide();
    }
    else if (num == 2) {
        $('#accueil').hide();
        $('#produits').show();
        $('#mon_compte').hide();
    }
    else {
        $('#accueil').hide();
        $('#produits').hide();
        $('#mon_compte').show();
        liste_fav();
    }
}






// init functions : lancées au démarrage après la requête fetch
order_products();

display_sections(1);