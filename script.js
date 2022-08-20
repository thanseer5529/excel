let view = document.getElementById("view");
let edit = document.getElementById("edit");
let cells = Array.from(document.querySelectorAll("input"));

let val1 = "A1";
let op1 = "+";
let val2 = "A3";

edit.addEventListener("click", (elem) => {
  cells.forEach((cell) => {
    cell.removeAttribute("disabled");
  });
});
view.addEventListener("click", (elem) => {
  cells.forEach((cell) => {
    cell.setAttribute("disabled", "disabled");
  });
});

cells.forEach((cell) => {
  cell.addEventListener("change", (elem) => {
    // elem.preventDefault()

    let value = elem.target.value;
    if (value != "Infinity") {
      try {
        if (value.startsWith("=")) {
          // =A1+A2
          const test = "/[A-B]/";
          let pattern = /^=[A-Z][1-3][\+\*\-\/\%][A-Z][1-3]$/;
          let result = value.match(/^=([A-Z][1-3])([\+\*\-\/\%])([A-Z][1-3])$/);
          console.log(result);
          if (result === null) throw Error;
          else {
            let value1 = result[1];
            let operator = result[2];
            let value2 = result[3];
            value1 = document.getElementById(value1).value;
            value2 = document.getElementById(value2).value;
            console.log(value1, value2, "values");
            res = eval(value1 + operator + value2);
            console.log(res);

            if (!isNaN(res) || res == "") {
              console.log("number");
              if (Math.abs(res) < 1.0) {
                var e = parseInt(res.toString().split("e-")[1]);
                if (e) {
                  res *= Math.pow(10, e - 1);
                  res =
                    "0." + new Array(e).join("0") + res.toString().substring(2);
                }
              } else {
                var e = parseInt(res.toString().split("+")[1]);
                if (e > 20) {
                  e -= 20;
                  res /= Math.pow(10, e);
                  res += new Array(e + 1).join("0");
                }
              }
              elem.target.value = res;
            } else {
              throw Error;
            }
          }
        } else {
          let pattern = /^\d{1,}$/;
          let result = value.match(pattern);
          console.log(result, value);
          if (result === null) throw Error;
          else {
            console.log("its a number");
          }
        }
      } catch (e) {
        console.log("error", e);
        elem.target.value = "Error";
      }
    } else {
      elem.target.value = "";
    }
  });
  cell.addEventListener("click", (elem) => {
    console.log("cvlicked");
    elem.target.value = "";
  });
});
