const wallet = require('./controllers/controller')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

for (let i=1; i<5; i++) {
    test(`Test addMoney ${i}`, async () => {
        let user_id = getRandomInt(1000,2000);
        let amount = getRandomInt(10000,20000);
    
        let arr = await wallet._addMoney(user_id, amount);
        expect(arr[1]).toBe(1);
        expect(arr[0]).toEqual(expect.any(Number));
    
        await wallet._deleteMoney(arr[0]);
    });
    
    test(`Test getBalance ${i}`, async () => {
        let user_id = getRandomInt(1000,2000);
    
        let amount1 = getRandomInt(10000,20000);
        let amount2 = getRandomInt(10000,20000);
        let amount3 = getRandomInt(10000,20000);
    
        let arr1 = await wallet._addMoney(user_id, amount1);
        let arr2 = await wallet._addMoney(user_id, amount2);
        let arr3 = await wallet._addMoney(user_id, amount3);
    
        let record = await wallet._getBalance(user_id);
        expect(parseInt(record[0].balance)).toEqual(amount1 + amount2 + amount3);
    
        await wallet._deleteMoney(arr1[0]);
        await wallet._deleteMoney(arr2[0]);
        await wallet._deleteMoney(arr3[0]);
    });
}