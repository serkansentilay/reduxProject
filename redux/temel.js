/*
configureStore
Redux store oluşturmak için kullanılır.


import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
configureStore: Store’u otomatik ayarlarla (devtools, thunk middleware vs.) oluşturur.

reducer kısmında slice’lar tanımlanır.


*/


/*
createSlice
Bir slice; state + reducer + action’ları aynı dosyada tutan yapıdır.


import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
Immer sayesinde doğrudan state.value += 1 gibi yazılabilir.


*/

/*
useSelector ve useDispatch
React bileşenlerinden store’a erişmek için kullanılır.


import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { increment } from './counterSlice'

const count = useSelector((state: RootState) => state.counter.value)
const dispatch = useDispatch()
TypeScript'te genellikle özel hook'lar oluşturulur:


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

*/

/*
createAsyncThunk
Async işlemler için (API çağrısı gibi) kullanılır.

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: number) => {
    const response = await fetch(`/api/user/${userId}`)
    return await response.json()
  }
)
createSlice içinde bu thunk'ı extraReducers ile yakalarsın:


extraReducers: builder => {
  builder
    .addCase(fetchUserById.pending, state => {
      state.status = 'loading'
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'succeeded'
    })
}


*/

/*
 Selector Nedir?
State’ten veri çekmek için kullanılan fonksiyonlardır.

ts
Kopyala
Düzenle
export const selectCount = (state: RootState) => state.counter.value
Ya da bileşen içinde doğrudan yazabilirsin:

tsx
Kopyala
Düzenle
const count = useSelector((state: RootState) => state.counter.value)
🧩 Provider ile Store Bağlantısı
Ana dosyada:

tsx
Kopyala
Düzenle
import { Provider } from 'react-redux'
import { store } from './app/store'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
*/


/*
| State Nerede Tutulmalı?        | Açıklama                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **Redux Store**                | Tüm uygulamanın paylaştığı veriler (örn: kullanıcı bilgisi, tema, sepet durumu vs.)      |
| **useState / Component State** | Yalnızca bir bileşene özel geçici durum (örn: input kutusundaki yazı, dropdown açık mı?) |

*/

/*
| Yapı               | Açıklama                             |
| ------------------ | ------------------------------------ |
| `configureStore`   | Redux store’u kurar                  |
| `createSlice`      | State + Reducer + Actions bir arada  |
| `useSelector`      | Store’dan veri okur                  |
| `useDispatch`      | Store’a aksiyon gönderir             |
| `createAsyncThunk` | Async işlem (API çağrısı vs.) yazımı |
| `Provider`         | Redux store’u tüm uygulamaya sağlar  |

*/

