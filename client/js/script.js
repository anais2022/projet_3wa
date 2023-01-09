/*********** animation affichage des éléments des formulaires
 * d'inscription et de connexion********/

const formSelect=document.querySelector(".formulaire").children;

//console.log(formSelect);
for (let i = 0; i < formSelect.length; i++) {
    setTimeout(()=>{
        //console.log(formSelect[i])
        formSelect[i].style.opacity = 1;
    }, i*300); // => les éléments s'affiche les uns après les autres et chaque élément (i) 0.3s après celui qui le précède. 
  }

