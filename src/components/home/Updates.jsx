import QuickCards from './QuickCards';

const Updates = () => {
  return (
    <section className="bg-slate-950 py-20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Latest Updates</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Fresh news, events, and program highlights</h2>
          </div>
          <a href="/news" className="self-start rounded-full border border-amber-300 bg-amber-100/10 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-100/20 hover:text-white">
            View All
          </a>
        </div>

        <QuickCards />
      </div>
    </section>
  );
};

export default Updates;
