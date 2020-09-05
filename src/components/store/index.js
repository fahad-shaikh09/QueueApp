import { createStore } from "redux"

import QueueReducer from "./../reducers/QueueReducer";

const store = createStore(QueueReducer)

export default store