import EOS from 'eosjs'
import Cookies from 'universal-cookie'
import { POST_DATA } from './data'

class APIClient {
    constructor() {
        const config = {
            chainId: '353876bab6268e7d5e55cfdd912034f2524b0ce48ab578856582092860dbeb4f', // 32 byte (64 char) hex string
            keyProvider: ['5Hte6Yq24wQ7RaGto5skLTLgwcHVUr17fjqBRAEV3wmTuhcczwJ'], // WIF string or array of keys..
            httpEndpoint: 'http://10.101.2.115:8888',
            mockTransactions: () => null, // or 'fail'
            expireInSeconds: 1000,
            broadcast: true,
            debug: false, // API and transactions
            sign: true
        }
        this.client = EOS(config)
        this.cookies = new Cookies()
    }

    posts() {
        return this.client.getTableRows(true, 'blogbook', 'blogbook', 'blog', '', 0, -1, 1000)
    }

    submit(post) {
        return this.client.transaction({
            actions: [
                {
                    account: 'blogbook',
                    name: 'create',
                    authorization: [{
                        actor: 'serg',
                        permission: 'active'
                    }
                    ],
                    data: post
                }
            ]
        })
    }

    initEOS() {
        POST_DATA.forEach((item, index) => {
            // setTimeout(() => {
            console.log('Sending ' + index)
            this.submit(item).then(() => console.log('Index ' + index + ' ok')).catch(e => {
                console.log(e)
            })
            // }, 5000 * index)
        })
    }
}
const client = new APIClient()
window.client = client
export default client
