const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-500 mb-6">
        Welcome to Quantum Ecommerce
      </h1>
      <p className="text-neutral-700 mb-4">
        Discover amazing products and enjoy a seamless shopping experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-400 mb-3">
            Latest Products
          </h2>
          <p className="text-neutral-600">
            Check out our newest arrivals and trending items.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-400 mb-3">
            Special Offers
          </h2>
          <p className="text-neutral-600">
            Exclusive deals and discounts just for you.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-400 mb-3">
            Customer Support
          </h2>
          <p className="text-neutral-600">
            We&apos;re here to help. Contact us anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
