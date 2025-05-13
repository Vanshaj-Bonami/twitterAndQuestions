const n = 5;
let pascalsTriangle = [];

for (let row = 0; row < n; row++) {
    pascalsTriangle[row] = [];
    for (let col = 0; col <= row; col++) {
        if (col == 0 || col == row) {
            pascalsTriangle[row][col] = 1;
        }else {
            pascalsTriangle[row][col] = pascalsTriangle[row-1][col-1] + pascalsTriangle[row-1][col]
        }
    }
}

// console.log(pascalsTriangle)
pascalsTriangle.forEach((item)=>console.log(item.join(" ")))