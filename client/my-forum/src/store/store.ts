import { createStore, combineReducers, applyMiddleware } from "redux";
import { personReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

/**
 * Создание глобального стора
 * combineReducers объединяет все сторы, которые мы передадим(в нашем случае он один)
 * composeWithDevTools нужен для того, чтобы шла синхронизация с расширением в бразуере для того,
 *     чтобы можно было просматривать в live режиме то, какие действия происходят со стором и как изменяется информация
 */
export const store = createStore(
  combineReducers({ personReducer }),
  composeWithDevTools(applyMiddleware()),
);
