import React,{useState,useEffect,useCallback} from 'react';

const useScroll=(scrollRef)=>{
    const [scrollInfo,setScrollInfo]=useState([0,0]);

    const handleScroll=useCallback(()=>{
        const {scrollLeft,scrollTop}=scrollRef.current;
        console.log('ppppp',{scrollLeft,scrollTop});
        setScrollInfo([scrollLeft,scrollTop])
    },[]);

    const goTop = useCallback(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);
    useEffect(()=>{
        scrollRef.current.addEventListener('scroll',handleScroll,false);
        // return ()=>{
        //     scrollRef.current.removeEventListener('scroll',handleScroll,false);
        // }
    },[]);
    return [scrollInfo,goTop];
};

export default useScroll;
