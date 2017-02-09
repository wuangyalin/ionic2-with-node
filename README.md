# ionic2-with-node
##Description
This app is aimming to practice the integration between sever side (node) and front-end side.
###Server Side
---
Crawler the promotion products on [Chemist Warehouse](https://www.chemistwarehouse.com.au/Shop-Online/3000/Promotions) and return a json file.

###Front-end Side
---
Request to get the result from server and show the products.

###Usage
---
1. Open terminal, in <b>server</b> folder. Run the following command.
```
npm install
```
then
```
node app.js
```
2. Open another terminal tag, in <b>chemist_promotion</b>.
```
npm install
```
then
```
ionic serve
```
Then you can see the result.
###<span style="color:red;">Notice</span>
According to aviod cross-domain problem, I set the proxy in 'ionic.config.json' file.
If you want to run on real devices, you need to remove the proxy.
