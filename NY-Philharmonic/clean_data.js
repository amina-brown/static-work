var fs = require('fs');

var rawData = JSON.parse(fs.readFileSync('C:/Users/agbro/Documents/Information Aesthetics/QualitiesViz/raw_data.json'));

var data_1920 = [];

rawData.programs.forEach(element => {
    if (element.season == "2019-20"){
        element.works.forEach(value => {
            if (value.workTitle && value.conductorName == "van Zweden, Jaap") { 
            var solos = []
            value.soloists.forEach(item =>{
                var vocals = ['Soprano', 'Tenor', 'Bass-Baritone', 'Chorus', 'Speaker','Mezzo-Soprano']
                if (vocals.includes(item.soloistInstrument) == 1){
                    solos.push("Vocalist");
                } else {
                    solos.push(item.soloistInstrument);
                }
            })
            data_1920.push({piece: value.workTitle,
                            venue: element.concerts[0].Venue,
                            soloists: solos
            })
        }
        })
    }
});

console.log(data_1920);
var venues = []
var pieces = []
var solos = []
data_1920.forEach(element => {
    venues.push(element.venue);
    pieces.push(element.piece);
    solos.push(element.soloists);
})

var occurrences = { };
var occurrences1 = { };
var occurrences2 = { };
for (var i = 0, j = pieces.length; i < j; i++) {
   occurrences1[pieces[i]] = (occurrences1[pieces[i]] || 0) + 1;
}
for (var i = 0, j = solos.length; i < j; i++) {
    occurrences2[solos[i]] = (occurrences2[solos[i]] || 0) + 1;
 }
for (var i = 0, j = venues.length; i < j; i++) {
    occurrences[venues[i]] = (occurrences[venues[i]] || 0) + 1;
 }

console.log(occurrences);
console.log(occurrences1);
console.log(occurrences2);