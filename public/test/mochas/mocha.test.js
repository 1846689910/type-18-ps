const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
describe("Sinon library", () => {
  /**
   * 1 自定义的需要有方法或属性被stub的module，和需要被test的并且使用前者module的module最好都能在自己的case中require，否则可能会无法正确替换
   * 2 需要被测试的module需要在stub之后再引入
   * 3 有时在每次测试后清空reqire.cache是必要的
  describe("coder", () => {
    let fakeConfig;
    describe("function resolveKey", () => {
      afterEach(() => {
        if (fakeConfig) {
          fakeConfig.restore();
          fakeConfig = null;
        }
        delete process.env.CODER_KEY;
        Object.keys(require.cache).forEach(key => delete require.cache[key]);
      });
      it("should use config.KEY if no CODER_KEY given", () => {
        fakeConfig = sinon.stub(require("../src/config"), "KEY").value("key");
        const { resolveKey } = require("../src/coder"); // needs to load self-defined module after stub, otherwise cannot stub property inside
        const key = resolveKey();
        expect(key).to.equal("key");
      });
    });
  });
   */
  it("fakes normally", async () => {
    const fn = sinon.fake.returns(123);
    expect(fn()).to.equal(123);

    const fn1 = sinon.fake.throws(new Error());
    expect(fn1).to.throw();

    const fn2 = sinon.fake.resolves(123);
    await fn2().then(ret => expect(ret).to.equal(123));

    const fn3 = sinon.fake.rejects(new Error());
    await fn3().catch(e => expect(e).to.exist);

    const fn4 = sinon.fake(() => 123);
    expect(fn4()).to.equal(123);
  });
  it("spies normally", () => {
    // 包裹已有函数
    const fn = num => num;
    const spy = sinon.spy(fn);
    console.log(spy(123));
    expect(spy.called).be.true; // spy可以监视原函数的确被调用了
    // 包裹对象，并监视其内的函数
    const obj = {
      fn: (num, s) => num
    };
    const spy2 = sinon.spy(obj.fn);
    spy2(123, "hello");
    expect(spy2.calledOnce).be.true;
    expect(spy2.getCall(0).args[0]).to.equal(123);
  });
  it("stubs normally", () => {
    class Obj {
      fn(num) {
        return num;
      }
    }
    sinon.stub(Obj.prototype, "fn").callsFake(() => "hello"); // 用一个fake的方法替代一个对象中的方法，甚至于该对象的原型对象
    const obj = new Obj();
    expect(obj.fn()).to.equal("hello");
  });
  it("mocks normally", () => {
    const obj = {
      fn: num => num,
      fn1: () => {
        throw new Error();
      }
    };
    const mock1 = sinon.mock(obj);
    mock1.expects("fn1").throws();
    mock1.expects("fn").returns();
    obj.fn(123);
    try {
      obj.fn1();
    } catch (e) {
      expect(e).to.exist;
    }
    mock1.verify();
  });
});
describe("Mocha Test", () => {
  let syncFnError, asyncFnError;
  before(() => {
    syncFnError = new Error("syncFn failed");
    asyncFnError = new Error("asyncFn failed");
    // runs before all tests in this block
  });

  after(() => {
    // runs after all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  it("should calculate the correct answer", () => {
    expect(1 + 1).to.equal(2);
  });

  const syncFn = () => {
    throw syncFnError;
  };

  const asyncFn = async () => {
    throw asyncFnError;
  };

  it("should throw error in sync fn", () => {
    expect(syncFn).to.throw();
  });

  it("should throw error in async fn", async () => {
    return await asyncFn().catch(e => {
      expect(e).to.equal(asyncFnError);
      expect(e).to.exist;
      expect({}).to.be.empty;
      expect({ a: 123 }).to.not.be.empty;
      expect({}).to.be.an("object");
      expect(() => {}).to.be.a("function");
    });
  });
});
