const EIP20Token = artifacts.require("./EIP20Token.sol");
const Ico = artifacts.require("./Ico.sol");

module.exports = (deployer) => {
	let reyCoin;
	let jeanCoin;
	let ico;
	
	deployer.deploy(EIP20Token, 1000000000, "ReyCoin", 3, "Rcc").then(() => {
		return EIP20Token.deployed();
	}).then((res) => {
		reyCoin = res;
		return deployer.deploy(EIP20Token, 1000000000, "JeanCoin", 3, "Jcc");
	}).then(() => {
		return EIP20Token.deployed();
	}).then((res) => {
		jeanCoin = res;
		return deployer.deploy(Ico, reyCoin.address, jeanCoin.address);
	}).then(() => {
		return Ico.deployed();
	})
};
