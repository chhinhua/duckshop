import S1banner1 from '../../assets/img/LandingPage/Section1.png';
import S2Baner1 from '../../assets/img/LandingPage/section-2-1.png';
import S2Baner2 from '../../assets/img/LandingPage/section-2-2.png';
import S2Baner3 from '../../assets/img/LandingPage/section-2-3.png';
import S2Baner4 from '../../assets/img/LandingPage/section-2-4.png';
import S4Baner1 from '../../assets/img/LandingPage/section-4-1.png';
import S4Baner2 from '../../assets/img/LandingPage/section-4-2.png';
import S4Baner3 from '../../assets/img/LandingPage/section-4-3.png';
import S5BanerVideo1 from '../../assets/img/LandingPage/section-5.mp4';

import ScrollAnimationElement from '../../components/ScrollAnimationElement/ScrollAnimationElement';
import ButtonComp from '../../components/Button';
import CardComp from '../../components/Card';

import { useEffect, useRef } from 'react';

// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';

// const CustomButton = styled(Button)(({ theme }) => ({
//     color: 'white',
//     backgroundColor: 'black',
//     '&:hover': {
//         backgroundColor: '#A4907C', // Bạn có thể thay đổi màu hover tùy ý
//     },
//     borderRadius: '3px',
//     fontSize: '1.2rem',
//     fontStyle: 'normal',
//     fontWeight: '500',
//     display: 'inline-flex',
//     textTransform: 'none',
//     border: '2px solid white',
// }));

function Home() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // Khi component được mount, tự động phát video
        video.play();

        // Sử dụng sự kiện 'ended' để phát lại video khi kết thúc
        const handleVideoEnded = () => {
            video.play();
        };

        video.addEventListener('ended', handleVideoEnded);

        // Sử dụng useEffect cleanup để loại bỏ sự kiện khi component unmount
        return () => {
            video.removeEventListener('ended', handleVideoEnded);
        };
    }, []);

    return (
        <>
            {/* section banner */}
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center py-80"
                style={{ backgroundImage: `url(${S1banner1})` }}
            >
                <div className="flex flex-col pl-32 select-none">
                    <span className="w-2/3 text-3xl font-medium not-italic tracking-widest text-white uppercase xl:text-7xl lg:text-5xl">
                        DISCOVER THE ART OF DRESSING UP
                    </span>
                    <span className="text-lg  font-normal not-italic tracking-wider text-white uppercase xl:text-2xl">
                        MADE IN VIETNAM, DEDICATED TO VIETNAM
                    </span>
                </div>
            </div>

            {/* End section banner */}

            {/* Start content */}
            <div className="mt-10 w-11/12 flex flex-col justify-center m-auto">
                {/* Section 2 */}
                <div className="w-full flex flex-col justify-center items-center gap-1 mb-1">
                    <div className="bg-black h-1 w-3/12"></div>
                    <div className="uppercase text-xl font-semibold not-italic">This Weeks Highlights</div>
                </div>
                <div className="w-full mt-7">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
                        {[
                            { title: 'Exclusive Shoes', action: 'Find Your Store', image: S2Baner1 },
                            { title: 'Exquisite Styles & Collections', action: 'Find Shop', image: S2Baner2 },
                            { title: 'New Products', action: 'Find New Products', image: S2Baner3 },
                            { title: 'Exclusive Items', action: 'Find Items', image: S2Baner4 },
                        ].map((item, index) => (
                            <ScrollAnimationElement key={index}>
                                <div
                                    className={`${
                                        index / 1 === 0 || index / 1 === 3 ? 'col-span-1' : 'md:col-span-2  col-span-1'
                                    } opacity-0 `}
                                >
                                    <div
                                        className="bg-cover bg-no-repeat bg-center relative rounded"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    >
                                        <div className="h-full flex flex-col">
                                            <span className="w-full h-96 flex items-center justify-center text-center text-4xl font-medium not-italic tracking-widest text-white uppercase">
                                                {item.title}
                                            </span>
                                            <div className="absolute bottom-7 left-7 ">
                                                {/* <CustomButton variant="contained">{item.action}</CustomButton> */}
                                                <ButtonComp>{item.action}</ButtonComp>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimationElement>
                        ))}
                    </div>
                </div>
                {/* End Section 2 */}
                {/* Start section 3 */}
                <div className="w-full grid justify-items-center gap-1 mt-8">
                    <div className="bg-black h-1 w-3/12"></div>
                    <div className="uppercase text-xl font-semibold not-italic">Popular this week</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    {[S2Baner1, S2Baner2, S2Baner3, S2Baner4].map((item, index) => (
                        <ScrollAnimationElement key={index}>
                            <div className="opacity-0">
                                <CardComp image={item} className="rounded" />
                            </div>
                        </ScrollAnimationElement>
                    ))}
                </div>
                {/* End section 3 */}
                {/* Start section 4 */}
                <div className="w-full grid justify-items-center gap-1 mt-8">
                    {/* <div className="bg-black h-1 w-3/12"></div> */}
                    <div className="uppercase text-xl font-semibold not-italic">The Essentials</div>
                </div>
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[
                        { title: "Men's", img: S4Baner1 },
                        { title: "Women's", img: S4Baner2 },
                        { title: "Kid's", img: S4Baner3 },
                    ].map((item, index) => (
                        <ScrollAnimationElement key={index}>
                            <div className="opacity-0">
                                <div className="col-span-1 hover:scale-105 duration-200 " key={index}>
                                    <div
                                        className="bg-cover bg-no-repeat bg-center relative rounded"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    >
                                        <div className="flex flex-col">
                                            <div className=" h-140">
                                                <div className="absolute bottom-7 left-7 ">
                                                    <ButtonComp variant="contained">{item.title}</ButtonComp>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimationElement>
                    ))}
                </div>
                {/* End section 4 */}
            </div>
            {/* End content */}
            {/* Start section 5 */}
            <ScrollAnimationElement>
                <div className="h-full mt-8 relative opacity-0">
                    <video ref={videoRef} muted>
                        <source src={S5BanerVideo1} type="video/mp4" />
                    </video>
                    <div className="w-full flex flex-col absolute bottom-0 text-center mb-4">
                        <span className="w-full h-auto mb-4 lg:text-4xl md:text-2xl text-xl font-medium not-italic tracking-widest text-white uppercase">
                            See the fashion accessories for you
                        </span>
                        <div className="">
                            <ButtonComp custom>See accessories</ButtonComp>
                        </div>
                    </div>
                </div>
            </ScrollAnimationElement>
            {/* End section 5 */}
        </>
    );
}

export default Home;
