'use client';

const NotifySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl text-gray-900 mb-3">
          Get notified when we launch
        </h2>
        <p className="text-gray-600 mb-8">
          We&apos;ll send you an email when the community is ready.
        </p>

        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#07c6e8] text-white rounded-lg hover:bg-[#06b0cf] transition font-medium"
          >
            Notify Me
          </button>
        </form>
      </div>
    </section>
  );
};

export default NotifySection;
