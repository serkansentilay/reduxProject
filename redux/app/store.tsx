//Creating the Redux Store
//Open up app/store.ts, which should look like this:

//app/store.ts
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

/*
The Redux store is created using the configureStore function from Redux Toolkit. configureStore requires 
that we pass in a reducer argument.

Our application might be made up of many different features, and each of those features might have its own 
reducer function. When we call configureStore, we can pass in all of the different reducers in an object. 
The key names in the object will define the keys in our final state value.

We have a file named features/counter/counterSlice.ts that exports a reducer function for the counter logic
as the ESM "default" export. We can import that function into this file. Since it's a default export, we can
 give that variable any name we want when we import it into this file. In this case, we call it counterReducer
  here, and include it when we create the store. (Note that the import/export behavior here is standard ES Module 
  syntax, and not specific to Redux.)

When we pass in an object like {counter: counterReducer}, that says that we want to have a state.counter 
section of our Redux state object, and that we want the counterReducer function to be in charge of deciding if 
and how to update the state.counter section whenever an action is dispatched.

Redux allows store setup to be customized with different kinds of plugins ("middleware" and "enhancers").
 configureStore automatically adds several middleware to the store setup by default to provide a good developer 
 experience, and also sets up the store so that the Redux DevTools Extension can inspect its contents.

For TypeScript usage, we also want to export some reusable types based on the Store, such as the RootState and 
AppDispatch types. We'll see how those get used later.


Redux Store, Redux Toolkit'ten gelen configureStore fonksiyonu kullanılarak oluşturulur. configureStore, 
bizden mutlaka bir reducer parametresi ister.

Uygulamalar genellikle birçok farklı özellikten oluşur ve bu özelliklerin her biri kendi reducer fonksiyonuna 
sahip olabilir. configureStore fonksiyonunu çağırırken, bu reducer'ların hepsini bir nesne içinde verebiliriz.
 Bu nesnedeki anahtar isimleri (key) bizim nihai state’imizdeki anahtarları belirler.

Örneğin, bizde features/counter/counterSlice.ts adında bir dosya var ve bu dosya, counter mantığı için bir 
reducer fonksiyonu default export olarak dışa aktarır. Bu fonksiyonu buraya import edip counterReducer adını 
veriyoruz. Ve bu fonksiyonu store’a ekliyoruz.

Yani configureStore içinde {counter: counterReducer} demek, Redux state'imizde bir state.counter alanı 
oluşturmak ve bu alanın güncellenmesinden counterReducer fonksiyonunun sorumlu olması anlamına gelir.


import type { Action, ThunkAction } from '@reduxjs/toolkit'
🔹 Action ve ThunkAction tiplerini içeri aktarırız.

Action: Redux'taki her aksiyonun temel türü.

ThunkAction: Asenkron işlemler (örneğin API istekleri) için kullanılan özel bir aksiyon tipi. TypeScript 
için tür tanımlamada kullanılır.




import { configureStore } from '@reduxjs/toolkit'
🔹 configureStore: Redux Toolkit’te store oluşturmanın kolaylaştırılmış fonksiyonudur.
Eskiden elle yazılması gereken birçok ayarı otomatik yapar (middleware, devtools vb.).


import counterReducer from '@/features/counter/counterSlice'
🔹 counterSlice.ts dosyasından gelen reducer fonksiyonudur.

default export olduğu için istediğimiz ismi verebiliriz.

counterReducer, sayaç özelliğine ait state’in nasıl değişeceğini belirler.



export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
🔹 Redux store’u burada oluşturuyoruz.

reducer parametresi ile tüm reducer’ları birleştiriyoruz.

counter anahtarı, state.counter kısmını temsil eder.

counterReducer, bu kısmı yöneten reducer’dır.



export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
🔹 Bu satır, özel bir Thunk (asenkron iş) tanımı yapar.

ThunkReturnType: Geri dönüş tipi (void, Promise<any>, vs.)

RootState: Store’un state yapısı

unknown: ekstra argüman yoksa bu şekilde tanımlanır

Action: Döndürülen aksiyon tipi

Redux Slices
A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, 
typically defined together in a single file. The name comes from splitting up the root Redux 
state object into multiple "slices" of state.

For example, in a blogging app, our store setup might look like:

import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})

In that example, state.users, state.posts, and state.comments are each a separate "slice" of 
the Redux state. Since usersReducer is responsible for updating the state.users slice, we 
refer to it as a "slice reducer" function.



Detailed Explanation: Reducers and State Structure
A Redux store needs to have a single "root reducer" function passed in when it's created. So if we have many different slice reducer functions, how do we get a single root reducer instead, and how does this define the contents of the Redux store state?

If we tried calling all of the slice reducers by hand, it might look like this:

function rootReducer(state = {}, action) {
  return {
    users: usersReducer(state.users, action),
    posts: postsReducer(state.posts, action),
    comments: commentsReducer(state.comments, action)
  }
}

That calls each slice reducer individually, passes in the specific slice of the Redux state, and 
includes each return value in the final new Redux state object.

Redux has a function called combineReducers that does this for us automatically. It accepts an 
object full of slice reducers as its argument, and returns a function that calls each slice reducer 
whenever an action is dispatched. The result from each slice reducer are all combined together into 
a single object as the final result. We can do the same thing as the previous example using combineReducers:

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
})

When we pass an object of slice reducers to configureStore, it passes those to combineReducers for us
 to generate the root reducer.

As we saw earlier, you can also pass a reducer function directly as the reducer argument:

const store = configureStore({
  reducer: rootReducer
})

"Slice", bir uygulamanın bir özelliğine (feature) ait Redux reducer ve action'ların bir arada tanımlandığı yapıdır.
Adı şuradan gelir: Redux state objesi parçalanır (slice edilir), her bir özellik kendi parçasını (slice'ını) yönetir.

Örneğin bir blog uygulamasında store şu şekilde kurulabilir:

ts
Kopyala
Düzenle
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
Bu örnekte Redux state’in şu yapıda olmasını bekleriz:

ts
Kopyala
Düzenle
state = {
  users: {...},
  posts: {...},
  comments: {...}
}
Yani:

state.users → usersSlice tarafından yönetilir

state.posts → postsSlice tarafından yönetilir

state.comments → commentsSlice tarafından yönetilir

Her birine “slice reducer” denir çünkü sadece kendi slice'ını günceller.



 Ayrıntılı Açıklama: Reducer'lar ve State Yapısı
Redux store, kurulurken bir tane ana reducer (root reducer) ister.

Ama bizim elimizde birçok slice reducer varsa ne olacak?
Bu durumda hepsini birleştirip tek bir root reducer fonksiyonu haline getirmeliyiz.

Manuel olarak bunu şöyle yapabiliriz:

ts
Kopyala
Düzenle
function rootReducer(state = {}, action) {
  return {
    users: usersReducer(state.users, action),
    posts: postsReducer(state.posts, action),
    comments: commentsReducer(state.comments, action)
  }
}
Bu örnek şunu yapar:

Gelen state içindeki users, posts, comments bölümlerini alır.

Her biri için ilgili reducer’a gönderir.

Geri dönen değerlerle yeni state objesi oluşturur.

Ama bu işlemi her seferinde elle yapmak yerine Redux’un combineReducers fonksiyonu devreye girer.

✅ combineReducers Kullanımı
ts
Kopyala
Düzenle
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
})
combineReducers, bu üç reducer’ı tek bir “root reducer” haline getirir.

Her action geldiğinde, ilgili slice reducer çağrılır.

Sonuçlar birleştirilip yeni state objesi oluşturulur.

🛠️ configureStore Ne Yapıyor?
Redux Toolkit içindeki configureStore fonksiyonu, içine verilen reducer objesini otomatik olarak combineReducers ile birleştiriyor.

Şu şekilde yazarsan:

ts
Kopyala
Düzenle
const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
Bu aslında Redux Toolkit’in senin yerine şu işlemi yaptığı anlamına gelir:

ts
Kopyala
Düzenle
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
})

const store = configureStore({
  reducer: rootReducer
})
Yani kısa yol sunmuş oluyor. Hem de ek olarak:

Redux DevTools desteği

Gelişmiş middleware (örneğin redux-thunk)

TypeScript tipi çıkarımları

gibi birçok özelliği otomatik olarak aktif hale getiriyor.


*/
