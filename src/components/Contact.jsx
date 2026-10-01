
function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-3 text-gray-600">
            Have a question or need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-800">📍 Address</h3>
                <p className="text-gray-600">Kathmandu, Nepal</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">📧 Email</h3>
                <p className="text-gray-600">info@example.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">📞 Phone</h3>
                <p className="text-gray-600">+977 98XXXXXXXX</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">🕒 Opening Hours</h3>
                <p className="text-gray-600">Sun - Fri: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Send a Message</h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
