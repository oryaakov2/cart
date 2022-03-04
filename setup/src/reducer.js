const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return { ...state, cart: [] }
    }

    if (action.type === 'SET_AMOUNT') {
        const tempCart = state.cart.map(item => {
            if (item.id === action.payload.id) {
                if (action.payload.operation === 'increase') {
                    return { ...item, amount: item.amount + 1 }

                } else if (action.payload.operation === 'decrease') {
                    return { ...item, amount: item.amount - 1 }
                }
            }
            return item

        }).filter(item => item.amount !== 0)

        return { ...state, cart: tempCart }
    }

    if (action.type === 'DECREASE') {
        const tempCart = state.cart.map(item => {
            if (item.id === action.payload) {
                return { ...item, amount: item.amount - 1 }
            }
            return item
        }).filter(item => item.amount !== 0)
        return { ...state, cart: tempCart }
    }

    if (action.type === 'REMOVE_ITEM') {
        const newCart = state.cart.filter((item) => item.id !== action.payload)
        return { ...state, cart: newCart }
    }

    if (action.type === 'GET_TOTALS') {
        let { total, amount } = state.cart.reduce((cartTotal, item) => {
            const { amount, price } = item
            const itemTotal = price * amount

            cartTotal.total += itemTotal
            cartTotal.amount += amount

            return cartTotal
        }, {
            amount: 0,
            total: 0
        })

        total = parseFloat(total.toFixed(2))

        return { ...state, total, amount }
    }

    if (action.type === 'LOADING') {
        return { ...state, loading: true }
    }

    if (action.type === 'GET_DATA') {
        return { ...state, cart: action.payload, loading: false }
    }

    throw new Error('action type invalid')
}

export default reducer;