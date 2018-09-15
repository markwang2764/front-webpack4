const isFunction = variable => typeof variable === 'function'
const PENDING = 'PENDING'
const REJECTED = 'REJECTED'

class MyPromise {

  constructor(handle) {
    if(!isFunction(handle)) {
      throw new Error('MyPromise must accept a fuction as a parameter')
    }

    this._status = PENDING
    this._value = undefined

    this._fullfilledQueues = []
    this._rejectedQueues = []

    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return
      const runFulfilled = value => {
        let cb
        while (cb = this._fullfilledQueues.shift()) {
          cb(value)
        }
      }
      const runRejected = error => {
        let cb
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /**
      |--------------------------------------------------
      | 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      |--------------------------------------------------
      */
      
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULLFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }
      setTimeout(run, 0);
    }
  }
  _reject(err) {
    if (this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    setTimeout(run, 0);
  }

  then(onFulfilled, onRejected) {
    const { _value, _status } = this

    switch (_status) {
      case PENDING:
        this._fullfilledQueues.push(onFulfilled)
        this._rejectedQueues.push(onRejected)
        break;
      case FULFILLED:
        onFulfilled(_value)
        break;
      case REJECTED:
        onRejected(_value)
        break;
      default:
        break;
    }

    // 返回新的promise
    return new MyPromise((onFulfilledNext, onRejectedNext) => {

      let fulfilled = value => {

        try {

          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }

        } catch (err) {
          onRejectedNext(err)
        }
      } 

      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onRejectedNext(res)
            }
          }
        } catch {
          onRejectedNext(err)
        }
      }

    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resovle(value) {
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }

  static all(list) {
    return new MyPromise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        this.resovle(p).then(res => {
          values[i] = res
          count++
          if(count === list.length) resolve(values)
        }, err => {
          reject(err)
        })
      }
    })
  }

  static race(list) {
    return new MyPromise((reslove, reject) => {
      for (let p of list) {
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  finally(cb) {
    return this.then(
      value => MyPromise.resovle(cb().then(() => value)),
      resson => MyPromise.resovle(cb().then(() => {throw reason}))
    )
  }
}

