/*
import { useState } from 'react'

// Use pre-typed versions of the React-Redux
// `useDispatch` and `useSelector` hooks
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectStatus
} from './counterSlice'

import styles from './Counter.module.css'

export function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement())
          }}
        >
          -
        </button>
        <span aria-label="Count" className={styles.value}>
          {count}
        </span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            dispatch(increment())
          }}
        >
          +
        </button>
        {// omit additional rendering output here }
      </div>
    </div>
  )
}
*/




/*
Like with the earlier plain React example, we have a function component called Counter, 
that stores some data in a useState hook.

However, in our component, it doesn't look like we're storing the actual current counter
 value as state. There is a variable called count, but it's not coming from a useState hook.

While React includes several built-in hooks like useState and useEffect, other libraries
can create their own custom hooks that use React's hooks to build custom logic.

const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const [incrementAmount, setIncrementAmount] = useState('2')
dispatch: Redux'a aksiyon göndermek için kullanılır.

count: Redux store’daki counter.value değerini okur.

status: Redux store’daki counter.status değerini okur.

incrementAmount: Yerel bir React state — input'tan alınan artırma değeri (şu an varsayılanı "2" string).



const incrementValue = Number(incrementAmount) || 0
incrementAmount bir string olduğu için (useState('2')), onu Number(...) ile sayıya çeviriyoruz.

Eğer dönüşüm başarısız olursa (NaN gibi), 0 kullanılır.



count değeri React state değil, Redux store’daki bir slice’tan (counterSlice) gelir.

React’ta useState ve useSelector bir arada kullanılabilir:

useState: Yerel (local) component içi geçici veriler için.

useSelector: Global state (Redux) içindeki kalıcı veriler için.

Redux dışındaki incrementAmount gibi veriler, form input’larından gelen geçici verilerde işe yarar.




*/


/*
Reading Data with useSelector
First, the useSelector hook lets our component extract whatever pieces of data it needs
 from the Redux store state.

Earlier, we saw that we can write "selector" functions, which take state as an argument 
and return some part of the state value. In particular, our counterSlice.ts file is 
exporting selectCount and selectStatus

If we had access to a Redux store, we could retrieve the current counter value as:

const count = selectCount(store.getState())
console.log(count)
// 0

Our components can't talk to the Redux store directly, because we're not allowed to 
import it into component files. But, useSelector takes care of talking to the Redux 
store behind the scenes for us. If we pass in a selector function, it calls 
someSelector(store.getState()) for us, and returns the result.

So, we can get the current store counter value by doing:

const count = useSelector(selectCount)

We don't have to only use selectors that have already been exported, either. For example,
 we could write a selector function as an inline argument to useSelector:

const countPlusTwo = useSelector((state: RootState) => state.counter.value + 2)


Any time an action has been dispatched and the Redux store has been updated, useSelector 
will re-run our selector function. If the selector returns a different value than last
 time, useSelector will make sure our component re-renders with the new value.



 Redux Store'dan useSelector ile Veri Okuma
1. useSelector Ne İşe Yarar?
useSelector hook'u, React bileşeninin Redux store içinden ihtiyacı olan veriyi çekmesini sağlar.

📌 Yani useSelector, Redux store'dan veri okumamıza yardımcı olur.

2. Selector Fonksiyonlar Ne Yapar?
Daha önce öğrendiğimiz gibi, bir selector fonksiyonu şöyle çalışır:

ts
Kopyala
Düzenle
const selectCount = (state: RootState) => state.counter.value
Bu fonksiyon, Redux store’daki state objesini alır, içinden sadece counter.value değerini döner.

3. Store’a Doğrudan Erişim Yok
Teorik olarak, elimizde store nesnesi olsaydı şöyle bir şey yapabilirdik:

ts
Kopyala
Düzenle
const count = selectCount(store.getState())
console.log(count) // 0
Ancak:
🚫 Bileşenler içinde store’u doğrudan import edip kullanmamıza izin verilmez.

4. useSelector Store’a Bizim Yerimize Ulaşır
İşte burada useSelector devreye giriyor.
Bize store’u göstermiyor ama arka planda şu işlemi yapıyor:

ts
Kopyala
Düzenle
const count = useSelector(selectCount)
Yani perde arkasında şunu çalıştırıyor:

ts
Kopyala
Düzenle
selectCount(store.getState())
Bu sayede biz sadece useSelector içine bir selector fonksiyonu veriyoruz, o da gereken veriyi bize getiriyor.

5. Inline Selector Yazabilir miyiz?
Evet, illa dışarıdan import ettiğimiz selector fonksiyonunu kullanmak zorunda değiliz.

Şöyle kendi içinde de tanımlayabiliriz:

ts
Kopyala
Düzenle
const countPlusTwo = useSelector((state: RootState) => state.counter.value + 2)
Bu satırda:

state.counter.value değeri alınıyor,

Üzerine 2 eklenerek bileşene veriliyor.

6. useSelector Ne Zaman Yeniden Çalışır?
Herhangi bir Redux aksiyonu (dispatch) gönderildiğinde ve state değiştiğinde:

useSelector içindeki selector fonksiyonu tekrar çalışır.

Yeni değer önceki değerden farklıysa, bileşen yeniden render edilir (güncellenir).

✅ Böylece React bileşenimiz, güncel state’i otomatik olarak takip eder.




| Özellik                   | Açıklama                                                             |
| ------------------------- | -------------------------------------------------------------------- |
| `useSelector`             | Redux store’dan veri okumak için kullanılır                          |
| Selector fonksiyon        | `state` objesinden sadece istenen kısmı döner                        |
| Direkt store kullanılamaz | Bileşenlerde doğrudan `store.getState()` çağrısı yapılmaz            |
| Inline selector kullanımı | `useSelector((state) => ...)` şeklinde direkt fonksiyon yazabilirsin |
| Otomatik re-render        | State değişirse, bileşen otomatik olarak güncellenir                 |


*/

/*
Dispatching Actions with useDispatch
Similarly, we know that if we had access to a Redux store, we could dispatch actions
 using action creators, like store.dispatch(increment()). Since we don't have access
  to the store itself, we need some way to have access to just the dispatch method.

The useDispatch hook does that for us, and gives us the actual dispatch method from the Redux store:

const dispatch = useDispatch()

From there, we can dispatch actions when the user does something like clicking on a button:

features/counter/Counter.tsx
<button
  className={styles.button}
  aria-label="Increment value"
  onClick={() => {
    dispatch(increment())
  }}
>
  +
</button>


1. Redux Store’a Erişim Olmadan Aksiyon Göndermek
Normalde Redux store elimizde olsaydı, şöyle bir aksiyon gönderebilirdik:

ts
Kopyala
Düzenle
store.dispatch(increment())
Yani dispatch metodunu çağırarak store’a "sayacı artır" talimatı veririz.

Ama:
🚫 Bileşen (component) içinde store'a doğrudan erişemeyiz. Bu bir kuraldır.

🔹 2. useDispatch Ne Yapar?
useDispatch hook’u, bizim bileşen içinde dispatch metoduna ulaşmamızı sağlar.

Yani şunu yazarız:

ts
Kopyala
Düzenle
const dispatch = useDispatch()
Bu satır, arka planda Redux store'dan dispatch fonksiyonunu getirir ve bize verir.

🔹 3. Aksiyonları Kullanıcı Etkileşimiyle Göndermek
Kullanıcı bir butona tıkladığında bir aksiyon (örneğin sayacı artırma) göndermek isteriz.

Bunun için dispatch(increment()) kullanırız.




*/

/*
Defining Pre-Typed React-Redux Hooks
By default the useSelector hook needs you to declare (state: RootState) for every 
selector function. We can create pre-typed versions of the useSelector and useDispatch 
hooks so that we don't have to keep repeating the : RootState part every time.

app/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


Then, we can import the useAppSelector and useAppDispatch hooks into our own components 
and use them instead of the original versions.

Amaç: useSelector ve useDispatch için önceden tip tanımlı versiyonlar oluşturmak
🔹 Sorun Neydi?
Redux + TypeScript ile çalışırken, useSelector kullandığımızda sürekli şöyle yazmak zorunda kalırız:

ts
Kopyala
Düzenle
const value = useSelector((state: RootState) => state.counter.value)
Her seferinde state: RootState yazmak tekrarlı ve hata yapmaya açık hale gelir.

✅ Çözüm: Önceden Tiplenmiş (Pre-Typed) useSelector ve useDispatch Hook’ları
Bu yüzden useSelector ve useDispatch'in tiplenmiş versiyonlarını kendimiz tanımlarız.



*/



/*
Component State and Forms
By now you might be wondering, "Do I always have to put all my app's state into the Redux store?"

The answer is NO. Global state that is needed across the app should go in the Redux store. State that's only needed in one place should be kept in component state.

In this example, we have an input textbox where the user can type in the next number to be added to the counter:

features/counter/Counter.tsx
const [incrementAmount, setIncrementAmount] = useState('2')

const incrementValue = Number(incrementAmount) || 0

// later
return (
  <div className={styles.row}>
    <input
      className={styles.textbox}
      aria-label="Set increment amount"
      value={incrementAmount}
      onChange={e => setIncrementAmount(e.target.value)}
    />
    <button
      className={styles.button}
      onClick={() => dispatch(incrementByAmount(incrementValue))}
    >
      Add Amount
    </button>
    <button
      className={styles.asyncButton}
      onClick={() => dispatch(incrementAsync(incrementValue))}
    >
      Add Async
    </button>
  </div>
)

We could keep the current number string in the Redux store, by dispatching an action
 in the input's onChange handler and keeping it in our reducer. But, that doesn't give 
 us any benefit. The only place that text string is used is here, in the <Counter> 
 component. (Sure, there's only one other component in this example: <App>. But even if 
 we had a larger application with many components, only <Counter> cares about this input value.)

So, it makes sense to keep that value in a useState hook here in the <Counter> component.

Similarly, if we had a boolean flag called isDropdownOpen, no other components in the 
app would care about that - it should really stay local to this component.

In a React + Redux app, your global state should go in the Redux store, and your local 
state should stay in React components.

If you're not sure where to put something, here are some common rules of thumb for 
determining what kind of data should be put into Redux:

Do other parts of the application care about this data?
Do you need to be able to create further derived data based on this original data?
Is the same data being used to drive multiple components?
Is there value to you in being able to restore this state to a given point in time 
(ie, time travel debugging)?
Do you want to cache the data (ie, use what's in state if it's already there instead 
of re-requesting it)?
Do you want to keep this data consistent while hot-reloading UI components (which may 
lose their internal state when swapped)?
This is also a good example of how to think about forms in Redux in general. Most form 
state probably shouldn't be kept in Redux. Instead, keep the data in your form components
 as you're editing it, and then dispatch Redux actions to update the store when the user is done.

One other thing to note before we move on: remember that incrementAsync thunk from 
counterSlice.ts? We're using it here in this component. Notice that we use it the 
same way we dispatch the other normal action creators. This component doesn't care
 whether we're dispatching a normal action or starting some async logic. It only knows 
 that when you click that button, it dispatches something.


*/

/*
Bileşen Durumu (Component State) ve Formlar
“Uygulamadaki tüm durumu (state) Redux store’a mı koymam gerekiyor?”
Cevap: HAYIR.

Global state (birden çok bileşende paylaşılan veriler): Redux store’a konur.

Yerel state (yalnızca tek bir bileşende kullanılan veriler): React bileşeni içinde useState ile tutulur.

🧪 Örnek Kod Açıklaması
tsx
Kopyala
Düzenle
const [incrementAmount, setIncrementAmount] = useState('2')

const incrementValue = Number(incrementAmount) || 0
useState('2'): Giriş kutusundaki değeri component içinde saklar.

Number(...): String olan değeri sayıya çeviriyor, sayı değilse 0 yapıyor.

👇 Devamında gelen JSX:
tsx
Kopyala
Düzenle
<input
  value={incrementAmount}
  onChange={e => setIncrementAmount(e.target.value)}
/>
<button onClick={() => dispatch(incrementByAmount(incrementValue))}>
  Add Amount
</button>
<button onClick={() => dispatch(incrementAsync(incrementValue))}>
  Add Async
</button>
Açıklama:
Kullanıcı input’a bir sayı yazar.

Butona basınca Redux action (ya da thunk) çalışır.

Bu örnekte input’un değerini Redux’a koymak mantıklı değil, çünkü bu değer sadece burada kullanılıyor.

✅ Genel Kural: Hangi State Redux’a Konmalı?
Redux’a konmalı mı diye karar verirken şu soruları sor:

Soru	Evetse Redux’a koy
Bu veriyi başka bileşenler de kullanıyor mu?	✅
Bu veriye bağlı başka türetilmiş veriler olacak mı (filtreleme, sıralama vb)?	✅
Aynı veri birden fazla bileşenin görünümünü etkiliyor mu?	✅
Bu verinin önceki bir hâline geri dönebilmek ister misin (örnek: zaman yolculuğu debug)?	✅
Veriyi tekrar almak yerine önbellekten (state’ten) kullanmak istiyor musun?	✅
Hot reload (bileşen yeniden yüklenince) sırasında verinin kaybolmamasını ister misin?	✅

Eğer bu sorulara çoğunlukla “hayır” diyorsan, state’in Redux yerine React bileşeni içinde kalması daha mantıklıdır.

📝 Formlar için Özel Not:
Çoğu form verisi Redux içinde tutulmamalıdır.
Form input’ları sırasında değişen değerleri React bileşeninde tut.
Kullanıcı işlemi bitirdiğinde (submit vs.) Redux’a dispatch et.

🔁 incrementAsync Örneği
counterSlice.ts içindeki incrementAsync thunk'ı burada kullanılıyor.

tsx
Kopyala
Düzenle
dispatch(incrementAsync(incrementValue))
dispatch() içinde async veya normal action olmasının farkı yok.

Component bu farkı bilmez, sadece “bir şey dispatch ediliyor” diye bilir.


| Ne zaman Redux?                    | Ne zaman useState?                      |
| ---------------------------------- | --------------------------------------- |
| Birden çok component kullanıyorsa  | Sadece bu component’te kullanılıyorsa   |
| Global veriyse                     | Geçici ve lokal veriyse                 |
| Async veri yönetimi gerekiyorsa    | Sadece form input gibi küçük veri varsa |
| Geri alma (undo) gibi özelliklerse | UI açık/kapalı gibi geçici flag’lerse   |



*/

/*
Providing the Store
We've seen that our components can use the useSelector and useDispatch hooks to talk 
to the Redux store. But, since we didn't import the store, how do those hooks know what
 Redux store to talk to?

Now that we've seen all the different pieces of this application, it's time to circle 
back to the starting point of this application and see how the last pieces of the puzzle fit together.

main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'

import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

We always have to call root.render(<App />) to tell React to start rendering our 
root <App> component. In order for our hooks like useSelector to work right, we need 
to use a component called <Provider> to pass down the Redux store behind the scenes 
so they can access it.

We already created our store in app/store.ts, so we can import it here. Then, we put
 our <Provider> component around the whole <App>, and pass in the store: <Provider store={store}>.

Now, any React components that call useSelector or useDispatch will be talking to the 
Redux store we gave to the <Provider>.

Redux’ın useSelector ve useDispatch gibi hook’larının düzgün çalışabilmesi için, uygulamanın en dış katmanına <Provider> adlı özel bir bileşen yerleştirilmeli ve bu bileşene store verilmelidir.

🧩 Kod Satır Satır Açıklama
main.tsx (veya main.jsx)
ts
Kopyala
Düzenle
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
React: React bileşenlerini yazabilmek için gerekli.

createRoot: React 18 ile gelen yeni render yöntemi.

Provider: Redux’tan gelen özel bileşen. Uygulama genelinde store'u erişilebilir hale getirir.

ts
Kopyala
Düzenle
import App from './App'
import { store } from './app/store'
App: Ana uygulama bileşenidir. Tüm alt bileşenleri bunun içinde yer alır.

store: Daha önce configureStore ile oluşturduğumuz Redux store. Uygulamaya bu store'u bağlayacağız.

ts
Kopyala
Düzenle
const container = document.getElementById('root')!
const root = createRoot(container)
document.getElementById('root'): HTML'deki <div id="root"> elementini bulur.

createRoot(container): React uygulamasını bu div'e render etmeye hazırlar.

ts
Kopyala
Düzenle
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
Satır satır:
<React.StrictMode>: Geliştirme sırasında bazı uyarılar ve kontroller sağlar. (Zorunlu değil, önerilir.)

<Provider store={store}>: Redux store'u tüm alt bileşenlere "arka planda" erişilebilir kılar.

<App />: Asıl uygulama bileşenimiz. Artık içinde useSelector, useDispatch gibi hook'ları kullanabiliriz çünkü <Provider> onu sarmalıyor.


| Ne yapıldı?                                         | Neden yapıldı?                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| `store` oluşturuldu ve uygulamaya bağlandı.         | Redux'ın çalışabilmesi için.                                           |
| `<Provider>` ile `store` uygulamaya enjekte edildi. | `useSelector` ve `useDispatch` gibi hook'ların çalışması için gerekli. |
| `App` bileşeni `<Provider>` ile sarıldı.            | Böylece tüm alt bileşenler Redux verisine erişebilir.                  |

Artık herhangi bir bileşen içinde şunları güvenle yapabilirsin:

tsx
Kopyala
Düzenle
const count = useSelector((state: RootState) => state.counter.value)
const dispatch = useAppDispatch()
Çünkü Provider, store'u React bileşen ağacına "enjekte etti".




*/



/*
We can create a Redux store using the Redux Toolkit configureStore API
configureStore accepts a reducer function as a named argument
configureStore automatically sets up the store with good default settings
Redux logic is typically organized into files called "slices"
A "slice" contains the reducer logic and actions related to a specific feature / section of the Redux state
Redux Toolkit's createSlice API generates action creators and action types for each individual reducer function you provide
Redux reducers must follow specific rules
Should only calculate a new state value based on the state and action arguments
Must make immutable updates by copying the existing state
Cannot contain any asynchronous logic or other "side effects"
Redux Toolkit's createSlice API uses Immer to allow "mutating" immutable updates
Reading values from the state is done with functions called "selectors"
Selectors accept (state: RootState) as their argument and either return a value from the state, or derive a new value
Selectors can be written in slice files, or inline in the useSelector hook
Async logic is typically written in special functions called "thunks"
Thunks receive dispatch and getState as arguments
Redux Toolkit enables the redux-thunk middleware by default
React-Redux allows React components to interact with a Redux store
Wrapping the app with <Provider store={store}> enables all components to use the store
The useSelector hook lets React components read values from the Redux store
The useDispatch hook lets components dispatch actions
For TS usage, we create pre-typed useAppSelector and useAppDispatch hooks
Global state should go in the Redux store, local state should stay in React components

configureStore fonksiyonunu kullanarak bir Redux store'u oluşturabiliriz.

configureStore, reducer fonksiyonunu isimlendirilmiş bir argüman olarak kabul eder.

configureStore, store'u varsayılan olarak iyi ayarlarla otomatik kurar.

Redux mantığı genellikle "slice" adlı dosyalar içinde organize edilir.

Bir "slice", belirli bir özellik veya Redux state bölümüne ait reducer mantığını ve aksiyonları içerir.

Redux Toolkit’in createSlice API’si, verdiğiniz her reducer fonksiyonu için otomatik olarak action creator ve action type üretir.

Redux reducer'ları şu kurallara uymalıdır:

Sadece state ve action argümanlarına göre yeni bir state değeri hesaplamalıdır.

State’i kopyalayarak (immutably) güncellemelidir.

Asenkron işlem ya da yan etki (side effect) içeremez.

Redux Toolkit’in createSlice API’si, Immer kütüphanesini kullanarak immutable güncellemeleri sanki doğrudan state’i değiştiriyormuş gibi yazmamıza olanak tanır.

State’ten değer okumak için "selector" adı verilen fonksiyonlar kullanılır.

Selector’lar (state: RootState) parametresini alır ve state’ten bir değer döndürür veya türetilmiş bir değer oluşturur.

Selector’lar slice dosyasında yazılabilir veya useSelector hook’u içinde doğrudan tanımlanabilir.

Asenkron işlemler genellikle "thunk" adı verilen özel fonksiyonlarla yazılır.

Thunk fonksiyonları dispatch ve getState parametrelerini alır.

Redux Toolkit, redux-thunk middleware’ini varsayılan olarak etkinleştirir.

React-Redux, React bileşenlerinin Redux store ile iletişim kurmasını sağlar.

Uygulamayı <Provider store={store}> ile sarmak, tüm bileşenlerin bu store'a erişmesini sağlar.

useSelector hook’u bileşenlerin Redux store’dan veri okumasını sağlar.

useDispatch hook’u bileşenlerin aksiyon göndermesini sağlar.

TypeScript ile kullanım için önceden tanımlanmış useAppSelector ve useAppDispatch hook’ları oluşturulmalıdır.

Global (tüm uygulamayı ilgilendiren) state Redux store’da, yalnızca bileşen içinde kullanılan lokal state ise useState gibi React yapılarında tutulmalıdır.




*/

