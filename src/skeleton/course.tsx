import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Course: any = () => (
    <>
        <div className="card-course " >
            <Skeleton height={100} />
            <div className="digit">
                <Skeleton count={3} width={150} style={{ marginBottom: '5px' }} />
            </div>

            <div className="bosan px-2" >
                <Skeleton height={50} width={50} borderRadius={50} />
                <div className="b-name px-1">
                    <Skeleton height={20} width={50} />
                    <Skeleton width={150} />

                </div>

            </div>

        </div>


    </>

)


export const CatagoryCard: any = () => (
    <>
        <div className="category" >

            <Skeleton height={70} width={70} borderRadius={50} />
            <Skeleton height={30} width={140} />

        </div>


    </>

)

export const CatagoryList: any = () => (
    <>
        <div  >
            <Skeleton width={800} height={50}/>
        </div>


    </>

)

export const Banners: any = () => (
    <>
        <div  className='mb-3'>
            <Skeleton height={500}/>
        </div>


    </>

)



