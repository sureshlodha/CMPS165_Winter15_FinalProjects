// Width and height
var width = document.getElementById('container').offsetWidth-60,
    height = 500;

var projection = d3.geo.mercator()
    .center([0,35])
    .scale((width) / 2 / Math.PI)
    .translate([width / 2, height / 2]);

//Will be used to create the path
var path = d3.geo.path().projection(projection);

//Creates zoom variable for later pan/zoom functionality
var zoom = d3.behavior.zoom().scaleExtent([1,8]).on("zoom", zoomed);

//Create the canvas
var svg = d3.select("#container")
	        .append("svg")
	        .attr("width", width)
	        .attr("height", height)
            .append("g");

//Create secondary layer to canvas SVG
var g = svg.append("g");

//boolean variable for buttons?
//var state = false;

//Create tooltip to be used for information on circles
var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

//Call zoom and further functions
svg.call(zoom).call(zoom.event);

//Function to zoom and transform the page
function zoomed() {
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")};


d3.select(self.frameElement).style("height", height + "px");

//Parse the data
//Data will be graabed from countries.geo.json and
//Map_of_Gods.csv
//Below code was supplemented from LA v SF group
d3.json("countries.geo.json", function(json) {	
    d3.csv("Map_of_the_Gods.csv", function(data) {
        // Go through each element of the csv
		for (var i = 0; i < data.length; i++) {
			// Get data for csv element
        	var csvName = data[i].name;
        	var csvCulture = data[i].culture;
            var csvLocation = data[i].location;
            var csvGender = data[i].gender;
            var csvSpecies  = data[i].species;
            var csvType = data[i].type;
            var csvWikiLink = data[i].linkwik;
            var csvGCLink = data[i].linkgc;
            var csvPicture = data[i].picture;
        	// Go through each element of the json looking for a country
        	//		to match the country of the csv.
			for (var j = 0; j < json.features.length; j++) {
				var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                //console.log(j);
				if (csvLocation == jsonCountry) {
					// Assign the color retrieved from the csv to the
					// 		matching json element.
					json.features[j].properties.Name = csvName;
                    json.features[j].properties.Culture = csvCulture;
                    json.features[j].properties.Location = csvLocation;
                    json.features[j].properties.Gender = csvGender;
                    json.features[j].properties.Species = csvSpecies;
                    json.features[j].properties.Type = csvType;
                    json.features[j].properties.WikiLink = csvWikiLink;
                    json.features[j].properties.GCLink = csvGCLink;
                    json.features[j].properties.Picture = csvPicture;
					break;
                }//if(csvLocation == jsonCountry
            }//for loop
        }//outer for loop
       
        //This moves all the paths to the svg/g canvas
        //Color scheme for initial countries is from GodChecker.com
        g.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .style("fill", function(d) {
            var country = d.properties.Location;
            if(country === "Mexico") {
                   return "#410d66";}//purple  
            if(country === "Greece") {
                   return "#000072";}//aqua
            if(country === "Japan") {
                   return "#c90e0e";}//red
            if(country === "United Kingdom") {
                   return "#194719";}
            if(country === "Ireland") {
                   return "#194719";}//green        
            if(country === "Nigeria") {
                   return "#ff9900";}//light brown
            if(country === "Peru") {
                   return "#85ad33";}//green yellow
            if(country === "Egypt") {
                   return "#ff5050";}//salmony
            if(country === "Denmark") {
                   return "#75A3A3";}//bluegrey
            if(country === "Finland") {
                   return "#75A3A3";}
            if(country === "Norway") {
                   return "#75A3A3";}
            if(country === "Sweden") {
                   return "#75A3A3";}
            else {
                return "grey";}
        });//This is for the stlye attribute for the path
            
     //We will now create all of the circles and Gods
        g.selectAll("circle")
         .data(data)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
                return projection([d.lon,d.lat])[0];})
          .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];})
          .attr("r", 3)
          
          .style("fill", function(d) {
                    var typeOfGod = d.type;
                    if(typeOfGod === "Storm" ) {
                        return "yellow";}
                    else if(typeOfGod ==="Sky"){
                        return "#87CEFA";}
                    else if(typeOfGod === "Death") {
                        return "black";}
                    else if(typeOfGod === "Agriculture") {
                        return "#006300";}
                    else if(typeOfGod === "Motherhood") {
                        return "#99FF99";}
                    else if(typeOfGod === "War" ) {
                        return "#9e0e0e";}
                    else if(typeOfGod === "Moon") {
                        return "white";}
                    else if(typeOfGod === "Sun") {
                        return "orange";}
                    else if(typeOfGod === "Love") {
                        return "#ff99ff";}
                    else if(typeOfGod ===  "Wisdom") {
                        return "#9900ff";}
                    else if(typeOfGod === "Sea") {
                        return "blue";}
                      
                    else{
                        return "grey";}
                })//These brackets match to the style for circles and end the selectALL()
        
         .on('mouseover', function(d) {
            tooltip.transition()
                   .duration(400)
                   .style("opacity", 0);
            tooltip.transition()
                   .duration(100)
                   .style("fill", "black")
                   .style("opacity", ".9");
            tooltip.html("<img src = " + d.picture+">" + "<br>" + "Name: " + d.name + "<br>"
                         + "Type: " + d.type + "<br>" 
                        + "Culture: " + d.culture + "<br>" + "Region: " + d.location + "<br>"
                        + "Gender: " + d.gender + "<br>" + "Species: " + d.species + "<br>" +
                        '<a href = "' + d.linkwik + '">' + "Wikipedia Source" + "</a>" + "<br>" +
                        '<a href = "' + d.linkgc + '">' + "GodChecker" + "</a>")
                   .style("left", (d3.event.pageX ) + "px")
                   .style("top", (d3.event.pageY) + "px")})
    
         
            
    });//These bracets are for d3.csv line above
});//These brackets are for d3.json line


//Legend
  svg.append("rect")
        .attr("x", width-220)
        .attr("y", height-190)
        .attr("width", 200)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("opacity",0.5)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-175)
        .style("fill", "#87CEFA");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-172)
        .style("text-anchor", "end")
        .text("Sky");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-175)
        .style("fill", "yellow");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-172)
        .style("text-anchor", "end")
        .text("Storm");


    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-150)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-150)
        .style("text-anchor", "end")
        .text("Moon");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-150)
        .style("fill", "orange");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-150)
        .style("text-anchor", "end")
        .text("Sun");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-125)
        .style("fill", "#006300");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-125)
        .style("text-anchor", "end")
        .text("Agriculture");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-125)
        .style("fill", "blue");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-125)
        .style("text-anchor", "end")
        .text("Sea");

  svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-100)
        .style("fill", "#9e0e0e");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-100)
        .style("text-anchor", "end")
        .text("War");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-100)
        .style("fill", "#ff99ff");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-100)
        .style("text-anchor", "end")
        .text("Love");

  svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-75)
        .style("fill", "#99FF99");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-75)
        .style("text-anchor", "end")
        .text("Motherhood");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-75)
        .style("fill", "black");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-75)
        .style("text-anchor", "end")
        .text("Death");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-50)
        .style("fill", "#9900ff");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-50)
        .style("text-anchor", "end")
        .text("Wisdom");

     svg.append("text")
        .attr("class", "label")
        .attr("x", width -120)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "black") 
        .attr("font-size", "20px")
        .text("Type of Diety");   
