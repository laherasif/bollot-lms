import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Catagories: any = () => (
    <div className='container'>
       <div style={{maxWidth:'700px' , margin:'auto'}}>
        <Skeleton height={30} />

       </div>

        <div style={{ marginTop: '40px' }}>
            <div>
                <Skeleton height={60} width={60} />
            </div>
            <div>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />

            </div>
        </div>
        <div style={{ marginTop: '10px' }}>
            <div>
                <Skeleton height={60} width={60} />
            </div>
            <div>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />

            </div>
        </div>
        <div style={{ marginTop: '10px' }}>
            <div>
                <Skeleton height={60} width={60} />
            </div>
            <div>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />

            </div>
        </div>
        <div style={{ marginTop: '10px' }}>
            <div>
                <Skeleton height={60} width={60} />
            </div>
            <div>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />

            </div>
        </div>
    </div>
)
