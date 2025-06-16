import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import  {Autoplay, Navigation, Pagination  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import type  IAnimals  from '../../interfaces/AnimalInterface';
import './css/CardSLider.css'


const CardSlider = () => {
    const [popularAnimals, setPopularAnimals] = useState<IAnimals[]>([])

    useEffect(()=>{
        fetch('http://localhost:5000/pets')
        .then(res => res.json())
        .then((data:IAnimals[])=>{
            const popular = data.filter(animal =>animal.isPopular)
            setPopularAnimals(popular)
        })
        .catch((err)=>console.log(err))
    })

    

  return (
    <div className='sliderContainer'>
    <Swiper
        // install Swiper modules
        modules={[Pagination, Autoplay, Navigation]}
        grabCursor={true}
        initialSlide={0}
        speed={800}
        navigation={true}
        pagination={{ clickable:true, dynamicBullets: true}}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, 
        }}
        >
            {popularAnimals.map((animal)=> (
               
                <SwiperSlide key={animal.id}>
                <div className="sliderImage"><img src={animal.img} alt="animal image" /></div>
                <div className="sliderFooter">
                    <h2>{animal.name}</h2>
                    <p>{animal.description}</p>
                </div>
                </SwiperSlide>
            )
        )}
    </Swiper>
    </div>
  )
}

export default CardSlider
