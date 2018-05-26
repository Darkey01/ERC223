const EIP20Token = artifacts.require("./EIP20Token.sol");
const Ico = artifacts.require("./Ico.sol");

contract('EIP20Token', function(accounts) {
  /*test question 1 */
  it("should put 1000000000 EIP20Token in the first account", function() {
    return EIP20Token.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000000000, "1000000000 wasn't in the first account");
    });
  });
  
  /*test question 2 */
  it("transfert ERC20 to first account", function () => {
    let token = await EIP20Token.deployed();
    await token.transfer(accounts[1], 1000);
    const balance = await token.balanceOf(accounts[1]);
    assert.equal(balance, 1000, "1000 wasn't in the first account");  
  });

  it("custom transfert to first account", async () => {
    let token = await EIP20Token.deployed();
    await token.transfer(accounts[1], 1000, { from: accounts[0] });
    const balance = await token.balanceOf(accounts[1]);
    assert.equal(balance, 2000, "2000 wasn't in the first account");  
  });

  });

});

/*Test du contrat ico*/

contract('Ico', function(accounts) {
  it("should give token to the account investing in the ICO", async function() {
	const ico = await Ico.deployed();
	
	const reyCoinAddress = await ico.tokenReceived();
	const reyCoin = ERC20Token.at(reyCoinAddress);
	
	const jeanAddress = await ico.tokenGiven();
	const jean = ERC20Token.at(jeanAddress);
	await jean.transfer(reyCoinAddress, 10000, {from : accounts[0]});
	
	await reyCoin.transfer(accounts[0], 10000,{from : accounts[1]} );
	
	const balance = await jean.balanceOf(accounts[1]);
	assert.equal(balance, 0, "Ico didn't give the token to the user");
  });
});



