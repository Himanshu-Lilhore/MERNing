let data = require("../data/countries_data.json");

for(let country=0; country<data.length; country++)
{
    let tempDiv = document.createElement('div');

    let name = document.createElement('h4');
    let capital = document.createElement('h4');
    let languages = document.createElement('h4');
    let population = document.createElement('h4');
    let flag = document.createElement('h4');
    let region = document.createElement('h4');
    let area = document.createElement('h4');

    name.textContent = data[country].name
    console.log(name.textContent)
}