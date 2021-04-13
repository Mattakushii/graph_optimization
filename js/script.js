const select = document.getElementById("exercise")
const exerciseTitle = document.getElementById("exercise_text")
const container = document.getElementById("container")

const createBtn = document.getElementById("createBtn")
const calcBtn = document.getElementById("calc")

const dimension = document.getElementById("dimension")
const matrix = document.getElementById("matrix")

const result = document.getElementById("result")

let SELECTED_EXERCISE = ''

const exercisesText = {
    ex1: "По заданной квадратной матрице n×n из нулей и единиц определите, может ли данная матрица быть матрицей смежности простого неориентированного графа.",
    ex2: "По заданной матрице смежности неориентированного графа определите, содержит ли он петли.",
    ex3: "Простой неориентированный граф задан матрицей смежности. Найдите количество ребер в графе.",
    ex4: "Ориентированный граф задан матрицей смежности. Найдите количество ребер в графе.",
    ex5: "Простой ориентированный граф задан матрицей смежности, выведите его представление в виде списка ребер.",
    ex6: "Неориентированный граф задан списком ребер. Проверьте, содержит ли он параллельные ребра",
    ex7: "Неориентированный граф задан списком ребер. Найдите степени всех вершин графа.",
}

select.addEventListener("change", (e) => {
    SELECTED_EXERCISE = e.target.value
    selectExercise(e.target.value)
})

createBtn.onclick = () => createMatrix()

calcBtn.onclick = () => calcMatrix()

const clearAnswer = () => result.innerText = ""

const selectExercise = (exNumber) => {
    clearAnswer()
    exerciseTitle.innerText = exercisesText[exNumber]
    container.style.display = "block"
}

const createMatrix = () => {
    clearAnswer()
    matrix.innerHTML = ''
    tbl = document.createElement('table');
    tbl.id = 'table'

    let tableMarkup = "<table>"

    for (let i = 0; i < dimension.value; i++) {
        tableMarkup = tableMarkup + "<tr>"
        for (let i = 0; i < dimension.value; i++) {
            tableMarkup = tableMarkup + "<td><input style='width: 30px; height: 30px' type='text' class='input'></td>"
        }
        tableMarkup = tableMarkup + "</tr>"
    }

    tableMarkup = tableMarkup + "</table>"
    matrix.innerHTML = tableMarkup;
}

const tableToMatrix = () => {
    const tableNode = document.getElementsByClassName("input")
    let ARRAY = []
    const MATRIX = []

    for (let i = 0; i < tableNode.length; i++) {
        ARRAY.push(tableNode[i].value)
    }

    for (let i = 0; i < ARRAY.length; i += +dimension.value) {
        MATRIX.push(ARRAY.slice(i, i + +dimension.value))
    }

    return MATRIX
}

const calcMatrix = () => {
    switch (SELECTED_EXERCISE) {
        case "ex1":
            clearAnswer()
            ex1()
            break;
        case "ex2":
            clearAnswer()
            ex2()
            break;
        case "ex3":
            clearAnswer()
            ex3()
            break;
        case "ex4":
            clearAnswer()
            ex4()
            break;
        case "ex5":
            clearAnswer()
            ex5()
            break;
        case "ex6":
            clearAnswer()
            ex6()
            break;
        case "ex7":
            clearAnswer()
            ex7()
            break;
        default:
            return
    }
}


function ex1() {
    const matrix = tableToMatrix()
    console.log(matrix);
    let k = 0;
    let z = 0;

    for (var i = 0; i < +dimension.value; i++) {
        if (matrix[i][i] != 0) {
            break;
        }
        for (j = 0; j < +dimension.value; j++) {
            if (matrix[i][j] != matrix[j][i]) {
                break;
            }
        }
        if (j < +dimension.value) {
            break;
        }
    }

    for (let i = 0; i < +dimension.value; i++) {
        for (let j = 0; j < +dimension.value; j++) {
            if (matrix[i][i] != 0) {
                k = 9999;
            }
            if (matrix[i][j] == matrix[j][i]) {
                k++;
            }
        }
    }

    for (i = 0; i < +dimension.value; i++)
        for (j = 0; j < +dimension.value; j++) {
            if (i == j && matrix[i][j] == 1) z++;
        }

    if (k != +dimension.value * +dimension.value) {
        result.innerText = "Данная матрица не может быть матрицей смежности простого неориентированного графа"
    } else {
        result.innerText = "Данная матрица может быть матрицей смежности простого неориентированного графа"
    }
}

const ex2 = () => {
    const matrix = tableToMatrix()
    let answer = ""

    for (i = 0; i < +dimension.value; i++)
        for (j = 0; j < +dimension.value; j++) {
            if (i == j && matrix[i][j] == 1) {
                answer += ("Петля в " + i + " " + j + "<br>");
            }
        }

    result.innerHTML = answer
}

const ex3 = () => {
    const matrix = tableToMatrix()

    let k = 0;

    for (i = 0; i < +dimension.value; i++) {
        for (j = 0; j < +dimension.value; j++) {
            if (matrix[i][j] == 1) k++;
        }
    }
    result.innerText = `Количество ребер: ${k / 2}`
}

const ex4 = () => {
    const matrix = tableToMatrix()

    let k = 0;

    for (i = 0; i < +dimension.value; i++) {
        for (j = 0; j < +dimension.value; j++) {
            if (matrix[i][j] == 1) k++;
        }
    }
    result.innerText = `Количество ребер: ${k}`
}

const ex5 = () => {
    const matrix = tableToMatrix()

    let answer = "Список ребер:" + "<br>"

    for (let i = 0; i < +dimension.value; i++) {
        for (let j = 0; j < +dimension.value; j++) {
            if (matrix[i][j] == 1) {
                answer += `${i + 1}  ${j + 1}<br>`;
            }
        }
    }

    result.innerHTML = answer
}

const ex6 = () => {
    const matrix = tableToMatrix()

    parallelEdges = false;

    for (let i = 0; i < +dimension.value; i++) {
        for (let j = 1; j < +dimension.value; j++) {
            if (i != j) {
                if (matrix[i].sort().join() == matrix[j].sort().join()) {
                    parallelEdges = true;
                    break;
                }
            }
        }
    }

    if (parallelEdges == true) {
        result.innerText = "Граф содержит параллельные ребра";
    } else {
        result.innerText = "Граф не содержит параллельные ребра";
    }
}

const ex7 = () => {
    const matrix = tableToMatrix()

    let m = matrixArray(+dimension.value, +dimension.value);
    let answerRow = [];

    for (let i = 0; i < +dimension.value; i++) {
        answerRow[i] = 0;
    }

    for (let i = 0; i < +dimension.value; i++) {
        m[matrix[i][0]][matrix[i][1]] = 1;
        m[matrix[i][1]][matrix[i][0]] = 1;
    }

    for (let i = 0; i < +dimension.value; i++) {
        for (let j = 0; j < +dimension.value; j++) {
            if (m[i][j] == 1) {
                if (i == j) {
                    answerRow[i] = answerRow[i] + 2;
                } else {
                    answerRow[i] = answerRow[i] + 1;
                }
            }
        }
    }

    result.innerHTML = `Список степеней вершин ${answerRow}`;

    console.log(m, answerRow);
}

const matrixArray = (rows, columns) => {
    let arr = new Array();
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}


