import React from "react";

function Footer() {
  return (
    <footer className="mt-auto w-full border-t-2 border-black bg-gray-50 text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-8 md:grid-cols-4 sm:gap-6">
          
          {/* Logo & About */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="mb-2 text-2xl font-black tracking-tight text-black sm:mb-3 sm:text-3xl">
              PUMA
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600">
              Premium sportswear and footwear for every lifestyle.
            </p>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-black">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="inline-block cursor-pointer text-gray-700 transition-colors hover:text-black py-0.5">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="inline-block cursor-pointer text-gray-700 transition-colors hover:text-black py-0.5">
                  FAQs
                </span>
              </li>
              <li>
                <span className="inline-block cursor-pointer text-gray-700 transition-colors hover:text-black py-0.5">
                  Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-black">
              Contact
            </h3>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p className="transition-colors hover:text-black">
                support@puma.com
              </p>
              <p className="transition-colors hover:text-black">
                +91 9876543210
              </p>
              <p className="text-gray-600">India</p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-300 pt-6 text-center sm:flex-row sm:text-left">
          
          <p className="text-xs text-gray-600 sm:text-sm">
            © {new Date().getFullYear()} PUMA Clone. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:gap-6 sm:text-sm">
            <span className="cursor-pointer text-gray-600 transition-colors hover:text-black">
              Privacy Policy
            </span>
            <span className="cursor-pointer text-gray-600 transition-colors hover:text-black">
              Terms
            </span>
            <span className="cursor-pointer text-gray-600 transition-colors hover:text-black">
              Cookies
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;