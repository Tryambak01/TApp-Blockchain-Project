window.ethereum.enable();
var provider = new ethers.providers.Web3Provider(
  web3.currentProvider,
  "ropsten"
);
//change this address to that of calculator contract
var pragmaAddress = "0x33fAD7124a5c3A6Bd618bDEF90EDC85BfAE7cCC5";
let pragmaABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "costPrice",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "vegetable",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "goodQnty",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "badQnty",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "price",
				"type": "int256"
			}
		],
		"name": "evaluate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "netProfit",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalLoss",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

provider.listAccounts().then(function (accounts) {
  signer = provider.getSigner(accounts[0]);
  Pragma = new ethers.Contract(
    pragmaAddress,
    pragmaABI,
    signer
  );
});

async function onSubmit() {
//   document.getElementById("modalbody").innerHTML = `Loading...`;j
    console.log("Im here",Pragma);
  vegetable = $("#vegetables").val();
  goodQuantity = $("#goodQuantity").val();
  badQuantity = $("#badQuantity").val();
  pricePerUnit = $("#perUnitPrice").val();
  getResultPromise = Pragma.evaluate(
    vegetable,
    goodQuantity,
    badQuantity,
    pricePerUnit
  );
  var result = await getResultPromise;
}

async function onViewResult() {
    document.getElementById("costPrice").innerHTML = "Loading...";
    document.getElementById("NetPNL").innerHTML = "Loading...";
    document.getElementById("totalLoss").innerHTML = "Loading...";
    console.log("Im here")
  getResultPromise = Pragma.netProfit();
  var result = await getResultPromise;
  getNetPrice = Pragma.costPrice();
  var netPrice = await getNetPrice;
  totalLoss = Pragma.totalLoss();
  getTotalLoss = await totalLoss;
  console.log(result, netPrice, totalLoss);
  document.getElementById("costPrice").innerHTML = netPrice;
  document.getElementById("NetPNL").innerHTML = result;
  document.getElementById("totalLoss").innerHTML = getTotalLoss;

}
