const Cats = artifacts.require('Cats');

contract('Cats', function ([owner, anotherAccount]) {
  let token;

  const _name = 'Cats';
  const _symbol = 'CAT';

  beforeEach(async function () {
    token = await Cats.new({ from: owner });
  });

  describe('token details', function () {
    it('has a name', async function () {
      const name = await token.name();
      assert.equal(name, _name);
    });

    it('has a symbol', async function () {
      const symbol = await token.symbol();
      assert.equal(symbol, _symbol);
    });

    it('has a 0 total supply', async function () {
      const totalSupply = await token.totalSupply();
      assert(totalSupply.eq(0));
    });
  
    it('has a 0 owner supply', async function () {
      const ownerBalance = await token.balanceOf(owner);
      assert(ownerBalance.eq(0));
    });
    
  });

  describe('token minting', function () {
    const from = owner;
    const firstTokenId = 1;
    const secondTokenId = 2;

    it('can mint to owner', async function () {
      await token.mint(owner, firstTokenId, { from });

      const balance = await token.balanceOf(owner);
      assert.equal(balance, 1);
    });

    it('can mint to another account', async function () {
      await token.mint(anotherAccount, secondTokenId, { from });

      const balance = await token.balanceOf(anotherAccount);
      assert.equal(balance, 1);
    });

  //   it('cannot mint after minting stopped', async function () {
  //     await token.finishMinting({ from});

  //     try {
  //       await token.mint(owner, amount, { from });

  //       assert.fail('Expected revert not received');
  //     } catch (error) {
  //       const revertFound = error.message.search('revert') >= 0;
  //       assert(revertFound, `Expected "revert", got ${error} instead`);
  //     }
  //   });

  //   it('cannot mint above cap', async function () {
  //     await token.mint(owner, amount, { from });

  //     try {
  //       await token.mint(owner, _cap, { from });

  //       assert.fail('Expected revert not received');
  //     } catch (error) {
  //       const revertFound = error.message.search('revert') >= 0;
  //       assert(revertFound, `Expected "revert", got ${error} instead`);
  //     }
  //   });

  });
});