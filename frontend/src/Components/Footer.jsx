const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              We are a trusted online platform dedicated to bringing you the
              best products at wholesale prices. Our mission is to make shopping
              convenient, affordable, and enjoyable for everyone.
            </p>
          </div>

          {/* Online Shopping Thoughts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Why Shop Online?</h3>
            <p className="text-sm text-gray-400">
              Online shopping has revolutionized the way we buy products. It
              offers convenience, a wide variety of choices, and the ability to
              compare prices instantly. With just a few clicks, you can have
              everything you need delivered right to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Wholesale Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
