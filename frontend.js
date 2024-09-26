
const form = document.querySelector("form");
const resultClass = document.querySelector(".result");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const a = form.first.value;
    const b = form.second.value;
    // const result = first + second;
    
    const domAnswer = 0;
    const answer = fetch("http://192.168.2.5:3000/sum/?a="+ a +"&b="+b)
    .then(res=>res.text())
    .then(ans=>{
        const result = document.createElement("p");
        result.textContent = `Sum of ${a} + ${b} is ${ans}`;
        resultClass.appendChild(result)
        console.log(ans)
    });

    // console.log(domAnswer)
})