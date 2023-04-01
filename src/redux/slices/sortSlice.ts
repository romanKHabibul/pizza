import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState = {
    filterTypes: [
        {id: 0, title: "Все"},
        {id: 1, title: "Мясные"},
        {id: 2, title: "Вегетарианская"},
        {id: 3, title: "Гриль"},
        {id: 4, title: "Острые"},
        {id: 5, title: "Закрытые"},
    ],
    sortTypes: [
        {id: 0, title: "популярности"},
        {id: 1, title: "по цене"},
        {id: 2, title: "по алфавиту"},
    ],
    currentFilter: 'Все',
    currentSort: 'выберите',
    visible: false,
    search: '',
    page: 1
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setCurrentFilter(state, action: PayloadAction<string>){
            state.currentFilter = action.payload
        },
        setCurrentSort(state, action: PayloadAction<string>){
            state.currentSort = action.payload
        },
        setVisible(state, action: PayloadAction<boolean>){
            state.visible = action.payload
        },
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        }, 
        nextPage(state){
            state.page++
        },
        prevPage(state){
            state.page--
        }
    }
})

export const {setCurrentFilter, setCurrentSort, setVisible, setSearch, nextPage, prevPage} = sortSlice.actions
export default sortSlice.reducer