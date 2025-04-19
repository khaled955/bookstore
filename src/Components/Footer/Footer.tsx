
export default function Footer() {
  return (
    <div>
       <footer className="bg-gray-900 text-white py-3 text-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a leading online bookstore offering a wide range of books
              for all ages. Explore our collection and find your next favorite
              read!
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Books
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Book Street, Library City</li>
              <li>Email: info@bookshop.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Support: support@bookshop.com</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <a target="_blank"
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
               <i className="fa-brands fa-facebook text-2xl"></i>
              </a>
              <a target="_blank"
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <i className="fa-brands fa-x-twitter text-2xl"></i>
              </a>
              <a target="_blank"
                href="https://github.com"
                className="text-gray-400 hover:text-white"
              >
             <i className="fa-brands fa-github text-2xl"></i>
              </a>
              <a target="_blank"
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
             <i className="fa-brands fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Book Shop Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}




