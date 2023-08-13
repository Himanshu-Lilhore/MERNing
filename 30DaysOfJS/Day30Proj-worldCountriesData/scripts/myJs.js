let data;

async function mainScript(){
    await fetchData()
    showAll()
    
}

async function fetchData() {
    try {
        const response = await fetch('../data/countries_data.json')
        data = await response.json()
    } catch (error) {
        console.error('Error fetching JSON:', error)
    }
}

  
  
function showAll() {
    const container = document.querySelector("#countryDisp")
    container.innerHTML = ""
    for (const country of data) {
        const countryDiv = document.createElement('div')
        for (const key in country) {
            if (country.hasOwnProperty(key)) {
                let property
                if(key.match('flag')){
                    property = document.createElement('img')
                    property.src = `${country[key]}`
                    property.classList.add('flag')
                }
                else{
                    property = document.createElement('h4')
                    if(key.match('name')){
                        property.classList.add('countryName')
                        property.textContent = `${country[key]}`
                    }
                    else if(key.match('languages')){
                        property.classList.add('languages')
                        let langOut = '\n'
                        country[key].forEach(element => {
                            langOut += `\t${element}\n`
                        })
                        property.textContent = `${key} :${langOut}`
                    }
                    else{
                        property.classList.add('otherProp')
                        property.textContent = `${key}: ${country[key]}`
                    }
                }
                countryDiv.appendChild(property)
            }
        }
        countryDiv.classList.add('countryCard')
        container.appendChild(countryDiv)
    }
}


mainScript()
