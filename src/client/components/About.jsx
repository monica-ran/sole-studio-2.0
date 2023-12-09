import React from 'react';
import aboutImage from './photos/about.png';
import avatarImage1 from './avatar/boy1.png';
import avatarImage2 from './avatar/girl1.png';
import avatarImage3 from './avatar/boy2.png';
import avatarImage4 from './avatar/girl2.png';
import avatarImage5 from './avatar/girl3.png';

const About = () => {
  return (
    <section style={{ background: '#FFFFFF', color: '#000000' }} className="mt-16 pt-16">
      <div className="container px-6 mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-3xl font-semibold capitalize lg:text-4xl">
            Explore Our Mission - <span style={{ textDecoration: 'underline', color: 'black' }}>Sole Studio</span>
          </h1>
        </div>
        <div className="text-center lg:text-right mb-4 lg:mb-0">
          <img src={aboutImage} alt="About" className="mx-auto w-64 h-64 mb-2" />
        </div>
      </div>
      <div className="container px-6 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-4 mt-4 xl:mt-8 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Section 1 */}
          <div className="p-4 space-y-3 border-2 border-blue-400 rounded-xl">
            <span className="inline-block text-blue-500 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 10012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </span>
            <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Style and Sustainability</h1>
            <p className="text-blue-400 dark:text-blue-400">
              At Sole Studio's, our mission is to lead the industry in providing stylish and comfortable footwear while prioritizing sustainability. We commit to creating shoes that tread lightly on the planet by utilizing eco-friendly materials, reducing waste, and promoting ethical practices. Step into a greener tomorrow with Sole Studio.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 space-y-3 border-2 border-blue-400 rounded-xl">
            <span className="inline-block text-blue-500 dark:text-blue-400">
              {/* ... */}
            </span>
            <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Empowering Every Step with Quality and Comfort</h1>
            <p className="text-blue-400 dark:text-blue-400">
              We want to empower individuals with quality footwear that supports every step of their journey. We strive to blend cutting-edge technology with timeless design, ensuring our customers experience unmatched comfort, durability, and style. Step into confidence with footwear that stands the test of time.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 space-y-3 border-2 border-blue-400 rounded-xl">
            <span className="inline-block text-blue-500 dark:text-blue-400">
              {/* ... */}
            </span>
            <h1 className="text-2xl font-semibold text-blue-400 capitalize dark:text-black">Walking the Path of Social Responsibility</h1>
            <p className="text-blue-400 dark:text-blue-400">
              At Sole Studio, we are committed to making a positive impact on both our customers and the communities we touch. Our mission is to walk the path of social responsibility by creating shoes that not only enhance lives through style and comfort but also contribute to social causes. With every step, we aim to leave a footprint of compassion, inclusivity, and positive change.
            </p>
          </div>
        </div>

        {/* Team Members Section */}
        <div id="team" className="section relative pt-20 pb-8 md:pt-16 bg-white">
          <div className="container xl:max-w-6xl mx-auto px-4">
            <header className="text-center mx-auto mb-12">
              <h2 className="text-2xl leading-normal mb-2 font-bold text-black dark:black">
                Meet the Team
              </h2>
            </header>
            <div className="flex flex-wrap flex-row -mx-4 justify-center">
              {/* Team Members */}
              {/* Team Member 1 */}
              <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:px-6">
                <div className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
                  <div className="relative overflow-hidden px-6">
                    <img src={avatarImage1} className="max-w-full h-auto mx-auto rounded-full" alt="Team Member 1" />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-lg leading-normal font-bold mb-1">Maverick Tomes</p>
                    <p className="text-gray-500 leading-relaxed font-light">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:px-6">
                <div className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
                  <div className="relative overflow-hidden px-6">
                    <img src={avatarImage2} className="max-w-full h-auto mx-auto rounded-full" alt="Team Member 2" />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-lg leading-normal font-bold mb-1">Nicole Park</p>
                    <p className="text-gray-500 leading-relaxed font-light">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:px-6">
                <div className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
                  <div className="relative overflow-hidden px-6">
                    <img src={avatarImage3} className="max-w-full h-auto mx-auto rounded-full" alt="Team Member 3" />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-lg leading-normal font-bold mb-1">Carter Peck</p>
                    <p className="text-gray-500 leading-relaxed font-light">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:px-6">
                <div className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
                  <div className="relative overflow-hidden px-6">
                    <img src={avatarImage4} className="max-w-full h-auto mx-auto rounded-full" alt="Team Member 4" />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-lg leading-normal font-bold mb-1">Monica Ran</p>
                    <p className="text-gray-500 leading-relaxed font-light">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Team Member 5 */}
              <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:px-6">
                <div className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
                  <div className="relative overflow-hidden px-6">
                    <img src={avatarImage5} className="max-w-full h-auto mx-auto rounded-full" alt="Team Member 5" />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-lg leading-normal font-bold mb-1">Fern Coelho</p>
                    <p className="text-gray-500 leading-relaxed font-light">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
