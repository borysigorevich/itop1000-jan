import {Exchange, Header} from "./components";

import {Provider} from 'react-redux'
import {store} from "./store/store";

function App() {

    return (
        <Provider store={store}>
            <div>
                <Header/>
                <Exchange/>
            </div>
        </Provider>
    )
}

export default App
