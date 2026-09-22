const urlParams = new URLSearchParams(location.search)
const id = urlParams.get('foodId');
const page = urlParams.get('page');


if(page == 'menu'){
    getMenuItems("./item.json");
}else{
    getMenuItems('./data.json');
}

function getMenuItems(url){
fetch(url)
.then(response => response.json())
.then((data) => {
    const items = data.meals;
    items.map((item, index)=>{
        if(index == id){
            renderElements(item, index)
        }
    })
})
.catch(err => console.log(err.code));
}


function renderElements(item, index){
        const parentElement = document.querySelector('.checkOutFood');
        parentElement.innerHTML = `
            <div class="col-md-6 shadow-lg order-2 order-md-1">
                <div class="p-3">
                 <div class="img--box">
                    <img src="${item.strMealThumb}" alt="Ordering food">
                </div>
                <div class="mt-3 fst-italic leading-2 fs-5">
                        ${item['description'] ?? ""}
                </div>
            </div>
         </div>

         <div class="col-md-6 order-1 order-md-2">
                <div class="order--text--area">
                     <h5 class="mb-3">${item.strMeal}</h5>
                    <h5 class="price">Price : &#8377;${item['discountPrice'] || (80 + index)*3}</h5>
                <form action="./checkout.php?item=${item.strMeal}&price=${item['discountPrice'] || (80 + index)*3}&image=${item.strMealThumb}" method="post">
                <div class="form-group mb-1">
                    <label for="customerName">Your Name</label>
                    <input type="text"
                     name="userName" 
                     class="form-control"
                     required 
                     />
                </div>
                <div class="form-group mb-1">
                    <label for="customerPhone">Phone Number</label>
                    <input type="text"
                     name="customerPhone" 
                     class="form-control"
                     id="customerPhone"
                     required 
                     />

                    <div class="form-group mb-3">
                    <label for="customerDate">Select Table For</label>
                    <select name="itemCount" class="form-control" required>
                        <option value="">Number of Items?</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                     <button class="d-flex align-items-center gap-2 px-5 py-2 justify-content-center" type="submit">
                        <i class="fa fa-cart-shopping"> </i>
                    Buy Now</button>
                </form>
                </div>
         </div>
        
        `
}