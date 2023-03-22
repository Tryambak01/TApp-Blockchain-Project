// SPDX-License-Identifier: GPL-3.
pragma solidity ^0.5.0;

contract Pragma {
    
    struct Veggies {
        int goodQnty;
        int badQnty;
        int price;
        int totalVegetables;
        int BuyingPrice;
        int profitAndLoss;
        int sbd;
        int lbd;
    }

    mapping (string => Veggies) veggies;

    int TotalBuyingPrice;
    int profitAndLossAll;
    int lossOnAll;

    function evaluate(string memory vegetable, int goodQnty, int badQnty, int price) public {
        Veggies storage veggie = veggies[vegetable];
        veggie.goodQnty = goodQnty;
        veggie.badQnty = badQnty;
        veggie.price = price;
        veggie.totalVegetables = goodQnty + badQnty;
        veggie.BuyingPrice = veggie.totalVegetables * price;
        veggie.sbd = veggie.badQnty * (price/2);
        veggie.profitAndLoss = (goodQnty * (price + 20) + veggie.sbd) - veggie.BuyingPrice;
        veggie.lbd = veggie.badQnty * (price/2);


        TotalBuyingPrice += veggie.BuyingPrice;
        profitAndLossAll += veggie.profitAndLoss;
        lossOnAll += veggie.lbd;
    }

    function costPrice() public view returns (int) {
        return TotalBuyingPrice;
    }

    function netProfit() public view returns (int) {
        return profitAndLossAll;
    }

     function totalLoss() public view returns (int) {
        return lossOnAll;
    }


}