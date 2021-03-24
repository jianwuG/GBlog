import React,{useState,useEffect,useCallback} from 'react';

const useScroll=(scrollRef)=>{
    const [scrollInfo,setScrollInfo]=useState([0,0]);

    const handleScroll=useCallback(()=>{
        const {scrollLeft,scrollTop}=scrollRef.current;
        setScrollInfo([scrollLeft,scrollTop])
    },[]);

    const goTop = useCallback(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);
    useEffect(()=>{
        scrollRef.current.addEventListener('scroll',handleScroll,false);
        return ()=>{
            scrollRef&&scrollRef.current&&
            scrollRef.current.removeEventListener('scroll',handleScroll,false);

        }
    },[]);
    return [scrollInfo,goTop];
};

export default useScroll;
