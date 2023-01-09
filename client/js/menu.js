  /*********** animation affichage des éléments de la page d'accueil********/
const entrer=document.querySelector(".entrer");

//console.log(accueil);

    setInterval(()=>{
        //console.log(accueil[i])
        entrer.style.opacity = 1;
    }, 2000); // => le lien vers la page des événements s'affiche 2 sec. après tous les autres éléments.