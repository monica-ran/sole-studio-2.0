import React, { useState } from "react";

const Checkout = () => {

  const [showCookies, setShowCookies] = useState(true);

  return (
    <div>
      {/* Your existing Checkout component code here */}

      {/* Cookie Notification */}
      <div
        className={`fixed left-4 bottom-0 z-40 ${
          showCookies ? "" : "hidden"
        } `}
        x-data="{cookies: true}"
        x-init='
          $watch("cookies", o => !o && window.setTimeout(() => (cookies = true), 1000));
          setTimeout(() => cookies = true, 1500)
        '
       
      >
        {/* Notification Box */}
        <div
          x-show="cookies"
          className="fixed sm:left-4 bottom-20 rounded-lg bg-white shadow-2xl w-full sm:w-1/2 xl:w-1/4 max-w-[450px] overflow-hidden"
          x-transition:enter="transition ease-in duration-200"
          x-transition:enter-start="opacity-0 transform -translate-x-40"
          x-transition:enter-end="opacity-100 transform translate-x-0"
          x-transition:leave="transition ease-in duration-200"
          x-transition:leave-start="opacity-100 transform translate-x-0"
          x-transition:leave-end="opacity-0 transform -translate-x-40"
        >
          {/* Notification Content */}
          <div className="relative overflow-hidden px-8 pt-8">
          <div width="80" height="77" className="absolute -top-10 -right-10 text-blue-400">
              <svg width="120" height="119" viewBox="0 0 120 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z" fill="currentColor" />
              </svg>
            </div>
            <div className="text-2xl flex flex-col pb-4">
              <small>Hello there..</small>
              <span className="text-3xl font-bold">Thank You for Shopping with Sole Studio!</span>
            </div>
            <div className="pb-4">
              <p>
              Your confirmation email is on its way, and your product will be shipped within 3-5 days. Any questions? Reach out to us at by phone or email.
              </p>
            </div>
          </div>

    
        </div>
      </div>


    </div>
  );
};

export default Checkout;