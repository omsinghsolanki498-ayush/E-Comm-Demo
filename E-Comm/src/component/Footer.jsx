function Footer() {
  return (

    <footer className="border-t-2 border-black bg-gray-50 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-3xl text-black font-bold mb-3">PUMA</h2>
            <p className="text-black text-sm">
              Premium sportswear and footwear for every lifestyle.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="text-black cursor-pointer ">Contact Us</li>
              <li className="text-black cursor-pointer">FAQs</li>
              <li className="text-black cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 ">Contact</h3>
            <p className="text-black "> support@puma.com</p>
            <p className="text-black  mt-2"> +91 9876543210</p>
            <p className="text-black  mt-2"> India</p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-black mt-8 pt-5 flex flex-col md:flex-row justify-between items-center">

          <p className="text-black  text-sm">
            © {new Date().getFullYear()} PUMA Clone. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0 text-black  text-sm">
            <span className="text-black  cursor-pointer">
              Privacy Policy
            </span>

            <span className="text-black  cursor-pointer">
              Terms
            </span>

            <span className="text-black  cursor-pointer">
              Cookies
            </span>
          </div>

        </div>

      </div>
    </footer>

  );
}

export default Footer;