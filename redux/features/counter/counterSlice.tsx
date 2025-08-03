/*
Creating Slice Reducers and Actions
Since we know that the counterReducer function is coming from 
features/counter/counterSlice.ts, let's see what's in that file, piece by piece.

features/counter/counterSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the TS type for the counter slice's state
export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

// Define the initial value for the slice state
const initialState: CounterState = {
  value: 0,
  status: 'idle'
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

// Export the generated action creators for use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Export the slice reducer for use in the store configuration
export default counterSlice.reducer


Earlier, we saw that clicking the different buttons in the UI dispatched three 
different Redux action types:

{type: "counter/increment"}
{type: "counter/decrement"}
{type: "counter/incrementByAmount"}
We know that actions are plain objects with a type field, the type field is always 
a string, and we typically have "action creator" functions that create and return 
the action objects. So where are those action objects, type strings, and action creators defined?

We could write those all by hand, every time. But, that would be tedious. Besides,
 what's really important in Redux is the reducer functions, and the logic they have
  for calculating new state.

Redux Toolkit has a function called createSlice, which takes care of the work of 
generating action type strings, action creator functions, and action objects. All
 you have to do is define a name for this slice, write an object that has some reducer
  functions in it, and it generates the corresponding action code automatically. The 
  string from the name option is used as the first part of each action type, and the 
  key name of each reducer function is used as the second part. So, the "counter" 
  name + the "increment" reducer function generated an action type of 
  {type: "counter/increment"}. (After all, why write this by hand if the computer 
  can do it for us!)

In addition to the name field, createSlice needs us to pass in the initial state 
value for the reducers, so that there is a state the first time it gets called. In this
 case, we're providing an object with a value field that starts off at 0, and a status 
 field that starts off with 'idle'.

We can see here that there are three reducer functions, and that corresponds to the 
three different action types that were dispatched by clicking the different buttons.

createSlice automatically generates action creators with the same names as the reducer 
functions we wrote. We can check that by calling one of them and seeing what it returns:

console.log(counterSlice.actions.increment())
// {type: "counter/increment"}

It also generates the slice reducer function that knows how to respond to all these action types:

const newState = counterSlice.reducer(
  { value: 10 },
  counterSlice.actions.increment()
)
console.log(newState)
// {value: 11}


*/

/*
Slice Nedir?
Bir “slice”, uygulamanın bir özelliğine (örneğin sayaç gibi) ait:

state yapısını,

reducer’ları (güncelleme fonksiyonları) ve

action creator’ları (aksiyonları tetikleyen fonksiyonlar)

tek bir dosyada toplamamızı sağlar. Bu dosya hem düzenli hem okunabilir bir yapıya sahip olur.


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
🔹 Redux Toolkit’ten createSlice ve createAsyncThunk fonksiyonları import ediliyor.

createSlice: Reducer ve action'ları birlikte tanımlamak için.

createAsyncThunk: Asenkron işlemler için kullanılır (bu örnekte kullanılmıyor ama hazır bekliyor).

PayloadAction: Aksiyon nesnesine gönderilen veri (action.payload) için tür belirtir.
 TypeScript içindir.



export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}
🔹 State’in yapısını tanımlayan bir TypeScript interface’i.

value: sayısal sayaç değeri.

status: sayacın durumu. Örneğin bir API çağrısı yaparken "loading" olabilir.




const initialState: CounterState = {
  value: 0,
  status: 'idle'
}
🔹 Slice’ın başlangıç (initial) state’i.
Uygulama ilk açıldığında value = 0 ve status = "idle" olarak başlar.


*/

/*
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})
🔹 Açıklamalar:
name: 'counter'
Bu slice’a verilen isimdir.

Otomatik oluşturulan action türleri bu isimle başlar.
Örn: counter/increment, counter/decrement

initialState
Yukarıda tanımladığımız initialState kullanılır.

reducers
State’i değiştiren fonksiyonlardır.

Her biri otomatik olarak bir Redux action ile eşleşir.

✅ Reducer’ların Detayı:
ts
Kopyala
Düzenle
increment: state => {
  state.value += 1
}
state doğrudan güncelleniyor gibi görünüyor ama aslında Immer kütüphanesi 
arka planda immutable (değişmez) hale getiriyor.

ts
Kopyala
Düzenle
decrement: state => {
  state.value -= 1
}
value bir azaltılır.

ts
Kopyala
Düzenle
incrementByAmount: (state, action: PayloadAction<number>) => {
  state.value += action.payload
}
action.payload içindeki sayıyı value'ya ekler.

PayloadAction<number> ifadesi: action.payload'ın türünün number olduğunu garanti eder.

ts
Kopyala
Düzenle
export const { increment, decrement, incrementByAmount } = counterSlice.actions
🔹 createSlice bize otomatik olarak action creator’lar üretir.
Bu satırda onları dışarıya açıyoruz ki, UI bileşenlerinde çağırabilelim:

tsx
Kopyala
Düzenle
dispatch(increment())
dispatch(incrementByAmount(5))
ts
Kopyala
Düzenle
export default counterSlice.reducer
🔹 createSlice ayrıca otomatik olarak reducer fonksiyonu da üretir.
Bu reducer, configureStore içinde kullanılmak üzere dışarıya açılır:

ts
Kopyala
Düzenle
reducer: {
  counter: counterReducer
}
🔄 Action Tipleri
Redux’ta her action bir type değeri içerir.
Bu slice’ta oluşturulan action tipleri şunlardır:

ts
Kopyala
Düzenle
{ type: "counter/increment" }
{ type: "counter/decrement" }
{ type: "counter/incrementByAmount", payload: 5 }
Bu type'lar otomatik olarak name + reducerFunction şeklinde oluşturulur.

🧪 Otomatik Üretilen Örnek
ts
Kopyala
Düzenle
console.log(counterSlice.actions.increment())
// { type: "counter/increment" }
Bu, createSlice’ın bizim yerimize otomatik olarak action creator ürettiğini gösterir.

ts
Kopyala
Düzenle
const newState = counterSlice.reducer(
  { value: 10, status: 'idle' },
  counterSlice.actions.increment()
)
console.log(newState)
// { value: 11, status: 'idle' }
🔹 reducer fonksiyonu doğrudan çağrılıyor.

İlk parametre mevcut state (örnek: {value: 10})

İkinci parametre bir aksiyon ({type: "counter/increment"})

Sonuç: value 11 oldu. Yani reducer doğru çalıştı.

🧠 Özet
Kavram	Açıklama
createSlice	Reducer + action’ları birlikte oluşturur
name	Action türlerinin prefix kısmı
initialState	Slice’ın başlangıç değeri
reducers	State’i değiştiren fonksiyonlar
PayloadAction<T>	Aksiyonun payload türünü belirtir
counterSlice.actions	Otomatik action creator’lar
counterSlice.reducer	Store’da kullanılacak reducer fonksiyonu

➕ Ekstra Bilgi: Immer Nedir?
Redux Toolkit altında Immer kütüphanesi kullanılır.
Bu sayede reducer içinde state.value += 1 gibi mutable (değiştirici) kodlar yazabiliriz,
 ama Redux bunu arkada immutable (değişmez) hale getirir.

Bu hem geliştirici deneyimini iyileştirir hem de Redux’un prensiplerine sadık kalır.


*/

/*
Rules of Reducers
We said earlier that reducers must always follow some special rules:

They should only calculate the new state value based on the state and action arguments
They are not allowed to modify the existing state. Instead, they must make immutable 
updates, by copying the existing state and making changes to the copied values.
They must be "pure" - they cannot do any asynchronous logic or other "side effects"
But why are these rules important? There are a few different reasons:

One of the goals of Redux is to make your code predictable. When a function's output 
is only calculated from the input arguments, it's easier to understand how that code 
works, and to test it.
On the other hand, if a function depends on variables outside itself, or behaves randomly, 
you never know what will happen when you run it.
If a function modifies other values, including its arguments, that can change the way the
 application works unexpectedly. This can be a common source of bugs, such as "I updated
  my state, but now my UI isn't updating when it should!"
Some of the Redux DevTools capabilities depend on having your reducers follow these rules correctly
The rule about "immutable updates" is particularly important, and worth talking about further.




*/

/*
 Reducer’lar şu kurallara uymalıdır:
Yalnızca kendilerine verilen state ve action parametrelerine göre yeni bir state değeri hesaplamalıdır.

Mevcut state’i doğrudan değiştirmemelidirler.
Bunun yerine, mevcut state’in bir kopyasını alıp, bu kopya üzerinde değişiklik 
yaparak immutability (değişmezlik) ilkesine uymalıdırlar.

"Pure" (saf) fonksiyonlar olmalıdırlar.
Yani:

Asenkron işlemler (örneğin setTimeout, fetch) yapamazlar.

Dış dünyayla (API, dosya sistemi vs.) etkileşime giremezler.

Rastgelelik (örneğin Math.random()) içeremezler.

🤔 Peki, Bu Kurallar Neden Bu Kadar Önemli?
Bunun birkaç önemli nedeni vardır:

1. Redux’un temel amacı: Tahmin edilebilirlik (predictability)
Reducer’lar aynı girdi verildiğinde her zaman aynı çıktıyı üretmelidir.

Böylece bu fonksiyonlar daha kolay anlaşılır ve kolay test edilebilir olur.

2. Dış değişkenlere bağımlı fonksiyonlar sorunludur
Eğer bir fonksiyon kendi dışındaki değişkenlere bağımlıysa veya rastgele davranıyorsa,
onu her çalıştırdığında farklı sonuçlar verebilir.
→ Bu da güvenilmez bir uygulama anlamına gelir.

3. Mevcut değerleri (özellikle state) değiştirmek tehlikelidir
Eğer reducer, mevcut state’i doğrudan değiştirirse, bu beklenmedik hatalara yol açabilir.
Örneğin:

“State’i güncelledim ama neden UI (arayüz) kendini güncellemedi?”

Çünkü React/Redux, değişim farkını algılamak için eski ve yeni state objesini referans olarak kıyaslar.
Eğer state yerinde değiştirilmişse (mutated), bu fark algılanamaz ve UI yeniden render edilmez.

4. Redux DevTools bazı yeteneklerini bu kurallara göre çalıştırır
Geri alma (undo-redo), zaman yolculuğu (time-travel debugging) gibi özellikler,
reducer’ların doğru şekilde immutable ve saf yazılmış olmasına bağlıdır.

🚨 Özellikle “immutable update” kuralı çok kritiktir
Redux’un sağlıklı çalışması için, reducer’ların:

Eski state’i değiştirmemesi,

Yeni bir kopya oluşturup sadece değişen kısmı güncellemesi
çok ama çok önemlidir.

Redux Toolkit bu konuda sana yardımcı olur çünkü Immer adlı bir kütüphaneyi kullanır.
Bu sayede reducer içinde şöyle yazabiliyorsun:


state.value += 1
Ama aslında arka planda bu:


return {
  ...state,
  value: state.value + 1
}
şeklinde değişmeyen (immutable) bir şekilde çalışıyor.


*/

/*
Reducers and Immutable Updates
Earlier, we talked about "mutation" (modifying existing object/array values) and 
"immutability" (treating values as something that cannot be changed).

In Redux, our reducers are never allowed to mutate the original / current state values!

warning
// ❌ Illegal - by default, this will mutate the state!
state.value = 123

There are several reasons why you must not mutate state in Redux:

It causes bugs, such as the UI not updating properly to show the latest values
It makes it harder to understand why and how the state has been updated
It makes it harder to write tests
It breaks the ability to use "time-travel debugging" correctly
It goes against the intended spirit and usage patterns for Redux
So if we can't change the originals, how do we return an updated state?

tip
Reducers can only make copies of the original values, and then they can mutate the copies.

// ✅ This is safe, because we made a copy
return {
  ...state,
  value: 123
}

We already saw that we can write immutable updates by hand, by using JavaScript's
 array / object spread operators and other functions that return copies of the original 
 values. However, if you're thinking that "writing immutable updates by hand this way 
 looks hard to remember and do correctly"... yeah, you're right! :)

Writing immutable update logic by hand is hard, and accidentally mutating state in 
reducers is the single most common mistake Redux users make.

That's why Redux Toolkit's createSlice function lets you write immutable updates an easier way!

createSlice uses a library called Immer inside. Immer uses a special JS tool called
 a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, as if you'd written all the immutable update logic by hand.

So, instead of this:

function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}

You can write code that looks like this:

function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}

That's a lot easier to read!

But, here's something very important to remember:

warning
You can only write "mutating" logic in Redux Toolkit's createSlice and createReducer 
because they use Immer inside! If you write mutating logic in your code without Immer, 
it will mutate the state and cause bugs!


Reducers ve Değişmez (Immutable) Güncellemeler
Redux’ta state (durum) objeleri asla doğrudan değiştirilemez (mutate edilemez).
Bu, Redux’un en temel kurallarından biridir.

🚫 ❌ Hatalı Kullanım – Mutasyon (Değiştirme)
js
Kopyala
Düzenle
// ❌ Bu yanlıştır - mevcut state'i doğrudan değiştiriyor!
state.value = 123
Neden Bu Yanlış?
State’i doğrudan değiştirmek şunlara yol açar:

UI (arayüz) kendini güncellemez
React/Redux değişimi algılayamaz çünkü aynı obje üzerinde çalışıyorsun.

Kodun takibi zorlaşır
Ne zaman, neyin değiştiğini bulmak zor olur.

Test yazmak zorlaşır
Çünkü her şey beklenmedik şekilde değişebilir.

Redux DevTools düzgün çalışmaz
Zaman yolculuğu (geri alma, ileri alma) gibi özellikler bozulur.

Redux'un felsefesine aykırıdır
Redux her zaman "değişmez veri" kullanmayı önerir.

✅ Doğru Kullanım – Immutable Güncelleme (Kopyalayarak Değiştir)
js
Kopyala
Düzenle
// ✅ Bu doğrudur - önce kopyaladık, sonra değiştirdik
return {
  ...state,
  value: 123
}
Burada:

...state tüm eski değerleri yeni objeye kopyalar

value: 123 ile sadece value alanı değiştirilir

Böylece eski state dokunulmadan korunur.

🤯 Ama Bu Yöntem Karmaşık Olabilir
Eğer çok derin bir nesne güncellemesi gerekiyorsa işler çığırından çıkar:

js
Kopyala
Düzenle
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
Bu çok karışık, okumak ve yazmak çok zor.
En ufak hata, tüm yapıyı bozabilir.

🎯 Redux Toolkit ile Kolaylık – Immer Desteği
Redux Toolkit’in createSlice ve createReducer fonksiyonları, arka planda
 Immer adlı bir kütüphane kullanır.

Immer sayesinde şunu yazabilirsin:

js
Kopyala
Düzenle
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}
Bu aslında görünüşte mutasyon gibi ama aslında immutable çalışır.

Nasıl?
Immer, verdiğin state’i bir Proxy ile sarmalar (geçici bir kopya oluşturur)

Sen state.value = x gibi yazsan bile, Immer bunu arka planda izler

Sonra bu işlemleri uygular ve yeni, değiştirilmiş ama orijinali bozulmamış bir state döner

Yani sanki elle ...spread yapmış gibi ama sen uğraşmazsın.

⚠️ Dikkat! Mutasyon sadece Immer ile güvenlidir
Eğer createSlice veya createReducer kullanmadan, kendi reducer’ını yazıp state.value = 5 dersen:

Bu gerçekten mutasyon olur

Yani eski state değişir, bu da Redux’un davranışını bozar

🧠 Özet Tablo
Terim	Anlamı
Mutation	Mevcut objeyi doğrudan değiştirmek (yanlış)
Immutability	Objeyi değiştirmek yerine yeni bir kopya oluşturmak (doğru)
Immer	Mutasyon gibi yazmana izin verip arkada immutable şekilde değiştiren kütüphane
Redux Toolkit	Immer kullanarak state.value++ gibi kolay yazmana izin verir
createSlice / createReducer	Immer ile entegredir, mutasyon benzeri yazım güvenlidir

🔧 Kısa Karşılaştırma
El ile immutable güncelleme (zor):
js
Kopyala
Düzenle
return {
  ...state,
  list: state.list.map(item =>
    item.id === action.id ? { ...item, done: true } : item
  )
}
Immer + createSlice ile (kolay):
js
Kopyala
Düzenle
state.list.find(item => item.id === action.id).done = true
✅ Sonuç
Redux’ta state doğrudan değiştirilemez

Immer ve Redux Toolkit sayesinde artık:

Daha kolay reducer yazarsın

Kodun daha okunur olur

Hatalar azalır

DevTools sorunsuz çalışır



*/


/*
features/counter/counterSlice.ts
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})


We can see that the increment reducer will always add 1 to state.value. Because
 Immer knows we've made changes to the draft state object, we don't have to actually 
 return anything here. In the same way, the decrement reducer subtracts 1.

In both of those reducers, we don't actually need to have our code look at the action
 object. It will be passed in anyway, but since we don't need it, we can skip declaring
  action as a parameter for the reducers.

On the other hand, the incrementByAmount reducer does need to know something: how much
 it should be adding to the counter value. So, we declare the reducer as having both 
 state and action arguments. In this case, we know that the amount we typed into the 
 "amount" input is being put into the action.payload field, so we can add that to state.value.

If we're using TypeScript, we need to tell TS what the type of action.payload will be.
 The PayloadAction type declares that "this is an action object, where the type of
  action.payload is..." whatever type you supplied. In this case, we know that the UI
   has taken the numeric string that was typed into the "amount" textbox, converted it 
   into a number, and is trying to dispatch the action with that value, so we'll declare 
   that this is action: PayloadAction<number>.





export const counterSlice = createSlice({
createSlice, Redux Toolkit’in bir fonksiyonudur.

Bir reducer, aksiyon ve state yapısını tek yerde tanımlamanı sağlar.

Bu yapı counterSlice adında bir dilim (slice) oluşturur.



  name: 'counter',
Bu slice'ın adı 'counter'.

Redux aksiyonlarında "counter/increment" gibi isimlendirme oluşur. (sliceName/actionName)



  reducers: {
Bu alan içerisinde, Redux’un reducer fonksiyonlarını tanımlarsın.
Her biri bir aksiyona karşılık gelir ve state'i günceller.



    increment: state => {
      state.value += 1
    },
Bu fonksiyon çalıştığında state.value bir artırılır.

Görünüşte state.value değiştiriliyor gibi görünse de aslında bu Immer sayesinde 
güvenli bir şekilde yapılır.

Immer arka planda bu değişikliği takip eder ve state’in yeni bir versiyonunu oluşturur.

➡️ Aksiyon adı otomatik olarak "counter/increment" olur.





Normalde Redux'ta şöyle yazardın:

ts
Kopyala
Düzenle
return {
  ...state,
  value: state.value + 1
}
Ama Redux Toolkit + Immer sayesinde şunu yazabilirsin:

ts
Kopyala
Düzenle
state.value += 1
Ve bu da güvenli, performanslı ve okunabilir kalır. Immer bunu draft (taslak) olarak işler.



Slice tanımı yaptıktan sonra, aksiyonları şöyle dışa aktarabilirsin:

ts
Kopyala
Düzenle
export const { increment, decrement, incrementByAmount } = counterSlice.actions
Ve store’a reducer’ı eklemelisin:

ts
Kopyala
Düzenle
export default counterSlice.reducer


*/



/*

Reading Data with Selectors
We can call store.getState() to get the entire current root state object, and access its
 fields like state.counter.value.

It's standard to write "selector" functions that do those state field lookups for us. In 
this case, counterSlice.ts exports two selector functions that can be reused:

// Selector functions allows us to select a value from the Redux root state.
// Selectors can also be defined inline in the `useSelector` call
// in a component, or inside the `createSlice.selectors` field.
export const selectCount = (state: RootState) => state.counter.value
export const selectStatus = (state: RootState) => state.counter.status


Selector functions are normally called with the entire Redux root state object as an 
argument. They can read out specific values from the root state, or do calculations and
 return new values.

Since we're using TypeScript, we also need to use the RootState type that was exported 
from store.ts to define the type of the state argument in each selector.

Note that you don't have to create separate selector functions for every field in every
 slice! (This particular example did, to show off the idea of writing selectors, but we 
 only had two fields in counterSlice.ts anyway) Instead, find a balance in how many selectors you write.
*/

/*
Seçicilerle (Selectors) Veri Okuma
Redux store'unun o anki tüm kök (root) durumunu (state) almak için store.getState()
 fonksiyonunu çağırabiliriz.
Bu fonksiyonla örneğin state.counter.value gibi alanlara erişebiliriz.

Ancak bu tür state alanlarına erişmek için genellikle "selector" adı verilen 
fonksiyonlar yazmak standart bir yaklaşımdır.
Bu örnekte, counterSlice.ts dosyası yeniden kullanılabilir iki selector fonksiyonu dışa aktarıyor:

ts
Kopyala
Düzenle
// Seçici (selector) fonksiyonlar, Redux kök durumundan (root state)
// belirli bir değeri seçmemizi sağlar.
// Bu fonksiyonlar bileşenlerde doğrudan `useSelector` içinde satır içi olarak da tanımlanabilir
// ya da `createSlice.selectors` alanında da yer alabilir.
export const selectCount = (state: RootState) => state.counter.value
export const selectStatus = (state: RootState) => state.counter.status
🔍 Selector Fonksiyonları Ne Yapar?
Selector fonksiyonları genellikle Redux’un tüm kök durum nesnesi ile çağrılır.

Bu fonksiyonlar, o durum (state) içinden belirli değerleri okuyabilir veya bazı 
hesaplamalar yapıp yeni değerler döndürebilir.

🧾 TypeScript ile RootState Kullanımı
TypeScript kullandığımız için, selector fonksiyonlarının state parametresine bir 
tip tanımı vermemiz gerekir.

Burada kullanılan RootState tipi, store.ts dosyasından dışa aktarılmıştır ve kök durumun tipini belirtir.

❗ Her Alan İçin Selector Yazmak Zorunda Değilsin!
Her bir slice içindeki her alan için ayrı bir selector fonksiyonu yazmak zorunlu değildir.

(Bu örnekte sadece iki alan olduğu için iki selector yazılmış; amaç, selector
 yazma fikrini göstermektir.)

Gerçek uygulamalarda, ihtiyaç duydukça ve mantıklı oldukça selector fonksiyonları yazmak en doğrusudur.
*/


/*
Writing Async Logic with Thunks
So far, all the logic in our application has been synchronous. Actions are dispatched, 
the store runs the reducers and calculates the new state, and the dispatch function 
finishes. But, the JavaScript language has many ways to write code that is asynchronous,
 and our apps normally have async logic for things like fetching data from an API. We 
 need a place to put that async logic in our Redux apps.

A thunk is a specific kind of Redux function that can contain asynchronous logic. Thunks
 are written using two functions:

An inner thunk function, which gets dispatch and getState as arguments
The outer creator function, which creates and returns the thunk function
The next function that's exported from counterSlice is an example of a thunk action creator:

features/counter/counterSlice.ts
// The function below is called a thunk, which can contain both sync and async logic
// that has access to both `dispatch` and `getState`. They can be dispatched like
// a regular action: `dispatch(incrementIfOdd(10))`.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
}


In this thunk, we use getState() to get the store's current root state value, and 
dispatch() to dispatch another action. We could easily put async logic here as well,
 such as a setTimeout or an await.

We can use them the same way we use a typical Redux action creator:

store.dispatch(incrementIfOdd(6))

Using thunks requires that the redux-thunk middleware (a type of plugin for Redux) 
be added to the Redux store when it's created. Fortunately, Redux Toolkit's configureStore 
function already sets that up for us automatically, so we can go ahead and use thunks here.

When writing thunks, we need to make sure the dispatch and getState methods are typed 
correctly. We could define the thunk function as (dispatch: AppDispatch,
 getState: () => RootState), but it's standard to define a reusable AppThunk type for 
 that in the store file.

When you need to make HTTP calls to fetch data from the server, you can put that call
 in a thunk. Here's an example that's written a bit longer, so you can see how it's defined:

Example handwritten async thunk
// the outside "thunk creator" function
const fetchUserById = (userId: string): AppThunk => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      dispatch(userPending())
      // make an async call in the thunk
      const user = await userAPI.fetchById(userId)
      // dispatch an action when we get the response back
      dispatch(userLoaded(user))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}

Redux Toolkit includes a createAsyncThunk method that does all of the dispatching 
work for you. The next function in counterSlice.ts is an async thunk that makes 
a mock API request with a counter value. When we dispatch this thunk, it will 
dispatch a pending action before making the request, and either a fulfilled or 
rejected action after the async logic is done.

features/counter/counterSlice.ts
// Thunks are commonly used for async logic like fetching data.
// The `createAsyncThunk` method is used to generate thunks that
// dispatch pending/fulfilled/rejected actions based on a promise.
// In this example, we make a mock async request and return the result.
// The `createSlice.extraReducers` field can handle these actions
// and update the state with the results.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)


When you use createAsyncThunk, you handle its actions in createSlice.extraReducers.
 In this case, we handle all three action types, update the status field, and also update the value:

features/counter/counterSlice.ts
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // omit reducers
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: builder => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(incrementAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value += action.payload
      })
      .addCase(incrementAsync.rejected, state => {
        state.status = 'failed'
      })
  }
})


If you're curious why we use thunks for async logic, see this deeper explanation:



Thunks Nedir ve Neden Kullanılır?
Normalde Redux'taki reducer'lar sadece senkron (synchronous) işlem yapar. 
Ama bazen API'den veri çekmek gibi asenkron (asynchronous) işlemler yapmak gerekir. 
Bu durumda "thunk" adı verilen özel fonksiyonlar kullanılır.

Thunk, dispatch ve getState metodlarına erişimi olan, asenkron veya koşullu işlemler 
yapabilen bir fonksiyondur.



Thunk Örneği: incrementIfOdd
ts
Kopyala
Düzenle
export const incrementIfOdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
}
Bu thunk nasıl çalışıyor?
getState() → Store'daki güncel sayacı (state.counter.value) alır.

Eğer değer tek ise (% 2 === 1) → incrementByAmount(amount) dispatch eder.

Bu fonksiyon senkron da olabilir, setTimeout, await, vb. kullanarak asenkron hale de getirilebilir.

⚠️ Bu thunk, bir sayının tek olup olmadığına bakıp ancak o durumda artırma 
işlemi yapar. Koşullu dispatch örneğidir.





Gerçek Asenkron Thunk Örneği: fetchUserById
ts
Kopyala
Düzenle
const fetchUserById = (userId: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(userPending())
      const user = await userAPI.fetchById(userId)
      dispatch(userLoaded(user))
    } catch (err) {
      // Hata yakalanır
    }
  }
}
Açıklama:
API'den veri çeker (await userAPI.fetchById(...))

Sonucu aldıktan sonra bir action ile store'a aktarır (userLoaded)

Hatalar catch bloğunda ele alınır



createAsyncThunk ile Kısa ve Otomatik Yapı
Redux Toolkit, bu süreci kolaylaştırmak için createAsyncThunk sağlar:

ts
Kopyala
Düzenle
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount)
    return response.data
  }
)
Ne yapıyor bu kod?
fetchCount(amount) çağrılır (bu bir API simülasyonu olabilir)

Dönüş değeri otomatik olarak fulfilled action'ının payload'ı olur

Ayrıca otomatik olarak pending, fulfilled ve rejected action'ları üretir



extraReducers ile Thunk Action’larını Yakalama
ts
Kopyala
Düzenle
extraReducers: builder => {
  builder
    .addCase(incrementAsync.pending, state => {
      state.status = 'loading'
    })
    .addCase(incrementAsync.fulfilled, (state, action) => {
      state.status = 'idle'
      state.value += action.payload
    })
    .addCase(incrementAsync.rejected, state => {
      state.status = 'failed'
    })
}
Açıklama:
incrementAsync.pending: API isteği başladı → status = "loading"

incrementAsync.fulfilled: Başarılı → value artırılır

incrementAsync.rejected: Hata → status = "failed"

Bu yapı, reducer mantığını bozmadan asenkron işlemleri merkezi şekilde yönetmeni sağlar.



Neden Thunk ve createAsyncThunk Önemlidir?
Kodun test edilebilirliğini artırır.

Async işlemleri merkezi kontrol altında tutar.

Kodun daha okunabilir ve sürdürülebilir olmasını sağlar.

Redux DevTools ile daha kolay debug yapılabilir.





*/


