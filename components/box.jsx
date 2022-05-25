const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Box = ({ title, children }) => {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl overflow-y-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div
              className={classNames(
                children ? 'h-full' : 'h-72',
                'rounded-lg border-4 border-dashed border-gray-200'
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Box;
