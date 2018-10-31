/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */

import React from 'react';

const makeCancelable = promise => {
    let _hasCanceled = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(val => {
            _hasCanceled ? reject({ isCanceled: true }) : resolve(val)
        })
        promise.catch(error => {
            _hasCanceled ? reject({ isCanceled: true }) : reject(error)
        })
    })
    return {
        promise: wrappedPromise,
        cancel() {
            _hasCanceled = true
        }
    }
}
const AsyncComponent = loadComponent => (
    class WrapperComponent extends React.Component {
        cancelable = null
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) return
            this.cancelable = makeCancelable(loadComponent())
            this.cancelable.promise
                .then(module => module.default)
                .then(Component => {
                    if (Component) {
                        this.setState({ Component })
                    }
                }).catch(err => {
                    // console.error('load error ==> AsyncComponent');
                    // throw err;
                })
        }

        hasLoadedComponent() {
            return this.state.Component !== null
        }


        componentWillUnmount() {
            this.cancelable.cancel()
        }

        render() {
            const { Component } = this.state
            return (Component) ? <Component {...this.props} /> : null
        }
    }
)
export default AsyncComponent