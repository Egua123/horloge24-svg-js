



		//les variables globales
		var svg = document.getElementById("notreSVG");
		var aigHeure= document.getElementById("aigHeure");
		var cercleMin = document.getElementById("minute-anim");
		var gHeures = document.getElementById("gHeures");
		var gTrait = document.getElementById("gTrait");
		var ng = document.getElementById("nuages");
		var tng = document.getElementById("toutesNuages");
		var h=0;



		function formatPage(){

			var svg = document.getElementById("principal");
			svg.style.position="absolute";
			svg.style.top="50%";
			svg.style.left="50%";
			svg.style.transform = "translate(-50%,-50%)";


		}
		

		

		// réinitialisation de l'angle de l'aiguille
		function pointerHeure(){
			
			aigHeure.setAttribute("transform","rotate("+h+" 400 400)");
			h += 15;
			if ( h>360) h = h-360;}



		
		// les 24 traits des heures
		function traitPourHeure(ang1){

			var trait1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
			trait1.setAttribute("d", " M  600 400 L 650 400");
			trait1.setAttribute("transform","rotate("+ang1+" 400 400)");
			svg.appendChild(trait1);
			trait1.setAttribute("fill", "none");
			trait1.setAttribute("stroke", "black");
			trait1.setAttribute("stroke-width", "5");
			gTrait.appendChild(trait1);


		}
		





		// les 24 heures
		function  txt(texte,rot,i)  {

    		var e = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    		
    		e.setAttribute("x",400);
    		e.setAttribute("y",595);
   			e.setAttribute("fill","red");
    		e.setAttribute("style","text-anchor:middle; font-family:Ubuntu; font-weight: bold; font-size:18px;");
    		e.setAttribute("transform","rotate("+rot+" 400 400)");
    		e.setAttribute("id","text"+i);
    		var textNode = document.createTextNode(texte);
    		e.appendChild(textNode);
    		gHeures.appendChild(e);
    		
		}

		/*
		function ajuster(nomId){
			for (var i = 0; i <24; i++){

				var elt = document.getElementById(nomId+i);
				//console.log(elt);
				elt.setAttribute("transform", "rotate("+i*360/24+")");

			}
			
			

		}*/


		// cette fonction permet de definir l'heure en format de 24 heures
		function init(t){


			let temps_epoch = t;
			var heureAnim = document.getElementById("heure-anim");
			var minAnim = document.getElementById("minute-anim");
			var rectDate = document.createElementNS("http://www.w3.org/2000/svg", "rectDate");
			
			
			var date = new Date(temps_epoch);
			
			var hours = date.getHours();
			var angHeureDepart = (360/24)*hours+90;
			var angHeureFinale = angHeureDepart +360;
			heureAnim.setAttribute("from",""+angHeureDepart+" 400 400");
			heureAnim.setAttribute("to",""+angHeureFinale+" 400 400");
			
			var minutes = date.getMinutes();
			var angMinDepart = (360/60)*minutes;
			var angMinFinale = angMinDepart+360;
			minAnim.setAttribute("from",""+angMinDepart+" 400 400");
			minAnim.setAttribute("to",""+angHeureFinale+" 400 400");
			
			var seconds = "0" + date.getSeconds();

	

			

		}


		// cette fonction affiche la date et l'heure actuelle
		function affichage() {
	        // voir doc ici:  https://www.w3schools.com/js/js_date_methods.asp
	        var now=new Date();
	        var epoch=now.getTime()/1000;  // en secondes
	        var y=now.getFullYear();
	        var ms=now.getMonth();
	        var h=now.getHours();
	        var m=now.getMinutes();
	        var s=now.getSeconds();
	        var d=now.getDate();

	        var mn=["janvier","février", "mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
	        var text1 = d +" "+mn[ms]+" "+y;
	        var text2 = h +":"+m+":"+s;

	        document.getElementById("textDate").textContent = text1;
	        document.getElementById("textHeure").textContent = text2;
	      
        
        /*
        document.getElementById("now").innerHTML=now;
        document.getElementById("x-epoch").innerHTML=epoch;
        document.getElementById("x-annee").innerHTML=y;
        document.getElementById("x-mois").innerHTML=ms+" ("+mn[ms]+")";
        document.getElementById("x-jour").innerHTML=d;
        document.getElementById("x-heure").innerHTML=h;
        document.getElementById("x-minute").innerHTML=m;
        document.getElementById("x-seconde").innerHTML=s;
		*/
		}

		
		function tabDegreNuageHoraire(jsonApi)
		{
			var tabNuageHoraire = [];
			heureactuelle = 0;
			plus24 = 24;

			for (var i = heureactuelle; i <plus24; i++){ 

				ennuagement = jsonApi.hourly[i].clouds;
				tabNuageHoraire.push(ennuagement);
			}	
			
			
			return tabNuageHoraire;


		}




		function applicationDegreNuageHoraire(jsonApi){

			tabEnnuagement = tabDegreNuageHoraire(jsonApi);
			
	        indTabNuage = 0;
	       
	        for (var j = 0; j <360; j+=15) {
	        	
	        	var degre = tabEnnuagement[indTabNuage]/100;
	        	
        		var grisDebut= 120;
        		var grisMargeMax = 120;
        		var couleur = grisDebut+(1-degre)*grisMargeMax;
        		var rgbCouleur = couleur+","+couleur+","+couleur;
        		
	        	nuage(j,rgbCouleur);
	        	indTabNuage+=1;


			}


		}

		function positionSunSetRise(positionSoleil,div,contenu,color,angle){

			var p = document.getElementById(positionSoleil);
			var div = document.getElementById(div);
			p.setAttribute("x",400);
    		p.setAttribute("y",160);
    		p.setAttribute("transform","rotate("+angle+" 400 400)");
    		div.innerHTML = contenu;
    		div.style.backgroundColor = color;
    		div.style.font = "30px serif";



		}

		function coucherLeverSoleil(jsonApi) {

			const unJourEnSec = 86400;

			var tempsRepere = jsonApi.daily[0].dt;
			var tempsSunrise = jsonApi.daily[0].sunrise;
			var tempsSunset = jsonApi.daily[0].sunset;

			//le repère est midi
			var angleRise = -(tempsRepere - tempsSunrise)*360/unJourEnSec;  

			var angleSet  = (tempsSunset - tempsRepere)*360/unJourEnSec;
			console.log(angleRise+360, angleSet);
			var g = document.getElementById("principal");
			var debutMatin=angleRise+360;
			var finMatin=angleRise+10+360;
			var debutJour=finMatin+10;
			var finJour=angleSet-10;
			var debutSoiree = angleSet;
			var finSoiree = debutSoiree+10;
			var debutNuit = finSoiree+10;
			var finNuit = debutMatin -10;
			
			//g.style.backgroundImage =" conic-gradient(from 0deg, red, yellow, green)";
			g.style.backgroundImage="conic-gradient( from "+(angleSet-5) +"deg, #082a4b "+(angleSet-5)+"deg "+(debutMatin-angleSet-3)+"deg  , #e3dfa1 "+(debutMatin-angleSet+3)+"deg "+(angleSet-10)+"deg,#082a4b )";
			console.log(g.style.backgroundImage);

			positionSunSetRise("lever","emojiLever","&#129396;","#d7b22b",angleRise);
			positionSunSetRise("coucher","emojiCoucher","&#129393;","#bd8705",angleSet);
			



		}
		
		





		function cerclePourNuage(cX, cY,rayon,color,rot){

			var cercle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			cercle.setAttribute("cx", cX);
			cercle.setAttribute("cy", cY);
			cercle.setAttribute("r", rayon);
			cercle.setAttribute("fill", color);

			cercle.setAttribute("transform","rotate("+rot+" 400 400)");
			ng.appendChild(cercle);

			


		}


		function nuage(ro,rgbCouleur){
			cerclePourNuage(692,390,15,"#E9CB2E",ro);//le soleil
			
			//le reste des formes forment le nuage
			cerclePourNuage(680,400,8,"rgb("+rgbCouleur+")",ro);
			cerclePourNuage(692,400,10,"rgb("+rgbCouleur+")",ro);
			cerclePourNuage(695,400,8,"rgb("+rgbCouleur+")",ro);
			var rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rec.setAttribute("x", 680);
			rec.setAttribute("y", 400);
			rec.setAttribute("width", 30);
			rec.setAttribute("height", 10);
			rec.setAttribute("rx", 10);
			rec.setAttribute("ry", 10);
			rec.setAttribute("fill", "rgb("+rgbCouleur+")");
			rec.setAttribute("transform","rotate("+ro+" 400 400)");
			ng.appendChild(rec);
			

		}
		function phaseLune(jsonApi)
		{
			
			//lune = cerclePourNuage(400, 750,20, "yellow" , 0);
			//droite = cerclePourNuage(440, 750,20, "black" , 0);
			var phase = jsonApi.daily[0].moon_phase;
			
			if(phase==0 || phase==1){
				cerclePourNuage(360, 750,20, "black" , 0);


			}
			else if (phase == 0.25){

				cerclePourNuage(380, 750,20, "black" , 0);
				cerclePourNuage(400, 750,20, "yellow" , 0);


			}
			else if (phase == 0.5){
				
				cerclePourNuage(400, 750,20, "yellow" , 0);


			}
			else if (phase == 0.75){
				cerclePourNuage(420, 750,20, "black" , 0);
				cerclePourNuage(400, 750,20, "yellow" , 0);


			}
			else if (phase >0.25 && phase < 0.5){
				cerclePourNuage(400- phase*2*20, 750,20, "black" , 0);
				cerclePourNuage(400, 750,20, "yellow" , 0);
				


			}
			else if (phase >0 && phase < 0.25){
				
				cerclePourNuage(400, 750,20, "yellow" , 0);
				cerclePourNuage(380 + phase*2*20, 750,20, "black" , 0);


			}
			else if (phase >0.5 && phase < 0.75){

				
				
				cerclePourNuage(400, 750,20, "black" , 0);
				cerclePourNuage(380+phase*20 , 750,20, "yellow" , 0);


			}
			else if (phase >0.75){

				
				

				cerclePourNuage(400, 750,20, "yellow" , 0);
				cerclePourNuage(400+phase*20 , 750,20, "black" , 0);
				

			}
			

		}
		

		function meteo() {
    		var  url="https://api.openweathermap.org/data/2.5/onecall?lat=45.5016889&lon=-73.567256&appid=0b87ec66d7689fe6a3a8d560236450ed&lang=fr&units=metric";

    		var req = new XMLHttpRequest();
    		req.onreadystatechange = function() {
        		if (this.readyState == 4 && this.status == 200) {
            		var jmeteo=JSON.parse(this.responseText);
            		var temp =jmeteo.daily[0].sunrise;
            		//convTemps(temp);
            		console.log(jmeteo);
            		var dActuel = init(Date.now());
            		affichage();
            		tabDegreNuageHoraire(jmeteo);
            		applicationDegreNuageHoraire(jmeteo);
            		coucherLeverSoleil(jmeteo);
            		phaseLune(jmeteo);
            		
            		return jmeteo;
            		
        		}
    	};
    	req.open("GET", url, true);
    	req.send();

		}
		
		
		

		
		for (var i = 0; i <360; i+=15) traitPourHeure(i);
		//for (var j = 0; j <360; j+=15) nuage(j, "174,174,174");	
			
		for (var i = 0; i <24; i++) txt(""+i,i*360/24,i);
			

			

	
	    var min=0;
		formatPage();
		meteo();
		setInterval(affichage,1000);
		setInterval(meteo,3600000);
		
		
		



