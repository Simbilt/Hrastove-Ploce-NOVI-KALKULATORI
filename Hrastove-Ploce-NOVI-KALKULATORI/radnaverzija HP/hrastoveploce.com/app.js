console.log("script loaded");

const hpCalc = document.querySelector(".hp_calc");
const hpSumbitButton = document.querySelector(".hp_submit");
//console.log(hpSumbitButton);
let newStaticPriceHP = 0;

window.addEventListener("load", () => {
  const widthInput = document.querySelector(".widthInput");
  const lenthInput = document.querySelector(".lengthInput");
  if (!widthInput && !lenthInput) return;
  widthInput.addEventListener("change", () => {
    if (Number(widthInput.value) > 150) {
      widthInput.value = "150";
    }
  });
  lenthInput.addEventListener("change", () => {
    lenthInput.value = Math.ceil(Number(lenthInput.value) / 10) * 10;
    if (Number(lenthInput.value) > 500) lenthInput.value = "500";
  });
});
const getPriceHP = async () => {
  if (!hpCalc) return;
  const resHP = await fetch("../pricesHP.json");
  const pricesHP = await resHP.json();
  //console.log(pricesHP);
  const widthHP = hpCalc.querySelector(".widthInput");
  const lengthHP = hpCalc.querySelector(".lengthInput");
  const thicknesHP = hpCalc.querySelector(".thicknessHP").value;
  const classSelectHP = hpCalc.querySelector(".classSelectHp").value;
  const spreadSelectHP = hpCalc.querySelector(".spreadSelectHP");
  const tonningSelect = ppCalc.querySelector(".toniranjepp");

  let displayedPrice =
  Number(widthHP.value / 100) * Number(lengthHP.value / 100);

  let lengthNumber;
  if (displayedPrice > 0 && displayedPrice < 2) lengthNumber = 1;
  if (displayedPrice >= 2 && displayedPrice < 3) lengthNumber = 2;
  if (displayedPrice >= 3 && displayedPrice < 4) lengthNumber = 3;
  if (displayedPrice >= 4 && displayedPrice < 5) lengthNumber = 4;
  if (displayedPrice == 5) lengthNumber = 5;
  if (displayedPrice > 5) lengthNumber = 5;

  let newStaticPriceHP = pricesHP[lengthNumber][thicknesHP][classSelectHP];


  //   console.log(newStaticPriceHP);
  if (!widthHP && !lengthHP && !classSelectHP && !spreadSelectHP) return;
  newStaticPriceHP = Number(newStaticPriceHP);
  let displayedPriceHP =
    Number(widthHP.value / 100) *
    Number(lengthHP.value / 100) *
    newStaticPriceHP;
  displayedPriceHP = Math.round(displayedPriceHP * 100) / 100;

  
  if (spreadSelectHP.value > 0 || tonningSelect.value > 0) {
    const first = (Number(widthHP.value/100) + Number(thicknesHP/1000))
    const second = (Number(lengthHP.value/100) + Number(thicknesHP/1000))


    const third = (first * second) * 2;
    console.log(third)
    console.log(newStaticPriceHP)
  displayedPrice =  third * newStaticPriceHP;
  console.log(displayedPrice)
}

console.log(displayedPrice)
  const priceSpan = hpCalc.querySelector(".cenaHP");
  if (!priceSpan) return;
  priceSpan.innerHTML = `${displayedPriceHP + Number(spreadSelectHP.value)}€`;
};
if (hpSumbitButton) hpSumbitButton.addEventListener("click", getPriceHP);

/*{


    const duzina = document.querySelector(".duzina");
    const sirina = document.querySelector(".sirina");
    const debljina = document.querySelector(".debljina");
    const klasa = document.querySelector(".klasa");
    const premaz = document.querySelector(".premaz")
    const izracunaj = document.querySelector(".izracunaj")
    const cena = document.querySelector(".cena")
    const toniranje = document.querySelector(".toniranje");

    // funkcija pokupi vrednosti iz inputa i upise u objekat  
    const getInputValues = () => {
        return {
            x: duzina.value,
            y: sirina.value,
            z: debljina.value,
            klasa: klasa.value,
            premaz: premaz.value,
            toniranje: toniranje.value
        }
    }

    // funkcija prima debljinu i klasu iz inputa i na osnovu odabranih parametara vraca cenu 
    const getType = (a, b) => {

        let price = 0


        switch (a + "|" + b) {
            case "20|AB":
                price = 104;

                break;
            case "20|BC":
                price = 70;

                break;

            case "40|AB":
                price = 208;

                break;
            case "40|BC":
                price = 140;

                break;
            default:
                console.log("error")
                break;
        }

        return price
    }
    //funkcija uzima potrebne parametre izracunava cenu na osnovu duzine ploce i upisuje u h2
    const priceCalculation = () => {

        const { x, y, z, klasa, premaz, toniranje } = getInputValues()
        const price = getType(z, klasa)
        // zaokruzi na 10 cm 
        const adjustDimension = (dimension) => {
            const dim = dimension / 10
            const roundDimension = Math.ceil(dim)
            return roundDimension / 10
        }

        let length = adjustDimension(x)
        let width = Math.ceil(y) / 100
        let height = parseInt(z) / 1000

        let surfaceArea = length * width
        let sideSurface = height * (length + width) // ukupna povrsina bocnih strana 

        const calcForDimensions = (l, price) => {
            return (price + l * price)
        }

        if (length <= 2) {
            cena.innerHTML = (Math.floor((((surfaceArea * (price + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje))* 20 / 100) + price) * 100) / 100) + " evra"
        } else if ((length > 2) && (length < 3)) {
            cena.innerHTML = (Math.floor(((surfaceArea * (calcForDimensions(0.2, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) * 20 / 100) + price + " evra"
        } else if ((length >= 3) && (length < 4)) {
            cena.innerHTML = (Math.floor(((surfaceArea * (calcForDimensions(0.3, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) * 20 / 100) + price + " evra"
        } else if ((length >= 4) && (length < 5)) {
            cena.innerHTML = (Math.floor(((surfaceArea * (calcForDimensions(0.4, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) * 20 / 100) + price + " evra"
        } else if (length === 5) {
            cena.innerHTML = (Math.floor(((surfaceArea * (calcForDimensions(0.5, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) * 20 / 100) + price + " evra"
        } else {
            cena.innerHTML = "max 5m"
        }

    }
    duzina.addEventListener("change", () => {
        const { x } = getInputValues()
        if (x > 500) {
            duzina.value = 500;
        }
    })
    sirina.addEventListener("change", () => {
        const { y } = getInputValues()
        if (y > 150) {
            sirina.value = 150;
        }
    })

    izracunaj.addEventListener("click", () => {
        const { x, y } = getInputValues()
        if (!x && !y) {
            duzina.classList.add("invalid");
            sirina.classList.add("invalid");
            return
        }
        else if (!x) {
            duzina.classList.add("invalid");

        }
        else if (!y) {
            sirina.classList.add("invalid");
        }
        else {
            duzina.classList.remove("invalid");
            sirina.classList.remove("invalid");

            priceCalculation()
        }
    })





}*/
