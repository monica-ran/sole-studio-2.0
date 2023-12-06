import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/solestudio - Copy.svg';

// Define the About component
const About = () => {
    return (
        <section style={{ background: '#FFFFFF', color: '#0000FF' }} className="mt-20 pt-16">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold capitalize lg:text-4xl">
                    Explore Our <br /> Mission - <span style={{ textDecoration: 'underline', color: 'black' }}>Sole Studio</span>
                </h1>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 space-y-3 border-2 border-blue-400 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 10012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                            </svg>
                        </span>

                        <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Elegant Dark Mode</h1>

                        <p className="text-blue-400 dark:text-blue-400">
                            At Sole Studio's, our mission is to lead the industry in providing stylish and comfortable footwear while prioritizing sustainability. We commit to creating shoes that tread lightly on the planet by utilizing eco-friendly materials, reducing waste, and promoting ethical practices. Step into a greener tomorrow with Sole Studio.
                        </p>

                        <a href="#" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </div>

                    <div className="p-8 space-y-3 border-2 border-blue-400 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            {/* ... */}
                        </span>

                        <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Empowering Every Step with Quality and Comfort</h1>

                        <p className="text-blue-400 dark:text-blue-400">
                            We want to empower individuals with quality footwear that supports every step of their journey. We strive to blend cutting-edge technology with timeless design, ensuring our customers experience unmatched comfort, durability, and style. Step into confidence with footwear that stands the test of time.
                        </p>

                        <a href="#" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                            {/* ... */}
                        </a>
                    </div>

                    <div className="p-8 space-y-3 border-2 border-blue-400 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            {/* ... */}
                        </span>

                        <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Walking the Path of Social Responsibility</h1>

                        <p className="text-blue-400 dark:text-blue-400">
                            At Sole Studio, we are committed to making a positive impact on both our customers and the communities we touch. Our mission is to walk the path of social responsibility by creating shoes that not only enhance lives through style and comfort but also contribute to social causes. With every step, we aim to leave a footprint of compassion, inclusivity, and positive change.
                        </p>

                        <a href="#" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                            {/* ... */}
                        </a>
                    </div>
                </div>
            </div>

            <div className="fixed inset-x-0 lg:inset-x-auto bottom-6 lg:right-8 xl:right-10 xl:bottom-8">
                <div className="lg:w-72 px-6 lg:px-0">
                    <div style={{ background: '#0055FF' }} className="p-2 rounded-lg shadow-lg sm:p-3">
                        <div className="flex flex-wrap items-center justify-between">
                            <a target="_blank" href="https://www.buymeacoffee.com/khatabwedaa" className="flex items-center flex-1 w-0">
                                <span style={{ background: '#0088FF' }} className="flex p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.12954 3.00772C5.48563 2.38457 6.14831 2 6.86603 2H17.134C17.8517 2 18.5144 2.38457 18.8704 3.00772L20.0133 5.00772C20.6612 6.14163 20.0618 7.51107 18.9235 7.89532C18.9276 7.97661 18.9269 8.0591 18.9209 8.14249L18.0638 20.1425C17.989 21.1891 17.1181 22 16.0689 22H7.9311C6.88182 22 6.01094 21.1891 5.93618 20.1425L5.07904 8.14249C5.07308 8.0591 5.07231 7.97661 5.07645 7.89531C3.93813 7.51105 3.33874 6.14162 3.98668 5.00772L5.12954 3.00772ZM7.07396 8L7.28824 11H16.7117L16.926 8H7.07396ZM7.71681 17L7.9311 20H16.0689L16.2831 17H7.71681ZM18.2768 6L17.134 4L6.86603 4L5.72317 6H18.2768Z" fill="currentColor"></path>
                                    </svg>
                                </span>

                                <p className="ml-3 font-medium tracking-wide text-white truncate">
                                    Create an Account
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Export the About component
export default About;
