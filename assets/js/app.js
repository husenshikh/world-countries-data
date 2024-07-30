const cl = console.log;

const countryContainer = document.getElementById("countryContainer");
const button = [...document.querySelectorAll(".button")];
const nameicon = document.getElementById("nameicon");
const search = document.getElementById("search");
const icon = document.getElementById("icon");
const upbtn = document.getElementById("upbtn");
const populatedcountry = document.getElementById("populated-container");
const langcountry = document.getElementById("language-container");
const tabb = [...document.querySelectorAll(".tabb")];
const changetext = document.getElementById("changetext");


const countryTemplating = eve => {
    let result = " "
    eve.forEach(ele => {
        result += `
                    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <figure>
                                    <img src="${ele.flag}" alt="country" title="country">
                                    <figcaption class="p-3">
                                        <h4>${ele.name}</h4>
                                        <em>Capital : ${ele.capital}</em><br>
                                        <em>Languages : ${ele.languages}</em><br>
                                        <em>Population : ${ele.population}</em>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                `
        countryContainer.innerHTML = result;
    });
}
countries.forEach(ele => ele.capital ? ele.capital : ele.capital = "NA")
countryTemplating(countries);

const templating = (btn,icon) => {
    if(btn === "name"){
        if(icon.className.includes("fa-arrow-down")){
            let ascendingarr = countries.sort((a,b) => a.name.localeCompare(b.name));
            // let ascendingarr = countries.sort((a,b) => a.name > b.name ? 1 : -1);
            countryTemplating(ascendingarr);
            icon.classList.toggle("fa-arrow-down");
            icon.classList.toggle("fa-arrow-up");
        }else{
            let descendingarr = countries.sort((a,b) => b.name.localeCompare(a.name));
            // let descendingarr = countries.sort((a,b) => b.name < a.name ? -1 : 1);
            countryTemplating(descendingarr);
            icon.classList.toggle("fa-arrow-up");
            icon.classList.toggle("fa-arrow-down");
        }
    }else if(btn === "capital"){
        if(icon.className.includes("fa-arrow-down")){
            let ascendingarr = countries.sort((a,b) => a.capital.localeCompare(b.capital));
            // let ascendingarr = countries.sort((a,b) => a.capital > b.capital ? 1 : -1);
            countryTemplating(ascendingarr);
            icon.classList.toggle("fa-arrow-down");
            icon.classList.toggle("fa-arrow-up");
        }else{
            let descendingarr = countries.sort((a,b) => b.capital.localeCompare(a.capital));
            // let descendingarr = countries.sort((a,b) => b.capital < a.capital ? -1 : 1);
            countryTemplating(descendingarr);
            icon.classList.toggle("fa-arrow-up");
            icon.classList.toggle("fa-arrow-down");
        }
    }else if(btn === "population"){
        if(icon.className.includes("fa-arrow-down")){
            let ascendingarr = countries.sort((a,b) => a.population > b.population ? 1 : -1);
            countryTemplating(ascendingarr);
            icon.classList.toggle("fa-arrow-down");
            icon.classList.toggle("fa-arrow-up");
        }else{
            let descendingarr = countries.sort((a,b) => b.population < a.population ? -1 : 1);
            countryTemplating(descendingarr);
            icon.classList.toggle("fa-arrow-up");
            icon.classList.toggle("fa-arrow-down");
        }
    }


    
        

}

const oncountryEnter = (e) => {
	let enteredValue = e.target.value;
	let NewCountryArray = countries.filter(ele =>{
        let cardname = ele.name.toLowerCase().includes(enteredValue);
        let cardcapital = ele.capital.toLowerCase().includes(enteredValue);
        let cardlang = ele.languages.find(ele => ele.toLowerCase().includes(enteredValue));
        let card = cardname || cardcapital || cardlang;
        return card;
	})
	countryTemplating(NewCountryArray);
}

const onClick = (eve) => {
    let btn = eve.target.innerText.trim();
    let icon = eve.target.children[0];
    icon.classList.remove("d-none");
    templating(btn,icon)
}

button.forEach(ele => {
    return ele.addEventListener("click", onClick);
});


const populationtemp = eve => {
    let div = document.createElement("div");
    div.className = "max-population-list w-100 d-flex justify-content-between align-items-center mb-3";
    div.innerHTML = `
                    <span>${eve.name}</span>
                        <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${eve.percentage}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    <span>${eve.population}</span>
    `
    populatedcountry.append(div);
}

const highestpopulatedcountry = countries.sort((a,b) => {
   return b.population < a.population ? -1 : 1;
}).filter((num, index) => {
   return index < 11;
}).map(ele => {
    const countrypopulation = ele.population;
    const worldpopulation = 7693165599;
    let newobj = {
        name : ele.name,
        population: countrypopulation.toLocaleString(),
        percentage : ((countrypopulation/worldpopulation) * 100)
    }
    populationtemp(newobj);
})

tabb.forEach(ele => {
    ele.addEventListener('click', eve => {
        langcountry.classList.add("d-none");
        populatedcountry.classList.add("d-none");
        if(eve.target.innerText.toLowerCase() === "population"){
            changetext.innerText = "10 Most populated countries"
            populatedcountry.classList.remove("d-none");
        }else{
            changetext.innerText = "Top 10 languages in countries"
            langcountry.classList.remove("d-none");
        }
    })
})

window.onscroll = function() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        upbtn.style.display = "block";
    } else {
        upbtn.style.display = "none";
    }
};
search.addEventListener("keyup", oncountryEnter)
icon.addEventListener("click", () => {
    window.scrollTo(0, document.body.scrollHeight);
})
upbtn.addEventListener("click", (e) => {
    window.scrollTo(0, 0);
})