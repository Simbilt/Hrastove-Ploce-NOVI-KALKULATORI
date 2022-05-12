console.log("script loaded");

const ppCalc = document.querySelector(".pp_calc");
const ppSumbitButton = document.querySelector(".pp_submit");
console.log(ppSumbitButton);

const getPricePP = async () => {
  if (!ppCalc) return;
  const resPP = await fetch("../pricesPP.JSON");
  const pricesPP = await resPP.json();
  const widthPP = ppCalc.querySelector(".widthPP");
  const lengthPP = ppCalc.querySelector(".lengthPP");
  const thicknesPP = ppCalc.querySelector(".thicknessPP").value;
  const classSelectPP = ppCalc.querySelector(".classSelectPP").value;
  const spreadSelectPP = ppCalc.querySelector(".spreadSelectPP");
  let newStaticPricePP = pricesPP[thicknesPP][classSelectPP];
  if (!widthPP && !lengthPP && !classSelectPP && !spreadSelectPP) return;
  newStaticPricePP = Number(newStaticPricePP);
  let displayedPricePP =
    Number(widthPP.value / 100) *
    Number(lengthPP.value / 100) *
    newStaticPricePP;
  console.log(displayedPricePP);
  displayedPricePP = Math.round(displayedPricePP * 100) / 100;
  const priceSpan = ppCalc.querySelector(".cenaPP");
  if (!priceSpan) return;
  priceSpan.innerHTML = `${displayedPricePP + Number(spreadSelectPP.value)}€`;
};
if (ppSumbitButton) ppSumbitButton.addEventListener("click", getPricePP);

/*{
    const duzina = document.querySelector(".duzinapp");
    const sirina = document.querySelector(".sirinapp");
    const debljina = document.querySelector(".debljinapp");
    const klasa = document.querySelector(".klasapp");
    const premaz = document.querySelector(".premazpp");
    const izracunaj = document.querySelector(".izracunajpp");
    const cena = document.querySelector(".cenapp");
    const toniranje = document.querySelector(".toniranjepp");

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
                price = 162,24;

                break;
            case "20|BC":
                price = 109,51;

                break;

            case "40|AB":
                price = 324,48;

                break;
            case "40|BC":
                price = 219,02;

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
            cena.innerHTML = (Math.floor((surfaceArea * (price + parseInt(premaz) +  parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
        } else if ((length > 2) && (length < 3)) {
            cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.2, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
        } else if ((length >= 3) && (length < 4)) {
            cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.3, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
        } else if ((length >= 4) && (length < 5)) {
            cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.4, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
        } else if (length === 5) {
            cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.5, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
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
