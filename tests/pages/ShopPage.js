class ShopPage {
 constructor(page){this.page=page;this.search=page.getByTestId('product-search')}
 async open(){await this.page.goto('/')}
 async addProduct(id){await this.page.getByTestId(`product-${id}`).getByRole('button',{name:'Add to bag'}).click()}
 async openBag(){await this.page.getByRole('button',{name:/Bag/}).click()}
}
module.exports={ShopPage};
