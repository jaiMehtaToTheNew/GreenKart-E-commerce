const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function app(){
 const nodes=new Map();
 const get=selector=>{
  if(!nodes.has(selector))nodes.set(selector,{value:'',textContent:'',hidden:true,attributes:{},setAttribute(key,value){this.attributes[key]=value},removeAttribute(key){delete this.attributes[key]},focus(){this.focused=true}});
  return nodes.get(selector);
 };
 let saved;
 const context=vm.createContext({document:{querySelector:get,addEventListener(){}},localStorage:{getItem:()=>null,setItem:(key,value)=>{saved=value}},window:{addEventListener(){},scrollTo(){}},location:{hash:'#/cart'},setTimeout,clearTimeout});
 const source=fs.readFileSync(path.join(__dirname,'../../dist/app.js'),'utf8').replace('persist();route();','persist();');
 vm.runInContext(source,context);
 return {run:code=>vm.runInContext(code,context),get,saved:()=>JSON.parse(saved)};
}
test('shop quantity controls accept whole numbers and disable their limits',()=>{
 const a=app();
 a.run("updateQuantity(0,'shop','99')");
 assert.equal(a.run('quantities[0]'),99);
 assert.equal(a.get('[data-step="1"][data-id="0"][data-context="shop"]').disabled,true);
 a.run("updateQuantity(0,'shop',1)");
 assert.equal(a.get('[data-step="-1"][data-id="0"][data-context="shop"]').disabled,true);
 assert.equal(a.get('[data-step="1"][data-id="0"][data-context="shop"]').disabled,false);
});
test('invalid quantities preserve the prior value and valid changes clear errors',()=>{
 const a=app();a.run("updateQuantity(0,'shop',4)");
 for(const value of ['',0,-1,100,2.5,'abc']){
  a.run(`updateQuantity(0,'shop',${JSON.stringify(value)})`);
  assert.equal(a.run('quantities[0]'),4);
  assert.equal(a.get('[data-qty="0"][data-context="shop"]').value,4);
  assert.equal(a.get('#quantity-error-shop-0').hidden,false);
 }
 a.run("updateQuantity(0,'shop',5)");
 assert.equal(a.get('#quantity-error-shop-0').hidden,true);
 assert.equal(a.get('[data-qty="0"][data-context="shop"]').attributes['aria-invalid'],undefined);
});
test('cart quantity changes update persisted quantities, count, discount and totals',()=>{
 const a=app();a.run('cart={0:1,1:1};promo=true');
 a.run("updateQuantity(0,'cart','3')");
 assert.equal(a.run('count()'),4);
 assert.equal(a.run('subtotal()'),540);
 assert.equal(a.run('total()'),486);
 assert.deepEqual(a.saved(),{0:3,1:1});
 assert.equal(a.get('#headerTotal').textContent,'₹486');
 assert.equal(a.get('[data-qty="0"][data-context="cart"]').focused,true);
 a.run("updateQuantity(0,'cart',0)");
 assert.equal(a.run('cart[0]'),3);
 assert.equal(a.run('total()'),486);
});
