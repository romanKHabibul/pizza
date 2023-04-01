import React, { useEffect, useRef } from 'react'
import cl from "./Sort.module.css"
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setCurrentFilter, setCurrentSort, setVisible } from '../../redux/slices/sortSlice'

const Sort: React.FC = () => {

    const dispatch = useAppDispatch()
    const {filterTypes, sortTypes, currentFilter, currentSort, visible} = useAppSelector(state => state.sorts)
    const sortRef = useRef(null)

    function selectFilter(title: string){
        dispatch(setCurrentFilter(title))
    }

    function selectSort(title:string){
        dispatch(setCurrentSort(title))
        dispatch(setVisible(false))
    }

    // useEffect(() => {
    //     function closeSort(event: any){
    //         if(!event.path.includes(sortRef.current)){
    //             dispatch(setVisible(false))
    //         }
    //     }
    //     document.body.addEventListener('click', closeSort)
    //     return () =>
    //     document.body.removeEventListener('click', closeSort)
    // },[])

    return (
        <div className={cl.cat}>
            <div className={cl.catItems}>
                <div className={cl.left}>
                    {filterTypes?.length && filterTypes.map(filter => 
                        <button onClick={() => selectFilter(filter.title)} className={currentFilter == filter.title ? cl.filterButton + ' ' + cl.filterOnClick : cl.filterButton} key={filter.id}>
                            {filter.title}
                        </button> 
                    )}
                </div>
                <div className={cl.right} ref={sortRef}>
                    <p className={cl.text}>
                        Сортировка по: <button onClick={() => dispatch(setVisible(!visible))} className={cl.span}>{currentSort}</button>
                    </p>
                    {visible &&
                    <div className={cl.popup}>
                        {sortTypes?.length && sortTypes.map(sort => 
                            <button onClick={() => selectSort(sort.title)} className={currentSort == sort.title ? cl.sortButton + ' ' + cl.sortOnClick : cl.sortButton} key={sort.id}>
                                {sort.title}
                            </button>  
                        )}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sort
