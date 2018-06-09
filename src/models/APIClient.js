import EOS from 'eosjs'
import Cookies from 'universal-cookie'


class APIClient {
    constructor() {
        const config = {
            chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
            keyProvider: ['5Hte6Yq24wQ7RaGto5skLTLgwcHVUr17fjqBRAEV3wmTuhcczwJ'], // WIF string or array of keys..
            httpEndpoint: 'http://10.101.2.115:8888',
            mockTransactions: () => null, // or 'fail'
            expireInSeconds: 60,
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

}

export default new APIClient()
