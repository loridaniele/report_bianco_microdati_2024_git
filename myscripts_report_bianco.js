
//----------------------SCRIPT INTESTAZIONE---------------------------      
var gx = d3.selectAll('#g1')
.on("click", function(d) { 
alert("RIMANE NEBBIA \n nel sospiro \n di nuvole \n in terra \n straniera.");
d3.selectAll('.grazie').text('.')

})   

function expandText() {
d3.selectAll('text').each(function(i) {
  var t1 = d3.select(this);
  
  ( function ended(){
    var x_random = d3.randomUniform(1, 1500);
    var y_random = d3.randomUniform(20, 110);
    var A = d3.shuffle(['25px','5px','45px','15px','21px','7px',
    '40px','12px','1px','52px','33px','71px','62px','88px']);  //funzione che mischia l'ordine 
                                                                                  //degli elementi
    var caract_random = A[1];
    
t1.transition()
.duration(4000)
.attr('x',  x_random)
.attr('y', y_random)
.style("font-size", caract_random)
.style("font", "times")
.on('end', ended)
;} )();

}) 
}

expandText()
//-----fine-----------------SCRIPT INTESTAZIONE-----------fine---------------- 



//questa funzione produce una tabella a doppia entrata da un set dati
//input:    table_id = id da assegnare alla table, 
//          rows = dati da riportare
//1. considera dati del tipo sopra, vale a dire un set
// di vettori-riga-record prodotti dalla lettura 'd3.csvParseRows' di un
//file csv
//2. si aspetta di trovare sulla prima riga il nome delle colonne 
//3. e sulla prima colonna l'intestazione di riga

//es:Tab_2ways_div('#div2','table_esempio_1',rows_esempio);

function Tab_2ways_div(div_id,table_id,rows){
    // tabella
    table1 = d3.select('body').select(div_id).append('table')
                    .style("border-collapse", "collapse")
                    .style("border", "1px black solid")
                    .attr('id',table_id);
    
    // headers - intestazione colonne
      table1.append("thead").append("tr")
        .selectAll("th")
        .data(rows[0])
        .enter().append("th")
        .text(function(d) { return d; })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "#73dec5")/*"#69b3a2")/*"lightgray")*/
        .style("font-weight", "bold");
        //.style("text-transform", "uppercase");
    
    // headers - intestazione righe prendo la èrima colonna
    table1.append("tbody")
        .selectAll("tr")
        .data(rows.slice(1))
        .enter().append('tr')
        .append("th")
        .text(function(d) { return d[0,0]})
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color","#6ed4bc")/*"#69b3a2")/* "lightgray")*/
        .style("font-weight", "bold");
        //.style("text-transform", "uppercase");
    
    // td - celle escludo la prima riga e la p
      table1.select("tbody")
        .selectAll("tr")
        //.enter().append("tr")
        .selectAll("td")
        .data(rows.slice(1)) //tutte le righe partendo dalla seconda
        .data(function(val) {//prendi dalla seconda colonna (prima colonna intesta riga)
            return val.slice(1); })
        .enter().append("td")
        .style("border", "1px black solid")
        .style("padding", "5px")
        .text(function(d) {
      return d; //prendi dalla seconda colonna
    })
        .style("font-size", "12px");
    
    // table Events
      table1.selectAll('td').
      on("mouseover", function(){d3.select(this).style("background-color", "#69b3a2"); })
        .on("mouseout", function(){d3.select(this).style("background-color", "white");});
    
    } //fine function


    function SliderTabs(slider_tab2,slider_value2,tavola1){

        document.getElementById(slider_value2).style.fontSize = "20px";
        // sovrascrivo slider_value2 con il valore (this.) dello slide
        var slider = document.getElementById(slider_tab2);
        slider.oninput = function() {
              var Valore_slide = this.value;
              document.getElementById(slider_value2).textContent = Valore_slide;
         };
        // modifico i valori in 'TD' rispetto alla soglia  
        var t = document.getElementById(tavola1); //referenzio la tabella il oggetto a 't'
                         const cells = t.querySelectorAll("td");   //referenzio tutte le celle di t a 'cells'
                         const size_original=cells[1].style.fontSize ; //salvo il font-size originale
        document.getElementById(slider_tab2)
               .addEventListener("input", function(){
                         var Valore_slide = this.value;  //attribuisco il valore this dello slider
                        //controllo tutte le tabelle e modifico il font-size
                         cells.forEach(function(cell) {         
                                  if (+cell.textContent < +Valore_slide){ //sottosoglia modifico il fontsize a ZERO
                                          console.log(cell.style.fontSize = "0px");};
                                   if (+cell.textContent >= +Valore_slide){
                                          //console.log(cell.style.fontSize = "23px"); //carattere fisso
                                          console.log(cell.style.fontSize = size_original);
                                         }
                                  ;});
                            });
                            
     } 
     //fine function////

     function Tab_base_reusable(div_id, table_id, rows,titolo_tab,tab_width_px,hcoltit){
        // tabella oggetto di lavoro
        table1 = d3.select("body").select(div_id).append("table")
          .style("border-collapse", "collapse")
          .style("border", "1px black solid")
          .style("width", tab_width_px)
          .attr("id", table_id);
        // INTESTAZIONE TABELLA
        table1.append("caption").text(titolo_tab).style("text-align","left");
        // headers - intestazione colonne
        table1.append("thead").append("tr")
          .selectAll("th")
          .data(rows[0])
          .enter().append("th")
          .text(function (d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "#73dec5")////"lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase");
  
        // headers - intestazione righe prendo la prima colonna
        table1.append("tbody")
          .selectAll("tr")
          .data(rows.slice(1))
          .enter().append("tr")
          .append("th")
          .text(function (d) { return d[0, 0] })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "#73dec5")////"lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase");
  
        // td - celle escludo la prima riga e la p
        table1.select("tbody")
          .selectAll("tr")
          //.enter().append("tr")
          .selectAll("td")
          .data(rows.slice(1)) //tutte le righe partendo dalla seconda
          .data(function (val) {//prendi dalla seconda colonna (prima colonna intesta riga)
            return val.slice(1);
          })
          .enter().append("td")
          .style("border", "1px black solid")
          .style("padding", "5px")
          .text(function (d) {
            return d; //prendi dalla seconda colonna
          });
        // blocco di alcuni elementi della tabella
        
        //tbody th indice (senza la prima riga thead)
        table1.selectAll("tbody th:first-child")
          .style("position", "sticky")
          .style("left", "0")
          .style('z-index','1') //2
          .style('background-color',"#73dec5")////'grey')
          .style('color','black')//'white');
        //th colonne
        table1.selectAll("th:not(:first-child)")
          .style("position", "sticky")
          .style("left", "0")
          .style('z-index','2') //2
          .style('top',hcoltit)//margin-bottom: 0;
          .style('margin-bottom','0')
          .style('background-color',"#73dec5")//)//'lightgray');
        // thead first th
        table1.selectAll("thead tr:first-child th:first-child")
          .style("position", "sticky")
          .style("left", "0")
          .style('top',hcoltit)
          .style('z-index','3') //2
          .style('background-color',"#73dec5")//)
          .style('color','black')//'white');
  
          // blocco della intestazione della tabella
        table1.selectAll("caption")
          .style("position", "sticky")
          .style("left", "0")
          .style('top','0')
          .style("padding", "5px")
          .style('z-index','4') //2
          .style('background-color','white')
          .style('color','black')
          .style('font-weight', 'bold');
  
        
        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  
      }
      // fine funzione





// questa table è scrollable ma indice ed intestazione della tabella e intestazione delle colonne rimangono fissi ed è possibile aggiungere il size del font per la cella in mouseon
function Tab_2ways_div_scroll_width_fixed_hcoltit_max_cell_light_x(div_id, table_id, rows,titolo_tab,tab_width_px,hcoltit,size_cell,fsize,fcolor) {
      
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    Tab_base_reusable(div_id, table_id, rows,titolo_tab,tab_width_px,hcoltit) ;

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /* referenzio tabella e celle*/
    var t = document.getElementById(table_id); //referenzio la tabella il oggetto a 't'
    const cells = t.querySelectorAll("td");   //referenzio tutte le celle di t a 'cells'
    //console.log('celle:'+cells[1].textContent)
    //console.log('PROVA'+t['COGNOME'])
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // table Events
    table1.selectAll("td").
      on("mouseover", function () {    //////ON ON ON
        ///////// fondamentale come estrarre le proprietà dall'elemento
        var elm = d3.select(this);
        elm.attr("style"); //come vedere le proprietà di style
        elm.style('padding'); // come vedere il valore della specifica proprietà di style
        table1.style('font-size');
        ////////
        // due modi identici di estrarre delle proprieta dall'elemento
        size_original = d3.select(this).style.fontSize //estraggo il valore originale di 'fontsize'
        size_original1 = d3.select(this).property('fontSize') //estraggo il valore originale di 'fontsize'
       //colora la cella dove si trova il mouse
        d3.select(this).style("background-color", "white").style('font-weight', 'bold').style('font-size', size_cell); 
        d3.select(this).style.color = 'black';
        // prove
        mousex1 = d3.mouse(this); //vettore di posizione del mouse
        //mousex = mousex[0] + 5;
        //console.log('mousex:'+mousex1);

        var cella_valore = d3.select(this).text();  //attribuisco il valore this della cella
        //console.log('fin qui ..valore:'+cella_valore);
                 //controllo tutte le tabelle e modifico il font-size
                  cells.forEach(function(cell) {         
                           if (+cell.textContent < +cella_valore){ //sottosoglia modifico il fontsize a ZERO
                                   cell.style.opacity = "1";
                                   cell.style.color = 'white';
                                   cell.style.fontSize = fsize;
                                   cell.style.fontWeight = "normal";
                                   cell.style.background ="red";
                                   //cell.style.fontweight = "bold";
                                  };
                            if (+cell.textContent >= +cella_valore){
                                   cell.style.opacity = "1"; //carattere fisso
                                   cell.style.color = "black";
                                   cell.style.fontWeight = "normal";
                                   cell.style.fontSize = fsize;
                                   cell.style.color = 'black';
                                   cell.style.background ="#73dec5";

                                   //console.log(cell.style.fontSize = size_original);
                                  }
                           ;});
        //colora la cella dove si trova il mouse
        d3.select(this).style("background-color", "white").style('font-weight', 'bold').style('font-size', size_cell); 
        d3.select(this).style('color','black');

      }
      
      )
      .on("mouseout", function () { 
        d3.select(this).style("background-color", "white").style("color", "black")
        .style('font-weight', 'normal').style('font-size', ''); 
        // riporto la tabella nello style di partenza
        cells.forEach(function(cell) {
              cell.style.color = "black";
              cell.style.opacity = "1";
              cell.style.fontSize = ""; // richiama il fontSize originale
              cell.style.fontWeight = 'normal';
              cell.style.background ="white";
            
            
            });

        });

  } // fine funzione


//--------------------------------------------------------funzione----------------------
// questa funzione controlla se una specifica class di qualche elemento visibile
// è presente nella window ed aggiunge proprio a questo elemento
// una seconda classe con le
// modifiche che si vogliono apportare alla visualizzazione. 
// visto che stiamo lavorando sull'animazione utilizziamo in css:
// 
// @keyframes scale-up {
//    from {...}
//    to {...}
//    }
// .in-view {
//    animation: 4.5s scale-up ease forwards;
//    /*animation-timeline: scroll(root);*/
//    }
// to use: quando lo scroll porterà a visualizzare la pagina, verrà aggiunta la nuova classe
// es: '.in-view' che lancerà sull'elemento collegato l'animazione @keyframes 
// di nome es: 'scale-up'
//
// La seconda classe
// verrà rimossa quando l'elemento esce dalla window di visualizzazione
// da_animare - si ricercano tutti glie elementi visibili che presentano questa classe
// animato    - la classe che temporaneamente viene aggiunta a quell'elemento e che 
//              verrà cancellata quando l'elemento non è + visibile.
// es: elemento_visibile_trigger('.animate','.in-view')

  function elemento_visibile_trigger(da_animare, animato){
    //Check if the document is loaded (so that this script can be placed in the <head>)
        document.addEventListener("DOMContentLoaded", () => {
        // visto che usiamo classlist basta il nome (senza .) della classe 
        // temporaneamente aggiunta
        animato = animato.substring(1)
        // Use Intersection Observer to determine if objects are within the viewport
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add(animato);
            //console.log(entry)
            return;
            }
            entry.target.classList.remove(animato);
        });
        });
    
        // Get all the elements with es: .animate class applied
        const allAnimatedElements = document.querySelectorAll(da_animare);
    
        // Add the observer to each of those elements
        allAnimatedElements.forEach((element) => observer.observe(element));
    
        }); 
    }
    // specifiche della versione iniziale (rispetto a quella sopra che ho modificato)
    //  che possono essere ancora utili:
     // Trigger CSS Animations when elements are scrolled into view
    
    // This JS uses the Intersection Observer API to determine if objects are within the viewport
    // It addes an 'in-view' class to elements when they come into view (and removes the class when not on screen)
    // Use to add @keyframe or transition animations to elements so they animate once they are on screen
    
    //TO USE
    // Simply add the .animate class to those HTML elements that you wish to animate. For example, <h1 class="animate">
    // Once in the viewport, the JS will add the 'in-view' class to those elements. For example, <h1 class="animate in-view">
    // Define your CSS to enable animations once that element is in view. For example, h1.in-view { }
    //
    //--------------------------------------------------fine funzione
    