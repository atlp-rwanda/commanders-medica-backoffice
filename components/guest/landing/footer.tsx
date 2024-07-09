export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white py-12">
      <div className="flex justify-center items-start gap-8 px-12 max-w-[1200px] mx-auto">
        <div className="col px-6">
          <div className="flex bg-white items-center justify-center rounded-xl px-4 py-2 w-fit mb-4">
            <img
              src="/favicon-32x32.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
            &nbsp; &nbsp;
            <span className="font-bold text-primary-500 text-2xl">Medica</span>
          </div>
          <p className="font-semibold text-sm">
            Copyright © 2020 - All Rights Reserved
          </p>
        </div>
        <div className="col flex-1 grid grid-cols-4">
          <div className="col flex flex-col">
            <h6 className="font-bold mb-2">Product</h6>
            <a href="#" className="mb-1">
              Features
            </a>
            <a href="#" className="mb-1">
              Pricing
            </a>
            <a href="#" className="mb-1">
              Reviews
            </a>
            <a href="#" className="mb-1">
              Updates
            </a>
          </div>
          <div className="col flex flex-col">
            <h6 className="font-bold mb-2">Company</h6>
            <a href="#" className="mb-1">
              About Us
            </a>
            <a href="#" className="mb-1">
              Contact Us
            </a>
            <a href="#" className="mb-1">
              Careers
            </a>
          </div>
          <div className="col flex flex-col">
            <h6 className="font-bold mb-2">Support</h6>
            <a href="#" className="mb-1">
              Getting Started
            </a>
            <a href="#" className="mb-1">
              Help Center
            </a>
            <a href="#" className="mb-1">
              Server Status
            </a>
            <a href="#" className="mb-1">
              Chat Support
            </a>
          </div>
          <div className="col flex flex-col">
            <h6 className="font-bold mb-2">Follow Us</h6>
            <a href="#" className="mb-1">
              Facebook
            </a>
            <a href="#" className="mb-1">
              Twitter
            </a>
            <a href="#" className="mb-1">
              Instagram
            </a>
            <a href="#" className="mb-1">
              Linkedin
            </a>
            <a href="#" className="mb-1">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
