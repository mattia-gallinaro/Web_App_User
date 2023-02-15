const columnDefs = [
];

// specify the data
const rowData = [
];
let result = null;
// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  enableSorting: true,
  enableFilter: true,
  pagination: true
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => { 
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
  const columnDefs = gridOptions.api.getColumnDefs();
  columnDefs.length =0;
  const response = fetch('http://localhost/food-api/API/product/getArchiveProducts.php')
  .then((result) => result.json())
  .then((products) => {result = Object.keys(products[0]);
    result.forEach(key => columnDefs.push({field: key}))
    gridOptions.api.setColumnDefs(columnDefs);
    gridOptions.api.setRowData(products);});
  console.log(response);
  
});

