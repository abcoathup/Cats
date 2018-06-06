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
    const firstTokenUri = "https://1.com";
    const secondTokenUri = "https://2.com";
    const thirdTokenUri = "https://3.com";

    it('can mint to owner', async function () {
      await token.mint(owner, firstTokenUri, { from: owner });

      const balance = await token.balanceOf(owner);
      assert.equal(balance, 1);
    });

    it('can mint to another account', async function () {
      await token.mint(anotherAccount, secondTokenUri, { from: owner });

      const balance = await token.balanceOf(anotherAccount);
      assert.equal(balance, 1);
    });

    it('cannot mint if not owner', async function () {
      try {
        await token.mint(anotherAccount, thirdTokenUri, { from: anotherAccount });

        assert.fail('Expected revert not received');
      } catch (error) {
        const revertFound = error.message.search('revert') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
      }
    });

  });

  describe('token URI', function () {
    const firstTokenId = 1;
    const secondTokenId = 2;
    const thirdTokenId = 3;

    const firstTokenUri = "https://1.com";
    const secondTokenUri = "https://2.com";
    const thirdTokenUri = "https://3.com";
    const changedTokenUri = "https://changed.com";

    it('can change token URI if owner', async function () {
      await token.mint(owner, firstTokenUri, { from: owner });
      
      await token.setTokenURI(firstTokenId, changedTokenUri, { from: owner });

      const tokenUri = await token.tokenURI(firstTokenId);
      assert.equal(changedTokenUri, tokenUri);
    });

    it('cannot change token URI if not owner', async function () {
      await token.mint(owner, secondTokenUri, { from: owner });
      
      try {
        await token.setTokenURI(secondTokenId, changedTokenUri, { from: anotherAccount });

        assert.fail('Expected revert not received');
      } catch (error) {
        const revertFound = error.message.search('revert') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
      }
    });

  });

});