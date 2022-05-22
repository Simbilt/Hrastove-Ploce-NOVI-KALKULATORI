console.log("Scripts loaded");

const roundPlateCalc = document.querySelector(".calcRoundPlate");
const submitBtnRp = document.querySelector(".submitBtnRp");
console.log(submitBtnRp);

const getPrice = async () => {
  if (!roundPlateCalc) return;
  const res = await fetch("../prices.json");
  const prices = await res.json();
  console.log(prices);
  const diameter = roundPlateCalc.querySelector(".diameterInput");
  const thickness = roundPlateCalc.querySelector(".thicknessInput").value;
  const classSelect = roundPlateCalc.querySelector(".classSelect").value;
  const spreadSelect = roundPlateCalc.querySelector(".spreadSelect");
  let newStaticPrice = prices[thickness][classSelect];
  if (!diameter && !thickness && !classSelect && !spreadSelect) return;
  newStaticPrice = Number(newStaticPrice);
  console.log(newStaticPrice);
  let displayedPrice =
    Number(diameter.value / 100) * Number(diameter.value / 100);
  console.log("DPB", displayedPrice);
  displayedPrice *= newStaticPrice;

  console.log("DP", displayedPrice);
  displayedPrice = Math.round(displayedPrice * 100) / 100;
  const priceSpan = roundPlateCalc.querySelector(".cenaop");
  if (!priceSpan) return;
  priceSpan.innerHTML = `${displayedPrice + Number(spreadSelect.value)}€`;
};
if (submitBtnRp) submitBtnRp.addEventListener("click", getPrice);

// {
//     const duzina = document.querySelector(".duzina");
//     const sirina = document.querySelector(".sirina");
//     const debljina = document.querySelector(".debljina");
//     const klasa = document.querySelector(".klasa");
//     const premaz = document.querySelector(".premaz")
//     const izracunaj = document.querySelector(".izracunaj")
//     const cena = document.querySelector(".cena")
//     const toniranje = document.querySelector(".toniranje");

//     // funkcija pokupi vrednosti iz inputa i upise u objekat
//     const getInputValues = () => {
//         return {
//             x: duzina.value,
//             y: sirina.value,
//             z: debljina.value,
//             klasa: klasa.value,
//             premaz: premaz.value,
//             toniranje: toniranje.value
//         }
//     }

//     // funkcija prima debljinu i klasu iz inputa i na osnovu odabranih parametara vraca cenu
//     const getType = (a, b) => {

//         let price = 0

//         switch (a + "|" + b) {
//             case "20|AB":
//                 price = 124,80;

//                 break;
//             case "20|BC":
//                 price = 84,24;

//                 break;

//             case "40|AB":
//                 price = 249,60;

//                 break;
//             case "40|BC":
//                 price = 168,48;

//                 break;
//             default:
//                 console.log("error")
//                 break;
//         }

//         return price
//     }
//     //funkcija uzima potrebne parametre izracunava cenu na osnovu duzine ploce i upisuje u h2
//     const priceCalculation = () => {

//         const { x, y, z, klasa, premaz, toniranje } = getInputValues()
//         const price = getType(z, klasa)
//         // zaokruzi na 10 cm
//         const adjustDimension = (dimension) => {
//             const dim = dimension / 10
//             const roundDimension = Math.ceil(dim)
//             return roundDimension / 10
//         }

//         let length = adjustDimension(x)
//         let width = adjustDimension(y)
//         let height = parseInt(z) / 1000

//         let surfaceArea = length * width
//         let sideSurface = height * (length + width) // ukupna povrsina bocnih strana

//         const calcForDimensions = (l, price) => {
//             return (price + l * price)
//         }

//         if (length <= 2) {
//             cena.innerHTML = (Math.floor((surfaceArea * (price + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
//         } else if ((length > 2) && (length < 3)) {
//             cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.2, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
//         } else if ((length >= 3) && (length < 4)) {
//             cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.3, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
//         } else if ((length >= 4) && (length < 5)) {
//             cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.4, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
//         } else if (length === 5) {
//             cena.innerHTML = (Math.floor((surfaceArea * (calcForDimensions(0.5, price) + parseInt(premaz) + parseInt(toniranje)) + sideSurface * parseInt(premaz) + parseInt(toniranje)) * 100) / 100) + " evra"
//         } else {
//             cena.innerHTML = "max 5m"
//         }

//     }
//     duzina.addEventListener("change", () => {
//         const { x } = getInputValues()
//         if (x > 500) {
//             duzina.value = 500;
//         }
//     })
//     sirina.addEventListener("change", () => {
//         const { y } = getInputValues()
//         if (y > 500) {
//             sirina.value = 500;
//         }
//     })

//     izracunaj.addEventListener("click", () => {
//         const { x, y } = getInputValues()
//         if (x && y) {
//             duzina.classList.add("invalid");
//             sirina.classList.add("invalid");
//             return
//         }
//         else if (x) {
//             duzina.classList.add("invalid");

//         }
//         else if (y) {
//             sirina.classList.add("invalid");
//         }
//         else {
//             duzina.classList.remove("invalid");
//             sirina.classList.remove("invalid");

//             priceCalculation()
//         }
//     })

// }
