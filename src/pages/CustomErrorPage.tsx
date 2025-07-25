const CustomErrorPage = () => {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-gray-900">Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! Looks like you wandered off to an unknown realm.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CustomErrorPage;
